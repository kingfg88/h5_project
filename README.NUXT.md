# 观察者 H5（Nuxt 重构版）

## 项目目标

将原始单文件静态 H5 重构为 Nuxt 3 项目，重点提升：

- 题目与人格文案可维护
- 评分逻辑可复用、可测试
- 页面结构可扩展（后续可拆子路由/组件）

## 技术栈

- Nuxt 3
- Vue 3（`<script setup>`）
- TypeScript

## 目录说明

- `pages/index.vue`：页面与交互主入口
- `composables/useObserverQuiz.ts`：状态与流程编排
- `utils/score.ts`：评分算法
- `utils/storage.ts`：本地留资与事件记录
- `utils/poster.ts`：海报绘制
- `data/quiz-content.ts`：题库/卡牌/人格模板（核心可维护数据）
- `types/quiz.ts`：类型定义

## 运行方式

> 注意：本机当前 Node 版本为 `v12.3.1`，无法运行 Nuxt 3。  
> 请先升级到 Node 18.12+（建议 Node 20 LTS）。

```bash
npm install
npm run dev
```

构建静态站点：

```bash
npm run generate
```

## 内容维护指南（重点）

1. 修改题目：编辑 `data/quiz-content.ts` 中 `chatQuestions` / `quizQuestions`
2. 修改卡牌：编辑 `cardData`
3. 修改人格报告文案：编辑 `personalityTemplates`
4. 修改评分规则：编辑 `utils/score.ts`

## 数据存储

沿用原方案，留资和事件写入浏览器 `localStorage`：

- key: `observer_h5_data`
- 结构：`{ leads: [], events: [] }`

## 从旧版迁移数据

已提供脚本：`scripts/extract-legacy-data.js`

用途：从 `public/assets/js/app.js` 自动抽取题库与模板，写入 `data/quiz-content.ts`。

```bash
node scripts/extract-legacy-data.js
```
