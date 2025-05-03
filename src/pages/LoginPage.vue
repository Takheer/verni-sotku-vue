<script setup lang="ts">
import {getCookie} from "@/utils/cookies";
import UserLoginInputPanel from "@/components/user/UserLoginInputPanel.vue";
import UserCodeInputPanel from "@/components/user/UserCodeInputPanel.vue";
import UserLoginSuccessScreen from "@/components/user/UserLoginSuccessScreen.vue";
import UserLoginFailScreen from "@/components/user/UserLoginFailScreen.vue";
import {onMounted, ref} from "vue";
import {useUserStore} from "@/stores/user.ts";
import {useAuthApi} from "@/db/useAuthApi.ts";

enum steps {
  INPUT_CREDENTIAL,
  INPUT_CODE,
  DONE,
  FAIL,
  LOGGED_IN_ALREADY
}

const credential = ref({ email: '', name: '', isRegistration: false })

const currentStep = ref(steps.INPUT_CREDENTIAL);
const userStore = useUserStore();

function onSetCredential(e: { email: string, name: string, isRegistration: boolean }) {
  credential.value = e;
  currentStep.value = steps.INPUT_CODE;
}

async function onAuthSuccess() {
  await userStore.getCurrentUser()
  currentStep.value = steps.DONE;
}

function onAuthFail() {
  currentStep.value = steps.FAIL;
}

onMounted(() => {
  if (getCookie('token')) {
    currentStep.value = steps.LOGGED_IN_ALREADY;
  }
})
</script>

<template>
  <div class="h-[80vh] w-full flex flex-col items-center justify-center">
    <div class="w-[300px] md:w-[480px]">
      <UserLoginInputPanel v-if="currentStep === steps.INPUT_CREDENTIAL" @set-credential="onSetCredential" />
      <UserCodeInputPanel
        v-if="currentStep === steps.INPUT_CODE"
        :credential="credential"
        @success="onAuthSuccess"
        @fail="onAuthFail"
        @previous="currentStep = steps.INPUT_CREDENTIAL"
      />
      <UserLoginSuccessScreen v-if="[steps.DONE, steps.LOGGED_IN_ALREADY].includes(currentStep)" />
      <UserLoginFailScreen v-if="currentStep === steps.FAIL" />
    </div>
  </div>
</template>
