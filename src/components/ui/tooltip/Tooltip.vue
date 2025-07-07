<script setup lang="ts">
import {
  TooltipRoot,
  type TooltipRootEmits,
  type TooltipRootProps,
  useForwardPropsEmits,
} from "reka-ui";

interface MyTooltipWrapperProps extends TooltipRootProps {}

const props = withDefaults(defineProps<MyTooltipWrapperProps>(), {
  disableHoverableContent: true,
  delayDuration: 1000,
});
const emits = defineEmits<TooltipRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <TooltipRoot data-slot="tooltip" v-bind="forwarded">
    <slot />
  </TooltipRoot>
</template>
