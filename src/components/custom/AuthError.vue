<script setup lang="ts">
import { CircleX } from "lucide-vue-next";
const props = defineProps({
  error: {
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
    class="flex w-full items-center justify-center gap-4 rounded-md border-1 border-red-900 bg-red-800/40 p-3 text-sm font-bold text-white shadow-md backdrop-blur-sm"
  >
    <CircleX :size="20" />
    <p class="text-center">{{ props.error }}</p>
  </div>
</template>
