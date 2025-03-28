<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1>Comparison Results</h1>
      <button class="btn btn-outline-primary" @click="goBack">
        <i class="bi bi-arrow-left"></i> Go Back
      </button>
    </div>
    
    <div v-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>

    <div v-else>
      <div class="row">
        <div class="col-md-12">
          <WeightedChart
            :criteria="criteria"
            :options="options"
          />
        </div>
      </div>

      <div class="row mt-4">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5 class="mb-0">Detailed Breakdown</h5>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th>Option</th>
                      <th v-for="criterion in criteria" :key="criterion.id">
                        {{ criterion.name }}
                      </th>
                      <th>Total Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="option in options" :key="option.id">
                      <td>{{ option.name }}</td>
                      <td v-for="criterion in criteria" :key="criterion.id">
                        {{ option.scores[criterion.id] }}
                      </td>
                      <td>{{ calculateTotalScore(option) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const criteria = ref([])
const options = ref([])
const error = ref(null)

// Validate and parse data from query parameters
const parseQueryData = () => {
  try {
    const criteriaData = route.query.criteria
    const optionsData = route.query.options

    if (!criteriaData || !optionsData) {
      throw new Error('Missing required data')
    }

    // Decode and parse the data
    const parsedCriteria = JSON.parse(decodeURIComponent(criteriaData))
    const parsedOptions = JSON.parse(decodeURIComponent(optionsData))

    // Validate the data structure
    if (!Array.isArray(parsedCriteria) || !Array.isArray(parsedOptions)) {
      throw new Error('Invalid data format')
    }

    // Validate criteria structure
    parsedCriteria.forEach(criterion => {
      if (!criterion.id || !criterion.name || typeof criterion.weight !== 'number') {
        throw new Error('Invalid criteria format')
      }
    })

    // Validate options structure
    parsedOptions.forEach(option => {
      if (!option.id || !option.name || !option.scores || typeof option.scores !== 'object') {
        throw new Error('Invalid options format')
      }
    })

    return { parsedCriteria, parsedOptions }
  } catch (err) {
    error.value = 'Error loading comparison data. Please try again.'
    console.error('Error parsing query data:', err)
    return null
  }
}

const calculateTotalScore = (option) => {
  return criteria.value.reduce((total, criterion) => {
    return total + (option.scores[criterion.id] * criterion.weight)
  }, 0).toFixed(1)
}

const goBack = () => {
  router.push('/compare')
}

onMounted(() => {
  const data = parseQueryData()
  if (data) {
    criteria.value = data.parsedCriteria
    options.value = data.parsedOptions
  }
})
</script>

<style scoped>
.table th {
  background-color: #f8f9fa;
  font-weight: 600;
}

.table td, .table th {
  vertical-align: middle;
}

.bi {
  margin-right: 0.5rem;
}
</style> 