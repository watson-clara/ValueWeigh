<template>
  <div>
    <h2 class="h4 mb-3">Options</h2>
    <div class="grid-container">
      <KGrid
        :data="localOptions"
        :style="{ height: '300px' }"
      >
        <KGridToolbar>
          <button 
            type="button" 
            class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
            @click="addOption"
          >
            Add New Option
          </button>
        </KGridToolbar>
        <KGridColumn field="name" title="Name" :width="200">
          <template v-slot:cell="{ dataItem }">
            <input
              type="text"
              class="k-input k-input-md k-rounded-md k-input-solid"
              v-model="dataItem.name"
              @input="updateOptions"
              placeholder="Enter option name"
            />
          </template>
        </KGridColumn>
        <KGridColumn 
          v-for="criterion in criteria" 
          :key="criterion.id" 
          :field="'scores.' + criterion.id" 
          :title="criterion.name"
          :width="150"
        >
          <template v-slot:cell="{ dataItem }">
            <KNumericTextBox
              v-model="dataItem.scores[criterion.id]"
              :min="1"
              :max="10"
              :step="1"
              @change="updateOptions"
            />
          </template>
        </KGridColumn>
        <KGridColumn title="Actions" :width="100">
          <template v-slot:cell="{ dataItem }">
            <button
              type="button"
              class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-error"
              @click="removeOption(dataItem)"
            >
              Delete
            </button>
          </template>
        </KGridColumn>
      </KGrid>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  options: {
    type: Array,
    required: true
  },
  criteria: {
    type: Array,
    required: true
  },
  initialOptions: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:options'])

// Initialize with a default empty option if no data is provided
const getDefaultOption = (criteria) => {
  const scores = {}
  criteria.forEach(criterion => {
    scores[criterion.id] = 5
  })
  return {
    id: 1,
    name: '',
    scores
  }
}

const localOptions = ref([])

// Initialize options with initial data
onMounted(() => {
  if (props.options.length === 0 && props.initialOptions.length > 0) {
    localOptions.value = [...props.initialOptions]
  } else if (props.options.length > 0) {
    localOptions.value = [...props.options]
  } else {
    // If no options provided, create a default one
    localOptions.value = [getDefaultOption(props.criteria)]
  }
  emit('update:options', localOptions.value)
})

// Watch for external changes
watch(() => props.options, (newValue) => {
  if (newValue.length > 0) {
    localOptions.value = [...newValue]
  }
}, { deep: true })

// Watch for criteria changes to update scores structure
watch(() => props.criteria, (newCriteria) => {
  localOptions.value.forEach(option => {
    const scores = { ...option.scores }
    // Add new criteria scores
    newCriteria.forEach(criterion => {
      if (!(criterion.id in scores)) {
        scores[criterion.id] = 5
      }
    })
    // Remove scores for deleted criteria
    Object.keys(scores).forEach(id => {
      if (!newCriteria.some(c => c.id === parseInt(id))) {
        delete scores[id]
      }
    })
    option.scores = scores
  })
  updateOptions()
}, { deep: true })

const addOption = () => {
  const newId = Math.max(0, ...localOptions.value.map(o => o.id)) + 1
  const scores = {}
  props.criteria.forEach(criterion => {
    scores[criterion.id] = 5
  })
  localOptions.value.push({
    id: newId,
    name: '',
    scores
  })
  updateOptions()
}

const removeOption = (item) => {
  if (localOptions.value.length <= 1) {
    return // Don't remove the last option
  }
  const index = localOptions.value.findIndex(o => o.id === item.id)
  if (index !== -1) {
    localOptions.value.splice(index, 1)
    updateOptions()
  }
}

const updateOptions = () => {
  emit('update:options', localOptions.value)
}
</script>

<style scoped>
.grid-container {
  display: flex;
  flex-direction: column;
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

.k-input {
  width: 100%;
}
</style> 