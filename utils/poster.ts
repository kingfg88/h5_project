import type { PersonalityTemplate } from '~/types/quiz';

export function drawPoster(
  canvas: HTMLCanvasElement,
  template: PersonalityTemplate,
  nickname: string
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return;
  }

  const slogans = [
    `观察者｜我的薛定谔人生：${template.name}`,
    '观测3分钟，精准看透真实的我',
    `我是${template.name}，不被定义，自有轮廓`
  ];

  const randomSlogan = slogans[Math.floor(Math.random() * slogans.length)];
  const cardAdvice = template.modules[6]?.[1] ?? template.intro;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, '#e8f0ff');
  gradient.addColorStop(1, '#fdfcff');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#324f82';
  ctx.font = 'bold 52px Microsoft JhengHei';
  ctx.fillText('观察者', 80, 120);

  ctx.fillStyle = '#5f7088';
  ctx.font = '28px Microsoft JhengHei';
  ctx.fillText('薛定谔式人生观测报告', 80, 166);

  ctx.fillStyle = '#ffffff';
  roundRect(ctx, 70, 230, 760, 980, 32, true);

  ctx.fillStyle = '#4767a3';
  ctx.font = 'bold 46px Microsoft JhengHei';
  ctx.fillText(`人格类型：${template.name}`, 110, 330);

  ctx.fillStyle = '#2f3f58';
  ctx.font = '32px Microsoft JhengHei';
  wrapText(ctx, randomSlogan, 110, 410, 680, 48);

  ctx.fillStyle = '#5777b1';
  ctx.font = 'bold 30px Microsoft JhengHei';
  ctx.fillText('专属建议', 110, 560);

  ctx.fillStyle = '#31435d';
  ctx.font = '30px Microsoft JhengHei';
  wrapText(ctx, cardAdvice, 110, 620, 680, 48);

  ctx.fillStyle = '#5e7dae';
  ctx.font = '26px Microsoft JhengHei';
  ctx.fillText(`观测者：${nickname}`, 110, 1090);

  const targetUrl = window.location.origin + window.location.pathname;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(targetUrl)}`;

  const qrImage = new Image();
  qrImage.crossOrigin = 'anonymous';
  qrImage.onload = () => {
    ctx.drawImage(qrImage, 610, 1000, 190, 190);
  };
  qrImage.onerror = () => {
    ctx.fillStyle = '#eef3ff';
    roundRect(ctx, 610, 1000, 190, 190, 14, true);
    ctx.fillStyle = '#7893c2';
    ctx.font = '24px Microsoft JhengHei';
    ctx.fillText('QR加载失败', 630, 1100);
  };
  qrImage.src = qrUrl;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  fill: boolean
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const chars = text.split('');
  let line = '';

  for (let i = 0; i < chars.length; i += 1) {
    const next = line + chars[i];
    if (ctx.measureText(next).width > maxWidth && line) {
      ctx.fillText(line, x, y);
      line = chars[i];
      y += lineHeight;
    } else {
      line = next;
    }
  }

  if (line) {
    ctx.fillText(line, x, y);
  }
}
