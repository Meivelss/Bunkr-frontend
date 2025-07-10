<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { useVModel } from "@vueuse/core";
import { X } from "lucide-vue-next";
import { cn } from "@/lib/utils";

const props = defineProps<{
  defaultValue?: string | number;
  placeholder?: string;
  modelValue?: string | number;
  class?: HTMLAttributes["class"];
}>();

const emits = defineEmits<{
  (e: "update:modelValue", payload: string | number): void;
}>();

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
});
</script>

<template>
  <div class="relative w-full items-center">
    <input
      v-model="modelValue"
      data-slot="input"
      :placeholder="props.placeholder"
      :class="
        cn(
          'file:text-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex h-9 w-full min-w-0 rounded-md bg-transparent px-3 py-1 text-base transition-all duration-300 outline-none file:inline-flex file:h-7 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'placeholder:uppercase',
          'focus:bg-primary-hover focus:shadow-md focus:placeholder:text-transparent',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          props.class,
        )
      "
    />
  </div>
</template>
