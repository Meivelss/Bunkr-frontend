<script setup lang="ts">
import { ref } from "vue";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-vue-next";
import { ShieldCheck } from "lucide-vue-next";
import { CircleX } from "lucide-vue-next";

const loading = ref(false);
const password = ref("");
const repeatPassword = ref("");
const error = ref("");
const success = ref(false);

/* called on form submit */
async function handleSubmit() {
  loading.value = true;
  error.value = "";

  try {
    if (password.value !== repeatPassword.value) {
      throw new Error("Hasła nie pasują do siebie");
    }

    /* TODO: make a more elaborate check here */
    if (password.value.length < 8) {
      throw new Error("Hasło jest za krótkie");
    }

    /* if all is good, we should display a happy popup saying the user can log in now */

    /* take user to login page */
    success.value = true;
  } catch (err) {
    if (err instanceof Error) {
      console.error("Authentication failed:", err.message);
      error.value = err.message;
    } else {
      const fallbackError = "Wystąpił nieoczekiwany błąd.";
      console.error("An unexpected error occurred:", err);
      error.value = fallbackError;
    }
  } finally {
    loading.value = false;
    repeatPassword.value = "";
  }
}
</script>

<template>
  <div
    v-if="success"
    class="flex flex-col items-center justify-center gap-4 text-white"
  >
    <ShieldCheck color="white" :stroke-width="1" :size="102" />
    <div class="flex flex-col gap-2 text-center">
      <p>
        Reset hasła powiódł się, możesz teraz zalogować się swoim nowym hasłem.
      </p>
    </div>
    <a href="/login" class="flex items-center gap-1 text-white hover:underline">
      <ChevronLeft color="white" />
      <span class="font-exo">Powrót do logowania</span>
    </a>
  </div>
  <div v-else class="flex w-full flex-col space-y-4 select-none">
    <div class="flex w-full">
      <h1 class="text-4xl font-bold text-white">Nowe hasło</h1>
    </div>
    <div
      v-if="error"
      class="flex w-full flex-col items-center justify-center gap-2 rounded-md border-1 border-red-900 bg-red-800/40 p-3 text-sm font-bold text-white shadow-md backdrop-blur-sm"
    >
      <CircleX :size="20" />
      <p class="text-center">{{ error }}</p>
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
    <a href="/login" class="flex items-center gap-1 text-white hover:underline">
      <ChevronLeft color="white" />
      <span class="font-exo">Powrót do logowania</span>
    </a>
  </div>
</template>
