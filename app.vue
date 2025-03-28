<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" href="/">ValueWeigh</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="/">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/compare">Compare</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <NuxtPage />
  </div>
</template>

<style>
.navbar {
  margin-bottom: 2rem;
}

.nav-link {
  color: #0d6efd;
  text-decoration: none;
}

.nav-link:hover {
  color: #0a58ca;
}

.nav-link.active {
  color: #0a58ca;
  font-weight: 500;
}

.navbar-brand {
  text-decoration: none;
  color: inherit;
}
</style>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  // Add click event listeners to navigation links
  document.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href')
      if (href && href.startsWith('/')) {
        e.preventDefault()
        router.push(href)
      }
    })
  })
})
</script>
