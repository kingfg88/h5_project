import type { LeadPayload, StaticStore } from '~/types/quiz';

const STORAGE_KEY = 'observer_h5_data';

function getEmptyStore(): StaticStore {
  return { leads: [], events: [] };
}

function readStore(): StaticStore {
  if (!import.meta.client) {
    return getEmptyStore();
  }

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return getEmptyStore();
  }

  try {
    const parsed = JSON.parse(raw) as StaticStore;
    if (Array.isArray(parsed.leads) && Array.isArray(parsed.events)) {
      return parsed;
    }
  } catch {
    return getEmptyStore();
  }

  return getEmptyStore();
}

function writeStore(next: StaticStore) {
  if (!import.meta.client) {
    return;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export function trackEvent(eventName: string, payload: Record<string, unknown>) {
  const current = readStore();
  const id = Date.now();
  current.events.push({
    id,
    eventName,
    payload,
    createdAt: new Date().toISOString()
  });
  writeStore(current);
  return { ok: true, id };
}

export function saveLead(payload: LeadPayload) {
  const current = readStore();
  const id = Date.now();
  current.leads.push({
    id,
    nickname: payload.nickname,
    contact: payload.contact,
    personality: payload.personality,
    cardName: payload.cardName,
    source: payload.source,
    createdAt: new Date().toISOString()
  });
  writeStore(current);
  return { ok: true, id };
}
