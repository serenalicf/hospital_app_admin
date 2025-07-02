import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// Create axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // base url for api
  timeout: 5000 // request timeout
})

// Request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Token'] = getToken() // Add custom token to each request - modify as needed
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// Response interceptor
service.interceptors.response.use(
  response => {
    /**
     * Throw error if code is not 200 - modify according to your business logic
     */
    const res = response.data
    if (res.code !== 200) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Invalid token; 50012: Other client logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm(
          'You have been logged out, you can cancel to stay on this page, or log in again',
          'Confirm logout',
          {
            confirmButtonText: 'Re-Login',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // Reload page to reinstantiate vue-router object to avoid bugs
          })
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
