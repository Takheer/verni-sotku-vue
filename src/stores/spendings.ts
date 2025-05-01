import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSpendingStore = defineStore('counter', () => {
  const spendingList = ref([])

})
