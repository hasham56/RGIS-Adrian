// Central API configuration.
//
// Set VITE_API_URL (in .env, .env.production, or the Netlify env settings)
// to your backend's base URL and every screen switches from bundled mock
// data to live HTTP fetching — no code changes required.
//
//   VITE_API_URL=https://api.client.com/v1
//
// While VITE_API_URL is unset the app runs entirely on the mock data in
// src/data.js, so demos keep working without a backend.

export const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '')
export const USE_MOCKS = !API_URL
