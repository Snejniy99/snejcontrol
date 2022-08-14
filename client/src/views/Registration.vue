<template>
<section class="md:flex flex-col justify-center items-center">
    <span class="text-white">Welcome</span>

  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useAuth } from '../store/auth';

const auth = useAuth()
const userData = ref({
  username: '',
  password: '',
  repassword: ''
})
function signup () {

}
</script>