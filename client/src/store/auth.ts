import { defineStore } from 'pinia'
import axios from 'axios'
import router from '../router/route'
import {useStorage} from '@vueuse/core'
interface IUser {
  username?: string,
  password?: string,
}
export const useAuth = defineStore('auth', {
  state: () => {
    return {
      user: useStorage('user', {username: undefined, password: undefined} as IUser),
      loggined: useStorage('loggined', undefined as undefined | boolean)
    }
  },
  getters:{
    isLoggined(state) {
      return !!state.loggined
    },
  },
  actions: {
    async login(username: string, password: string) {
      try {
        const response = await axios.post('http://localhost:3000/login', { username, password })
        this.user = { username: response.data.data.username, password: response.data.data.password }
        this.loggined = true
        router.push({name: "home"})
      } catch (err) {
        console.error(err)
      }
    },
    async signup(username: string, password: string, repassword: string) {
      try {
        const response = await axios.post('http://localhost:3000/signup', { username, password, repassword })
        console.log(response.data.message)
        router.push({name: "login"})
      } catch (err) {
        console.error(err)
      }
    },
    async logout(user: IUser) {
      try {
        const response = await axios.post('http://localhost:3000/logout', user)
        this.user = {username: undefined, password: undefined}
        this.loggined = false
        
        router.push({name: "home"})
      } catch (err) {
        console.error(err)
      }
    }

  },
})

