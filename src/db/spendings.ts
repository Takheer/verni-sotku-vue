type SheetRow = {
  who: string
  whom: string
  sum: number
  comment: string
}

type TableData = string[][]

const BACKEND_URL = import.meta.env.VITE_API_URL

export async function allRows(): Promise<TableData> {
  const res = await fetch(`${BACKEND_URL}/all-rows`)

  return await res.json()
}

export async function addRow(row: SheetRow) {
  const res = await fetch(`${BACKEND_URL}/add-spending`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      spending: {
        who: row.who,
        whom: row.whom,
        sum: row.sum,
        comment: row.comment
      }
    }),
  })

  return await res.json()
}

export async function getStatistics() {
  const res = await fetch(`${BACKEND_URL}/statistics`)

  return await res.json()
}
