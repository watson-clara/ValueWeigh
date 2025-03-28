<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1>Compare Options</h1>
      <div class="d-flex gap-3">
        <!-- Load Scenario Dropdown -->
        <div class="dropdown">
          <button 
            class="btn btn-outline-primary dropdown-toggle" 
            type="button" 
            id="loadScenarioDropdown" 
            data-bs-toggle="dropdown" 
            aria-expanded="false"
          >
            Load Scenario
          </button>
          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="loadScenarioDropdown">
            <li v-if="scenarios.length === 0">
              <span class="dropdown-item text-muted">No saved scenarios</span>
            </li>
            <li v-for="scenario in scenarios" :key="scenario.id">
              <a 
                class="dropdown-item" 
                href="#" 
                @click.prevent="loadScenario(scenario)"
              >
                {{ scenario.name }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Save Scenario Button -->
        <button 
          class="btn btn-outline-success" 
          data-bs-toggle="modal"
          data-bs-target="#saveScenarioModal"
          :disabled="!canSave"
        >
          Save Scenario
        </button>
      </div>
    </div>
    
    <div class="row">
      <div class="col-md-12">
        <CriteriaGrid
          v-model:criteria="criteria"
          :initial-criteria="initialCriteria"
        />
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-md-12">
        <OptionsGrid
          v-model:options="options"
          :criteria="criteria"
          :initial-options="initialOptions"
        />
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-md-12 text-end">
        <button 
          class="btn btn-primary btn-lg" 
          @click="navigateToResults"
          :disabled="!canProceed"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Save Scenario Modal -->
    <div 
      class="modal fade" 
      id="saveScenarioModal"
      tabindex="-1" 
      aria-labelledby="saveScenarioModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="saveScenarioModalLabel">Save Scenario</h5>
            <button 
              type="button" 
              class="btn-close" 
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="scenarioName" class="form-label">Scenario Name</label>
              <input 
                type="text" 
                class="form-control" 
                id="scenarioName" 
                v-model="scenarioName"
                placeholder="Enter a name for this scenario"
              >
            </div>
          </div>
          <div class="modal-footer">
            <button 
              type="button" 
              class="btn btn-secondary" 
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button 
              type="button" 
              class="btn btn-primary" 
              @click="saveScenario"
              :disabled="!scenarioName.trim()"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useNuxtApp } from '#app'

const router = useRouter()
const { $axios } = useNuxtApp()

const criteria = ref([])
const options = ref([])
const scenarios = ref([])
const scenarioName = ref('')
let saveModal = null

// Initial criteria for demonstration
const initialCriteria = [
  { id: 1, name: 'Cost', weight: 8 },
  { id: 2, name: 'Quality', weight: 7 },
  { id: 3, name: 'Features', weight: 6 }
]

// Initial options for demonstration
const initialOptions = [
  {
    id: 1,
    name: 'Option A',
    scores: {
      1: 8,
      2: 7,
      3: 6
    }
  },
  {
    id: 2,
    name: 'Option B',
    scores: {
      1: 6,
      2: 8,
      3: 7
    }
  }
]

// Check if we can proceed (at least 2 criteria and 2 options with names)
const canProceed = computed(() => {
  return criteria.value.length >= 2 && 
         criteria.value.every(c => c.name.trim() !== '') &&
         options.value.length >= 2 &&
         options.value.every(o => o.name.trim() !== '')
})

// Check if we can save (same conditions as canProceed)
const canSave = computed(() => canProceed.value)

const navigateToResults = () => {
  // Encode the data for URL parameters
  const encodedCriteria = encodeURIComponent(JSON.stringify(criteria.value))
  const encodedOptions = encodeURIComponent(JSON.stringify(options.value))

  // Navigate to results with query parameters
  router.push({
    path: '/results',
    query: {
      criteria: encodedCriteria,
      options: encodedOptions
    }
  })
}

// Load scenarios from the backend
const fetchScenarios = async () => {
  try {
    const response = await $axios.get('/scenarios')
    scenarios.value = response.data
  } catch (error) {
    console.error('Error fetching scenarios:', error)
  }
}

// Load a specific scenario
const loadScenario = (scenario) => {
  criteria.value = scenario.criteria
  options.value = scenario.options
}

// Save the current scenario
const saveScenario = async () => {
  try {
    const response = await $axios.post('/scenarios', {
      name: scenarioName.value,
      criteria: criteria.value,
      options: options.value
    })

    // Add the new scenario to the list
    scenarios.value.push(response.data)

    // Reset modal state and close it
    scenarioName.value = ''
    if (saveModal) {
      saveModal.hide()
    }
  } catch (error) {
    console.error('Error saving scenario:', error)
  }
}

// Initialize Bootstrap components when mounted
onMounted(() => {
  fetchScenarios()
  
  // Initialize the save modal
  const modalElement = document.getElementById('saveScenarioModal')
  if (modalElement) {
    saveModal = new bootstrap.Modal(modalElement)
  }
})
</script>

<style scoped>
.btn:disabled {
  cursor: not-allowed;
  opacity: 0.65;
}

.modal {
  background-color: rgba(0, 0, 0, 0.5);
}

.modal.show {
  display: block;
}

.dropdown-menu {
  max-height: 300px;
  overflow-y: auto;
}
</style> 