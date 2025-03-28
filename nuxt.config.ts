// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    'bootstrap-icons/font/bootstrap-icons.css'
  ],
  plugins: [
    '~/plugins/bootstrap.js'
  ],
  app: {
    head: {
      title: 'ValueWeigh',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'ValueWeigh - Compare and analyze values' }
      ]
    }
  },
  compatibilityDate: '2025-03-28',
  build: {
    transpile: ['bootstrap']
  }
})
