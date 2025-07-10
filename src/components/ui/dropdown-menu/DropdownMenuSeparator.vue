<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { reactiveOmit } from "@vueuse/core";
import {
  DropdownMenuSeparator,
  type DropdownMenuSeparatorProps,
} from "reka-ui";
import { cn } from "@/lib/utils";

const props = defineProps<
  DropdownMenuSeparatorProps & {
    class?: HTMLAttributes["class"];
  }
>();

const delegatedProps = reactiveOmit(props, "class");
</script>

<template>
  <div class="px-2">
    <DropdownMenuSeparator
      data-slot="dropdown-menu-separator"
      v-bind="delegatedProps"
      :class="cn('bg-primary-border -mx-1 my-1 h-px', props.class)"
    />
  </div>
</template>
