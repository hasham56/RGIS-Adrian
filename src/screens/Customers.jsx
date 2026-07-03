/* RGIS Universe — Customers, Stores, Reviews */
import React, { useState } from 'react';
import { Icon } from '../components/Icon.jsx';
import { StatusBadge as SB } from '../components/Shell.jsx';
import { useCollections } from '../api/hooks.js';
import { ScreenLoading, ScreenError } from '../components/Async.jsx';

function Toolbar({ search, chips, right }) {
  return React.createElement('div', { className: 'toolbar' },
    React.createElement('label', { className: 'searchbox', style: { maxWidth: 280, flex: 'unset' } }, React.createElement(Icon, { name: 'search', size: 16 }), React.createElement('input', { placeholder: search })),
    (chips || []).map((c, i) => React.createElement('button', { key: i, className: 'chip' + (c.on ? ' on' : '') }, c.icon && React.createElement(Icon, { name: c.icon, size: 14 }), c.label, React.createElement(Icon, { name: 'chevD', size: 13 }))),
    React.createElement('div', { className: 'spacer' }),
    right);
}

function MiniStat({ label, value, sub, color }) {
  return React.createElement('div', { className: 'card themed card-pad', style: { display: 'flex', flexDirection: 'column', gap: 3 } },
    React.createElement('span', { className: 'eyebrow' }, label),
    React.createElement('span', { className: 'head tnum', style: { fontSize: 24, fontWeight: 700, letterSpacing: '-0.03em', color: color || 'var(--text)' } }, value),
    sub && React.createElement('span', { className: 'dim', style: { fontSize: 11 } }, sub));
}

// ---------------- Customers ----------------
function CustomersScreen() {
  const { data: D, isLoading, error, refetch } = useCollections(['customers']);
  if (isLoading) return React.createElement(ScreenLoading);
  if (error) return React.createElement(ScreenError, { error, retry: refetch });
  return React.createElement('div', { className: 'page page-anim' },
    React.createElement('div', { className: 'page-head' },
      React.createElement('div', null, React.createElement('h1', { className: 'page-title' }, 'Customers'), React.createElement('p', { className: 'page-sub' }, D.customers.length + ' retailer accounts \u00b7 ' + D.customers.reduce((s, c) => s + c.stores, 0).toLocaleString() + ' stores under contract')),
      React.createElement('div', { className: 'row' }, React.createElement('button', { className: 'btn btn-ghost' }, React.createElement(Icon, { name: 'upload', size: 16 }), 'Import'), React.createElement('button', { className: 'btn btn-primary' }, React.createElement(Icon, { name: 'plus', size: 16 }), 'New Customer'))),
    React.createElement('div', { className: 'dash-grid-3', style: { marginTop: 0, marginBottom: 'var(--gap)' } },
      React.createElement(MiniStat, { label: 'Active accounts', value: D.customers.filter(c => c.status === 'active').length, sub: 'of ' + D.customers.length + ' total', color: 'var(--green)' }),
      React.createElement(MiniStat, { label: 'Enterprise tier', value: D.customers.filter(c => c.tier === 'Enterprise').length, sub: 'highest volume' }),
      React.createElement(MiniStat, { label: 'Avg accuracy', value: '99.1%', sub: 'across all accounts', color: 'var(--rgis-blue)' })),
    React.createElement(Toolbar, { search: 'Search customers…', chips: [{ label: 'Region', icon: 'globe' }, { label: 'Tier', icon: 'star' }, { label: 'Status' }], right: React.createElement('button', { className: 'chip' }, React.createElement(Icon, { name: 'sliders', size: 14 }), 'Columns') }),
    React.createElement('div', { className: 'card themed tbl-wrap' },
      React.createElement('table', { className: 'tbl' },
        React.createElement('thead', null, React.createElement('tr', null, ['Customer', 'Sector', 'Stores', 'Region', 'Primary Contact', 'Accuracy', 'Status', ''].map(h => React.createElement('th', { key: h }, h)))),
        React.createElement('tbody', null, D.customers.map(c => React.createElement('tr', { key: c.id },
          React.createElement('td', null, React.createElement('div', { className: 'r-media' }, React.createElement('span', { className: 'r-ico', style: { background: 'var(--blue-soft)', color: 'var(--rgis-blue)' } }, c.name.slice(0, 2).toUpperCase()),
            React.createElement('div', null, React.createElement('div', { className: 'cell-strong' }, c.name), React.createElement('div', { className: 'r-sub' }, c.tier + ' tier')))),
          React.createElement('td', { className: 'cell-mut' }, c.sector),
          React.createElement('td', { className: 'tnum cell-strong' }, c.stores),
          React.createElement('td', { className: 'cell-mut' }, c.region),
          React.createElement('td', { className: 'cell-mut' }, c.contact),
          React.createElement('td', null, React.createElement('div', { className: 'row', style: { gap: 8 } }, React.createElement('div', { className: 'mini-bar', style: { flex: 1, maxWidth: 70 } }, React.createElement('i', { style: { width: ((c.accuracy - 95) / 5 * 100) + '%', background: c.accuracy >= 99 ? 'var(--green)' : 'var(--amber)' } })), React.createElement('span', { className: 'tnum', style: { fontSize: 'var(--fs-xs)', fontWeight: 600 } }, c.accuracy + '%'))),
          React.createElement('td', null, React.createElement(SB, { status: c.status })),
          React.createElement('td', null, React.createElement('button', { className: 'icon-btn', style: { width: 30, height: 30 } }, React.createElement(Icon, { name: 'moreH', size: 15 }))))))))
  );
}

// ---------------- Stores ----------------
function StoresScreen() {
  const { data: D, isLoading, error, refetch } = useCollections(['stores']);
  if (isLoading) return React.createElement(ScreenLoading);
  if (error) return React.createElement(ScreenError, { error, retry: refetch });
  return React.createElement('div', { className: 'page page-anim' },
    React.createElement('div', { className: 'page-head' },
      React.createElement('div', null, React.createElement('h1', { className: 'page-title' }, 'Stores'), React.createElement('p', { className: 'page-sub' }, 'Store network, terminals and audit coverage')),
      React.createElement('div', { className: 'row' }, React.createElement('button', { className: 'btn btn-ghost' }, React.createElement(Icon, { name: 'map', size: 16 }), 'Map view'), React.createElement('button', { className: 'btn btn-primary' }, React.createElement(Icon, { name: 'plus', size: 16 }), 'Add Store'))),
    React.createElement('div', { className: 'dash-grid-3', style: { marginTop: 0, marginBottom: 'var(--gap)', gridTemplateColumns: 'repeat(4,1fr)' } },
      React.createElement(MiniStat, { label: 'Total stores', value: '1,284', color: 'var(--rgis-blue)' }),
      React.createElement(MiniStat, { label: 'In progress', value: D.stores.filter(s => s.status === 'in-progress').length, color: 'var(--sky)' }),
      React.createElement(MiniStat, { label: 'Scheduled', value: D.stores.filter(s => s.status === 'scheduled').length, color: 'var(--amber)' }),
      React.createElement(MiniStat, { label: 'Completed today', value: '47', color: 'var(--green)' })),
    React.createElement(Toolbar, { search: 'Search stores…', chips: [{ label: 'Customer', icon: 'users' }, { label: 'Status' }, { label: 'City', icon: 'pin' }], right: React.createElement('button', { className: 'btn btn-ghost btn-sm' }, React.createElement(Icon, { name: 'download', size: 15 }), 'Export') }),
    React.createElement('div', { className: 'card themed tbl-wrap' },
      React.createElement('table', { className: 'tbl' },
        React.createElement('thead', null, React.createElement('tr', null, ['Store', 'ID', 'Customer', 'Location', 'Terminals', 'Sales Floor', 'Last Audit', 'Status'].map(h => React.createElement('th', { key: h }, h)))),
        React.createElement('tbody', null, D.stores.map(s => React.createElement('tr', { key: s.id },
          React.createElement('td', null, React.createElement('div', { className: 'r-media' }, React.createElement('span', { className: 'r-ico', style: { background: 'var(--surface-3)' } }, React.createElement(Icon, { name: 'store', size: 15 })), React.createElement('div', { className: 'cell-strong' }, s.name))),
          React.createElement('td', { className: 'tnum cell-mut' }, s.id),
          React.createElement('td', { className: 'cell-mut' }, s.customer),
          React.createElement('td', { className: 'cell-mut' }, s.city),
          React.createElement('td', { className: 'tnum' }, s.terminals),
          React.createElement('td', { className: 'tnum cell-mut' }, s.sqft + ' ft\u00b2'),
          React.createElement('td', { className: 'cell-mut' }, s.last),
          React.createElement('td', null, React.createElement(SB, { status: s.status })))))))
  );
}

// ---------------- Reviews ----------------
function ReviewsScreen() {
  const { data: D, isLoading, error, refetch } = useCollections(['reviews']);
  const [open, setOpen] = useState(null);
  if (isLoading) return React.createElement(ScreenLoading);
  if (error) return React.createElement(ScreenError, { error, retry: refetch });
  const activeOpen = open ?? D.reviews[0].id;
  return React.createElement('div', { className: 'page page-anim' },
    React.createElement('div', { className: 'page-head' },
      React.createElement('div', null, React.createElement('h1', { className: 'page-title' }, 'Pending Reviews'), React.createElement('p', { className: 'page-sub' }, D.reviews.length + ' submissions awaiting your sign-off \u00b7 ' + D.reviews.filter(r => r.flags > 0).length + ' flagged')),
      React.createElement('div', { className: 'row' }, React.createElement('button', { className: 'btn btn-ghost' }, React.createElement(Icon, { name: 'filter', size: 16 }), 'Filter'), React.createElement('button', { className: 'btn btn-primary' }, React.createElement(Icon, { name: 'check', size: 16 }), 'Approve all clear'))),
    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--gap)', alignItems: 'start' } },
      // list
      React.createElement('div', { className: 'card themed', style: { overflow: 'hidden' } },
        D.reviews.map(r => React.createElement('button', { key: r.id, onClick: () => setOpen(r.id),
          style: { width: '100%', textAlign: 'left', display: 'flex', gap: 12, padding: '13px var(--pad-card)', borderBottom: '1px solid var(--border-2)', background: activeOpen === r.id ? 'var(--hover)' : 'transparent', borderLeft: activeOpen === r.id ? '3px solid var(--rgis-red)' : '3px solid transparent' } },
          React.createElement('div', { className: 'avatar sm', style: { marginTop: 2 } }, r.init),
          React.createElement('div', { style: { flex: 1, minWidth: 0 } },
            React.createElement('div', { className: 'row', style: { justifyContent: 'space-between' } }, React.createElement('span', { className: 'cell-strong', style: { fontSize: 'var(--fs-sm)' } }, r.form), r.flags > 0 ? React.createElement('span', { className: 'badge badge-red' }, React.createElement(Icon, { name: 'flag', size: 11 }), r.flags) : React.createElement(SB, { status: 'pending' })),
            React.createElement('div', { className: 'act-meta', style: { marginTop: 3 } }, r.who, React.createElement('span', { className: 'dot-sep' }), r.store),
            React.createElement('div', { className: 'act-meta', style: { marginTop: 2 } }, React.createElement(Icon, { name: 'clock', size: 11 }), r.submitted, React.createElement('span', { className: 'dot-sep' }), 'Variance ', React.createElement('b', { style: { color: r.variance.startsWith('-') ? 'var(--rgis-red)' : 'var(--text-2)' } }, r.variance)))))),
      // detail
      (() => { const r = D.reviews.find(x => x.id === activeOpen); return React.createElement('div', { className: 'card themed', style: { position: 'sticky', top: 76 } },
        React.createElement('div', { className: 'card-head' },
          React.createElement('div', null, React.createElement('div', { className: 'card-title' }, r.form), React.createElement('div', { className: 'page-sub' }, r.store + ' \u00b7 submitted ' + r.submitted)),
          r.flags > 0 ? React.createElement('span', { className: 'badge badge-red' }, React.createElement(Icon, { name: 'flag', size: 11 }), r.flags + ' flag' + (r.flags > 1 ? 's' : '')) : React.createElement('span', { className: 'badge badge-green' }, 'All clear')),
        React.createElement('div', { className: 'card-hr' }),
        React.createElement('div', { className: 'card-pad', style: { display: 'grid', gap: 14 } },
          React.createElement('div', { className: 'row', style: { gap: 12 } },
            React.createElement('div', { className: 'avatar sm' }, r.init),
            React.createElement('div', null, React.createElement('div', { className: 'cell-strong', style: { fontSize: 'var(--fs-sm)' } }, r.who), React.createElement('div', { className: 'dim', style: { fontSize: 11 } }, 'Field auditor'))),
          React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 } },
            [['Count variance', r.variance], ['SKUs counted', '1,842'], ['Duration', '2h 14m'], ['Signature', 'Captured']].map(([k, v]) => React.createElement('div', { key: k, style: { background: 'var(--surface-2)', border: '1px solid var(--border-2)', borderRadius: 9, padding: 12 } },
              React.createElement('div', { className: 'eyebrow', style: { fontSize: 9 } }, k), React.createElement('div', { className: 'head', style: { fontWeight: 600, marginTop: 4 } }, v)))),
          r.flags > 0 && React.createElement('div', { style: { background: 'var(--red-soft)', border: '1px solid color-mix(in srgb,var(--rgis-red) 25%,transparent)', borderRadius: 10, padding: 13, display: 'flex', gap: 10 } },
            React.createElement(Icon, { name: 'alert', size: 17, style: { color: 'var(--rgis-red)', flexShrink: 0, marginTop: 1 } }),
            React.createElement('div', null, React.createElement('div', { className: 'cell-strong', style: { color: 'var(--rgis-red)', fontSize: 'var(--fs-sm)' } }, 'Variance exceeds 3% threshold'), React.createElement('div', { className: 'muted', style: { fontSize: 'var(--fs-sm)', marginTop: 3 } }, 'Aisle 12 (Beverages) shows a -84 unit discrepancy. ARIEL recommends a recount before approval.'))),
          React.createElement('div', { className: 'row', style: { marginTop: 4 } },
            React.createElement('button', { className: 'btn btn-ghost', style: { flex: 1 } }, React.createElement(Icon, { name: 'x', size: 16 }), 'Reject'),
            React.createElement('button', { className: 'btn btn-ghost', style: { flex: 1 } }, React.createElement(Icon, { name: 'refresh', size: 16 }), 'Recount'),
            React.createElement('button', { className: 'btn btn-primary', style: { flex: 1 } }, React.createElement(Icon, { name: 'check', size: 16 }), 'Approve'))));
      })()
    )
  );
}

export { CustomersScreen, StoresScreen, ReviewsScreen };
