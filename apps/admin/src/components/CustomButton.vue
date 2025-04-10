<template>
  <button :disabled="disabled" @click="handleClick">
    <slot></slot>
  </button>
  <div v-if="show">hello</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['click']);
const props = defineProps({
  disabled: Boolean
});

const show = ref(true);

const handleClick = () => {
  show.value = !show.value;

  if (!props.disabled) {
    emit('click');
  }
};
</script>
