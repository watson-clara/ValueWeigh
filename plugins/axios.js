import axios from 'axios'

export default defineNuxtPlugin(() => {
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001/api',
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return {
    provide: {
      axios: axiosInstance
    }
  }
}) 