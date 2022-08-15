<template>
<section class="md:flex flex-col justify-center items-center">
    <Card classes="md:w-96 flex flex-col items-center">
      <div class="mb-5 text-xl">Login</div>
      <Input placeholder="Username" classes="mb-2" v-model="userData.username"></Input>
      <Input placeholder="Password" classes="mb-2" type="password" v-model="userData.password"></Input>
      <Button @click="login">Login</Button>
    </Card>

  </section>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { useAuth } from '../store/auth';
import Input from '../components/form-controls/Input.vue'
import Button from '../components/form-controls/Button.vue'
import Card from '../components/Card.vue'

const auth = useAuth()
const userData = reactive({
  username: '',
  password: '',
})
function login () {
  auth.login(userData.username, userData.password)
}
</script>