import { useQuery, useQueries, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiFetch } from './client.js'
import { ENDPOINTS } from './endpoints.js'
import { USE_MOCKS } from './config.js'
import { DATA } from '../data.js'

function fetcherFor(key) {
  if (!(key in ENDPOINTS)) throw new Error(`Unknown collection "${key}" — add it to src/api/endpoints.js`)
  return USE_MOCKS
    ? () => Promise.resolve(DATA[key])
    : () => apiFetch(ENDPOINTS[key])
}

// One collection: const { data, isLoading, error } = useCollection('tasks')
export function useCollection(key) {
  return useQuery({ queryKey: [key], queryFn: fetcherFor(key) })
}

// Several collections at once, combined into a single DATA-shaped object so
// screens keep their `D.tasks` / `D.schedule` access pattern:
//   const { data: D, isLoading, error, refetch } = useCollections(['tasks', 'schedule'])
export function useCollections(keys) {
  return useQueries({
    queries: keys.map((k) => ({ queryKey: [k], queryFn: fetcherFor(k) })),
    combine: (results) => ({
      data: Object.fromEntries(keys.map((k, i) => [k, results[i].data])),
      isLoading: results.some((r) => r.isPending),
      error: results.find((r) => r.error)?.error || null,
      refetch: () => results.forEach((r) => r.refetch()),
    }),
  })
}

// Write helper for wiring action buttons to the backend later:
//   const invite = useApiMutation({ method: 'POST', path: '/users', invalidates: ['customers'] })
//   invite.mutate({ email })
// `path` may be a function of the payload, e.g. (t) => `/tasks/${t.id}`.
// In mock mode it resolves with the payload without touching the network.
export function useApiMutation({ method = 'POST', path, invalidates = [] }) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: USE_MOCKS
      ? async (body) => body
      : (body) => apiFetch(typeof path === 'function' ? path(body) : path, { method, body: JSON.stringify(body) }),
    onSuccess: () => invalidates.forEach((k) => qc.invalidateQueries({ queryKey: [k] })),
  })
}
