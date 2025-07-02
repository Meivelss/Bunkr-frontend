<script setup lang="ts">
import { ChevronLeft } from "lucide-vue-next";

const props = defineProps({
  label: {
    type: String,
    required: false,
  },
  class: {
    type: String,
    required: false,
  },
  href: {
    type: String,
    required: false,
  },
});

const emit = defineEmits(["click"]);

const handleClick = () => {
  if (!props.href) {
    emit("click");
  }
};
</script>

<template>
  <a
    v-if="props.href"
    :href="props.href"
    :class="['group flex items-center gap-1 text-white', props.class]"
  >
    <ChevronLeft class="text-primary" />
    <span
      class="font-body before:bg-primary relative inline-block before:absolute before:-bottom-0.25 before:left-0 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:transition-transform before:duration-200 group-hover:before:scale-x-100"
    >
      {{ props.label }}
    </span>
  </a>

  <p
    v-else
    @click="handleClick"
    :class="[
      'group flex cursor-pointer items-center gap-1 text-white',
      props.class,
    ]"
  >
    <ChevronLeft class="text-primary" />
    <span
      class="before:bg-primary relative inline-block before:absolute before:-bottom-0.25 before:left-0 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:transition-transform before:duration-200 group-hover:before:scale-x-100"
      >{{ props.label }}</span
    >
  </p>
</template>
