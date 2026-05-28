import type { OptionKey } from '~/types/quiz';

export function scoreResult(chatAnswers: string[], quizAnswers: OptionKey[]) {
  const count: Record<OptionKey, number> = { A: 0, B: 0, C: 0, D: 0 };
  quizAnswers.forEach((key) => {
    count[key] += 1;
  });

  const [c1, c2, c3] = chatAnswers;
  const score: Record<string, number> = {
    qingxing: 0,
    wusuowei: 0,
    renjian: 0,
    wenrou: 0,
    duli: 0,
    ziyou: 0,
    tashu: 0,
    minjie: 0,
    lenggan: 0,
    taiyang: 0,
    lixing: 0,
    suiyuan: 0
  };

  if (c1 === 'alone') {
    score.qingxing += 2;
    score.duli += 2;
  }
  if (c1 === 'social') {
    score.taiyang += 2;
    score.wenrou += 2;
  }
  if (c2 === 'think') {
    score.qingxing += 2;
    score.lixing += 2;
    score.minjie += 1;
  }
  if (c2 === 'act') {
    score.renjian += 2;
    score.tashu += 2;
    score.ziyou += 1;
  }
  if (c3 === 'maybe') {
    score.qingxing += 2;
    score.wenrou += 1;
    score.minjie += 2;
  }
  if (c3 === 'trust') {
    score.wusuowei += 2;
    score.ziyou += 2;
    score.renjian += 1;
  }

  score.qingxing += count.A * 2.2 + count.C * 1.1;
  score.wusuowei += count.C * 1.5 + count.D * 2.0;
  score.renjian += count.B * 2.1 + count.C * 1.2;
  score.wenrou += count.A * 1.8 + count.B * 1.1;
  score.duli += count.A * 1.7 + count.D * 1.8;
  score.ziyou += count.B * 1.4 + count.D * 1.9;
  score.tashu += count.A * 1.6 + count.C * 1.9;
  score.minjie += count.A * 2.0 + count.C * 1.3;
  score.lenggan += count.B * 1.7 + count.D * 1.8;
  score.taiyang += count.B * 2.0 + count.C * 1.4;
  score.lixing += count.A * 1.5 + count.B * 1.6;
  score.suiyuan += count.C * 1.8 + count.D * 1.7;

  return Object.entries(score).sort((a, b) => b[1] - a[1])[0][0];
}
