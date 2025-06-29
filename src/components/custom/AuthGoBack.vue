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
    :class="['flex items-center gap-1 text-white hover:underline', props.class]"
  >
    <ChevronLeft class="text-primary" />
    <span>{{ props.label }}</span>
  </a>

  <p
    v-else
    @click="handleClick"
    :class="[
      'flex cursor-pointer items-center gap-1 text-white hover:underline',
      props.class,
    ]"
  >
    <ChevronLeft class="text-primary" />
    <span>{{ props.label }}</span>
  </p>
</template>
