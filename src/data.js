/* RGIS Universe — mock data */
  const apps = [
    { id: 'dashboard', name: 'Operations Dashboard', icon: 'home', desc: 'Live audit metrics, sync health & field activity', tag: 'Core', color: 'var(--rgis-red)' },
    { id: 'forge', name: 'Forge', icon: 'forge', desc: 'Build & publish data-collection forms', tag: 'Core', color: 'var(--rgis-blue)', badge: '12 forms' },
    { id: 'tasks', name: 'Task Manager', icon: 'checkSquare', desc: 'Plan, assign & track field work', tag: 'Operations', color: 'var(--green)', badge: '8 due' },
    { id: 'capacity', name: 'Capacity', icon: 'gauge', desc: 'Workforce capacity & utilization planning', tag: 'Operations', color: 'var(--sky)' },
    { id: 'schedule', name: 'Schedule Helper', icon: 'calCheck', desc: 'AI-assisted event scheduling & fit analysis', tag: 'Operations', color: 'var(--violet)', badge: 'AI' },
    { id: 'customers', name: 'Customers', icon: 'users', desc: 'Retailer accounts & contacts directory', tag: 'Directory', color: 'var(--amber)' },
    { id: 'stores', name: 'Stores', icon: 'store', desc: 'Store network, locations & terminals', tag: 'Directory', color: 'var(--rgis-blue)' },
    { id: 'reviews', name: 'Pending Reviews', icon: 'clipboard', desc: 'Submissions awaiting supervisor sign-off', tag: 'Quality', color: 'var(--rgis-red)', badge: '5' },
    { id: 'assistant', name: 'ARIEL Assistant', icon: 'sparkles', desc: 'Your AI co-pilot across the universe', tag: 'Intelligence', color: 'var(--violet)', badge: 'AI' },
    { id: 'admin', name: 'Admin Console', icon: 'shield', desc: 'Users, roles, ACL & system settings', tag: 'System', color: 'var(--text-2)' },
  ];

  const kpis = [
    { id: 'awaiting', label: 'Forms Awaiting Review', value: 5, delta: +2, icon: 'clipboard', color: 'var(--rgis-red)', soft: 'var(--red-soft)', spark: [3, 4, 2, 5, 4, 6, 5] },
    { id: 'active', label: 'Active Audits Today', value: 34, delta: +12, icon: 'activity', color: 'var(--rgis-blue)', soft: 'var(--blue-soft)', spark: [18, 22, 20, 26, 30, 28, 34] },
    { id: 'stores', label: 'Stores Covered', value: 1284, delta: +4, icon: 'store', color: 'var(--green)', soft: 'var(--green-soft)', spark: [1190, 1210, 1230, 1240, 1260, 1270, 1284] },
    { id: 'accuracy', label: 'Count Accuracy', value: '99.4%', delta: +0.3, icon: 'target', color: 'var(--amber)', soft: 'var(--amber-soft)', spark: [98.6, 98.9, 99.0, 99.1, 99.2, 99.3, 99.4] },
  ];

  const submissionsTrend = [
    { label: 'Mon', v: 142, v2: 120 }, { label: 'Tue', v: 168, v2: 140 }, { label: 'Wed', v: 154, v2: 150 },
    { label: 'Thu', v: 196, v2: 165 }, { label: 'Fri', v: 224, v2: 180 }, { label: 'Sat', v: 188, v2: 175 }, { label: 'Sun', v: 132, v2: 130 },
  ];
  const accuracyByRegion = [
    { label: 'North', v: 99.2 }, { label: 'South', v: 98.7, hl: true }, { label: 'East', v: 99.5 },
    { label: 'West', v: 99.1 }, { label: 'Central', v: 99.6 }, { label: 'Int\u2019l', v: 98.9 },
  ];
  const formStatus = [
    { label: 'Published', v: 42, color: 'var(--green)' },
    { label: 'Draft', v: 18, color: 'var(--amber)' },
    { label: 'Archived', v: 9, color: 'var(--text-3)' },
  ];

  const activity = [
    { who: 'Mara Lindqvist', init: 'ML', act: 'submitted', obj: 'Cycle Count \u2013 Aisle 7', store: 'Tesco Extra · Leeds', time: '4m ago', type: 'submit' },
    { who: 'Dev Patel', init: 'DP', act: 'approved', obj: 'Fixture Survey', store: 'Carrefour · Lyon', time: '22m ago', type: 'approve' },
    { who: 'Sofia Romano', init: 'SR', act: 'flagged', obj: 'Stock Discrepancy', store: 'Coop · Milano', time: '1h ago', type: 'flag' },
    { who: 'ARIEL', init: 'AI', act: 'generated', obj: 'Weekly accuracy report', store: 'System', time: '2h ago', type: 'ai' },
    { who: 'Tomasz Nowak', init: 'TN', act: 'started', obj: 'Full Store Audit', store: 'Lidl · Kraków', time: '3h ago', type: 'start' },
    { who: 'Aisha Khan', init: 'AK', act: 'submitted', obj: 'Merch Compliance', store: 'Boots · Manchester', time: '4h ago', type: 'submit' },
  ];

  const customers = [
    { id: 1, name: 'Tesco PLC', sector: 'Grocery', stores: 412, contact: 'James Whitfield', region: 'UK & Ireland', status: 'active', tier: 'Enterprise', accuracy: 99.3 },
    { id: 2, name: 'Carrefour Group', sector: 'Hypermarket', stores: 288, contact: 'Élodie Marchand', region: 'France', status: 'active', tier: 'Enterprise', accuracy: 99.1 },
    { id: 3, name: 'Lidl Stiftung', sector: 'Discount', stores: 196, contact: 'Hans Becker', region: 'DACH', status: 'active', tier: 'Enterprise', accuracy: 98.8 },
    { id: 4, name: 'Boots UK', sector: 'Pharmacy', stores: 134, contact: 'Priya Sharma', region: 'UK & Ireland', status: 'active', tier: 'Growth', accuracy: 99.5 },
    { id: 5, name: 'Coop Italia', sector: 'Grocery', stores: 88, contact: 'Marco Bellini', region: 'Italy', status: 'onboarding', tier: 'Growth', accuracy: 98.4 },
    { id: 6, name: 'El Corte Inglés', sector: 'Department', stores: 41, contact: 'Lucía Fernández', region: 'Iberia', status: 'active', tier: 'Growth', accuracy: 99.0 },
    { id: 7, name: 'Jumbo Supermarkten', sector: 'Grocery', stores: 67, contact: 'Daan de Vries', region: 'Benelux', status: 'paused', tier: 'Standard', accuracy: 98.2 },
    { id: 8, name: 'Rossmann GmbH', sector: 'Drugstore', stores: 58, contact: 'Greta Hoffmann', region: 'DACH', status: 'active', tier: 'Standard', accuracy: 99.2 },
  ];

  const stores = [
    { id: 'TX-4471', name: 'Tesco Extra Leeds', customer: 'Tesco PLC', city: 'Leeds, UK', terminals: 14, sqft: '92k', last: 'Today, 06:10', status: 'in-progress' },
    { id: 'CF-2208', name: 'Carrefour Lyon Part-Dieu', customer: 'Carrefour Group', city: 'Lyon, FR', terminals: 22, sqft: '118k', last: 'Today, 05:40', status: 'in-progress' },
    { id: 'LD-9912', name: 'Lidl Kraków Centrum', customer: 'Lidl Stiftung', city: 'Kraków, PL', terminals: 8, sqft: '34k', last: 'Yesterday', status: 'complete' },
    { id: 'BT-1130', name: 'Boots Manchester Arndale', customer: 'Boots UK', city: 'Manchester, UK', terminals: 11, sqft: '28k', last: 'Yesterday', status: 'complete' },
    { id: 'CI-5567', name: 'Coop Milano Porta', customer: 'Coop Italia', city: 'Milano, IT', terminals: 9, sqft: '41k', last: '2 days ago', status: 'scheduled' },
    { id: 'EC-3041', name: 'El Corte Inglés Castellana', customer: 'El Corte Inglés', city: 'Madrid, ES', terminals: 31, sqft: '210k', last: '3 days ago', status: 'scheduled' },
    { id: 'RM-7782', name: 'Rossmann Hamburg Mönckeberg', customer: 'Rossmann GmbH', city: 'Hamburg, DE', terminals: 6, sqft: '19k', last: '4 days ago', status: 'complete' },
  ];

  const forms = [
    { id: 'f1', name: 'Cycle Count \u2013 Standard', desc: 'Aisle-by-aisle SKU verification', fields: 14, status: 'published', updated: 'Today', subs: 1280, label: { t: 'Inventory', c: 'var(--rgis-blue)' } },
    { id: 'f2', name: 'Fixture Survey', desc: 'Shelf & display condition audit', fields: 22, status: 'published', updated: '2d ago', subs: 642, label: { t: 'Merch', c: 'var(--violet)' } },
    { id: 'f3', name: 'Stock Discrepancy Report', desc: 'Flag & document count variances', fields: 9, status: 'published', updated: '3d ago', subs: 318, label: { t: 'Quality', c: 'var(--rgis-red)' } },
    { id: 'f4', name: 'Full Store Audit', desc: 'Complete wall-to-wall inventory', fields: 38, status: 'draft', updated: '5h ago', subs: 0, label: { t: 'Inventory', c: 'var(--rgis-blue)' } },
    { id: 'f5', name: 'Merch Compliance Check', desc: 'Planogram adherence scoring', fields: 17, status: 'published', updated: '1w ago', subs: 489, label: { t: 'Merch', c: 'var(--violet)' } },
    { id: 'f6', name: 'Delivery Verification', desc: 'Inbound shipment reconciliation', fields: 12, status: 'draft', updated: '1w ago', subs: 0, label: { t: 'Supply', c: 'var(--green)' } },
  ];

  const tasks = [
    { id: 't1', title: 'Cycle count Tesco Extra Leeds', who: 'Mara L.', init: 'ML', due: 'Today', priority: 'high', status: 'progress', store: 'TX-4471', prog: 64 },
    { id: 't2', title: 'Fixture survey Carrefour Lyon', who: 'Dev P.', init: 'DP', due: 'Today', priority: 'high', status: 'progress', store: 'CF-2208', prog: 30 },
    { id: 't3', title: 'Review discrepancy \u2013 Coop Milano', who: 'Sofia R.', init: 'SR', due: 'Tomorrow', priority: 'med', status: 'todo', store: 'CI-5567', prog: 0 },
    { id: 't4', title: 'Schedule El Corte Inglés audit', who: 'You', init: 'AB', due: 'Jun 16', priority: 'med', status: 'todo', store: 'EC-3041', prog: 0 },
    { id: 't5', title: 'Approve weekly Boots submissions', who: 'You', init: 'AB', due: 'Jun 16', priority: 'low', status: 'todo', store: 'BT-1130', prog: 0 },
    { id: 't6', title: 'Lidl Kraków sign-off', who: 'Tomasz N.', init: 'TN', due: 'Done', priority: 'low', status: 'done', store: 'LD-9912', prog: 100 },
    { id: 't7', title: 'Publish Full Store Audit form', who: 'You', init: 'AB', due: 'Done', priority: 'med', status: 'done', store: '—', prog: 100 },
  ];

  // Capacity: regions with capacity vs demand
  const capacity = [
    { region: 'UK & Ireland', cap: 1240, demand: 1180, util: 0.95, reps: 86 },
    { region: 'France', cap: 980, demand: 1020, util: 1.04, reps: 71 },
    { region: 'DACH', cap: 1120, demand: 890, util: 0.79, reps: 78 },
    { region: 'Iberia', cap: 640, demand: 610, util: 0.95, reps: 44 },
    { region: 'Italy', cap: 520, demand: 470, util: 0.90, reps: 38 },
    { region: 'Benelux', cap: 410, demand: 300, util: 0.73, reps: 29 },
  ];
  const capacityWeeks = [
    { label: 'W23', v: 0.82 }, { label: 'W24', v: 0.88 }, { label: 'W25', v: 0.91, hl: true },
    { label: 'W26', v: 0.97 }, { label: 'W27', v: 1.03 }, { label: 'W28', v: 0.94 }, { label: 'W29', v: 0.86 },
  ];

  // Schedule advisor events
  const schedule = [
    { id: 's1', store: 'El Corte Inglés Castellana', date: 'Mon Jun 16', window: '02:00 – 08:00', reps: 24, fit: 92, status: 'best', conflicts: 0 },
    { id: 's2', store: 'Coop Milano Porta', date: 'Tue Jun 17', window: '03:00 – 07:00', reps: 9, fit: 78, status: 'good', conflicts: 1 },
    { id: 's3', store: 'Jumbo Utrecht Centraal', date: 'Wed Jun 18', window: '04:00 – 09:00', reps: 12, fit: 54, status: 'tight', conflicts: 3 },
    { id: 's4', store: 'Rossmann Hamburg', date: 'Thu Jun 19', window: '06:00 – 10:00', reps: 6, fit: 88, status: 'good', conflicts: 0 },
  ];

  const reviews = [
    { id: 'r1', form: 'Cycle Count \u2013 Aisle 7', who: 'Mara Lindqvist', init: 'ML', store: 'Tesco Extra Leeds', submitted: '4m ago', flags: 0, variance: '+0.2%', status: 'pending' },
    { id: 'r2', form: 'Stock Discrepancy', who: 'Sofia Romano', init: 'SR', store: 'Coop Milano', submitted: '1h ago', flags: 2, variance: '-3.4%', status: 'flagged' },
    { id: 'r3', form: 'Merch Compliance', who: 'Aisha Khan', init: 'AK', store: 'Boots Manchester', submitted: '4h ago', flags: 0, variance: '+0.1%', status: 'pending' },
    { id: 'r4', form: 'Fixture Survey', who: 'Dev Patel', init: 'DP', store: 'Carrefour Lyon', submitted: '5h ago', flags: 1, variance: '-1.1%', status: 'pending' },
    { id: 'r5', form: 'Delivery Verification', who: 'Tomasz Nowak', init: 'TN', store: 'Lidl Kraków', submitted: 'Yesterday', flags: 0, variance: '0.0%', status: 'pending' },
  ];

  // Forge builder palette + sample form
  const palette = [
    { group: 'Basic', items: [
      { t: 'Short Text', icon: 'text' }, { t: 'Long Text', icon: 'list' }, { t: 'Number', icon: 'hash' },
      { t: 'Dropdown', icon: 'dropdown' }, { t: 'Checkbox', icon: 'checkSquare' }, { t: 'Date', icon: 'calendar2' },
    ]},
    { group: 'Advanced', items: [
      { t: 'Barcode Scan', icon: 'box' }, { t: 'Signature', icon: 'pen' }, { t: 'Photo Capture', icon: 'image' },
      { t: 'Rating', icon: 'star' }, { t: 'Location', icon: 'pin' }, { t: 'Toggle', icon: 'toggle' },
    ]},
  ];
  const builderFields = [
    { id: 'b1', type: 'Short Text', label: 'Store ID', req: true, ph: 'e.g. TX-4471', icon: 'text' },
    { id: 'b2', type: 'Dropdown', label: 'Audit Type', req: true, opts: ['Cycle Count', 'Full Store', 'Spot Check'], icon: 'dropdown' },
    { id: 'b3', type: 'Barcode Scan', label: 'Scan SKU', req: true, ph: 'Tap to scan', icon: 'box' },
    { id: 'b4', type: 'Number', label: 'Counted Quantity', req: true, ph: '0', icon: 'hash' },
    { id: 'b5', type: 'Photo Capture', label: 'Shelf Photo', req: false, icon: 'image' },
    { id: 'b6', type: 'Signature', label: 'Auditor Signature', req: true, icon: 'pen' },
  ];

  export const DATA = { apps, kpis, submissionsTrend, accuracyByRegion, formStatus, activity, customers, stores, forms, tasks, capacity, capacityWeeks, schedule, reviews, palette, builderFields };

export { palette };
