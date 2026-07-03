/* RGIS Universe — Hub (app launcher) */
import React from 'react';
import { Icon } from '../components/Icon.jsx';
import { Spark } from '../components/Charts.jsx';
import { useCollections } from '../api/hooks.js';
import { ScreenLoading, ScreenError } from '../components/Async.jsx';

function AppTile({ app, go }) {
  return React.createElement('button', {
    className: 'card hub-tile', onClick: () => go(app.id),
  },
    React.createElement('div', { className: 'hub-tile-top' },
      React.createElement('span', { className: 'hub-ico', style: { background: 'color-mix(in srgb,' + app.color + ' 14%, transparent)', color: app.color } },
        React.createElement(Icon, { name: app.icon, size: 22 })),
      app.badge && React.createElement('span', { className: 'badge badge-gray', style: { fontSize: 10 } }, app.badge)
    ),
    React.createElement('div', { className: 'hub-tile-name head' }, app.name),
    React.createElement('div', { className: 'hub-tile-desc' }, app.desc),
    React.createElement('div', { className: 'hub-tile-foot' },
      React.createElement('span', { className: 'eyebrow', style: { fontSize: 9 } }, app.tag),
      React.createElement('span', { className: 'hub-go' }, 'Open', React.createElement(Icon, { name: 'arrowR', size: 14 }))
    )
  );
}

function HubScreen({ go }) {
  const { data: D, isLoading, error, refetch } = useCollections(['apps']);
  if (isLoading) return React.createElement(ScreenLoading);
  if (error) return React.createElement(ScreenError, { error, retry: refetch });
  const hour = new Date().getHours();
  const greet = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const stats = [
    { label: 'Active audits', value: '34', icon: 'activity', color: 'var(--rgis-red)', spark: [18, 22, 20, 26, 30, 28, 34] },
    { label: 'Stores covered', value: '1,284', icon: 'store', color: 'var(--rgis-blue)', spark: [1190, 1210, 1230, 1240, 1260, 1270, 1284] },
    { label: 'Count accuracy', value: '99.4%', icon: 'target', color: 'var(--green)', spark: [98.6, 98.9, 99, 99.1, 99.2, 99.3, 99.4] },
    { label: 'Awaiting review', value: '5', icon: 'clipboard', color: 'var(--amber)', spark: [3, 4, 2, 5, 4, 6, 5] },
  ];
  return React.createElement('div', { className: 'page page-anim' },
    // Hero banner
    React.createElement('div', { className: 'hub-hero card' },
      React.createElement('div', { className: 'hub-hero-glow' }),
      React.createElement('div', { style: { position: 'relative', zIndex: 1 } },
        React.createElement('div', { className: 'eyebrow', style: { color: 'rgba(255,255,255,0.6)' } }, 'RGIS Universe'),
        React.createElement('h1', { className: 'hub-hero-title' }, greet + ', Adrian.'),
        React.createElement('p', { className: 'hub-hero-sub' }, 'Your field operations are running smoothly. 34 audits in progress across 6 regions, with count accuracy holding at 99.4%.'),
        React.createElement('div', { className: 'row', style: { marginTop: 18, gap: 10 } },
          React.createElement('button', { className: 'btn', style: { background: '#fff', color: 'var(--rgis-blue)' }, onClick: () => go('dashboard') },
            React.createElement(Icon, { name: 'home', size: 16 }), 'Open Dashboard'),
          React.createElement('button', { className: 'btn', style: { background: 'rgba(255,255,255,0.14)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }, onClick: () => go('forge') },
            React.createElement(Icon, { name: 'plus', size: 16 }), 'New Form')
        )
      ),
      React.createElement('div', { className: 'hub-hero-stats' },
        stats.map((s, i) => React.createElement('div', { key: i, className: 'hub-stat' },
          React.createElement('div', { className: 'row', style: { justifyContent: 'space-between' } },
            React.createElement(Icon, { name: s.icon, size: 16, style: { color: 'rgba(255,255,255,0.7)' } }),
            React.createElement(Spark, { data: s.spark, w: 56, h: 22, color: 'rgba(255,255,255,0.85)', fillArea: false })),
          React.createElement('div', { className: 'hub-stat-val head tnum' }, s.value),
          React.createElement('div', { className: 'hub-stat-label' }, s.label)
        ))
      )
    ),
    // App grid
    React.createElement('div', { className: 'page-head', style: { marginTop: 26 } },
      React.createElement('div', null,
        React.createElement('div', { className: 'eyebrow' }, 'Applications'),
        React.createElement('h2', { className: 'page-title', style: { fontSize: 20, marginTop: 4 } }, 'Your apps')),
      React.createElement('label', { className: 'searchbox', style: { maxWidth: 260 } },
        React.createElement(Icon, { name: 'search', size: 16 }), React.createElement('input', { placeholder: 'Filter apps…' }))
    ),
    React.createElement('div', { className: 'hub-grid' },
      D.apps.map(app => React.createElement(AppTile, { key: app.id, app, go }))
    )
  );
}

export { HubScreen };
