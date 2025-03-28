import 'bootstrap/dist/css/bootstrap.min.css'
import { onMounted } from 'vue'

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    // Import Bootstrap bundle
    import('bootstrap/dist/js/bootstrap.bundle.min.js').then((bootstrap) => {
      // Make Bootstrap available globally
      window.bootstrap = bootstrap

      // Initialize Bootstrap components after DOM is ready
      onMounted(() => {
        // Initialize all dropdowns
        const dropdownTriggerList = document.querySelectorAll('[data-bs-toggle="dropdown"]')
        const dropdownList = [...dropdownTriggerList].map(dropdownTriggerEl => 
          new bootstrap.Dropdown(dropdownTriggerEl)
        )

        // Initialize all modals
        const modalTriggerList = document.querySelectorAll('[data-bs-toggle="modal"]')
        const modalList = [...modalTriggerList].map(modalTriggerEl => 
          new bootstrap.Modal(modalTriggerEl)
        )
      })
    })
  }
}) 