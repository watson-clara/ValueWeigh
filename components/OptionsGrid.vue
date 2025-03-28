<template>
  <div>
    <h2 class="h4 mb-3">Options</h2>
    <div class="grid-container">
      <div class="grid-wrapper">
        <KGrid
          :data="localOptions"
          :style="{ height: '300px' }"
        >
          <KGridColumn field="name" title="Name" :width="200">
            <template v-slot:cell="{ dataItem }">
              <KInput
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
              <KButton
                theme-color="error"
                @click="removeOption(dataItem)"
              >
                Delete
              </KButton>
            </template>
          </KGridColumn>
        </KGrid>
      </div>
      <div class="grid-actions mt-3">
        <KButton
          theme-color="primary"
          @click="handleAddOption"
        >
          Add New Option
        </KButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  options: {
    type: Array,
    required: true
  },
  criteria: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:options'])

const localOptions = ref([])

// Initialize localOptions when props change
watch(() => props.options, (newOptions) => {
  localOptions.value = [...newOptions]
}, { immediate: true })

// Watch for criteria changes to update scores structure
watch(() => props.criteria, (newCriteria) => {
  localOptions.value = localOptions.value.map(option => {
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
    return { ...option, scores }
  })
  emit('update:options', localOptions.value)
}, { deep: true })

const updateOptions = () => {
  emit('update:options', [...localOptions.value])
}

const handleAddOption = () => {
  const newId = Math.max(0, ...localOptions.value.map(o => o.id)) + 1
  const scores = {}
  props.criteria.forEach(criterion => {
    scores[criterion.id] = 5
  })
  const newOption = {
    id: newId,
    name: '',
    scores
  }
  localOptions.value = [...localOptions.value, newOption]
  emit('update:options', localOptions.value)
}

const removeOption = (option) => {
  if (localOptions.value.length <= 1) {
    return // Don't remove the last option
  }
  localOptions.value = localOptions.value.filter(o => o.id !== option.id)
  emit('update:options', localOptions.value)
}
</script>

<style scoped>
.grid-container {
  display: flex;
  flex-direction: column;
}

.grid-actions {
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  margin-top: 1rem;
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