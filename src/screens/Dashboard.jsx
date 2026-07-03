/* RGIS Universe — Dashboard */
import React from 'react';
import { Icon } from '../components/Icon.jsx';
import { AreaChart, BarChart, Donut, Spark } from '../components/Charts.jsx';
import { useCollections } from '../api/hooks.js';
import { ScreenLoading, ScreenError } from '../components/Async.jsx';

function KPICard({ k }) {
  const up = k.delta >= 0;
  return React.createElement('div', { className: 'kpi themed' },
    React.createElement('div', { className: 'kpi-top' },
      React.createElement('span', { className: 'kpi-ico', style: { background: k.soft, color: k.color } }, React.createElement(Icon, { name: k.icon, size: 17 })),
      React.createElement('span', { className: 'kpi-delta ' + (up ? 'up' : 'down') },
        React.createElement(Icon, { name: up ? 'trendUp' : 'trendDown', size: 12 }),
        (up ? '+' : '') + k.delta + (typeof k.value === 'string' && k.value.includes('%') ? 'pp' : '%'))
    ),
    React.createElement('div', { className: 'kpi-val tnum' }, k.value),
    React.createElement('div', { className: 'kpi-label' }, k.label),
    React.createElement('div', { className: 'kpi-spark' }, React.createElement(Spark, { data: k.spark, w: 110, h: 40, color: k.color }))
  );
}

function DashboardScreen() {
  const { data: D, isLoading, error, refetch } = useCollections(['kpis', 'submissionsTrend', 'accuracyByRegion', 'formStatus', 'activity']);
  if (isLoading) return React.createElement(ScreenLoading);
  if (error) return React.createElement(ScreenError, { error, retry: refetch });
  return React.createElement('div', { className: 'page page-anim' },
    React.createElement('div', { className: 'page-head' },
      React.createElement('div', null,
        React.createElement('h1', { className: 'page-title' }, 'Operational Overview'),
        React.createElement('p', { className: 'page-sub' }, 'Live metrics and field activity across all RGIS audit programs · updated 2 min ago')),
      React.createElement('div', { className: 'row' },
        React.createElement('button', { className: 'btn btn-ghost' }, React.createElement(Icon, { name: 'calendar', size: 16 }), 'This week'),
        React.createElement('button', { className: 'btn btn-ghost' }, React.createElement(Icon, { name: 'download', size: 16 }), 'Export'),
        React.createElement('button', { className: 'btn btn-primary' }, React.createElement(Icon, { name: 'refresh', size: 16 }), 'Refresh'))
    ),
    // KPIs
    React.createElement('div', { className: 'kpi-row' }, D.kpis.map(k => React.createElement(KPICard, { key: k.id, k }))),
    // Main grid: trend + donut
    React.createElement('div', { className: 'dash-grid' },
      React.createElement('div', { className: 'card themed' },
        React.createElement('div', { className: 'card-head' },
          React.createElement('div', null,
            React.createElement('div', { className: 'card-title' }, 'Submissions & Approvals'),
            React.createElement('div', { className: 'page-sub' }, 'Last 7 days')),
          React.createElement('div', { className: 'legend' },
            React.createElement('span', null, React.createElement('i', { style: { background: 'var(--rgis-red)' } }), 'Submitted'),
            React.createElement('span', null, React.createElement('i', { style: { background: 'var(--rgis-blue)' } }), 'Approved'))),
        React.createElement('div', { className: 'card-pad', style: { paddingTop: 4 } },
          React.createElement(AreaChart, { data: D.submissionsTrend, h: 244, dual: true }))
      ),
      React.createElement('div', { className: 'card themed' },
        React.createElement('div', { className: 'card-head' }, React.createElement('div', { className: 'card-title' }, 'Form Library')),
        React.createElement('div', { className: 'card-pad', style: { display: 'grid', placeItems: 'center', gap: 18 } },
          React.createElement(Donut, { segs: D.formStatus, size: 168, thickness: 20,
            center: React.createElement('div', null,
              React.createElement('div', { className: 'head tnum', style: { fontSize: 30, fontWeight: 700, letterSpacing: '-0.03em' } }, '69'),
              React.createElement('div', { className: 'dim', style: { fontSize: 11 } }, 'total forms')) }),
          React.createElement('div', { style: { width: '100%', display: 'grid', gap: 8 } },
            D.formStatus.map((s, i) => React.createElement('div', { key: i, className: 'row', style: { justifyContent: 'space-between' } },
              React.createElement('span', { className: 'row', style: { gap: 8 } }, React.createElement('i', { style: { width: 9, height: 9, borderRadius: 3, background: s.color, display: 'inline-block' } }), React.createElement('span', { style: { fontSize: 'var(--fs-sm)' } }, s.label)),
              React.createElement('b', { className: 'tnum', style: { fontSize: 'var(--fs-sm)' } }, s.v)))))
      )
    ),
    // Bottom grid: region bars + activity
    React.createElement('div', { className: 'dash-grid', style: { gridTemplateColumns: '1fr 1.2fr' } },
      React.createElement('div', { className: 'card themed' },
        React.createElement('div', { className: 'card-head' },
          React.createElement('div', { className: 'card-title' }, 'Count Accuracy by Region'),
          React.createElement('span', { className: 'badge badge-amber' }, 'South needs attention')),
        React.createElement('div', { className: 'card-pad', style: { paddingTop: 4 } },
          React.createElement(BarChart, { data: D.accuracyByRegion, h: 224 }))
      ),
      React.createElement('div', { className: 'card themed' },
        React.createElement('div', { className: 'card-head' },
          React.createElement('div', { className: 'card-title' }, 'Recent Activity'),
          React.createElement('button', { className: 'btn btn-sm btn-outline' }, 'View all')),
        React.createElement('div', { style: { maxHeight: 300, overflowY: 'auto' } },
          D.activity.map((a, i) => React.createElement('div', { key: i, className: 'act' },
            React.createElement('div', { className: 'avatar sm', style: a.type === 'ai' ? { background: 'linear-gradient(135deg,var(--violet),var(--rgis-blue))' } : {} }, a.init),
            React.createElement('div', { className: 'act-body' },
              React.createElement('div', { className: 'act-main' }, React.createElement('b', null, a.who), ' ' + a.act + ' ', React.createElement('b', null, a.obj)),
              React.createElement('div', { className: 'act-meta' }, React.createElement(Icon, { name: 'store', size: 12 }), a.store, React.createElement('span', { className: 'dot-sep' }), a.time)),
            React.createElement('span', { className: 'badge badge-' + ({ submit: 'blue', approve: 'green', flag: 'red', ai: 'gray', start: 'amber' }[a.type] || 'gray'), style: { alignSelf: 'center' } }, a.act))))
      )
    )
  );
}

export { DashboardScreen };
