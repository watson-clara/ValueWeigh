import '@progress/kendo-theme-default/dist/all.css'
import { Grid } from '@progress/kendo-vue-grid'
import { NumericTextBox } from '@progress/kendo-vue-inputs'
import { Button } from '@progress/kendo-vue-buttons'
import { Input } from '@progress/kendo-vue-inputs'

export default defineNuxtPlugin((nuxtApp) => {
  // Add Kendo licensing script
  const script = document.createElement('script')
  script.src = 'https://unpkg.com/@progress/kendo-licensing/dist/index.js'
  script.onload = () => {
    window.KendoLicensing.setScriptKey("141j044b041h541j4i1d542e581i592d102f08300b2k0926032d012a135319520e3k0e1d002e452g45550c2a03243g5j195h434f0627051j3a5g1821062c3j5209273j2d3j4g424j4a5j3h5913224e0d434j1j5g08532c4i1k49283b5h1k4j104a0f320a573a5h3g1a2a5a32043k2k3b2i472i470j44181b02245c43283c01500b3d2537094c205g22421a244c0931295h0k375a0g3k15224h09472d410i352j480b5f1a3c0c4c0a3h0728390i3203361c3d1b3c0h375a14340g464f3e1j3i16580j1c5a1a422i3k2g50450f310i43552e522j4j274f265g0a3423613b1k552h3j185b2k0e540053044i1g531a422h54452g5k0h4k27502h3c1k162537094f1h10471a3b5g2c4e251a3i2h5518402g53113d0k4a0k3f0d35592h3i2f3i082g5e35185e0g1e562e5k074a294e11441a3b5g2d5b36234c1i5d350848195c2g541f0g3a5i23320f4h2240163901592h42244a072b4f115c380h4701330b2j5b14404c24350252275c2h3h173c19244f2a5414430g422k57092f0c325a1d0g480b4a1k5718432j5a2a5k054b08322f4c143k51352c4e123h033e16325a350f6021361031144f2c5j25542j3f223c1b570k4c1i6114410c3a2j57312c4j0d2e0d3d115a2c5i14224c1d1543293j0j46105k0e3i034d28311a1j3g234e0j1b392g542e472g391i370860214f243a610f305f2c49115g11255c043f125j053i1255165600520e390a41052j0c4h285e1e52092k541i370j4d1640074d1g3b1k5k093b19501a5f2j3f235g284302531e43003906350e4b591h5912412h3f1823385b2k08612539044j3b2i4h48034c0g4e2c414g264c1i5516530b284b0e441d3f0d300b2k3i2e3a1i3d095h0a2f5e2313544111562j4h0c30520f5k111e5g101f0j37175e351d111f10320i512j5h083a16395g0057074329412e4c02571c5g285d1i534813432f5c144c2d3i4k224c1h123e1h3a5h2d3518234j0c5i03460f460e381h35591f3e2e3h1e5903243e1a4k4a072904531b400439165b13460g4d2h59294h03582848540761240c3i0c")
  }
  document.head.appendChild(script)

  // Register Kendo UI Grid components
  nuxtApp.vueApp.component('KGrid', Grid)
  nuxtApp.vueApp.component('KGridColumn', Grid.Column)
  
  // Register Kendo UI Input components
  nuxtApp.vueApp.component('KNumericTextBox', NumericTextBox)
  nuxtApp.vueApp.component('KInput', Input)
  
  // Register Kendo UI Button components
  nuxtApp.vueApp.component('KButton', Button)
}) 