import {getCookie} from "@/utils/cookies.ts";

export const useAuthApi = () => {
  const apiUrl = import.meta.env.VITE_API_URL

  async function sendCodeToEmail(email: string) {
    const res = await fetch(apiUrl + `/user/send-email/${email}`);

    return await res.json()
  }

  async function auth(email: string, otp: string) {
    const formData = new FormData()
    formData.append('username', email)
    formData.append('password', otp)

    try {
      const res = await fetch(apiUrl + `/user/auth`, {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();
      if (result.access_token) {
        document.cookie = `token=${result.access_token}; path=/; max-age=${86400*30}; secure; samesite=lax;`
        return { success: true }
      }
      return { success: false }
    } catch (e) {
      return { success: false }
    }
  }

  async function getCurrentUser() {
    const res = await fetch(apiUrl + `/user/me`, {
      headers: {
        'Authorization': `Bearer ${getCookie('token')}`
      }
    });

    return await res.json()
  }

  async function getCurrentUserGroups() {
    const res = await fetch(apiUrl + `/user/groups`, {
      headers: {
        'Authorization': `Bearer ${getCookie('token')}`
      }
    });

    return await res.json()
  }

  return { sendCodeToEmail, auth, getCurrentUser, getCurrentUserGroups }
}
