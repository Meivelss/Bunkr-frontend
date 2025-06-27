<script setup lang="ts">
import { ref } from "vue";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-vue-next";
import isValidEmail from "@/utils/isValidEmail";

const userDetails = ref({
  email: "",
});

/* called on form submit */
async function handleSubmit() {
  console.log("email:", userDetails.value.email);

  userDetails.value.email = userDetails.value.email.trim();

  /* TODO: display feedback to screen */
  console.log("looks correct:", isValidEmail(userDetails.value.email));
}
</script>

<template>
  <div class="flex w-full flex-col space-y-4 select-none">
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
