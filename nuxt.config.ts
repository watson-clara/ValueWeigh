// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    '@progress/kendo-theme-default/dist/all.css'
  ],
  plugins: [
    '~/plugins/bootstrap.js',
    '~/plugins/kendo.js'
  ],
  app: {
    head: {
      title: 'ValueWeigh',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'A tool for comparing options based on weighted criteria' }
      ]
    }
  },
  compatibilityDate: '2025-03-28',
  build: {
    transpile: [
      '@progress/kendo-vue-grid',
      '@progress/kendo-vue-inputs',
      '@progress/kendo-vue-buttons',
      '@progress/kendo-licensing'
    ]
  },
  vite: {
    optimizeDeps: {
      include: [
        '@progress/kendo-vue-grid',
        '@progress/kendo-vue-inputs',
        '@progress/kendo-vue-buttons',
        '@progress/kendo-licensing'
      ]
    }
  },
  ssr: false,
  experimental: {
    payloadExtraction: false
  },
  router: {
    options: {
      strict: false
    }
  },
  runtimeConfig: {
    public: {
      kendoLicenseKey: process.env.KENDO_LICENSE_KEY
    }
  }
})
