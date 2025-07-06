<script setup lang="ts">
import { Button } from "@/components/ui/button";
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
});

const copyToClipboard = () => {
  navigator.clipboard.writeText(props.label);
};
</script>

<template>
  <Button
    @click="copyToClipboard"
    class="cursor-pointer bg-transparent shadow-none hover:bg-white/80 hover:shadow-sm"
  >
    {{ props.label }}
  </Button>
</template>
