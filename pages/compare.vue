<template>
  <div class="container mt-5">
    <h1 class="mb-4">Compare Options</h1>
    
    <div class="row">
      <div class="col-md-6">
        <div class="card mb-4">
          <div class="card-header">
            <h5 class="card-title mb-0">Criteria</h5>
          </div>
          <div class="card-body">
            <div class="mb-3">
              <label for="criteria" class="form-label">Add Criteria</label>
              <input type="text" class="form-control" id="criteria" v-model="newCriterion" @keyup.enter="addCriterion">
            </div>
            <ul class="list-group">
              <li v-for="(criterion, index) in criteria" :key="index" class="list-group-item d-flex justify-content-between align-items-center">
                {{ criterion }}
                <button class="btn btn-sm btn-danger" @click="removeCriterion(index)">Remove</button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="card mb-4">
          <div class="card-header">
            <h5 class="card-title mb-0">Options</h5>
          </div>
          <div class="card-body">
            <div class="mb-3">
              <label for="options" class="form-label">Add Option</label>
              <input type="text" class="form-control" id="options" v-model="newOption" @keyup.enter="addOption">
            </div>
            <ul class="list-group">
              <li v-for="(option, index) in options" :key="index" class="list-group-item d-flex justify-content-between align-items-center">
                {{ option }}
                <button class="btn btn-sm btn-danger" @click="removeOption(index)">Remove</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center mt-4">
      <button class="btn btn-primary btn-lg" @click="startComparison" :disabled="!canCompare">
        Start Comparison
      </button>
    </div>
  </div>
</template>

<script setup>
const criteria = ref([])
const options = ref([])
const newCriterion = ref('')
const newOption = ref('')

const addCriterion = () => {
  if (newCriterion.value.trim()) {
    criteria.value.push(newCriterion.value.trim())
    newCriterion.value = ''
  }
}

const removeCriterion = (index) => {
  criteria.value.splice(index, 1)
}

const addOption = () => {
  if (newOption.value.trim()) {
    options.value.push(newOption.value.trim())
    newOption.value = ''
  }
}

const removeOption = (index) => {
  options.value.splice(index, 1)
}

const canCompare = computed(() => {
  return criteria.value.length >= 2 && options.value.length >= 2
})

const startComparison = () => {
  // Store the data in state management or navigate to results
  navigateTo('/results')
}
</script> 