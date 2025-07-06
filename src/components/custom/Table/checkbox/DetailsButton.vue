<script setup lang="ts">
import { EllipsisVertical } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
</script>

<template>
  <Button
    class="hover:bg-primary/80 w-8 cursor-pointer bg-transparent shadow-none hover:shadow-sm"
  >
    <EllipsisVertical />
  </Button>
</template>
