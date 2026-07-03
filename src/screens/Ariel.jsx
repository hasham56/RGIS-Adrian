/* RGIS Universe — ARIEL assistant, Admin, Landing */
import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '../components/Icon.jsx';
import { Badge, StatusBadge } from '../components/Shell.jsx';

const CTX = {
  dashboard: { greet: "Hi Adrian — your dashboard is live. Submissions are up 14% week-over-week and accuracy is holding at 99.4%. Want me to dig into the South region dip?", chips: [['View sync queue latency', 'activity'], ['Run brand compliance scan', 'shield'], ['Summarize today\u2019s activity', 'list']] },
  forge: { greet: "Welcome to Forge. I can clone a template, draft a compliance layout, or add an offline checklist block to any form. What are we building?", chips: [['Draft a new audit form', 'forge'], ['Clone compliance template', 'copy'], ['Lock immutable snapshot', 'shield']] },
  builder: { greet: "Editing the Cycle Count form. I can add a signature block, validate offline storage, or suggest fields based on the audit type.", chips: [['Add signature block', 'pen'], ['Add barcode scan field', 'box'], ['Test offline storage', 'shield']] },
  reviews: { greet: "5 submissions await sign-off, 2 are flagged. The Coop Milano discrepancy exceeds the 3% threshold — I'd recount before approving.", chips: [['Filter flagged only', 'flag'], ['Bundle approvals as PDF', 'download'], ['Explain variance', 'info']] },
  capacity: { greet: "France is running at 104% — over capacity for W27. I can rebalance 40 rep-hours from DACH, which has headroom. Shall I model it?", chips: [['Model DACH rebalance', 'gauge'], ['Forecast next quarter', 'trendUp'], ['Export capacity plan', 'download']] },
  schedule: { greet: "I scored 4 proposed events. El Corte Inglés is your best fit at 92%. The Jumbo Utrecht slot has 3 conflicts — want me to resolve them?", chips: [['Resolve Utrecht conflicts', 'calCheck'], ['Auto-schedule the week', 'sparkles'], ['Optimize for travel', 'map']] },
  tasks: { greet: "8 open tasks, 2 high priority and due today. Mara's Leeds count is 64% done. Want me to reassign the overdue Coop review?", chips: [['Reassign overdue tasks', 'users'], ['Create task from email', 'mail'], ['Summarize my day', 'list']] },
  customers: { greet: "Viewing the customer directory. I can import a retailer spreadsheet, audit account tiers, or surface accounts below 99% accuracy.", chips: [['Import customer list', 'upload'], ['Flag low-accuracy accounts', 'alert'], ['Draft QBR summary', 'file']] },
  stores: { greet: "1,284 stores in the network. I can map today's audit coverage, find stores overdue for a count, or register a new terminal batch.", chips: [['Find overdue stores', 'clock'], ['Map today\u2019s coverage', 'map'], ['Register terminals', 'box']] },
  hub: { greet: "Welcome to the Universe. Everything's connected here — ask me anything across audits, forms, schedules or customers and I'll route it.", chips: [['What needs my attention?', 'alert'], ['Open Dashboard', 'home'], ['Start a new audit', 'play']] },
  admin: { greet: "Admin console. I can audit user roles, review the ACL changes log, or check system health across services.", chips: [['Audit user roles', 'shield'], ['Review ACL changes', 'list'], ['Check system health', 'activity']] },
};

function ARIEL({ route, onClose }) {
  const ctx = CTX[route] || CTX.hub;
  const [msgs, setMsgs] = useState([{ me: false, text: ctx.greet }]);
  const bodyRef = useRef(null);
  useEffect(() => { setMsgs([{ me: false, text: ctx.greet }]); }, [route]);
  useEffect(() => { if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight; }, [msgs]);
  function send(text) {
    if (!text.trim()) return;
    setMsgs(m => [...m, { me: true, text }]);
    setTimeout(() => setMsgs(m => [...m, { me: false, text: 'On it — analyzing "' + text + '" across your audit data now. I\u2019ll surface the results inline and flag anything that needs a decision.' }]), 500);
  }
  const [draft, setDraft] = useState('');
  return React.createElement(React.Fragment, null,
    React.createElement('div', { className: 'scrim', onClick: onClose }),
    React.createElement('div', { className: 'ariel themed' },
      React.createElement('div', { className: 'ariel-head' },
        React.createElement('div', { className: 'ariel-orb' }, React.createElement(Icon, { name: 'sparkles', size: 20 })),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { className: 'head', style: { fontWeight: 700, letterSpacing: '0.04em' } }, 'ARIEL'),
          React.createElement('div', { style: { fontSize: 11, color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: 6 } }, React.createElement('span', { style: { width: 6, height: 6, borderRadius: 99, background: 'var(--green)' } }), 'Online \u00b7 context-aware')),
        React.createElement('button', { className: 'icon-btn', style: { background: 'rgba(255,255,255,0.12)', border: 'none', color: '#fff' }, onClick: onClose }, React.createElement(Icon, { name: 'x', size: 17 }))),
      React.createElement('div', { className: 'ariel-body', ref: bodyRef },
        msgs.map((m, i) => React.createElement('div', { key: i, className: 'ariel-msg' + (m.me ? ' me' : ''), style: { animation: 'pop .2s' } }, m.text)),
        React.createElement('div', { style: { marginTop: 4 } },
          React.createElement('div', { className: 'eyebrow', style: { marginBottom: 8 } }, 'Suggested actions'),
          React.createElement('div', { style: { display: 'grid', gap: 8 } }, ctx.chips.map(([label, ic], i) =>
            React.createElement('button', { key: i, className: 'ariel-chip', onClick: () => send(label) },
              React.createElement(Icon, { name: ic, size: 16 }), React.createElement('span', { style: { flex: 1 } }, label), React.createElement(Icon, { name: 'arrowR', size: 14, style: { color: 'var(--text-3)' } })))))),
      React.createElement('div', { className: 'ariel-foot' },
        React.createElement('div', { className: 'ariel-input' },
          React.createElement('input', { value: draft, placeholder: 'Ask ARIEL anything…', onChange: e => setDraft(e.target.value), onKeyDown: e => { if (e.key === 'Enter') { send(draft); setDraft(''); } } }),
          React.createElement('button', { className: 'btn btn-primary', style: { width: 'var(--ctrl-h)', padding: 0, height: 'var(--ctrl-h)' }, onClick: () => { send(draft); setDraft(''); } }, React.createElement(Icon, { name: 'send', size: 16 })))))
  );
}

// ---------------- Admin ----------------
function AdminScreen() {
  const users = [
    { n: 'Adrian Bell', r: 'Regional Supervisor', e: 'a.bell@rgis.com', s: 'active', init: 'AB' },
    { n: 'Mara Lindqvist', r: 'Field Auditor', e: 'm.lind@rgis.com', s: 'active', init: 'ML' },
    { n: 'Dev Patel', r: 'Field Auditor', e: 'd.patel@rgis.com', s: 'active', init: 'DP' },
    { n: 'Sofia Romano', r: 'Team Lead', e: 's.romano@rgis.com', s: 'active', init: 'SR' },
    { n: 'Tomasz Nowak', r: 'Field Auditor', e: 't.nowak@rgis.com', s: 'paused', init: 'TN' },
  ];
  const services = [['Form Sync Engine', 'operational', 99.98], ['PDF Generation', 'operational', 99.9], ['Vector Search (ARIEL)', 'operational', 99.95], ['SQLite Replication', 'degraded', 97.2]];
  return React.createElement('div', { className: 'page page-anim' },
    React.createElement('div', { className: 'page-head' },
      React.createElement('div', null, React.createElement('h1', { className: 'page-title' }, 'Admin Console'), React.createElement('p', { className: 'page-sub' }, 'Users, roles, access control and system health')),
      React.createElement('button', { className: 'btn btn-primary' }, React.createElement(Icon, { name: 'plus', size: 16 }), 'Invite User')),
    React.createElement('div', { className: 'dash-grid', style: { marginTop: 0, gridTemplateColumns: '1.5fr 1fr' } },
      React.createElement('div', { className: 'card themed tbl-wrap' },
        React.createElement('div', { className: 'card-head' }, React.createElement('div', { className: 'card-title' }, 'Users & Roles'), React.createElement('span', { className: 'badge badge-gray' }, users.length + ' members')),
        React.createElement('table', { className: 'tbl' },
          React.createElement('thead', null, React.createElement('tr', null, ['Member', 'Role', 'Email', 'Status', ''].map(h => React.createElement('th', { key: h }, h)))),
          React.createElement('tbody', null, users.map((u, i) => React.createElement('tr', { key: i },
            React.createElement('td', null, React.createElement('div', { className: 'r-media' }, React.createElement('div', { className: 'avatar sm' }, u.init), React.createElement('span', { className: 'cell-strong' }, u.n))),
            React.createElement('td', { className: 'cell-mut' }, u.r),
            React.createElement('td', { className: 'cell-mut tnum' }, u.e),
            React.createElement('td', null, React.createElement(StatusBadge, { status: u.s })),
            React.createElement('td', null, React.createElement('button', { className: 'icon-btn', style: { width: 30, height: 30 } }, React.createElement(Icon, { name: 'moreH', size: 15 }))))))),
      React.createElement('div', { className: 'card themed' },
        React.createElement('div', { className: 'card-head' }, React.createElement('div', { className: 'card-title' }, 'System Health')),
        React.createElement('div', { className: 'card-hr' }),
        React.createElement('div', { className: 'card-pad', style: { display: 'grid', gap: 4 } }, services.map(([name, st, up], i) => React.createElement('div', { key: i, className: 'row', style: { justifyContent: 'space-between', padding: '11px 0', borderBottom: i < services.length - 1 ? '1px solid var(--border-2)' : 'none' } },
          React.createElement('div', { className: 'row', style: { gap: 9 } }, React.createElement('span', { style: { width: 8, height: 8, borderRadius: 99, background: st === 'operational' ? 'var(--green)' : 'var(--amber)' } }), React.createElement('span', { style: { fontSize: 'var(--fs-sm)', fontWeight: 500 } }, name)),
          React.createElement('div', { className: 'row', style: { gap: 10 } }, React.createElement('span', { className: 'tnum dim', style: { fontSize: 11 } }, up + '%'), React.createElement(Badge, { kind: st === 'operational' ? 'green' : 'amber' }, st))))))))
  );
}

// ---------------- Landing ----------------
function LandingScreen({ enter, theme }) {
  return React.createElement('div', { className: 'land', style: { background: 'var(--bg)', backgroundImage: 'var(--bg-grad)' } },
    React.createElement('div', { style: { maxWidth: 460, width: '100%', textAlign: 'center' } },
      React.createElement('div', { className: 'rail-logo', style: { width: 56, height: 56, margin: '0 auto 22px', fontSize: 26, borderRadius: 16 } }, 'R'),
      React.createElement('div', { className: 'eyebrow', style: { marginBottom: 10 } }, 'RGIS Universe'),
      React.createElement('h1', { style: { fontSize: 'clamp(28px,5vw,40px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05 } }, 'One platform for every', React.createElement('br'), 'inventory ', React.createElement('span', { style: { color: 'var(--rgis-red)' } }, 'audit')),
      React.createElement('p', { className: 'muted', style: { fontSize: 'var(--fs-lg)', marginTop: 14, lineHeight: 1.6 } }, 'Forms, scheduling, capacity and quality — unified, intelligent, and built for the field.'),
      React.createElement('div', { className: 'card themed', style: { padding: 22, marginTop: 28, textAlign: 'left', display: 'grid', gap: 13 } },
        React.createElement('div', { className: 'field' }, React.createElement('label', null, 'Work email'), React.createElement('input', { className: 'input', defaultValue: 'a.bell@rgis.com' })),
        React.createElement('div', { className: 'field' }, React.createElement('label', null, 'Password'), React.createElement('input', { className: 'input', type: 'password', defaultValue: 'password' })),
        React.createElement('button', { className: 'btn btn-primary', style: { width: '100%', height: 44, marginTop: 4 }, onClick: enter }, 'Sign in to Universe', React.createElement(Icon, { name: 'arrowR', size: 16 })),
        React.createElement('button', { onClick: enter, style: { background: 'none', border: 'none', color: 'var(--text-3)', fontSize: 'var(--fs-sm)' } }, 'or continue with SSO')))
  );
}

export { ARIEL, AdminScreen, LandingScreen };
