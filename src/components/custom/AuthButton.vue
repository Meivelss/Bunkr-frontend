<script setup lang="ts">
import { Button } from "@/components/ui/button";
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: false,
  },
  disabled: {
    type: Boolean,
    required: false,
  },
});
</script>

<template>
  <Button
    id="submit"
    :disabled="props.disabled"
    :class="[
      'font-body bg-secondary/60 hover:text-secondary hover:bg-primary/80 border-secondary/10 w-full border-1 text-white shadow-sm shadow-black/40 backdrop-blur-sm',
      props.class,
    ]"
    >{{ props.label }}</Button
  >
</template>
