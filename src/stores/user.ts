import { ref } from 'vue'
import { defineStore } from 'pinia'
import {useAuthApi} from "@/db/useAuthApi.ts";
import type {TUser} from "@/db/useSpendingsApi.ts";

type TCredentials = { email: string, password: string }
const authApi = useAuthApi()

export const useUserStore = defineStore('counter', () => {
  const userId = ref('')
  const user = ref<TUser>({} as TUser)

  async function getCurrentUser() {
    const res = await authApi.getCurrentUser();

    if (res) {
      localStorage.setItem('user', JSON.stringify(res));
      user.value = res
      console.log('user.value', user.value)
      return { user: res }
    } else {
      return res;
    }
  }

  function signOut() {
    localStorage.removeItem('uid');
    userId.value = '';
  }

  return { userId, user, getCurrentUser, signOut }
})
