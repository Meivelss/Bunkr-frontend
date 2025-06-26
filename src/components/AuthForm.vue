<template>
  <form @submit.prevent="handleSubmit" class="w-full space-y-2">
    <Input
      v-model="email"
      required
      type="email"
      placeholder="you@example.com"
      class="w-full border-0 bg-white/15 text-white shadow-md backdrop-blur-xs placeholder:text-gray-400"
    />
    <Input
      v-model="password"
      required
      type="password"
      placeholder="password"
      class="w-full border-0 bg-white/15 text-white shadow-md backdrop-blur-xs placeholder:text-gray-400"
    />
    <div
      class="flex h-9 w-full items-center justify-between gap-x-2 text-sm text-gray-300"
    >
      <div class="flex items-center gap-x-2">
        <Checkbox id="remember" v-model="rememberMe" />
        <label for="remember">Remember me</label>
      </div>
      <a href="/" class="hover:underline">Forgot password?</a>
    </div>
    <Button
      class="w-full bg-white/25 text-white shadow-md backdrop-blur-sm hover:bg-white/80 hover:text-black"
      >Submit</Button
    >
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Input } from "@/components/ui/input"; // Assuming these are Vue-compatible UI components
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const isLoading = ref(false);
const errorMessage = ref("");

async function handleSubmit() {
  console.log("attempting login with:");
  console.log("email:", email.value);
  console.log("password:", password.value);
  console.log("remember Me:", rememberMe.value);

  /* clear password after submit */
  password.value = "";
}
</script>
