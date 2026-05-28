export type Stage = 'start' | 'chat' | 'quiz' | 'card' | 'result' | 'poster' | 'end';

export type OptionKey = 'A' | 'B' | 'C' | 'D';

export interface ChatOption {
  text: string;
  value: string;
}

export interface ChatQuestion {
  q: string;
  options: ChatOption[];
}

export interface QuizQuestion {
  q: string;
  options: Record<OptionKey, string>;
}

export interface CardItem {
  name: string;
  color: string;
  tip: string;
}

export interface PersonalityTemplate {
  name: string;
  intro: string;
  modules: [string, string][];
}

export interface StaticStore {
  leads: Array<{
    id: number;
    nickname: string;
    contact: string;
    personality: string;
    cardName: string;
    source: string;
    createdAt: string;
  }>;
  events: Array<{
    id: number;
    eventName: string;
    payload: Record<string, unknown>;
    createdAt: string;
  }>;
}

export interface LeadPayload {
  nickname: string;
  contact: string;
  personality: string;
  cardName: string;
  source: string;
}
