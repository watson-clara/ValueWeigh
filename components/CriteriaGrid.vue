<template>
  <div class="criteria-grid">
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0">Decision Criteria</h5>
        <button class="btn btn-primary btn-sm" @click="addCriterion">
          Add Criterion
        </button>
      </div>
      <div class="card-body">
        <kendo-grid
          :data="criteria"
          :resizable="true"
          :sortable="true"
          :pageable="false"
          :scrollable="true"
          :height="400"
        >
          <kendo-grid-column
            field="name"
            title="Criterion"
            :width="300"
          >
            <template v-slot:default="{ dataItem }">
              <input
                type="text"
                class="form-control"
                v-model="dataItem.name"
                @input="updateCriteria"
              />
            </template>
          </kendo-grid-column>

          <kendo-grid-column
            field="weight"
            title="Weight"
            :width="150"
          >
            <template v-slot:default="{ dataItem }">
              <kendo-numerictextbox
                v-model="dataItem.weight"
                :min="1"
                :max="10"
                :step="1"
                @change="updateCriteria"
              />
            </template>
          </kendo-grid-column>

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
import { ref, onMounted } from 'vue'
import { Grid as KendoGrid } from '@progress/kendo-vue-grid'
import { GridColumn as KendoGridColumn } from '@progress/kendo-vue-grid'
import { NumericTextBox as KendoNumericTextBox } from '@progress/kendo-vue-inputs'

const criteria = ref([])

const addCriterion = () => {
  criteria.value.push({
    id: Date.now(), // Unique identifier for each row
    name: '',
    weight: 5 // Default weight
  })
  updateCriteria()
}

const removeCriterion = (dataItem) => {
  const index = criteria.value.findIndex(item => item.id === dataItem.id)
  if (index !== -1) {
    criteria.value.splice(index, 1)
    updateCriteria()
  }
}

const updateCriteria = () => {
  // Emit the updated criteria array to the parent
  emit('update:criteria', criteria.value)
}

// Define props and emits
const props = defineProps({
  initialCriteria: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:criteria'])

// Initialize criteria from props
onMounted(() => {
  if (props.initialCriteria.length > 0) {
    criteria.value = props.initialCriteria.map(item => ({
      id: item.id || Date.now(),
      name: item.name || '',
      weight: item.weight || 5
    }))
    updateCriteria()
  } else {
    // Add one empty criterion by default
    addCriterion()
  }
})

// Expose the criteria array for parent components
defineExpose({
  criteria
})
</script>

<style scoped>
.criteria-grid {
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