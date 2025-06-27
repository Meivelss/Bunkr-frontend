<script setup lang="ts">
import { ref } from "vue";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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

const awaiting2FA = ref(false);

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/* called when all pin fields have a value */
async function handleComplete() {
  console.log("completed pin");
  // Access the pin value via userDetails.value.pin

  const concat = userDetails.value.pin.join("");
  console.log("pin:", concat);

  /* imitation of a pin check */
  await sleep(1000);

  if (userDetails.value.pin) {
    window.location.replace("/");
  }
}

/* called on form submit */
async function handleSubmit() {
  console.log("email:", userDetails.value.email);
  console.log("password:", userDetails.value.password);
  console.log("remember Me:", userDetails.value.rememberMe);

  userDetails.value.email = userDetails.value.email.trim();

  /* currently ignoring output of this for convenience */
  console.log("email looks good:", isValidEmail(userDetails.value.email));

  /* imitation of credential check */
  await sleep(1000);

  awaiting2FA.value = true;

  /* clear password after submit */
  userDetails.value.password = "";
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
        class="cursor-pointer text-sm font-bold text-white text-shadow-md hover:underline"
      >
        Powrót do logowania
      </p>
    </div>
  </div>
</template>
