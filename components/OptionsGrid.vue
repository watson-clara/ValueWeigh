<template>
  <div class="options-grid">
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0">Options</h5>
        <button class="btn btn-primary btn-sm" @click="addOption">
          Add Option
        </button>
      </div>
      <div class="card-body">
        <kendo-grid
          :data="options"
          :resizable="true"
          :sortable="true"
          :pageable="false"
          :scrollable="true"
          :height="400"
        >
          <!-- Option Name Column -->
          <kendo-grid-column
            field="name"
            title="Option Name"
            :width="200"
          >
            <template v-slot:default="{ dataItem }">
              <input
                type="text"
                class="form-control"
                v-model="dataItem.name"
                @input="updateOptions"
              />
            </template>
          </kendo-grid-column>

          <!-- Dynamic Criteria Columns -->
          <kendo-grid-column
            v-for="criterion in criteria"
            :key="criterion.id"
            :field="'scores.' + criterion.id"
            :title="criterion.name"
            :width="150"
          >
            <template v-slot:default="{ dataItem }">
              <kendo-numerictextbox
                v-model="dataItem.scores[criterion.id]"
                :min="1"
                :max="10"
                :step="1"
                @change="updateOptions"
              />
            </template>
          </kendo-grid-column>

          <!-- Delete Column -->
          <kendo-grid-column
            :width="100"
            :command="['destroy']"
            title="&nbsp;"
          />
        </kendo-grid>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { Grid as KendoGrid } from '@progress/kendo-vue-grid'
import { GridColumn as KendoGridColumn } from '@progress/kendo-vue-grid'
import { NumericTextBox as KendoNumericTextBox } from '@progress/kendo-vue-inputs'

const props = defineProps({
  criteria: {
    type: Array,
    required: true
  },
  initialOptions: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:options'])

const options = ref([])

// Initialize scores object for a new option
const createScoresObject = () => {
  return props.criteria.reduce((acc, criterion) => {
    acc[criterion.id] = 5 // Default score of 5
    return acc
  }, {})
}

const addOption = () => {
  options.value.push({
    id: Date.now(),
    name: '',
    scores: createScoresObject()
  })
  updateOptions()
}

const removeOption = (dataItem) => {
  const index = options.value.findIndex(item => item.id === dataItem.id)
  if (index !== -1) {
    options.value.splice(index, 1)
    updateOptions()
  }
}

const updateOptions = () => {
  emit('update:options', options.value)
}

// Watch for changes in criteria to update scores
watch(() => props.criteria, (newCriteria) => {
  options.value = options.value.map(option => {
    const newScores = createScoresObject()
    // Preserve existing scores for criteria that still exist
    Object.keys(option.scores).forEach(criterionId => {
      if (newScores[criterionId] !== undefined) {
        newScores[criterionId] = option.scores[criterionId]
      }
    })
    return {
      ...option,
      scores: newScores
    }
  })
  updateOptions()
}, { deep: true })

// Initialize options from props
onMounted(() => {
  if (props.initialOptions.length > 0) {
    options.value = props.initialOptions.map(option => ({
      id: option.id || Date.now(),
      name: option.name || '',
      scores: option.scores || createScoresObject()
    }))
    updateOptions()
  } else {
    // Add one empty option by default
    addOption()
  }
})

// Expose the options array for parent components
defineExpose({
  options
})
</script>

<style scoped>
.options-grid {
  margin-bottom: 1rem;
}

.k-grid {
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
}

.k-grid-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
}

.k-grid-content {
  border-bottom: 1px solid #dee2e6;
}

.k-grid-footer {
  background-color: #f8f9fa;
  border-top: 1px solid #dee2e6;
}

.k-grid-row {
  border-bottom: 1px solid #dee2e6;
}

.k-grid-row:last-child {
  border-bottom: none;
}

.k-grid-cell {
  padding: 0.5rem;
}

.k-grid-header th {
  padding: 0.5rem;
  font-weight: 600;
  color: #495057;
}
</style> 