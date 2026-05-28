<template>
  <main class="app-shell">
    <div id="particles" class="particles" aria-hidden="true">
      <span
        v-for="particle in particles"
        :key="particle.id"
        class="particle"
        :style="particle.style"
      />
    </div>

    <div class="app">
      <section v-if="stage === 'start'" class="screen active">
        <div class="panel">
          <div class="splash-icon">◉</div>
          <h1 class="title">观察者｜解锁你的薛定谔式人生</h1>
          <p class="sub">不必借算命，聊聊就懂你的轮廓。观察者不定义，只懂你。</p>
          <button class="btn" @click="handleStart">开始观测 →</button>
        </div>
      </section>

      <section v-else-if="stage === 'chat'" class="screen active">
        <div class="panel">
          <h2>先聊三句，快速破冰</h2>
          <p class="tiny">点选选项即可推进，无需输入文字。</p>

          <div class="chat-box">
            <div v-for="(item, idx) in chatHistory" :key="`chat-${idx}`" :class="['bubble', item.role]">
              {{ item.text }}
            </div>
            <div v-if="showTyping" class="typing-indicator">
              <span /><span /><span />
            </div>
          </div>

          <div class="choice-grid">
            <button
              v-for="option in currentChatOptions"
              :key="option.value"
              class="option"
              @click="handleChatPick(option.value, option.text)"
            >
              {{ option.text }}
            </button>
          </div>

          <button v-if="chatFinished" class="btn" @click="finishChat">聊完了，开始观测 →</button>
        </div>
      </section>

      <section v-else-if="stage === 'quiz'" class="screen active">
        <div class="panel">
          <div class="quiz-head">
            <p class="tiny">观察者正在观测...</p>
            <div class="progress-track">
              <div class="progress-fill" :style="{ width: progressWidth }" />
            </div>
            <p class="tiny">{{ progressText }}</p>
          </div>

          <h3>{{ currentQuizQuestion?.q }}</h3>

          <div class="choice-grid">
            <button
              v-for="option in quizOptionList"
              :key="option.key"
              class="option"
              :class="{ selected: selectedQuizOption === option.key }"
              @click="pickQuizOption(option.key)"
            >
              {{ option.key }}. {{ option.text }}
            </button>
          </div>

          <button class="btn" :disabled="!selectedQuizOption" @click="nextQuiz">下一题</button>
        </div>
      </section>

      <section v-else-if="stage === 'card'" class="screen active">
        <div class="panel">
          <h2>凭直觉，选一张最有感觉的卡</h2>
          <p class="sub">不用多想，跟着本心走。</p>

          <div class="card-grid">
            <button
              v-for="(card, index) in cardData"
              :key="card.name"
              class="sense-card"
              :class="{ active: selectedCard === index }"
              :style="{ background: card.color }"
              @click="pickCard(index)"
            >
              {{ card.name }}
            </button>
          </div>

          <p class="sub card-tip">{{ cardTip }}</p>
        </div>
      </section>

      <section v-else-if="stage === 'result'" class="screen active">
        <div class="panel">
          <h2>你的专属报告：{{ resultTemplate?.name }}</h2>
          <p class="sub">{{ resultTemplate?.intro }}</p>

          <div class="result-wrap">
            <article v-for="(module, idx) in resultTemplate?.modules ?? []" :key="`module-${idx}`" class="result-module">
              <h4>{{ module[0] }}</h4>
              <p>{{ module[1] }}</p>
            </article>
          </div>

          <div class="lead-form">
            <input v-model="leadNickname" type="text" placeholder="昵称（可选）" />
            <input v-model="leadContact" type="text" placeholder="联系方式（必填）" />
            <button class="btn" @click="handleLeadSubmit">提交留资</button>
            <p class="tiny">{{ leadStatus }}</p>
          </div>

          <div class="actions-row">
            <button class="btn" @click="toPoster">生成分享海报</button>
            <button class="btn secondary" @click="handleRestart">重新测试</button>
          </div>
        </div>
      </section>

      <section v-else-if="stage === 'poster'" class="screen active">
        <div class="panel">
          <h2>分享海报</h2>
          <p class="sub">自动带入你的核心人格标签与真实 QR</p>

          <div class="poster-box">
            <canvas ref="posterCanvas" width="900" height="1500" />
          </div>

          <div class="actions-row">
            <button class="btn" @click="savePoster">保存海报</button>
            <button class="btn secondary" @click="sharePoster">分享好友</button>
            <button class="btn secondary" @click="toStage('end')">返回首页</button>
          </div>
        </div>
      </section>

      <section v-else-if="stage === 'end'" class="screen active">
        <div class="panel">
          <h2 class="title title-sm">读懂自己，才能顺势而行</h2>
          <p class="sub">愿你不内耗、不迷茫，活成自己喜欢的样子。</p>
          <button class="btn" @click="handleRestart">重新观测</button>
        </div>
      </section>

      <button class="music-toggle" :class="{ on: musicOn }" @click="toggleMusic(false)">
        {{ musicButtonText }}
      </button>
    </div>

    <audio
      ref="bgmRef"
      loop
      preload="none"
      src="https://cdn.pixabay.com/download/audio/2023/04/14/audio_97359e95d8.mp3?filename=gentle-piano-loop-145597.mp3"
    />

    <p class="footer-note">本测试仅为娱乐，旨在帮你洞察自我</p>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useObserverQuiz } from '~/composables/useObserverQuiz';
import { drawPoster } from '~/utils/poster';
import { trackEvent } from '~/utils/storage';
import type { OptionKey } from '~/types/quiz';

useSeoMeta({
  title: '观察者｜薛定谔式人生观测',
  description: '可维护的 Nuxt 版人生观测 H5。'
});

const {
  stage,
  selectedCard,
  selectedQuizOption,
  currentChatQuestion,
  currentQuizQuestion,
  resultTemplate,
  progressText,
  progressWidth,
  chatFinished,
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
  submitLead,
  nickname
} = useObserverQuiz();

const chatHistory = ref<Array<{ role: 'system' | 'user'; text: string }>>([]);
const showTyping = ref(false);
const currentChatOptions = ref<Array<{ text: string; value: string }>>([]);
const chatLocked = ref(false);

const leadNickname = ref('');
const leadContact = ref('');
const leadStatus = ref('');

const posterCanvas = ref<HTMLCanvasElement | null>(null);
const bgmRef = ref<HTMLAudioElement | null>(null);
const musicOn = ref(false);
const musicButtonText = ref('♫ 背景音：关');

const particles = ref(
  Array.from({ length: 18 }, (_, index) => {
    const size = 6 + Math.random() * 18;
    return {
      id: index,
      style: {
        width: `${size}px`,
        height: `${size}px`,
        left: `${Math.random() * 100}vw`,
        bottom: `${-size}px`,
        animationDuration: `${12 + Math.random() * 16}s`,
        animationDelay: `${Math.random() * 14}s`
      }
    };
  })
);

const quizOptionList = computed(() => {
  if (!currentQuizQuestion.value) {
    return [] as Array<{ key: OptionKey; text: string }>;
  }

  return (Object.entries(currentQuizQuestion.value.options) as Array<[OptionKey, string]>).map(
    ([key, text]) => ({ key, text })
  );
});

const cardTip = computed(() => {
  if (selectedCard.value === null) {
    return '';
  }
  const card = cardData[selectedCard.value];
  return card ? `${card.tip} 1.2秒后进入报告...` : '';
});

function queueChatQuestion() {
  if (chatFinished.value) {
    showTyping.value = false;
    currentChatOptions.value = [];
    return;
  }

  const question = currentChatQuestion.value;
  if (!question) {
    return;
  }

  showTyping.value = true;
  currentChatOptions.value = [];

  setTimeout(() => {
    showTyping.value = false;
    chatHistory.value.push({ role: 'system', text: question.q });
    currentChatOptions.value = question.options.map((item) => ({ ...item }));
  }, 600);
}

function handleStart() {
  start();
  toggleMusic(true);
}

function handleChatPick(value: string, text: string) {
  if (chatLocked.value) {
    return;
  }

  chatLocked.value = true;
  chatHistory.value.push({ role: 'user', text });
  pickChatOption(value);
  currentChatOptions.value = [];

  setTimeout(() => {
    chatLocked.value = false;
    queueChatQuestion();
  }, 260);
}

function toPoster() {
  const val = leadNickname.value.trim();
  if (val) {
    setNickname(val);
  }
  toStage('poster');
}

function handleRestart() {
  restart();
  chatHistory.value = [];
  currentChatOptions.value = [];
  showTyping.value = false;
  chatLocked.value = false;
  leadNickname.value = '';
  leadContact.value = '';
  leadStatus.value = '';
}

function handleLeadSubmit() {
  const res = submitLead(leadContact.value, leadNickname.value);
  if (!res.ok) {
    leadStatus.value = res.message ?? '提交失败';
    return;
  }

  leadStatus.value = `提交成功，ID：${res.id}`;
  leadContact.value = '';
}

function renderPoster() {
  if (!posterCanvas.value || !resultTemplate.value) {
    return;
  }

  drawPoster(posterCanvas.value, resultTemplate.value, nickname.value);
  trackEvent('poster_made', { name: resultTemplate.value.name });
}

function savePoster() {
  if (!posterCanvas.value || !resultTemplate.value) {
    return;
  }

  const link = document.createElement('a');
  link.download = `观测报告_${resultTemplate.value.name}.png`;
  link.href = posterCanvas.value.toDataURL('image/png');
  link.click();

  trackEvent('poster_save', { name: resultTemplate.value.name });
}

async function sharePoster() {
  if (!resultTemplate.value) {
    return;
  }

  const text = `我测出是「${resultTemplate.value.name}」！来观测你的薛定谔式人生。`;

  if (navigator.share) {
    try {
      await navigator.share({
        title: '观察者人生观测',
        text,
        url: window.location.href
      });
    } catch {
      // ignore cancel
    }
  } else {
    window.alert(text);
  }

  trackEvent('poster_share', { name: resultTemplate.value.name });
}

async function toggleMusic(forcePlay: boolean) {
  const audio = bgmRef.value;
  if (!audio) {
    return;
  }

  try {
    if (forcePlay || !musicOn.value) {
      await audio.play();
      musicOn.value = true;
      musicButtonText.value = '♫ 背景音：开';
      return;
    }

    audio.pause();
    musicOn.value = false;
    musicButtonText.value = '♫ 背景音：关';
  } catch {
    musicButtonText.value = '♫ 请点击启用音乐';
  }
}

watch(
  stage,
  (next) => {
    if (next === 'chat' && chatHistory.value.length === 0) {
      queueChatQuestion();
    }

    if (next === 'poster') {
      setTimeout(renderPoster, 20);
    }

    if (next === 'start') {
      chatHistory.value = [];
      currentChatOptions.value = [];
      showTyping.value = false;
      chatLocked.value = false;
    }
  },
  { immediate: true }
);

onMounted(() => {
  trackEvent('visit', { ua: navigator.userAgent });
});
</script>
