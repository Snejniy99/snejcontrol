import { createApp } from 'vue'
import './index.css'
import VueAnimXyz from '@animxyz/vue3'
import '@animxyz/core'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router/route'
import axios from 'axios'

axios.defaults.withCredentials = true

createApp(App).use(router).use(createPinia()).use(VueAnimXyz).mount('#app')
