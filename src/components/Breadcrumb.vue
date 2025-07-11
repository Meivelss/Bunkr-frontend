<script lang="ts" setup>
import { Slash } from "lucide-vue-next";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
</script>

<template>
  <Breadcrumb>
    <BreadcrumbList class="font-body text-xl">
      <!-- <BreadcrumbItem>
        <BreadcrumbLink href="/"> Home </BreadcrumbLink>
      </BreadcrumbItem> -->
      <BreadcrumbItem>
        <BreadcrumbPage>Fredi</BreadcrumbPage>
      </BreadcrumbItem>
      <BreadcrumbSeparator> / </BreadcrumbSeparator>
      <BreadcrumbItem>
        <BreadcrumbPage>Kamionka</BreadcrumbPage>
      </BreadcrumbItem>
      <BreadcrumbSeparator> / </BreadcrumbSeparator>
      <BreadcrumbItem>
        <BreadcrumbPage>Gmina</BreadcrumbPage>
      </BreadcrumbItem>
      <BreadcrumbSeparator> / </BreadcrumbSeparator>
      <BreadcrumbItem>
        <BreadcrumbPage>Burzenin</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</template>
