<script setup lang="ts">

import {pluralize} from "@/utils/pluralize";
import {useVuelidate} from "@vuelidate/core";
import { required, email } from "@/utils/validators";
import {useAuthApi} from "@/db/useAuthApi";
import {ref} from "vue";

type TEmits = {
  (e: 'setCredential', val: string): void
};
const emits = defineEmits<TEmits>();

const rules = {
  credential: {
    required,
    email
  }
}


const credential = ref('')
const v$ = useVuelidate(rules, { credential });

const errorMsg = ref('')

async function sendConfirmationCode() {
  await v$.value.$validate();
  if (v$.value.$error) {
    errorMsg.value = 'Введите верный адрес электронной почты!'
    return;
  }
  errorMsg.value = ''

  emits('setCredential', credential.value)
}
</script>

<template>
<div class="flex flex-col p-8 gap-4 shadow-lg rounded-2xl">
  <p class="text-lg md:text-xl font-bold">Войти</p>
  <input
    v-model="credential"
    placeholder="Электронная почта"
    :error-message="errorMsg"
    :error="!!errorMsg"
  />
  <button
    variant="primary"
    @click="sendConfirmationCode"
  >
    Получить код
  </button>
</div>
</template>

<style lang="scss">

</style>
