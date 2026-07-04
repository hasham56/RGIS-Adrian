# RGIS Universe

A React + Vite port of the RGIS Universe standalone HTML prototype — an operations
dashboard concept with a hub launcher, form builder (Forge), customers/stores/reviews,
tasks/capacity/scheduling, and the ARIEL assistant.

## Local development

```bash
npm install
npm run dev        # dev server at http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve the production build locally
```

## Project structure

```
index.html               Vite entry page (#root mount point)
src/main.jsx             React bootstrap (createRoot + global CSS)
src/App.jsx              Root component: routing, theme/density, ARIEL toggle
src/data.js              Mock data + API response-shape reference (DATA)
src/api/                 Data layer: config, fetch client, endpoint map, React Query hooks
src/styles/index.css     Design tokens, themes, densities, component styles
src/components/          Icon set, SVG chart primitives, Shell (Sidebar/Topbar), Async states
src/screens/             Hub, Dashboard, Forge/Builder, Customers/Stores/Reviews,
                         Tasks/Capacity/Schedule, ARIEL/Admin/Landing
public/fonts/            Sora woff2 (self-hosted)
netlify.toml             Netlify build config + SPA redirect
```

## Connecting a real API

The app ships in **mock mode**: with no configuration it renders the bundled
sample data from `src/data.js`. To go live, set one environment variable:

```bash
# .env (local) — or Netlify: Site settings → Environment variables
VITE_API_URL=https://api.yourbackend.com/v1
```

Every screen then fetches over HTTP via React Query (60s cache, 1 retry,
loading and error states included). No code changes needed — the switch is
automatic at build time.

### Endpoint contract

The backend must implement the GET endpoints listed in
[`src/api/endpoints.js`](src/api/endpoints.js) (`/kpis`, `/customers`,
`/tasks`, …). Each returns JSON in **exactly the shape of the matching key in
[`src/data.js`](src/data.js)** — that file is both the offline mock and the
response-shape reference for the backend team.

### Auth

Requests automatically carry `Authorization: Bearer <token>` when a token is
stored under `localStorage["rgis.token"]`. Swap `getAuthToken()` in
[`src/api/client.js`](src/api/client.js) to integrate a real auth provider.

### Writes

Use `useApiMutation` from [`src/api/hooks.js`](src/api/hooks.js) to wire action
buttons (invite user, save form, …) to POST/PUT/DELETE endpoints; it
invalidates the affected collections so screens refetch automatically. Most
action buttons remain visual-only until the write endpoints exist.

## Deploy — GitHub

```bash
git init
git add .
git commit -m "RGIS Universe — React + Vite port"
# create an empty repo on github.com first, then:
git remote add origin https://github.com/<your-username>/rgis-universe.git
git branch -M main
git push -u origin main
```

## Deploy — Netlify

1. Log in at [app.netlify.com](https://app.netlify.com) → **Add new site → Import an existing project**.
2. Pick **GitHub** and select the `rgis-universe` repo.
3. Netlify reads `netlify.toml` automatically — build command `npm run build`,
   publish directory `dist`. Just click **Deploy site**.

Every push to `main` will trigger a fresh deploy.

### Social-preview URLs

`index.html` contains Open Graph tags so links shared on WhatsApp/iMessage/
LinkedIn show a branded card (`public/og.jpg`). The tags point at
`rgis-adrian.netlify.app`; if the site moves to a custom domain, update those
absolute URLs in `index.html`. WhatsApp caches previews per URL — after any
change, test with a cache-buster like `?v=2` appended to the link.
