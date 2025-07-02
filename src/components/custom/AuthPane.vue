<script setup lang="ts">
const props = defineProps({
  head: {
    type: String,
    required: false,
  },
  class: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <div
    class="flex w-full flex-col space-y-6 rounded-2xl border-t-1 border-l-1 border-white/20 bg-white/6 p-8 shadow-lg shadow-black/10 outline-1 outline-black/10 backdrop-blur-xs select-none"
  >
    <div v-if="head">
      <h1 class="font-header text-4xl font-bold text-white">{{ head }}</h1>
    </div>
    <div :class="['space-y-4', props.class]">
      <slot />
    </div>
  </div>
</template>
