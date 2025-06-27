<script setup lang="ts">
import { ref } from "vue";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-vue-next";
import { SendHorizonal } from "lucide-vue-next";
import { Mail } from "lucide-vue-next";
import isValidEmail from "@/utils/isValidEmail";

const userDetails = ref({
  email: "",
});

const submitted = ref(false);

/* called on form submit */
async function handleSubmit() {
  console.log("email:", userDetails.value.email);

  userDetails.value.email = userDetails.value.email.trim();

  /* TODO: display feedback to screen */
  console.log("looks correct:", isValidEmail(userDetails.value.email));

  submitted.value = true;
}
</script>

<template>
  <div
    v-if="submitted"
    class="flex flex-col items-center justify-center gap-4 text-white"
  >
    <Mail color="white" :stroke-width="1" :size="102" />
    <div class="flex flex-col gap-2 text-center">
      <p>sprawdź majla, wysłaliśmy link pod adres:</p>
      <p class="text-2xl font-bold">{{ userDetails.email }}</p>
      <p>
        jeśli wpisany przez ciebie adres jest poprawny, dostaniesz tam link do
        resetu hasła.
      </p>
    </div>
    <a href="/login" class="flex items-center gap-1 text-white hover:underline">
      <ChevronLeft color="white" />
      <span>Powrót do logowania</span>
    </a>
  </div>
  <div v-else class="flex w-full flex-col space-y-4 select-none">
    <div class="flex w-full">
      <h1 class="text-4xl font-bold text-white">i forgor</h1>
    </div>
    <form @submit.prevent="handleSubmit" class="w-full space-y-4">
      <p class="text-sm text-white">
        W poniższe pole wpisz adres e-mail przypisany do twojego konta i kliknij
        w zawarty w nim link, aby zresetować hasło.
        <br />Następnie postępuj zgodnie z informacjami w linku.
      </p>
      <Input
        v-model="userDetails.email"
        autofocus
        required
        placeholder="Adres e-mail"
        class="w-full border-1 border-gray-500/50 bg-white/15 text-white shadow-md backdrop-blur-xs placeholder:text-gray-400"
      />
      <Button
        id="submit"
        class="w-full bg-red-800/50 text-white shadow-md backdrop-blur-sm hover:bg-white/80 hover:text-red-800"
        >Reset hasła</Button
      >
      <a
        href="/login"
        class="flex items-center gap-1 text-white hover:underline"
      >
        <ChevronLeft color="white" />
        <span>Powrót do logowania</span>
      </a>
    </form>
  </div>
</template>
