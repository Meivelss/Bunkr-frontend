<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { reactiveOmit } from "@vueuse/core";
import { PaginationListItem, type PaginationListItemProps } from "reka-ui";
import { cn } from "@/lib/utils";
import { buttonVariants, type ButtonVariants } from "@/components/ui/button";

const props = withDefaults(
  defineProps<
    PaginationListItemProps & {
      size?: ButtonVariants["size"];
      class?: HTMLAttributes["class"];
      isActive?: boolean;
    }
  >(),
  {
    size: "icon",
  },
);

const delegatedProps = reactiveOmit(props, "class", "size", "isActive");
</script>

<template>
  <PaginationListItem
    data-slot="pagination-item"
    v-bind="delegatedProps"
    :class="
      cn(
        buttonVariants({
          variant: 'ghost',
          size,
        }),
        props.class,
        'hover:text-secondary text-secondary-text cursor-pointer transition-colors duration-300 ease-in-out',
        isActive ? 'bg-secondary text-white shadow-sm transition-all' : '',
      )
    "
  >
    <slot />
  </PaginationListItem>
</template>
