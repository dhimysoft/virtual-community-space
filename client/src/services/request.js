const API = 'http://localhost:3001/api'

export async function get(path) {
  const res = await fetch(`${API}${path}`)
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || res.statusText)
  return res.json()
}
