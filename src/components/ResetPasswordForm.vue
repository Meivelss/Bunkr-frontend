<script setup lang="ts">
import { ref } from "vue";
import { ShieldCheck } from "lucide-vue-next";
import { CircleX } from "lucide-vue-next";
import AuthPane from "@/components/custom/AuthPane.vue";
import AuthButton from "@/components/custom/AuthButton.vue";
import AuthGoBack from "@/components/custom/AuthGoBack.vue";
import AuthInput from "./custom/AuthInput.vue";

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
  <AuthPane
    v-if="success"
    class="flex flex-col items-center justify-center gap-4 text-white"
  >
    <ShieldCheck class="text-primary" :stroke-width="1" :size="102" />
    <div class="flex flex-col gap-2 text-center">
      <p class="font-body">
        Reset hasła powiódł się, możesz teraz zalogować się swoim nowym hasłem.
      </p>
    </div>
    <AuthGoBack label="Powrót do logowania" href="/login" />
  </AuthPane>
  <AuthPane v-else>
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
    <p class="font-body text-sm text-white">
      Ustal nowe hasło, tym razem nie zapomnij B)
    </p>
    <form @submit.prevent="handleSubmit" class="w-full space-y-4">
      <AuthInput
        v-model="password"
        required
        type="password"
        placeholder="Hasło"
      />
      <AuthInput
        v-model="repeatPassword"
        required
        type="password"
        placeholder="Powtórz Hasło"
      />
      <AuthButton id="submit" label="Zmień hasło" :disabled="loading" />
    </form>
    <AuthGoBack label="Powrót do logowania" href="/login" />
  </AuthPane>
</template>
