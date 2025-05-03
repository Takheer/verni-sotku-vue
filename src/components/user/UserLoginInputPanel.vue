<script setup lang="ts">

import {useVuelidate} from "@vuelidate/core";
import { required, email } from "@/utils/validators";
import {ref} from "vue";
import IDButton from "@/components/ui/IDButton.vue";

type TEmits = {
  (e: 'setCredential', val: any): void
};
const emits = defineEmits<TEmits>();

const rules = {
  credential: {
    required,
    email
  }
}


const credential = ref('')
const fullName = ref('')
const isRegistration = ref(false)
const v$ = useVuelidate(rules, { credential });

const errorMsg = ref('')

async function sendConfirmationCode() {
  await v$.value.$validate();
  if (v$.value.$error) {
    errorMsg.value = 'Введите верный адрес электронной почты!'
    return;
  }
  errorMsg.value = ''

  emits('setCredential', { email: credential.value, name: fullName.value, isRegistration: isRegistration.value })
}
</script>

<template>
<div class="flex flex-col p-8 gap-4 shadow-lg rounded-2xl">
  <p class="text-lg md:text-xl font-bold">{{ isRegistration ? 'Зарегистрироваться' : 'Войти' }}</p>
  <input
    v-model="credential"
    placeholder="Электронная почта"
    :error-message="errorMsg"
    :error="!!errorMsg"
  />
  <input
    v-if="isRegistration"
    v-model="fullName"
    placeholder="Имя"
    :error-message="errorMsg"
    :error="!!errorMsg"
  >
  <IDButton
    variant="primary"
    full-width
    @click="sendConfirmationCode"
  >
    Получить код
  </IDButton>
  <div
    class="cursor-pointer hover:text-gray-500"
    @click="isRegistration = !isRegistration"
  >
    {{ isRegistration ? 'Войти' : 'Зарегистрироваться' }}
  </div>
</div>
</template>

<style lang="scss">

</style>
