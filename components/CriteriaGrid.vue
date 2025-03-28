<template>
  <div>
    <h2 class="h4 mb-3">Criteria</h2>
    <div class="grid-container">
      <KGrid
        :data="localCriteria"
        :style="{ height: '300px' }"
      >
        <KGridColumn field="name" title="Name">
          <template v-slot:cell="{ dataItem }">
            <input
              type="text"
              class="k-input k-input-md k-rounded-md k-input-solid"
              v-model="dataItem.name"
              @input="updateCriteria"
              placeholder="Enter criterion name"
            />
          </template>
        </KGridColumn>
        <KGridColumn field="weight" title="Weight (1-10)">
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
        <KGridColumn width="100">
          <template v-slot:cell="{ dataItem }">
            <button
              type="button"
              class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-error"
              @click="removeCriteria(dataItem)"
            >
              Delete
            </button>
          </template>
        </KGridColumn>
      </KGrid>
      <div class="grid-actions mt-3">
        <button 
          type="button" 
          class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
          @click="addCriteria"
        >
          Add New Criterion
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  criteria: {
    type: Array,
    required: true
  },
  initialCriteria: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:criteria'])

const localCriteria = ref([])

// Initialize criteria with initial data
onMounted(() => {
  if (props.criteria.length === 0 && props.initialCriteria.length > 0) {
    localCriteria.value = [...props.initialCriteria]
    emit('update:criteria', localCriteria.value)
  } else {
    localCriteria.value = [...props.criteria]
  }
})

// Watch for external changes
watch(() => props.criteria, (newValue) => {
  localCriteria.value = [...newValue]
}, { deep: true })

const addCriteria = () => {
  const newId = Math.max(0, ...localCriteria.value.map(c => c.id)) + 1
  localCriteria.value.push({
    id: newId,
    name: '',
    weight: 5
  })
  updateCriteria()
}

const removeCriteria = (item) => {
  const index = localCriteria.value.findIndex(c => c.id === item.id)
  if (index !== -1) {
    localCriteria.value.splice(index, 1)
    updateCriteria()
  }
}

const updateCriteria = () => {
  emit('update:criteria', localCriteria.value)
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