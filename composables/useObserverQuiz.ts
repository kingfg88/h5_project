import { computed, ref } from 'vue';
import { cardData, chatQuestions, personalityTemplates, quizQuestions } from '~/data/quiz-content';
import { scoreResult } from '~/utils/score';
import { saveLead, trackEvent } from '~/utils/storage';
import type { OptionKey, Stage } from '~/types/quiz';

export function useObserverQuiz() {
  const stage = ref<Stage>('start');
  const chatStep = ref(0);
  const quizIndex = ref(0);
  const selectedQuizOption = ref<OptionKey | ''>('');
  const chatAnswers = ref<string[]>([]);
  const quizAnswers = ref<OptionKey[]>([]);
  const selectedCard = ref<number | null>(null);
  const resultKey = ref<string>('');
  const nickname = ref('观测者旅人');

  const currentChatQuestion = computed(() => chatQuestions[chatStep.value] ?? null);
  const currentQuizQuestion = computed(() => quizQuestions[quizIndex.value] ?? null);
  const resultTemplate = computed(() => {
    if (!resultKey.value) return null;
    return personalityTemplates[resultKey.value as keyof typeof personalityTemplates] ?? null;
  });

  const progressText = computed(() => `${quizIndex.value + 1} / ${quizQuestions.length}`);
  const progressWidth = computed(() => `${((quizIndex.value + 1) / quizQuestions.length) * 100}%`);

  function toStage(next: Stage) {
    stage.value = next;
    if (import.meta.client) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    trackEvent('screen_view', { stage: next });
  }

  function start() {
    toStage('chat');
    trackEvent('start', {});
  }

  function pickChatOption(value: string) {
    chatAnswers.value.push(value);
    chatStep.value += 1;
    trackEvent('chat_answer', { step: chatStep.value, answer: value });
  }

  const chatFinished = computed(() => chatStep.value >= chatQuestions.length);

  function finishChat() {
    quizIndex.value = 0;
    quizAnswers.value = [];
    selectedQuizOption.value = '';
    toStage('quiz');
  }

  function pickQuizOption(value: OptionKey) {
    selectedQuizOption.value = value;
  }

  function nextQuiz() {
    if (!selectedQuizOption.value) return;
    const chosen = selectedQuizOption.value;
    quizAnswers.value.push(chosen);
    trackEvent('quiz_answer', { index: quizIndex.value + 1, answer: chosen });

    if (quizIndex.value < quizQuestions.length - 1) {
      quizIndex.value += 1;
      selectedQuizOption.value = '';
      return;
    }

    toStage('card');
  }

  function pickCard(index: number) {
    selectedCard.value = index;
    const card = cardData[index];
    if (!card) return;

    trackEvent('card_pick', { name: card.name });
    setTimeout(() => {
      resultKey.value = scoreResult(chatAnswers.value, quizAnswers.value);
      const tpl = personalityTemplates[resultKey.value as keyof typeof personalityTemplates];
      trackEvent('result_ready', { key: resultKey.value, name: tpl?.name ?? '' });
      toStage('result');
    }, 1200);
  }

  function restart() {
    chatStep.value = 0;
    quizIndex.value = 0;
    selectedQuizOption.value = '';
    chatAnswers.value = [];
    quizAnswers.value = [];
    selectedCard.value = null;
    resultKey.value = '';
    toStage('start');
    trackEvent('restart', {});
  }

  function setNickname(next: string) {
    const v = next.trim();
    if (v) nickname.value = v;
  }

  function submitLead(contact: string, name?: string) {
    const cleanContact = contact.trim();
    if (!cleanContact) {
      return { ok: false, message: '请填写联系方式' };
    }

    const tpl = resultTemplate.value;
    const card = selectedCard.value === null ? null : cardData[selectedCard.value];

    const res = saveLead({
      nickname: (name ?? nickname.value).trim() || nickname.value,
      contact: cleanContact,
      personality: tpl?.name ?? '',
      cardName: card?.name ?? '',
      source: 'nuxt-h5'
    });

    trackEvent('lead_ok', { id: res.id });
    return { ok: true, id: res.id };
  }

  return {
    stage,
    chatStep,
    quizIndex,
    selectedQuizOption,
    chatAnswers,
    quizAnswers,
    selectedCard,
    resultKey,
    nickname,
    currentChatQuestion,
    currentQuizQuestion,
    resultTemplate,
    progressText,
    progressWidth,
    chatFinished,
    chatQuestions,
    quizQuestions,
    cardData,
    start,
    pickChatOption,
    finishChat,
    pickQuizOption,
    nextQuiz,
    pickCard,
    restart,
    toStage,
    setNickname,
    submitLead
  };
}
