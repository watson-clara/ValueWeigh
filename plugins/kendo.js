import '@progress/kendo-theme-default/dist/all.css'
import { Grid } from '@progress/kendo-vue-grid'
import { NumericTextBox } from '@progress/kendo-vue-inputs'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('KGrid', Grid)
  nuxtApp.vueApp.component('KNumericTextBox', NumericTextBox)
}) 