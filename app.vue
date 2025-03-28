<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <NuxtLink class="navbar-brand" to="/">ValueWeigh</NuxtLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/">Home</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/compare">Compare</NuxtLink>
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
}

.nav-link:hover {
  color: #0a58ca;
}

.nav-link.router-link-active {
  color: #0a58ca;
  font-weight: 500;
}
</style>
