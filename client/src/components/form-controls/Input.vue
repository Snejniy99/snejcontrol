<template>
  <input 
  class="outline-none text-white bg-slate-600 p-2 rounded-md hover:bg-slate-500 transition focus:bg-slate-500 focus:shadow-xl"
  :type="props.type" v-model="payload" @keypress="onChange">
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: () => 'type'
  },
  modelValue:{
    type: String,
    default: () => ''
  }
})
const emit = defineEmits(['update:modelValue'])
const payload = ref('')

function onChange () {
  emit('update:modelValue', payload.value)
}

onMounted(() => {
  payload.value = props.modelValue
})

</script>