/* RGIS Universe — Shell (Sidebar + Topbar) + shared UI helpers */
import React, { useState } from 'react';
import { Icon } from './Icon.jsx';

// ---- shared helpers ----
export const Badge = function Badge2({ kind = 'gray', children, pip }) {
  return React.createElement('span', { className: `badge badge-${kind}` },
    pip ? React.createElement('span', { className: 'pip', style: { background: 'currentColor' } }) : null,
    children);
};

const STATUS_MAP = {
  active: ['green', 'Active'], 'in-progress': ['blue', 'In Progress'], progress: ['blue', 'In Progress'],
  complete: ['green', 'Complete'], done: ['green', 'Done'], scheduled: ['amber', 'Scheduled'],
  onboarding: ['amber', 'Onboarding'], paused: ['gray', 'Paused'], pending: ['amber', 'Pending'],
  flagged: ['red', 'Flagged'], todo: ['gray', 'To Do'], published: ['green', 'Published'],
  draft: ['amber', 'Draft'], best: ['green', 'Best fit'], good: ['blue', 'Good'], tight: ['red', 'Tight'],
};
export const StatusBadge = function ({ status }) {
  const [kind, label] = STATUS_MAP[status] || ['gray', status];
  return React.createElement(Badge, { kind, pip: true }, label);
};

const NAV_GROUPS = [
  { sect: null, items: [{ id: 'hub', label: 'Universe Hub', icon: 'layers' }, { id: 'dashboard', label: 'Dashboard', icon: 'home' }] },
  { sect: 'Build', items: [{ id: 'forge', label: 'Forge', icon: 'forge' }, { id: 'reviews', label: 'Pending Reviews', icon: 'clipboard', badge: 5 }] },
  { sect: 'Operations', items: [{ id: 'tasks', label: 'Task Manager', icon: 'checkSquare', badge: 8 }, { id: 'capacity', label: 'Capacity', icon: 'gauge' }, { id: 'schedule', label: 'Schedule Helper', icon: 'calCheck' }] },
  { sect: 'Directory', items: [{ id: 'customers', label: 'Customers', icon: 'users' }, { id: 'stores', label: 'Stores', icon: 'store' }] },
  { sect: 'System', items: [{ id: 'admin', label: 'Admin Console', icon: 'shield' }] },
];

function Sidebar({ route, go, collapsed, setCollapsed }) {
  return React.createElement('aside', { className: 'rail themed' + (collapsed ? ' collapsed' : '') },
    React.createElement('div', { className: 'rail-top' },
      React.createElement('div', { className: 'rail-logo' }, 'R'),
      !collapsed && React.createElement('div', { className: 'rail-word' }, 'RGIS', React.createElement('small', null, 'Universe'))
    ),
    React.createElement('div', { className: 'rail-scroll' },
      NAV_GROUPS.map((g, gi) => React.createElement(React.Fragment, { key: gi },
        g.sect && React.createElement('div', { className: 'rail-sect' }, g.sect),
        g.items.map(it => React.createElement('button', {
          key: it.id, className: 'nav' + (route === it.id ? ' active' : ''), onClick: () => go(it.id),
          title: collapsed ? it.label : undefined,
        },
          React.createElement(Icon, { name: it.icon, size: 18 }),
          React.createElement('span', { className: 'label' }, it.label),
          it.badge ? React.createElement('span', { className: 'nav-badge' }, it.badge) : null
        ))
      ))
    ),
    React.createElement('div', { className: 'rail-foot' },
      React.createElement('div', { className: 'rail-user' },
        React.createElement('div', { className: 'avatar' }, 'AB'),
        !collapsed && React.createElement('div', { style: { minWidth: 0, flex: 1 } },
          React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: '#fff', whiteSpace: 'nowrap' } }, 'Adrian Bell'),
          React.createElement('div', { style: { fontSize: 11, color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap' } }, 'Regional Supervisor')
        ),
        !collapsed && React.createElement(Icon, { name: 'chevUD', size: 15, style: { color: 'rgba(255,255,255,0.4)' } })
      ),
      React.createElement('button', {
        className: 'nav', style: { marginTop: 4 }, onClick: () => setCollapsed(c => !c), title: 'Toggle sidebar',
      }, React.createElement(Icon, { name: collapsed ? 'chevR' : 'chevL', size: 18 }), React.createElement('span', { className: 'label' }, 'Collapse'))
    )
  );
}

const ROUTE_LABEL = {
  hub: 'Universe Hub', dashboard: 'Dashboard', forge: 'Forge', builder: 'Forge', reviews: 'Pending Reviews',
  tasks: 'Task Manager', capacity: 'Capacity', schedule: 'Schedule Helper', customers: 'Customers',
  stores: 'Stores', admin: 'Admin Console', assistant: 'ARIEL Assistant',
};

function Topbar({ route, theme, setTheme, density, setDensity, onAssistant, sub }) {
  return React.createElement('header', { className: 'topbar themed' },
    React.createElement('div', { className: 'crumbs' },
      React.createElement('span', null, 'RGIS'),
      React.createElement(Icon, { name: 'chevR', size: 13 }),
      React.createElement('b', null, ROUTE_LABEL[route] || ''),
      sub && React.createElement(React.Fragment, null, React.createElement(Icon, { name: 'chevR', size: 13 }), React.createElement('span', null, sub))
    ),
    React.createElement('div', { className: 'spacer' }),
    React.createElement('label', { className: 'searchbox', style: { maxWidth: 320 } },
      React.createElement(Icon, { name: 'search', size: 16 }),
      React.createElement('input', { placeholder: 'Search stores, forms, people…' }),
      React.createElement('kbd', null, '⌘K')
    ),
    // density control
    React.createElement('div', { className: 'seg', title: 'Display density' },
      [['compact', 'list'], ['comfortable', 'layout'], ['spacious', 'grid']].map(([d, ic]) =>
        React.createElement('button', { key: d, className: density === d ? 'on' : '', onClick: () => setDensity(d), title: d[0].toUpperCase() + d.slice(1) },
          React.createElement(Icon, { name: ic, size: 15 })))
    ),
    // theme toggle
    React.createElement('div', { className: 'seg' },
      React.createElement('button', { className: theme === 'light' ? 'on' : '', onClick: () => setTheme('light'), title: 'Light' }, React.createElement(Icon, { name: 'sun', size: 15 })),
      React.createElement('button', { className: theme === 'dark' ? 'on' : '', onClick: () => setTheme('dark'), title: 'Dark' }, React.createElement(Icon, { name: 'moon', size: 15 }))
    ),
    React.createElement('button', { className: 'icon-btn' }, React.createElement(Icon, { name: 'bell', size: 17 }), React.createElement('span', { className: 'dot' })),
    React.createElement('button', { className: 'btn btn-primary', onClick: onAssistant, style: { paddingLeft: 13, paddingRight: 15 } },
      React.createElement(Icon, { name: 'sparkles', size: 16 }), 'ARIEL')
  );
}

export { Sidebar };
export { Topbar };
