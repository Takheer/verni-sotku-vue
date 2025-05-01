import { ref } from 'vue'
import { defineStore } from 'pinia'
import {signIn, registerNewUser} from "@/db/auth.ts";

type TCredentials = { email: string, password: string }

export const useUserStore = defineStore('counter', () => {
  const userId = ref('')
  let user = ref({})

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

  async function signInUser({ email, password }: TCredentials) {
    const res = await signIn(email, password);

    if (res.user) {
      localStorage.setItem('uid', res.user.uid);
      userId.value = res.user.uid
      return { user: res.user }
    } else {
      return res;
    }
  }

  function signOut() {
    localStorage.removeItem('uid');
    userId.value = '';
  }

  return { userId, user, createUser, signInUser, signOut }
})
