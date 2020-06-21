import axios from 'axios'

import Vue from 'vue'

import router from './router'


const http = axios.create({
  baseURL: 'http://localhost:3001/admin/api'
})

http.interceptors.response.use(res => {
  return res
}, err => {
  if (err.response.data.message) {
    Vue.prototype.$message({
      type: 'error',
      message: err.response.data.message
    })
    // 这里需要跟后端统一, 如果是401 表示用户未登录, 统一跳转到登录页
    if (err.response.status === 401) {
      router.push('/login')
    }
  }
  return Promise.reject(err)
})

http.interceptors.request.use(config => {
  if (localStorage.token) {
    config.headers.Authorization = 'Bearer ' + localStorage.token
  }
  return config
})

export default http
