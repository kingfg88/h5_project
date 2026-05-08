# 观察者 H5（纯前端静态版）

## 项目结构

- `public/index.html`：页面骨架
- `public/assets/css/styles.css`：样式
- `public/assets/js/app.js`：交互逻辑、计分、海报、背景音、本机数据存储

## 使用方式

直接用浏览器打开 `public/index.html` 即可运行。

## 已接入能力

- 真实分享 QR：海报使用可扫码网址的 QR
- 留资存储：写入浏览器 `localStorage`
- 事件统计：写入浏览器 `localStorage`

## 静态数据位置

所有留资与事件数据都存储在本机浏览器：

- Key：`observer_h5_data`
- 内容格式：`{ leads: [], events: [] }`

可在浏览器开发者工具 Console 查看：

```js
JSON.parse(localStorage.getItem("observer_h5_data"));
```
