export default defineNuxtConfig({
  app: {
    head: {
      title: '观察者｜薛定谔式人生观测',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'description', content: '一个可维护的 Nuxt 人格观测 H5。' }
      ]
    }
  },
  css: ['~/assets/css/main.css'],
  devtools: { enabled: false }
});
