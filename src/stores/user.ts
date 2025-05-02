import { ref } from 'vue'
import { defineStore } from 'pinia'
import {registerNewUser} from "@/db/auth.ts";
import {useAuthApi} from "@/db/useAuthApi.ts";

type TCredentials = { email: string, password: string }
const authApi = useAuthApi()

export const useUserStore = defineStore('counter', () => {
  const userId = ref('')
  const user = ref({})

  async function createUser({ email , password }: TCredentials) {
    const res = await registerNewUser(email, password);

    if (res.user) {
      localStorage.setItem('uid', res.user.uid);
      userId.value = res.user.uid
      return { user: res.user }
    } else {
      return res;
    }
  }

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

  return { userId, user, createUser, getCurrentUser, signOut }
})
