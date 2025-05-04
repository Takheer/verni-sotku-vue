<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import { type TSpendingGroup, useSpendingsApi } from "@/db/useSpendingsApi.ts";
import {useUserStore} from "@/stores/user.ts";
import {useAuthApi} from "@/db/useAuthApi.ts";

const spendingsApi = useSpendingsApi();
const authApi = useAuthApi();
const userStore = useUserStore();

const route = useRoute()
const router = useRouter()
const groupData = ref<TSpendingGroup>({} as TSpendingGroup)

onMounted(async () => {
  try {
    groupData.value = await spendingsApi.getSpendingsGroup(route.params.slug as string);
  } catch {
    groupData.value = {} as TSpendingGroup
  }
})

async function handleJoin() {
  if (!userStore.user.id) {
    await router.push('/user/sign-in')
  } else {
    await authApi.addCurrentUserToGroup(route.params.slug as string)
    await router.push(`/spendings/${route.params.slug as string}`)
  }
}

const buttonClass = "flex flex-row shadow-lg bg-[#3B666B] text-white px-4 py-2 rounded-lg w-fit cursor-pointer"
</script>

<template>
<div class="flex flex-col p-12">
  <div class="flex flex-col p-4 gap-2 rounded-lg shadow-lg items-center">
    <template v-if="groupData.slug">
      <h1 class="text-xl"><span class="font-bold">{{ groupData.creator.name }}</span> приглашает вас фиксировать траты в группе <span class="font-bold">{{ groupData.name }}</span></h1>
      <p>Если хотите присоединиться — нажмите кнопку ниже</p>
      <button @click="handleJoin" :class="buttonClass">Присоединиться</button>
    </template>
    <template v-else>
      <h1 class="text-xl font-bold">Такой группы не существует!</h1>
      <p>Либо вы балуетесь и портите ссылку, либо создатель удалил группу или прекратил принимать новых людей</p>
      <RouterLink to="/" :class="buttonClass">На главную</RouterLink>
    </template>
  </div>
</div>
</template>

<style lang="scss">

</style>
