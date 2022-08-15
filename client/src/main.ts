import { createApp } from 'vue'
import './index.css'
import VueAnimXyz from '@animxyz/vue3'
import '@animxyz/core'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router/route'
import axios from 'axios'
import { useAuth } from './store/auth'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
// axios.defaults.headers.common["Access-Control-Allow-Origin"]= "*"
// axios.defaults.headers.common["Access-Control-Allow-Credentials"]= "true"
axios.defaults.withCredentials = true
createApp(App).use(router).use(createPinia()).use(VueAnimXyz).mount('#app')
const auth = useAuth()
router.beforeEach(async (to, from) => {
  if(auth.isLoggined && (to?.name === 'login' || to?.name === 'registration')) return {name: 'home'}

})
