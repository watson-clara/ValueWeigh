<template>
  <div class="weighted-chart">
    <div class="card">
      <div class="card-header">
        <h5 class="mb-0">Weighted Comparison Results</h5>
      </div>
      <div class="card-body">
        <kendo-chart
          :data="chartData"
          :title="{ text: 'Weighted Scores by Option' }"
          :legend="{ visible: false }"
          :chartArea="{ background: 'transparent' }"
          :series="[{
            type: 'bar',
            field: 'score',
            categoryField: 'name',
            color: '#0d6efd',
            labels: {
              visible: true,
              background: 'none',
              format: '{0}'
            }
          }]"
          :valueAxis="{
            title: { text: 'Weighted Score' },
            min: 0,
            max: maxScore
          }"
          :categoryAxis="{
            title: { text: 'Options' },
            labels: { rotation: -45 }
          }"
          :tooltip="{
            visible: true,
            template: tooltipTemplate
          }"
        >
          <kendo-chart-series-item
            :type="'bar'"
            :field="'score'"
            :categoryField="'name'"
            :color="'#0d6efd'"
          />
        </kendo-chart>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Chart as KendoChart } from '@progress/kendo-vue-charts'
import { ChartSeriesItem as KendoChartSeriesItem } from '@progress/kendo-vue-charts'

const props = defineProps({
  criteria: {
    type: Array,
    required: true
  },
  options: {
    type: Array,
    required: true
  }
})

// Calculate weighted scores for each option
const chartData = computed(() => {
  return props.options.map(option => {
    const weightedScore = props.criteria.reduce((total, criterion) => {
      return total + (option.scores[criterion.id] * criterion.weight)
    }, 0)

    return {
      name: option.name,
      score: weightedScore,
      details: props.criteria.map(criterion => ({
        criterion: criterion.name,
        score: option.scores[criterion.id],
        weight: criterion.weight,
        weighted: option.scores[criterion.id] * criterion.weight
      }))
    }
  })
})

// Calculate maximum possible score for y-axis
const maxScore = computed(() => {
  const maxWeight = Math.max(...props.criteria.map(c => c.weight))
  return maxWeight * 10 // Maximum score (10) * maximum weight
})

// Custom tooltip template
const tooltipTemplate = (context) => {
  const dataItem = context.dataItem
  let tooltip = `<div class="k-tooltip-content">
    <h3>${dataItem.name}</h3>
    <p><strong>Total Score:</strong> ${dataItem.score.toFixed(1)}</p>
    <table class="table table-sm">
      <thead>
        <tr>
          <th>Criterion</th>
          <th>Score</th>
          <th>Weight</th>
          <th>Weighted</th>
        </tr>
      </thead>
      <tbody>`

  dataItem.details.forEach(detail => {
    tooltip += `
      <tr>
        <td>${detail.criterion}</td>
        <td>${detail.score}</td>
        <td>${detail.weight}</td>
        <td>${detail.weighted.toFixed(1)}</td>
      </tr>`
  })

  tooltip += `
      </tbody>
    </table>
  </div>`

  return tooltip
}
</script>

<style scoped>
.weighted-chart {
  margin-bottom: 1rem;
}

.k-chart {
  height: 400px;
}

:deep(.k-tooltip) {
  max-width: 400px;
}

:deep(.k-tooltip-content) {
  padding: 0.5rem;
}

:deep(.k-tooltip-content h3) {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
}

:deep(.k-tooltip-content table) {
  margin: 0;
}

:deep(.k-tooltip-content th),
:deep(.k-tooltip-content td) {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

:deep(.k-tooltip-content th) {
  background-color: #f8f9fa;
  font-weight: 600;
}
</style> 