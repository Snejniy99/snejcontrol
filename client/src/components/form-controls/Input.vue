<template>
  <input 
  class="outline-none ease-in-out duration-300 text-white bg-slate-600 p-2 rounded-md hover:bg-slate-500 focus:bg-slate-500 hover:shadow-slate-900 hover:shadow-md focus:shadow-slate-900 focus:shadow-sm"
  :type="type" v-model="payload"
  :placeholder="placeholder" :class="classes">
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';

interface Props {
  type?: string
  placeholder?: string
  classes?: string
  modelValue?: string
}

const {
  type = "test",
  placeholder = '',
  classes: string = '',
  modelValue=''
  } = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])
const payload = ref('')

function onChange () {
  emit('update:modelValue', payload.value)
}

watch(payload, ()=>{
  onChange()
})

onMounted(() => {
  payload.value = modelValue
})

</script>