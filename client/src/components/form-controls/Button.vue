<template>
  <button class="rounded-md bg-slate-600 px-4 py-2 ease-in-out duration-100 hover:bg-slate-500 hover:shadow-slate-900 hover:shadow-md active:shadow-slate-900 active:shadow-sm" :class="classes" @click="emit('click')">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
interface Props {
  classes?: string
}

const {
  classes: string = ''
} = defineProps<Props>()

const emit = defineEmits(['click'])
</script>