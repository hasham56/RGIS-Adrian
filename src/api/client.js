import { API_URL } from './config.js'

export class ApiError extends Error {
  constructor(message, status, body) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.body = body
  }
}

// Auth extension point: store a token under this key after your real login
// flow (or replace this with your auth provider's getter) and every request
// carries it automatically.
export function getAuthToken() {
  try { return localStorage.getItem('rgis.token') } catch { return null }
}

export async function apiFetch(path, options = {}) {
  const token = getAuthToken()
  const headers = { ...(options.headers || {}) }
  if (options.body && !headers['Content-Type']) headers['Content-Type'] = 'application/json'
  if (token && !headers.Authorization) headers.Authorization = `Bearer ${token}`

  const res = await fetch(API_URL + path, { ...options, headers })
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new ApiError(`${options.method || 'GET'} ${path} failed (${res.status})`, res.status, body)
  }
  return res.status === 204 ? null : res.json()
}
