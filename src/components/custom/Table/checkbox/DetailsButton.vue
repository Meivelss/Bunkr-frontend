<script setup lang="ts">
import { EllipsisVertical } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
</script>

<template>
  <Button
    class="w-8 cursor-pointer bg-transparent shadow-none hover:bg-white/80 hover:shadow-sm"
  >
    <EllipsisVertical />
  </Button>
</template>
