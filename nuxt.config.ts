// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    'bootstrap/dist/css/bootstrap.min.css'
  ],
  plugins: [
    '~/plugins/bootstrap.js'
  ],
  modules: [
    '@nuxtjs/axios'
  ],
  app: {
    head: {
      title: 'ValueWeigh',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Make better decisions by comparing options based on your criteria.' }
      ]
    }
  }
})
