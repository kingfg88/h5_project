const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const sourcePath = path.join(root, 'public', 'assets', 'js', 'app.js');
const source = fs.readFileSync(sourcePath, 'utf8');

function isEscaped(text, index) {
  let slashCount = 0;
  for (let i = index - 1; i >= 0 && text[i] === '\\'; i -= 1) slashCount += 1;
  return slashCount % 2 === 1;
}

function findLiteralStart(name) {
  const token = `const ${name}`;
  const from = source.indexOf(token);
  if (from === -1) throw new Error(`Cannot find declaration for ${name}`);
  const eq = source.indexOf('=', from);
  if (eq === -1) throw new Error(`Cannot find '=' for ${name}`);

  for (let i = eq + 1; i < source.length; i += 1) {
    const ch = source[i];
    if (ch === '[' || ch === '{') return i;
    if (/\S/.test(ch)) {
      throw new Error(`Unexpected token '${ch}' for ${name}, expected '[' or '{'`);
    }
  }

  throw new Error(`Cannot find literal start for ${name}`);
}

function extractLiteralByName(name) {
  const start = findLiteralStart(name);
  const open = source[start];
  const close = open === '[' ? ']' : '}';

  let depth = 0;
  let quote = null;
  let inLineComment = false;
  let inBlockComment = false;

  for (let i = start; i < source.length; i += 1) {
    const ch = source[i];
    const next = source[i + 1];

    if (inLineComment) {
      if (ch === '\n') inLineComment = false;
      continue;
    }

    if (inBlockComment) {
      if (ch === '*' && next === '/') {
        inBlockComment = false;
        i += 1;
      }
      continue;
    }

    if (quote) {
      if (ch === quote && !isEscaped(source, i)) quote = null;
      continue;
    }

    if (ch === '/' && next === '/') {
      inLineComment = true;
      i += 1;
      continue;
    }

    if (ch === '/' && next === '*') {
      inBlockComment = true;
      i += 1;
      continue;
    }

    if (ch === '"' || ch === "'" || ch === '`') {
      quote = ch;
      continue;
    }

    if (ch === open) {
      depth += 1;
      continue;
    }

    if (ch === close) {
      depth -= 1;
      if (depth === 0) return source.slice(start, i + 1);
      continue;
    }
  }

  throw new Error(`Cannot extract literal for ${name}`);
}

function evaluateLiteral(literal, name) {
  try {
    return vm.runInNewContext(`(${literal})`, {});
  } catch (error) {
    throw new Error(`Failed to parse ${name}: ${error.message}`);
  }
}

function toTypeScriptConst(name, value) {
  return `export const ${name} = ${JSON.stringify(value, null, 2)} as const;`;
}

const chatQuestions = evaluateLiteral(extractLiteralByName('chatQuestions'), 'chatQuestions');
const quizQuestions = evaluateLiteral(extractLiteralByName('quizQuestions'), 'quizQuestions');
const cardData = evaluateLiteral(extractLiteralByName('cardData'), 'cardData');
const templates = evaluateLiteral(extractLiteralByName('templates'), 'templates');

const outDir = path.join(root, 'data');
fs.mkdirSync(outDir, { recursive: true });

const content = [
  '// Auto-generated from public/assets/js/app.js by scripts/extract-legacy-data.js',
  '// If legacy content changes, rerun: node scripts/extract-legacy-data.js',
  '',
  toTypeScriptConst('chatQuestions', chatQuestions),
  '',
  toTypeScriptConst('quizQuestions', quizQuestions),
  '',
  toTypeScriptConst('cardData', cardData),
  '',
  toTypeScriptConst('personalityTemplates', templates),
  ''
].join('\n');

fs.writeFileSync(path.join(outDir, 'quiz-content.ts'), content, 'utf8');
console.log('Generated data/quiz-content.ts');
