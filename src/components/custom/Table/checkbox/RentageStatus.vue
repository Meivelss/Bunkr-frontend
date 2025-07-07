<script setup lang="ts">
import { computed } from "vue";
import type { PropType } from "vue";

const props = defineProps({
  variant: {
    type: String as PropType<"rented" | "available">, // Correct type definition for string literals
    required: true,
  },
});

const isRented = computed(() => props.variant === "rented");
</script>

<template>
  <div
    :class="[
      'flex h-full w-full items-center justify-center rounded-full border px-2 py-1 text-xs font-bold uppercase',
      isRented
        ? 'border-yellow-500 bg-yellow-300/50 text-yellow-800'
        : 'border-green-500 bg-green-300/50 text-green-800',
    ]"
  >
    {{ isRented ? "Wypożyczony" : "Dostępny" }}
  </div>
</template>
