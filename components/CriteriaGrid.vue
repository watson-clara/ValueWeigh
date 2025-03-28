<template>
  <div>
    <h2 class="h4 mb-3">Criteria</h2>
    <div class="grid-container">
      <div class="grid-wrapper">
        <KGrid
          :data="localCriteria"
          :style="{ height: '300px' }"
        >
          <KGridColumn field="name" title="Name" :width="200">
            <template v-slot:cell="{ dataItem }">
              <KInput
                v-model="dataItem.name"
                @input="updateCriteria"
                placeholder="Enter criterion name"
              />
            </template>
          </KGridColumn>
          <KGridColumn field="weight" title="Weight (1-10)" :width="150">
            <template v-slot:cell="{ dataItem }">
              <KNumericTextBox
                v-model="dataItem.weight"
                :min="1"
                :max="10"
                :step="1"
                @change="updateCriteria"
              />
            </template>
          </KGridColumn>
          <KGridColumn title="Actions" :width="100">
            <template v-slot:cell="{ dataItem }">
              <KButton
                theme-color="error"
                @click="removeCriteria(dataItem)"
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
          @click="handleAddCriteria"
        >
          Add New Criterion
        </KButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  criteria: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:criteria'])

const localCriteria = ref([])

// Initialize localCriteria when props change
watch(() => props.criteria, (newCriteria) => {
  localCriteria.value = [...newCriteria]
}, { immediate: true })

const updateCriteria = () => {
  emit('update:criteria', [...localCriteria.value])
}

const handleAddCriteria = () => {
  const newId = Math.max(0, ...localCriteria.value.map(c => c.id)) + 1
  const newCriterion = {
    id: newId,
    name: '',
    weight: 5
  }
  localCriteria.value = [...localCriteria.value, newCriterion]
  emit('update:criteria', localCriteria.value)
}

const removeCriteria = (criterion) => {
  if (localCriteria.value.length <= 1) {
    return // Don't remove the last criterion
  }
  localCriteria.value = localCriteria.value.filter(c => c.id !== criterion.id)
  emit('update:criteria', localCriteria.value)
}
</script>

<style scoped>
.grid-container {
  display: flex;
  flex-direction: column;
}

.grid-wrapper {
  min-height: 300px;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
}

.grid-actions {
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  margin-top: 1rem;
}

.k-grid {
  border: none;
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