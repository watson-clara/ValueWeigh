<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8 text-center">
        <h1 class="display-4 mb-4">Welcome to ValueWeigh</h1>
        <p class="lead mb-4">Make better decisions by comparing options based on your criteria.</p>
        <a href="/compare" class="btn btn-primary btn-lg" @click.prevent="navigateToCompare">
          Start Comparison
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToCompare = () => {
  router.push('/compare')
}
</script> 