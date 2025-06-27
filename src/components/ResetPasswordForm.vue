<script setup lang="ts">
import { ref } from "vue";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const password = ref("");
const repeatPassword = ref("");

/* called on form submit */
async function handleSubmit() {
  if (password.value !== repeatPassword.value) {
    console.log("passwords do not match");
  }

  /* TODO: make a more elaborate check here */
  if (password.value.length < 8) {
    console.log("password is shit");
  }

  /* if all is good, we should display a happy popup saying the user can log in now */

  /* take user to login page */
  window.location.replace("/login");
}
</script>

<template>
  <div class="flex w-full flex-col space-y-4 select-none">
    <div class="flex w-full">
      <h1 class="text-4xl font-bold text-white">Nowe hasło</h1>
    </div>
    <p class="text-sm text-white">
      Ustal nowe hasło, tym razem nie zapomnij B)
    </p>
    <form @submit.prevent="handleSubmit" class="w-full space-y-2">
      <Input
        v-model="password"
        required
        type="password"
        placeholder="Hasło"
        class="w-full border-1 border-gray-500/50 bg-white/15 text-white shadow-md backdrop-blur-xs placeholder:text-gray-400"
      />
      <Input
        v-model="repeatPassword"
        required
        type="password"
        placeholder="Powtórz Hasło"
        class="w-full border-1 border-gray-500/50 bg-white/15 text-white shadow-md backdrop-blur-xs placeholder:text-gray-400"
      />
      <Button
        id="submit"
        class="w-full bg-red-800/50 text-white shadow-md backdrop-blur-sm hover:bg-white/80 hover:text-red-800"
        >Zmień hasło</Button
      >
    </form>
    <a href="/login" class="text-white hover:underline">Powrót do logowania</a>
  </div>
</template>
