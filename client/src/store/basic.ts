import { defineStore } from 'pinia'
import axios from '../includes/api-client'
import router from '../router/route'
import {useStorage} from '@vueuse/core'
import io, { Socket } from 'socket.io-client'
interface IUser {
  username?: string,
  password?: string,
  userUuid?: string,
}

const isAnauthorized = (storage: any, error: any) => {
  if(error?.response?.status && error?.response?.statusText === "Unauthorized") {
    storage.user.username = undefined
    storage.user.password = undefined
    storage.loggined = false
    storage.socket?.disconnect()
  }
}

export const useBasic = defineStore('basic', {
  state: () => {
    return {
      user: useStorage('user', {
        username: undefined,
        password: undefined,
        userUuid: undefined
      } as IUser),
      loggined: useStorage('loggined', undefined as undefined | boolean | string),
      socket: io(`http://${location.hostname}:3000`, {autoConnect: false}) as Socket
    }
  },
  getters:{
    isLoggined(state) {
      return !!state.loggined && state.loggined !== "false"
    },
  },
  actions: {
    async login(username: string, password: string) {
      try {
        const response = await axios.post(`http://${location.hostname}:3000/login`, { username, password })
        this.user.password = response.data.data.password
        this.user.username = response.data.data.username
        this.user.userUuid = response.data.data.userUuid
        this.loggined = true
        this.socket.auth = { username: this.user.username, userUuid: this.user.userUuid }
        this.socket?.connect()
        await this.socket.emit('enter', 'test')
        this.socket.on('test', msg=> {console.log(msg)})
        router.push({name: "home"})
      } catch (err: any) {
        console.error(err)
      }
    },
    async signup(username: string, password: string, repassword: string) {
      try {
        const response = await axios.post(`http://${location.hostname}:3000/signup`, { username, password, repassword })
        console.log(response.data.message)
        router.push({name: "login"})
      } catch (err) {
        console.error(err)
      }
    },
    async logout(user: IUser) {
      try {
        const response = await axios.post(`http://${location.hostname}:3000/logout`, user)
        this.user.username = undefined
        this.user.password = undefined
        this.user.userUuid = undefined
        this.loggined = false
        this.socket?.disconnect()
        router.push({name: "home"})
      } catch (err) {
        isAnauthorized(this, err)
        console.error(err)
      }
    }

  },
})

