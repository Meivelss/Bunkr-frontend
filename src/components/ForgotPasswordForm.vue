<script setup lang="ts">
import { ref } from "vue";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-vue-next";
import { Mail } from "lucide-vue-next";
import isValidEmail from "@/utils/isValidEmail";
import AuthPane from "./custom/AuthPane.vue";
import AuthError from "@/components/custom/AuthError.vue";
import AuthButton from "@/components/custom/AuthButton.vue";
import AuthInput from "@/components/custom/AuthInput.vue";
import AuthGoBack from "@/components/custom/AuthGoBack.vue";

const userDetails = ref({
  email: "",
});

const loading = ref(false);
const submitted = ref(false);

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/* called on form submit */
async function handleSubmit() {
  loading.value = true;

  console.log("email:", userDetails.value.email);

  userDetails.value.email = userDetails.value.email.trim();

  /* TODO: display feedback to screen */
  console.log("looks correct:", isValidEmail(userDetails.value.email));

  await sleep(2000);

  loading.value = false;
  submitted.value = true;
}
</script>

<template>
  <AuthPane v-if="submitted" class="flex flex-col items-center">
    <Mail color="white" :stroke-width="1" :size="102" />
    <div class="flex flex-col gap-2 text-center text-white">
      <p>sprawdź majla, wysłaliśmy link pod adres:</p>
      <p class="text-2xl font-bold">{{ userDetails.email }}</p>
      <p>
        jeśli wpisany przez ciebie adres jest poprawny, dostaniesz tam link do
        resetu hasła.
      </p>
    </div>
    <AuthGoBack label="Powrót do logowania" href="/login" />
  </AuthPane>
  <AuthPane
    head="i forgor"
    v-else
    class="flex w-full flex-col space-y-4 select-none"
  >
    <form @submit.prevent="handleSubmit" class="w-full space-y-4">
      <p class="text-sm text-white">
        W poniższe pole wpisz adres e-mail przypisany do twojego konta i kliknij
        w zawarty w nim link, aby zresetować hasło.
        <br />Następnie postępuj zgodnie z informacjami w linku.
      </p>
      <AuthInput
        v-model="userDetails.email"
        id="email"
        placeholder="Adres e-mail"
      >
        <Mail class="size-6 stroke-1 text-neutral-400" />
      </AuthInput>
      <AuthButton id="submit" label="Reset Hasła" :disabled="loading" />
      <AuthGoBack label="Powrót do logowania" href="/login" />
    </form>
  </AuthPane>
</template>
