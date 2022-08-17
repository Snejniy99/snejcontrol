import { createApp } from 'vue'
import './index.css'
import VueAnimXyz from '@animxyz/vue3'
import '@animxyz/core'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router/route'
import { useBasic } from './store/basic'
import axios from './includes/api-client'
createApp(App).use(router).use(createPinia()).use(VueAnimXyz).mount('#app')
const basic = useBasic()
router.beforeEach(async (to, from) => {
  if(basic.isLoggined && (to?.name === 'login' || to?.name === 'registration')) return {name: 'home'}
})
