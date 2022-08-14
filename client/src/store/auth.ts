import { defineStore } from 'pinia'
import axios from 'axios'
import { useRouter } from 'vue-router'

interface IUser {
  username: string,
  password: string,
}

export const useAuth = defineStore('counter', {
  state: () => {
    return {
      user: undefined as undefined | IUser,
      token: undefined as undefined | string,
    }
  },
  getters: {
    isLoggined: (state) => !!state.token
  },
  actions: {
    isLoggined() {
      return !!this.token
    },
    async login(username: string, password: string) {
      try {
        const response = await axios.post('http://localhost:3000/login', { username, password })
        this.user = { username: response.data.data.username, password: response.data.data.password }
        const cookieHeaders = response.headers['Set-Cookie'];
        cookieHeaders.split('; ').forEach(e => {
          if (e.includes('Authorization')) this.token = e.split('=')[1]
        })
        const router = useRouter()
        router.push('/')
      } catch (err) {
        console.error(err)
      }
    },
    async signup(username: string, password: string, repassword: string) {
      try {
        const response = await axios.post('http://localhost:3000/signup', { username, password, repassword })
        console.log(response.data.message)
        const router = useRouter()
        router.push('/')
      } catch (err) {
        console.error(err)
      }
    },
    async logout() {
      try {
        const response = await axios.post('http://localhost:3000/login', {})
        this.user = undefined
        this.token = undefined
        const router = useRouter()
        router.push('/')
      } catch (err) {
        console.error(err)
      }
    }

  },
})

