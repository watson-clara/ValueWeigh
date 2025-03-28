// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    'bootstrap-icons/font/bootstrap-icons.css',
    '@progress/kendo-theme-default/dist/all.css',
    '@progress/kendo-theme-bootstrap/dist/all.css'
  ],
  plugins: [
    '~/plugins/bootstrap.js',
    '~/plugins/axios.js'
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
  },
  compatibilityDate: '2025-03-28',
  build: {
    transpile: ['bootstrap', '@popperjs/core']
  },
  vite: {
    optimizeDeps: {
      include: ['bootstrap', '@popperjs/core']
    },
    ssr: {
      noExternal: ['bootstrap']
    }
  },
  experimental: {
    payloadExtraction: false
  },
  router: {
    options: {
      strict: false
    }
  }
})
