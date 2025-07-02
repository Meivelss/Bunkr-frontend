<script setup lang="ts">
import { ref } from "vue";
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
const error = ref("");

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/* called on form submit */
async function handleSubmit() {
  error.value = "";
  loading.value = true;

  try {
    const email = userDetails.value.email.trim();

    console.log("email:", email);

    if (!isValidEmail(email)) {
      throw new Error("Wprowadź prawidłowy adres e-mail.");
    }

    await sleep(2000);

    submitted.value = true;
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
  }
}
</script>

<template>
  <AuthPane v-if="submitted" class="flex flex-col items-center">
    <Mail class="text-primary" :stroke-width="1" :size="102" />
    <div class="flex flex-col gap-2 text-center text-white">
      <p class="font-body">sprawdź majla, wysłaliśmy link pod adres:</p>
      <p class="font-body text-2xl font-bold">{{ userDetails.email }}</p>
      <p class="font-body">
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
    <AuthError :error="error" v-if="error" />
    <form @submit.prevent="handleSubmit" class="w-full space-y-4">
      <p class="font-body text-sm text-white">
        W poniższe pole wpisz adres e-mail przypisany do twojego konta i kliknij
        w zawarty w nim link, aby zresetować hasło.
        <br />Następnie postępuj zgodnie z informacjami w linku.
      </p>
      <AuthInput
        v-model="userDetails.email"
        required
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
