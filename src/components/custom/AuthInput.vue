<script setup lang="ts">
import { Input } from "@/components/ui/input";
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  required: {
    type: Boolean,
    required: false,
  },
  placeholder: {
    type: String,
    required: false,
  },
  class: {
    type: String,
    required: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>

<template>
  <div class="relative w-full max-w-sm items-center">
    <Input
      :value="props.modelValue"
      @input="handleInput"
      :required="required"
      type="text"
      :placeholder="props.placeholder"
      :class="
        'w-full border-1 border-gray-500/50 bg-white/15 pl-10 text-white shadow-md backdrop-blur-xs placeholder:text-gray-400' +
        props.class
      "
    />
    <span
      class="absolute inset-y-0 start-0 flex items-center justify-center px-2"
    >
      <slot />
    </span>
  </div>
</template>
