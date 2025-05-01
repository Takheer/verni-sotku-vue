const BACKEND_URL = import.meta.env.VITE_API_URL

export async function addGroup(name: string, uuid: string) {
  const res = await fetch(`${BACKEND_URL}/add-group`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      group: {
        name,
        uuid,
      }
    }),
  })

  return await res.json()
}

export async function getGroupBySlug(slug: string) {
  const res = await fetch(`${BACKEND_URL}/get-group/${slug}`)

  return await res.json()
}
