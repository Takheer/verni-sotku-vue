<script setup lang="ts">
import {onMounted, ref} from "vue";
import {getStatistics} from "@/db/spendings.ts";
import {getCookie} from "@/utils/cookies.ts";
import {useUserStore} from "@/stores/user.ts";
import {useAuthApi} from "@/db/useAuthApi.ts";
import type {TSpendingGroup} from "@/db/useSpendingsApi.ts";
import {pluralize} from "../utils/pluralize.ts";

const authApi = useAuthApi();

const groups = ref<TSpendingGroup[]>([])


onMounted(async () => {
  const [data] = await Promise.all([
    authApi.getCurrentUserGroups(),
  ]);
  groups.value = data;
})
</script>

<template>
  <div class='flex flex-col gap-4 p-8'>
    <h1>Выберите группу, в которую хотите добавить расход</h1>
    <RouterLink :to="`/spendings/${group.slug}`" v-for="group of groups" class="flex flex-col gap-2 shadow-lg rounded-lg p-4 cursor-pointer">
      <span>{{ group.name }}</span>
      <div class="flex flex-row gap-2">
        {{ group.users?.length }} {{ pluralize(group.users?.length, "участник", "участника", "участников")}}
      </div>
    </RouterLink>
  </div>
</template>

<style lang="scss">

</style>
