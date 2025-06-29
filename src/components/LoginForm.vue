<script setup lang="ts">
import { ref } from "vue";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Lock, Mail, Eye } from "lucide-vue-next";
import isValidEmail from "@/utils/isValidEmail";
import {
  PinInput,
  PinInputGroup,
  PinInputSlot,
} from "@/components/ui/pin-input";
import AuthPane from "@/components/custom/AuthPane.vue";
import AuthError from "@/components/custom/AuthError.vue";
import AuthButton from "@/components/custom/AuthButton.vue";
import AuthInput from "@/components/custom/AuthInput.vue";
import AuthGoBack from "@/components/custom/AuthGoBack.vue";

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
    userDetails.value.pin = [];
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
  <AuthPane head="Logowanie">
    <AuthError :error="error" v-if="error" />
    <form
      v-if="!awaiting2FA"
      @submit.prevent="handleSubmit"
      class="w-full space-y-4"
    >
      <AuthInput
        v-model="userDetails.email"
        id="email"
        placeholder="Adres e-mail"
      >
        <Mail class="size-6 stroke-1 text-neutral-400" />
      </AuthInput>
      <div class="relative w-full max-w-sm items-center">
        <Input
          v-model="userDetails.password"
          required
          type="password"
          placeholder="Hasło"
          class="w-full border-1 border-gray-500/50 bg-white/15 px-10 text-white shadow-md backdrop-blur-xs placeholder:text-gray-400"
        />
        <span
          class="absolute inset-y-0 start-0 flex items-center justify-center px-2"
        >
          <Lock class="size-6 stroke-1 text-gray-400" />
        </span>
        <button
          type="button"
          class="absolute inset-y-0 end-0 flex cursor-pointer items-center justify-center px-2"
        >
          <Eye class="size-6 text-gray-400" />
        </button>
      </div>
      <div
        class="flex w-full items-center justify-between gap-x-2 text-sm text-gray-200"
      >
        <div class="flex items-center gap-x-2">
          <Checkbox
            class="data-[state=checked]:bg-secondary/50"
            id="remember"
            v-model="userDetails.rememberMe"
          />
          <label for="remember">Zapamiętaj mnie</label>
        </div>
        <a
          href="/forgot-password"
          class="decoration-secondary/50 decoration-4 underline-offset-4 hover:underline"
          >Zapomniałeś hasło?</a
        >
      </div>
      <AuthButton label="Zaloguj" :disabled="loading" />
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
      <AuthGoBack label="Powrót do logowania" @click="awaiting2FA = false" />
    </div>
  </AuthPane>
</template>
