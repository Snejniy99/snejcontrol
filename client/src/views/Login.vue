<template>
<section class="md:flex flex-col justify-center items-center">
    <div class="bg-slate-700 rounded-md p-2 md:w-96 text-white flex flex-col items-center">
      <div class="mb-5 text-xl">Login</div>
      <Input v-model="userData.username"></Input>
    </div>

  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useAuth } from '../store/auth';
import Input from '../components/form-controls/Input.vue'
const auth = useAuth()
const userData = ref({
  username: '',
  password: '',
})
function login () {
  auth.login(userData.value.username, userData.value.password)
}
</script>