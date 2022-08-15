<template>
  <main class="w-full bg-slate-800 fixed md:px-12 z-50">
    <nav class="flex items-center justify-between p-4">
      <router-link
        v-if="auth.isLoggined" 
        to="/"
        class="inline-flex items-center justify-center px-4 py-3 text-white bg-light-gray rounded-lg"
      >
        <code class="text-white">
          👋
          <div
            xyz="fade up small"
            class="inline-block xyz-in"
          >
            {{ auth.user?.username }}
          </div>
        </code>
      </router-link>
      <div v-else></div>
      <ul v-if="auth.isLoggined" class="flex items-center text-sm text-white font-medium">
        <li class="lg:block">
          <router-link class="px-3 py-2 rounded-lg cursor-pointer" to="/">
            Home
          </router-link>
        </li>
        <li class="lg:block">
          <div class="px-3 py-2 rounded-lg cursor-pointer" @click="auth.logout(auth.user)">
            Logout
          </div>
        </li>
      </ul>
      <ul v-else class="flex items-center text-sm text-white font-medium">
        <li class="lg:block">
          <router-link class="px-3 py-2 rounded-lg cursor-pointer" to="/">
            Home
          </router-link>
        </li>
        <li class="lg:block">
          <router-link class="px-3 py-2 rounded-lg" to="/registration">
            Registration
          </router-link>
        </li>
        <li class="lg:block">
          <router-link class="px-3 py-2 rounded-lg" to="/login">
            Login
          </router-link>
        </li>
      </ul>
    </nav>
  </main>
</template>

<script lang="ts" setup>
import { useAuth } from "../store/auth";
import { useStore } from "../store/store";
const store = useStore();
const auth = useAuth();



</script>
