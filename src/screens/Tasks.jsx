/* RGIS Universe — Tasks, Capacity, Schedule Helper */
import React, { useState } from 'react';
import { Icon } from '../components/Icon.jsx';
import { BarChart, Gauge, Donut } from '../components/Charts.jsx';
import { Badge, StatusBadge } from '../components/Shell.jsx';
import { useCollections } from '../api/hooks.js';
import { ScreenLoading, ScreenError } from '../components/Async.jsx';

const PRI = { high: 'var(--rgis-red)', med: 'var(--amber)', low: 'var(--text-3)' };

// ---------------- Task Manager (Kanban) ----------------
function TasksScreen() {
  const [view, setView] = useState('board');
  const { data: D, isLoading, error, refetch } = useCollections(['tasks']);
  if (isLoading) return React.createElement(ScreenLoading);
  if (error) return React.createElement(ScreenError, { error, retry: refetch });
  const cols = [
    { id: 'todo', label: 'To Do', color: 'var(--text-3)' },
    { id: 'progress', label: 'In Progress', color: 'var(--sky)' },
    { id: 'done', label: 'Done', color: 'var(--green)' },
  ];
  function Card(t) {
    return React.createElement('div', { key: t.id, className: 'kcard', style: { display: 'flex', gap: 10 } },
      React.createElement('div', { className: 'pflag', style: { background: PRI[t.priority] } }),
      React.createElement('div', { style: { flex: 1, minWidth: 0 } },
        React.createElement('div', { className: 'cell-strong', style: { fontSize: 'var(--fs-sm)', lineHeight: 1.35 } }, t.title),
        React.createElement('div', { className: 'act-meta', style: { marginTop: 7 } }, React.createElement(Icon, { name: 'store', size: 12 }), t.store, React.createElement('span', { className: 'dot-sep' }), React.createElement(Icon, { name: 'clock', size: 12 }), t.due),
        t.prog > 0 && t.prog < 100 && React.createElement('div', { className: 'mini-bar', style: { marginTop: 9 } }, React.createElement('i', { style: { width: t.prog + '%', background: 'var(--sky)' } })),
        React.createElement('div', { className: 'row', style: { justifyContent: 'space-between', marginTop: 9 } },
          React.createElement('span', { className: 'badge', style: { background: 'color-mix(in srgb,' + PRI[t.priority] + ' 14%,transparent)', color: PRI[t.priority], fontSize: 10 } }, t.priority + ' priority'),
          React.createElement('div', { className: 'avatar sm', style: { width: 22, height: 22, fontSize: 9 } }, t.init))));
  }
  return React.createElement('div', { className: 'page page-anim' },
    React.createElement('div', { className: 'page-head' },
      React.createElement('div', null, React.createElement('h1', { className: 'page-title' }, 'Task Manager'), React.createElement('p', { className: 'page-sub' }, D.tasks.filter(t => t.status !== 'done').length + ' open tasks \u00b7 ' + D.tasks.filter(t => t.priority === 'high' && t.status !== 'done').length + ' high priority')),
      React.createElement('div', { className: 'row' },
        React.createElement('div', { className: 'seg' }, [['board', 'layout'], ['list', 'list']].map(([v, ic]) => React.createElement('button', { key: v, className: view === v ? 'on' : '', onClick: () => setView(v) }, React.createElement(Icon, { name: ic, size: 15 }), v[0].toUpperCase() + v.slice(1)))),
        React.createElement('button', { className: 'btn btn-primary' }, React.createElement(Icon, { name: 'plus', size: 16 }), 'New Task'))),
    view === 'board'
      ? React.createElement('div', { className: 'kanban' }, cols.map(col => {
          const items = D.tasks.filter(t => t.status === col.id);
          return React.createElement('div', { key: col.id, className: 'kcol' },
            React.createElement('div', { className: 'kcol-head' },
              React.createElement('div', { className: 'row', style: { gap: 8 } }, React.createElement('span', { style: { width: 9, height: 9, borderRadius: 3, background: col.color } }), React.createElement('b', { style: { fontSize: 'var(--fs-sm)' } }, col.label), React.createElement('span', { className: 'badge badge-gray' }, items.length)),
              React.createElement('button', { className: 'icon-btn', style: { width: 28, height: 28 } }, React.createElement(Icon, { name: 'plus', size: 15 }))),
            React.createElement('div', { className: 'kcol-body' }, items.map(Card)));
        }))
      : React.createElement('div', { className: 'card themed tbl-wrap' }, React.createElement('table', { className: 'tbl' },
          React.createElement('thead', null, React.createElement('tr', null, ['Task', 'Assignee', 'Store', 'Due', 'Priority', 'Progress', 'Status'].map(h => React.createElement('th', { key: h }, h)))),
          React.createElement('tbody', null, D.tasks.map(t => React.createElement('tr', { key: t.id },
            React.createElement('td', { className: 'cell-strong' }, t.title),
            React.createElement('td', null, React.createElement('div', { className: 'row', style: { gap: 8 } }, React.createElement('div', { className: 'avatar sm', style: { width: 22, height: 22, fontSize: 9 } }, t.init), React.createElement('span', { className: 'cell-mut' }, t.who))),
            React.createElement('td', { className: 'tnum cell-mut' }, t.store),
            React.createElement('td', { className: 'cell-mut' }, t.due),
            React.createElement('td', null, React.createElement('span', { className: 'badge', style: { background: 'color-mix(in srgb,' + PRI[t.priority] + ' 14%,transparent)', color: PRI[t.priority] } }, t.priority)),
            React.createElement('td', null, React.createElement('div', { className: 'row', style: { gap: 8 } }, React.createElement('div', { className: 'mini-bar', style: { flex: 1, maxWidth: 80 } }, React.createElement('i', { style: { width: t.prog + '%', background: t.prog === 100 ? 'var(--green)' : 'var(--sky)' } })), React.createElement('span', { className: 'tnum dim', style: { fontSize: 11 } }, t.prog + '%'))),
            React.createElement('td', null, React.createElement(StatusBadge, { status: t.status })))))))
  );
}

// ---------------- Capacity ----------------
function CapacityScreen() {
  const { data: D, isLoading, error, refetch } = useCollections(['capacity', 'capacityWeeks']);
  if (isLoading) return React.createElement(ScreenLoading);
  if (error) return React.createElement(ScreenError, { error, retry: refetch });
  const totalCap = D.capacity.reduce((s, r) => s + r.cap, 0);
  const totalDem = D.capacity.reduce((s, r) => s + r.demand, 0);
  const util = totalDem / totalCap;
  return React.createElement('div', { className: 'page page-anim' },
    React.createElement('div', { className: 'page-head' },
      React.createElement('div', null, React.createElement('h1', { className: 'page-title' }, 'Capacity Planning'), React.createElement('p', { className: 'page-sub' }, 'Workforce capacity vs. forecast demand across regions')),
      React.createElement('div', { className: 'row' }, React.createElement('button', { className: 'btn btn-ghost' }, React.createElement(Icon, { name: 'calendar', size: 16 }), 'Q2 2026'), React.createElement('button', { className: 'btn btn-primary' }, React.createElement(Icon, { name: 'sparkles', size: 16 }), 'AI Rebalance'))),
    React.createElement('div', { className: 'dash-grid', style: { marginTop: 0, gridTemplateColumns: '1fr 1.6fr' } },
      // gauge card
      React.createElement('div', { className: 'card themed card-pad', style: { display: 'grid', placeItems: 'center', gap: 14 } },
        React.createElement('div', { className: 'eyebrow' }, 'Network Utilization'),
        React.createElement(Gauge, { value: util, size: 200, label: 'demand / capacity', color: util > 1 ? 'var(--rgis-red)' : util > 0.92 ? 'var(--amber)' : 'var(--green)' }),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, width: '100%' } },
          React.createElement('div', { style: { textAlign: 'center' } }, React.createElement('div', { className: 'head tnum', style: { fontSize: 20, fontWeight: 700 } }, totalCap.toLocaleString()), React.createElement('div', { className: 'dim', style: { fontSize: 11 } }, 'rep-hours capacity')),
          React.createElement('div', { style: { textAlign: 'center' } }, React.createElement('div', { className: 'head tnum', style: { fontSize: 20, fontWeight: 700 } }, totalDem.toLocaleString()), React.createElement('div', { className: 'dim', style: { fontSize: 11 } }, 'rep-hours demand')))),
      // weekly trend
      React.createElement('div', { className: 'card themed' },
        React.createElement('div', { className: 'card-head' }, React.createElement('div', null, React.createElement('div', { className: 'card-title' }, 'Utilization Trend'), React.createElement('div', { className: 'page-sub' }, 'Weekly, current quarter')), React.createElement('span', { className: 'badge badge-amber' }, 'W27 over capacity')),
        React.createElement('div', { className: 'card-pad', style: { paddingTop: 4 } }, React.createElement(BarChart, { data: D.capacityWeeks.map(w => ({ label: w.label, v: w.v * 100, hl: w.v > 1 })), h: 232, color: 'var(--sky)', hlColor: 'var(--rgis-red)' })))),
    React.createElement('div', { className: 'card themed', style: { marginTop: 'var(--gap)' } },
      React.createElement('div', { className: 'card-head' }, React.createElement('div', { className: 'card-title' }, 'Regional Breakdown')),
      React.createElement('div', { className: 'card-hr' }),
      React.createElement('div', { className: 'card-pad' }, D.capacity.map(r => React.createElement('div', { key: r.region, className: 'util-row', style: { gridTemplateColumns: '160px 1fr 70px 70px' } },
        React.createElement('div', null, React.createElement('div', { className: 'cell-strong', style: { fontSize: 'var(--fs-sm)' } }, r.region), React.createElement('div', { className: 'dim', style: { fontSize: 11 } }, r.reps + ' field reps')),
        React.createElement('div', { className: 'mini-bar', style: { height: 9 } }, React.createElement('i', { style: { width: Math.min(r.util, 1.2) / 1.2 * 100 + '%', background: r.util > 1 ? 'var(--rgis-red)' : r.util > 0.92 ? 'var(--amber)' : 'var(--green)' } })),
        React.createElement('div', { className: 'tnum', style: { textAlign: 'right', fontWeight: 700, color: r.util > 1 ? 'var(--rgis-red)' : 'var(--text)' } }, Math.round(r.util * 100) + '%'),
        React.createElement('div', { style: { textAlign: 'right' } }, React.createElement(Badge, { kind: r.util > 1 ? 'red' : r.util > 0.92 ? 'amber' : 'green' }, r.util > 1 ? 'Over' : r.util > 0.92 ? 'Tight' : 'Healthy'))))))
  );
}

// ---------------- Schedule Helper ----------------
function ScheduleScreen() {
  const [sel, setSel] = useState(null);
  const { data: D, isLoading, error, refetch } = useCollections(['schedule']);
  if (isLoading) return React.createElement(ScreenLoading);
  if (error) return React.createElement(ScreenError, { error, retry: refetch });
  const activeSel = sel ?? D.schedule[0].id;
  const fitColor = f => f >= 85 ? 'var(--green)' : f >= 70 ? 'var(--amber)' : 'var(--rgis-red)';
  return React.createElement('div', { className: 'page page-anim' },
    React.createElement('div', { className: 'page-head' },
      React.createElement('div', null, React.createElement('h1', { className: 'page-title' }, 'Schedule Helper'), React.createElement('p', { className: 'page-sub' }, 'AI-assisted scheduling \u00b7 fit analysis weighs capacity, travel and constraints')),
      React.createElement('button', { className: 'btn btn-primary' }, React.createElement(Icon, { name: 'sparkles', size: 16 }), 'Auto-schedule week')),
    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 'var(--gap)', alignItems: 'start' } },
      React.createElement('div', { className: 'card themed', style: { overflow: 'hidden' } },
        React.createElement('div', { className: 'card-head' }, React.createElement('div', { className: 'card-title' }, 'Proposed Events'), React.createElement('span', { className: 'dim', style: { fontSize: 11 } }, 'Sorted by fit score')),
        React.createElement('div', { className: 'card-hr' }),
        D.schedule.map(s => React.createElement('button', { key: s.id, onClick: () => setSel(s.id),
          style: { width: '100%', textAlign: 'left', display: 'flex', gap: 13, alignItems: 'center', padding: '14px var(--pad-card)', borderBottom: '1px solid var(--border-2)', background: activeSel === s.id ? 'var(--hover)' : 'transparent', borderLeft: activeSel === s.id ? '3px solid var(--rgis-red)' : '3px solid transparent' } },
          React.createElement('div', { style: { position: 'relative', display: 'grid', placeItems: 'center', width: 48, height: 48 } },
            React.createElement(Donut, { segs: [{ v: s.fit, color: fitColor(s.fit) }, { v: 100 - s.fit, color: 'var(--track)' }], size: 48, thickness: 6 }),
            React.createElement('span', { className: 'tnum', style: { position: 'absolute', fontSize: 12, fontWeight: 700 } }, s.fit)),
          React.createElement('div', { style: { flex: 1, minWidth: 0 } },
            React.createElement('div', { className: 'cell-strong', style: { fontSize: 'var(--fs-sm)' } }, s.store),
            React.createElement('div', { className: 'act-meta', style: { marginTop: 3 } }, React.createElement(Icon, { name: 'calendar', size: 12 }), s.date, React.createElement('span', { className: 'dot-sep' }), s.window),
            React.createElement('div', { className: 'act-meta', style: { marginTop: 2 } }, React.createElement(Icon, { name: 'users', size: 12 }), s.reps + ' reps', s.conflicts > 0 && React.createElement(React.Fragment, null, React.createElement('span', { className: 'dot-sep' }), React.createElement('span', { style: { color: 'var(--rgis-red)' } }, s.conflicts + ' conflict' + (s.conflicts > 1 ? 's' : ''))))),
          React.createElement(StatusBadge, { status: s.status }))),
      ),
      (() => { const s = D.schedule.find(x => x.id === activeSel); return React.createElement('div', { className: 'card themed', style: { position: 'sticky', top: 76 } },
        React.createElement('div', { className: 'card-pad', style: { display: 'grid', gap: 16 } },
          React.createElement('div', null, React.createElement('div', { className: 'eyebrow' }, 'Fit Analysis'), React.createElement('div', { className: 'card-title', style: { marginTop: 4 } }, s.store)),
          React.createElement('div', { style: { display: 'grid', placeItems: 'center', gap: 6 } },
            React.createElement(Gauge, { value: s.fit / 100, size: 180, label: 'overall fit score', color: fitColor(s.fit) })),
          React.createElement('div', { style: { display: 'grid', gap: 10 } },
            [['Capacity headroom', s.fit >= 85 ? 94 : 62, 'var(--green)'], ['Travel efficiency', s.fit >= 80 ? 88 : 54, 'var(--sky)'], ['Constraint match', s.conflicts === 0 ? 96 : 48, s.conflicts ? 'var(--amber)' : 'var(--green)']].map(([k, v, c]) =>
              React.createElement('div', { key: k },
                React.createElement('div', { className: 'row', style: { justifyContent: 'space-between', marginBottom: 5 } }, React.createElement('span', { className: 'muted', style: { fontSize: 'var(--fs-sm)' } }, k), React.createElement('b', { className: 'tnum', style: { fontSize: 'var(--fs-sm)' } }, v + '%')),
                React.createElement('div', { className: 'mini-bar', style: { height: 7 } }, React.createElement('i', { style: { width: v + '%', background: c } }))))),
          s.conflicts > 0 && React.createElement('div', { style: { background: 'var(--amber-soft)', border: '1px solid color-mix(in srgb,var(--amber) 25%,transparent)', borderRadius: 10, padding: 12, display: 'flex', gap: 10 } },
            React.createElement(Icon, { name: 'info', size: 16, style: { color: 'var(--amber)', flexShrink: 0, marginTop: 1 } }),
            React.createElement('div', { className: 'muted', style: { fontSize: 'var(--fs-sm)' } }, React.createElement('b', null, 'ARIEL suggests: '), 'shift start to 04:30 to resolve ', s.conflicts, ' rep overlap', s.conflicts > 1 ? 's' : '', ' from the Lyon event.')),
          React.createElement('div', { className: 'row' },
            React.createElement('button', { className: 'btn btn-ghost', style: { flex: 1 } }, 'Adjust'),
            React.createElement('button', { className: 'btn btn-primary', style: { flex: 1 } }, React.createElement(Icon, { name: 'check', size: 16 }), 'Confirm event'))));
      })()
    )
  );
}

export { TasksScreen, CapacityScreen, ScheduleScreen };
