<template>
  <div class='spending-list'>
    <div v-if='spendingList.length === 0' class='spending-item spending-item-empty'>
      Нет данных
    </div>
    <div v-for='spending of spendingList' :key='`${spending.who.name}${spending.whom.name}${spending.sum}${spending.comment}`' class='spending-item'>
      <div class='spending-item-header'>
        <div class='person-label' :style='{ color: spending.who.textColor, backgroundColor: spending.who.bgColor }'>
          {{ spending.who.name }}
        </div>
        ⇥
        <div class='person-label' :style='{ color: spending.whom.textColor, backgroundColor: spending.whom.bgColor }'>
          {{ spending.whom.name }}
        </div>
      </div>
      <div class='spending-item-body'>
        <div>{{ formatCurrency(spending.sum) }}</div>
        —
        <div>{{ spending.comment }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
type TProps = {
  spendingList: any[]
};
const props = defineProps<TProps>();

function formatCurrency(value: number) {
  return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(value)
}
</script>

<style>
.spending-list {
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 16px;
  overflow: auto;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  white-space: nowrap;
  padding: 16px 24px 32px;
}

.spending-list::-webkit-scrollbar {
  display: none;
}

.spending-item {
  display: flex;
  flex-direction: column;
  align-items: baseline;
  border: 1px solid #3B666B;
  padding: 8px;
  border-radius: 8px;
}

.spending-item-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 84px;
  width: 200px;
}

.spending-item-header {
  display: flex;
  flex-direction: row;
}

.spending-item-body {
  display: flex;
  flex-direction: row;
  padding: 8px;
  gap: 8px;
}

.person-label {
  padding: 4px 8px;
  border-radius: 16px;
  margin-left: 4px;
  margin-right: 4px;
  font-size: 12px;
  font-weight: 300;
}
@media screen and (max-width: 500px) {
  .spending-list {
    width: 100%;
  }
}
</style>
