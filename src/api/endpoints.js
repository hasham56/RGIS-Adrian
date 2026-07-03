// Collection -> REST endpoint map. This is the single source of truth for
// what the backend must implement.
//
// Each endpoint is a GET returning JSON in exactly the shape of the matching
// key in src/data.js (that file doubles as the response-shape reference and
// as offline mock data). Example: GET {VITE_API_URL}/kpis must return the
// same array shape as DATA.kpis.

export const ENDPOINTS = {
  apps: '/apps',                            // hub launcher tiles
  kpis: '/kpis',                            // dashboard KPI cards
  submissionsTrend: '/submissions-trend',   // dashboard area chart
  accuracyByRegion: '/accuracy-by-region',  // dashboard bar chart
  formStatus: '/form-status',               // dashboard donut
  activity: '/activity',                    // dashboard activity feed
  customers: '/customers',                  // customers directory
  stores: '/stores',                        // store network
  reviews: '/reviews',                      // pending reviews queue
  forms: '/forms',                          // Forge forms list
  builderFields: '/builder-fields',         // Forge builder sample form fields
  tasks: '/tasks',                          // task manager
  capacity: '/capacity',                    // capacity gauges
  capacityWeeks: '/capacity-weeks',         // capacity weekly bars
  schedule: '/schedule',                    // schedule helper events
}
