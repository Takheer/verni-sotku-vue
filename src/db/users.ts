const BACKEND_URL = import.meta.env.VITE_API_URL

export async function getUserByUUID(uuid: string) {
  const res = await fetch(`${BACKEND_URL}/get-user/${uuid}`)

  return await res.json();
}
