import 'bootstrap/dist/css/bootstrap.min.css'

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    const bootstrap = require('bootstrap')
    // Initialize all Bootstrap components
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

    // Initialize dropdowns
    const dropdownElementList = document.querySelectorAll('[data-bs-toggle="dropdown"]')
    const dropdownList = [...dropdownElementList].map(dropdownToggleEl => new bootstrap.Dropdown(dropdownToggleEl))

    // Initialize modals
    const modalElementList = document.querySelectorAll('[data-bs-toggle="modal"]')
    const modalList = [...modalElementList].map(modalToggleEl => new bootstrap.Modal(modalToggleEl))
  }
}) 