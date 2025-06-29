<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { Lock, Eye, EyeOff } from "lucide-vue-next";
import { ref } from "vue";
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  required: {
    type: Boolean,
    required: false,
  },
  type: {
    type: String,
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

const showPassword = ref(false);

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
};

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>

<template>
  <div
    v-if="props.type == 'password'"
    class="relative w-full max-w-sm items-center"
  >
    <Input
      :value="props.modelValue"
      @input="handleInput"
      :required="required"
      :type="showPassword ? 'text' : 'password'"
      :placeholder="props.placeholder"
      class="w-full border-1 border-gray-500/50 bg-white/15 px-10 text-white shadow-md backdrop-blur-xs placeholder:text-gray-400"
    />
    <span
      class="absolute inset-y-0 start-0 flex items-center justify-center px-2"
    >
      <Lock class="size-6 stroke-1 text-gray-400" />
    </span>
    <button
      type="button"
      @click="toggleShowPassword"
      class="absolute inset-y-0 end-0 flex cursor-pointer items-center justify-center px-2"
    >
      <Eye v-if="showPassword" class="size-6 stroke-1 text-gray-400" />
      <EyeOff v-else class="size-6 stroke-1 text-gray-400" />
    </button>
  </div>
  <div v-else class="relative w-full max-w-sm items-center">
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
