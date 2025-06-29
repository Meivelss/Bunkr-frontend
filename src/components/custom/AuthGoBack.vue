<script setup lang="ts">
import { ChevronLeft } from "lucide-vue-next";

const props = defineProps({
  label: {
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
  <p class="flex cursor-pointer items-center gap-1 text-white hover:underline">
    <ChevronLeft class="text-primary" />
    <span>{{ props.label }}</span>
  </p>
</template>
