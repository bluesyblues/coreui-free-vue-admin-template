import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import { iconsSet as icons } from '@/assets/icons'
import mitt from 'mitt'
import axios, { AxiosRequestConfig } from 'axios'

const app = createApp(App)
const emitter = mitt()
const axiosInstance = axios.create()
const url = 'http://3.38.129.150:8888/api/v1'

axiosInstance.interceptors.request.use(
  function (config = AxiosRequestConfig) {
    axios({
      method: 'post',
      url: url + '/token_validation',
      data: {
        access_token: sessionStorage.getItem('access_token'),
      },
    })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
        axios({
          method: 'post',
          url: url + '/refresh_token',
          data: {
            access_token: sessionStorage.getItem('access_token'),
            refresh_token: sessionStorage.getItem('refresh_token'),
          },
        })
          .then((response) => {
            if (response.data.is_admin === 0) {
              alert('not admin')
            }
            const access_token = response.data.tokens.access_token
            const refresh_token = response.data.tokens.refresh_token
            sessionStorage.setItem('access_token', access_token)
            sessionStorage.setItem('refresh_token', refresh_token)
            this.correct = true
          })
          .catch((error) => {
            console.log(error)
          })
      })
    return config
  },
  function (error) {
    console.log(error)
  },
)

app.config.globalProperties.url = url
app.config.globalProperties.axiosInstance = axiosInstance
app.config.globalProperties.emitter = emitter
app.use(store)
app.use(router)
app.use(CoreuiVue)
app.provide('icons', icons)
app.component('CIcon', CIcon)

app.mount('#app')
