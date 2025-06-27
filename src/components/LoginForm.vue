<script setup lang="ts">
import { ref } from "vue";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft, CircleX } from "lucide-vue-next";
import isValidEmail from "@/utils/isValidEmail";
import {
  PinInput,
  PinInputGroup,
  PinInputSlot,
} from "@/components/ui/pin-input";

const userDetails = ref({
  email: "",
  password: "",
  rememberMe: false,
  pin: [] as string[],
});

const loading = ref(false);
const awaiting2FA = ref(false);
const error = ref("");

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/* called when last pin value is typed */
async function handleComplete() {
  error.value = "";
  loading.value = true;

  try {
    const pin = userDetails.value.pin.join("");
    console.log("pin:", pin);

    /* imitation of a backend pin check */
    await sleep(2000);

    if (pin !== "121212") {
      throw new Error("Jednorazowy kod jest nieprawidłowy.");
    }

    window.location.replace("/");
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

/* called on form submit */
async function handleSubmit() {
  error.value = "";
  loading.value = true;

  try {
    const email = userDetails.value.email.trim();
    const password = userDetails.value.password;

    if (!isValidEmail(email)) {
      throw new Error("Wprowadź prawidłowy adres e-mail.");
    }

    /* imitation of backend credential check */
    console.log(email, password);
    await sleep(1000);

    awaiting2FA.value = true;
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
    userDetails.value.password = "";
  }
}
</script>

<template>
  <div class="flex w-full flex-col space-y-4 select-none">
    <div class="flex w-full">
      <h1 v-if="!awaiting2FA" class="text-4xl font-bold text-white">
        Zaloguj się
      </h1>
      <h1 v-else class="text-4xl font-bold text-white">
        Weryfikacja dwuetapowa
      </h1>
    </div>
    <div
      v-if="error"
      class="flex w-full flex-col items-center justify-center gap-2 rounded-md border-1 border-red-900 bg-red-800/40 p-3 text-sm font-bold text-white shadow-md backdrop-blur-sm"
    >
      <CircleX :size="20" />
      <p class="text-center">{{ error }}</p>
    </div>
    <form
      v-if="!awaiting2FA"
      @submit.prevent="handleSubmit"
      class="w-full space-y-2"
    >
      <Input
        v-model="userDetails.email"
        autofocus
        required
        placeholder="Adres e-mail"
        class="w-full border-1 border-gray-500/50 bg-white/15 text-white shadow-md backdrop-blur-xs placeholder:text-gray-400"
      />
      <Input
        v-model="userDetails.password"
        required
        type="password"
        placeholder="Hasło"
        class="w-full border-1 border-gray-500/50 bg-white/15 text-white shadow-md backdrop-blur-xs placeholder:text-gray-400"
      />
      <div
        class="flex h-9 w-full items-center justify-between gap-x-2 text-sm text-gray-200"
      >
        <div class="flex items-center gap-x-2">
          <Checkbox
            class="data-[state=checked]:bg-red-800/50"
            id="remember"
            v-model="userDetails.rememberMe"
          />
          <label for="remember">Zapamiętaj mnie</label>
        </div>
        <a href="/forgot-password" class="hover:underline"
          >Zapomniałeś hasło?</a
        >
      </div>
      <Button
        id="submit"
        :disabled="loading"
        class="w-full bg-red-800/50 text-white shadow-md backdrop-blur-sm hover:bg-white/80 hover:text-red-800"
        >Logowanie</Button
      >
    </form>
    <div v-if="awaiting2FA" class="space-y-6">
      <p class="text-sm text-white">
        Sprawdź swoją skrzynkę mailową. W przeciągu paru minut dostaniesz od nas
        wiadomość. <br />W powyższe pola przepisz sześciocyfrowy kod.
      </p>
      <PinInput
        id="pin-input"
        otp
        type="number"
        :disabled="loading"
        v-model="userDetails.pin"
        @complete="handleComplete"
      >
        <PinInputGroup class="flex w-full justify-between">
          <PinInputSlot
            class="rounded-md border border-gray-500 bg-white/15 text-lg text-white shadow-md backdrop-blur-xs"
            v-for="(id, index) in 6"
            :key="id"
            :index="index"
          />
        </PinInputGroup>
      </PinInput>
      <p
        @click="awaiting2FA = false"
        class="flex cursor-pointer items-center gap-1 text-white hover:underline"
      >
        <ChevronLeft color="white" />
        <span>Powrót do logowania</span>
      </p>
    </div>
  </div>
</template>
