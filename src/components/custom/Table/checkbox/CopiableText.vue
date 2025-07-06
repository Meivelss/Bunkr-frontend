<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <Button
          @click="copyToClipboard"
          class="cursor-pointer bg-transparent shadow-none hover:bg-white/50 hover:shadow-sm"
        >
          {{ props.label.slice(0, 12) }}
        </Button>
      </TooltipTrigger>
      <TooltipContent class="">
        <p>{{ label }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
