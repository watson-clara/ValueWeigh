import axios from 'axios'

export const useAxios = () => {
  const instance = axios.create({
    baseURL: 'http://localhost:3001/api',
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return {
    instance,
    get: (url, config = {}) => instance.get(url, config),
    post: (url, data, config = {}) => instance.post(url, data, config),
    put: (url, data, config = {}) => instance.put(url, data, config),
    delete: (url, config = {}) => instance.delete(url, config)
  }
} 