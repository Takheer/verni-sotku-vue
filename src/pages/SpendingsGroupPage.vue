<script setup lang="ts">
import AddSpendingForm from "@/components/AddSpendingForm.vue";
import SpendingList from "@/components/SpendingList.vue";
import {onMounted, ref} from "vue";
import {getStatistics} from "@/db/spendings.ts";
import {getCookie} from "@/utils/cookies.ts";
import {useUserStore} from "@/stores/user.ts";
import {type TSpending, type TUser, useSpendingsApi} from "@/db/useSpendingsApi.ts";
import {useRoute} from "vue-router";

export type Person = {
  id: number,
  name: string,
  bgColor: string,
  textColor: string
}

export type Spending = {
  who: Person,
  whom: Person,
  sum: number,
  comment: string,
}

export type TSpendingFormData = {
  groupId: number
  whoId: number
  whomId: number
  sum: number
  calculationBreakdown: string
  comment: string
}

type NamesPair = {
  buyerName: string,
  debtorName: string,
}

type StatsTable = {}

type StatsTablePair = {
  summed: StatsTable
  non_summed: StatsTable
}

const people = ref<TUser[]>([])

const route = useRoute();
const userStore = useUserStore();
const spendingsApi = useSpendingsApi();

const spendingList = ref<TSpending[]>([])
const spendingListFiltered = ref<TSpending[]>([])
const statsTable = ref<StatsTablePair>({} as StatsTablePair)
const showSum = ref<boolean>(true)

async function addSpending(formData: TSpendingFormData) {
  console.log({formData})
  await spendingsApi.addSpending({
    group_id: 1,
    who_bought_id: userStore.user.id,
    whom_bought_id: formData.whomId,
    sum: formData.sum,
    comment: formData.comment,
    calculation_breakdown: formData.calculationBreakdown
  });
  clearFilter();

  statsTable.value = await getStatistics();
}

function filterByDebtor(name: string) {
  spendingListFiltered.value = spendingList.value.filter((spending: TSpending) => spending.whom.name === name)
}

function filterByPair({ buyerName, debtorName }: NamesPair) {
  spendingListFiltered.value = spendingList.value.filter(
    (spending: TSpending) => spending.who.name === buyerName && spending.whom.name === debtorName ||
      spending.who.name === debtorName && spending.whom.name === buyerName
  )
}

function clearFilter() {
  spendingListFiltered.value = spendingList.value;
}

onMounted(async () => {
  console.log(getCookie('token') && !userStore.user?.id)
  console.log(userStore.user)
  if (getCookie('token') && !userStore.user?.id) {
    await userStore.getCurrentUser()
  }
  console.log(userStore.user)
  const [groupData, spendingsData] = await Promise.all([
    spendingsApi.getSpendingsGroup(route.params.slug as string),
    spendingsApi.getSpendings(route.params.slug as string)
  ]);

  spendingListFiltered.value = spendingsData;
  people.value = groupData.users
})
</script>

<template>
  <div class='flex flex-col gap-4 items-center'>
    <h1 class='title'>Добавить трату</h1>
    <AddSpendingForm :people-who='people' :people-whom='people' @add-spending='addSpending' />
    <h2 class='subheader'>Все траты</h2>
    <SpendingList v-if='spendingListFiltered.length' :spending-list='spendingListFiltered' />
    <h2 class='subheader'>Статистика</h2>
    <div>
      <input id='showSummed' v-model='showSum' type='checkbox'>
      <label for='showSummed'>Показывать сумму долгов</label>
    </div>
    <!--    <SumTable-->
    <!--      v-if='Object.values(statsTable?.summed || {}).length'-->
    <!--      :people='peopleWho'-->
    <!--      :table='showSum ? statsTable.summed : statsTable.non_summed'-->
    <!--      @filter-by-debtor='filterByDebtor'-->
    <!--      @filter-by-pair='filterByPair'-->
    <!--      @filter-clear='clearFilter'-->
    <!--    />-->
  </div>
</template>

<style lang="scss">

</style>
