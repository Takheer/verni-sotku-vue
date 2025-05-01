<script setup lang="ts">

import {PhCheck} from "@phosphor-icons/vue";
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";

const SECONDS_TO_REDIRECT = 5;

const route = useRoute();
const router = useRouter();

const secondsToRedirect = ref(SECONDS_TO_REDIRECT)

onMounted( () => {
  setInterval(() => {
    secondsToRedirect.value--;
  }, 1000)
  setTimeout(async () => {
    if (route.query.redirect_uri) {
      await router.replace(route.query.redirect_uri as string);
    } else {
      await router.push('/');
    }
  }, SECONDS_TO_REDIRECT * 1000)
})
</script>

<template>
  <div class="flex flex-col p-16 gap-8 shadow-lg rounded-2xl items-center">
    <PhCheck color="green" size="64" />
    <p class="text-xl md:text-2xl">Вы вошли на сайт!</p>
    <p>
      До выхода на главную: 00:0{{ secondsToRedirect }} сек.
    </p>
    <div class="flex flex-row gap-8 font-light">
      <RouterLink to="/user/orders">Посмотреть заказы</RouterLink>
      <RouterLink to="/">На главную</RouterLink>
    </div>
  </div>
</template>
