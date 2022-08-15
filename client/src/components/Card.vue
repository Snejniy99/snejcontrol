<template>
  <div class="bg-slate-700 rounded-md p-2 text-white shadow-xl" :class="classes">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
interface Props {
  classes?: string
}

const {
  classes: string = ''
} = defineProps<Props>()
</script>
