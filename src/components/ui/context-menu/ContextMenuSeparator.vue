<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { reactiveOmit } from "@vueuse/core";
import { ContextMenuSeparator, type ContextMenuSeparatorProps } from "reka-ui";
import { cn } from "@/lib/utils";

const props = defineProps<
  ContextMenuSeparatorProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = reactiveOmit(props, "class");
</script>

<template>
  <div class="px-2">
    <ContextMenuSeparator
      data-slot="context-menu-separator"
      v-bind="delegatedProps"
      :class="cn('bg-primary-border -mx-1 my-1 h-px', props.class)"
    />
  </div>
</template>
