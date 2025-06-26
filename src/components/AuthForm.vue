<template>
  <form @submit.prevent="handleSubmit" class="w-full space-y-2">
    <Input
      v-if="!awaiting2FA"
      v-model="email"
      autofocus
      required
      type="email"
      placeholder="Adres e-mail"
      class="w-full border-0 bg-white/15 text-white shadow-md backdrop-blur-xs placeholder:text-gray-400"
    />
    <Input
      v-if="!awaiting2FA"
      v-model="password"
      required
      type="password"
      placeholder="Hasło"
      class="w-full border-0 bg-white/15 text-white shadow-md backdrop-blur-xs placeholder:text-gray-400"
    />
    <PinInput
      v-if="awaiting2FA"
      id="pin-input"
      v-model="pin"
      placeholder="○"
      @complete="handleComplete"
    >
      <PinInputGroup class="flex w-full justify-between">
        <PinInputSlot
          class="rounded-md border border-gray-500 bg-white/15 text-white shadow-md backdrop-blur-xs"
          v-for="(id, index) in 6"
          :key="id"
          :index="index"
        />
      </PinInputGroup>
    </PinInput>
    <div
      class="flex h-9 w-full items-center justify-between gap-x-2 text-sm text-gray-200"
    >
      <div class="flex items-center gap-x-2">
        <Checkbox
          class="data-[state=checked]:bg-red-800/50"
          id="remember"
          v-model="rememberMe"
        />
        <label for="remember">Zapamiętaj mnie</label>
      </div>
      <a href="/forgot-password" class="hover:underline">Zapomniałeś hasło?</a>
    </div>
    <Button
      id="submit"
      class="w-full bg-red-800/50 text-white shadow-md backdrop-blur-sm hover:bg-white/80 hover:text-red-800"
      >Logowanie</Button
    >
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  PinInput,
  PinInputGroup,
  PinInputSlot,
} from "@/components/ui/pin-input";

const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const awaiting2FA = ref(false);
const pin = ref<string[]>([]);

function sleep(ms: Number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/* called when all pin fields have a value */
async function handleComplete() {
  console.log("completed pin");
  console.log("pin:", pin.value);

  /* imitation of a pin check */
  await sleep(1000);

  if (pin.value) {
    const pinConcat = pin.value.join("");
    if (pinConcat === "213769") {
      window.location.replace("/");
    }
  }
}

/* called on form submit */
async function handleSubmit() {
  console.log("remember Me:", rememberMe.value);

  /* imitation of credential check */
  await sleep(1000);

  if (email.value === "admin@wp.pl" && password.value === "admin") {
    console.log("credentials good wowoowoo");
    awaiting2FA.value = true;
  }

  /* clear password after submit */
  password.value = "";
}
</script>
