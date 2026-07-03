/* RGIS Universe — Forge (forms list + builder) */
import React, { useState } from 'react';
import { Icon } from '../components/Icon.jsx';
import { StatusBadge as SB } from '../components/Shell.jsx';
import { palette } from '../data.js';
import { useCollections } from '../api/hooks.js';
import { ScreenLoading, ScreenError } from '../components/Async.jsx';

// ---------------- Forms list ----------------
function ForgeScreen({ go }) {
  const { data: D, isLoading, error, refetch } = useCollections(['forms']);
  const [view, setView] = useState('grid');
  const [section, setSection] = useState('all');
  if (isLoading) return React.createElement(ScreenLoading);
  if (error) return React.createElement(ScreenError, { error, retry: refetch });
  const sections = [
    { id: 'all', label: 'All Forms', icon: 'folder', n: D.forms.length },
    { id: 'published', label: 'Published', icon: 'eye', n: D.forms.filter(f => f.status === 'published').length },
    { id: 'draft', label: 'Drafts', icon: 'pen', n: D.forms.filter(f => f.status === 'draft').length },
    { id: 'mine', label: 'Assigned to Me', icon: 'user', n: 3 },
  ];
  const list = D.forms.filter(f => section === 'all' || section === 'mine' || f.status === section);
  return React.createElement('div', { className: 'page page-anim' },
    React.createElement('div', { className: 'page-head' },
      React.createElement('div', null,
        React.createElement('h1', { className: 'page-title' }, 'Forge'),
        React.createElement('p', { className: 'page-sub' }, 'Build, publish and manage your data-collection forms')),
      React.createElement('button', { className: 'btn btn-primary', onClick: () => go('builder') }, React.createElement(Icon, { name: 'plus', size: 16 }), 'Create Form')
    ),
    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '210px 1fr', gap: 'var(--gap)', alignItems: 'start' } },
      // workspace sidebar
      React.createElement('div', { className: 'card themed', style: { padding: 8 } },
        sections.map(s => React.createElement('button', { key: s.id, onClick: () => setSection(s.id),
          className: 'nav', style: { color: section === s.id ? 'var(--rgis-red)' : 'var(--text-2)', background: section === s.id ? 'var(--red-soft)' : 'transparent', height: 'var(--row-h)' } },
          React.createElement(Icon, { name: s.icon, size: 16 }), React.createElement('span', { className: 'label', style: { flex: 1, textAlign: 'left' } }, s.label),
          React.createElement('span', { style: { fontSize: 11, fontWeight: 700, opacity: 0.7 } }, s.n))),
        React.createElement('div', { className: 'divider', style: { margin: '8px 6px' } }),
        React.createElement('div', { className: 'eyebrow', style: { padding: '4px 12px 8px' } }, 'Labels'),
        [['Inventory', 'var(--rgis-blue)'], ['Merch', 'var(--violet)'], ['Quality', 'var(--rgis-red)'], ['Supply', 'var(--green)']].map(([t, c]) =>
          React.createElement('button', { key: t, className: 'nav', style: { color: 'var(--text-2)', height: 34 } },
            React.createElement('i', { style: { width: 9, height: 9, borderRadius: 3, background: c } }), React.createElement('span', { className: 'label' }, t)))
      ),
      // main
      React.createElement('div', null,
        React.createElement('div', { className: 'toolbar' },
          React.createElement('label', { className: 'searchbox', style: { maxWidth: 260, flex: 'unset' } }, React.createElement(Icon, { name: 'search', size: 16 }), React.createElement('input', { placeholder: 'Search forms…' })),
          React.createElement('div', { className: 'spacer' }),
          React.createElement('button', { className: 'chip' }, React.createElement(Icon, { name: 'sort', size: 14 }), 'Last edited'),
          React.createElement('div', { className: 'seg' },
            React.createElement('button', { className: view === 'list' ? 'on' : '', onClick: () => setView('list') }, React.createElement(Icon, { name: 'list', size: 15 })),
            React.createElement('button', { className: view === 'grid' ? 'on' : '', onClick: () => setView('grid') }, React.createElement(Icon, { name: 'grid', size: 15 })))
        ),
        view === 'grid'
          ? React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(232px,1fr))', gap: 'var(--gap)' } },
              list.map(f => React.createElement('button', { key: f.id, className: 'card themed', onClick: () => go('builder'),
                style: { textAlign: 'left', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'transform .16s, box-shadow .16s' },
                onMouseEnter: e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow)'; },
                onMouseLeave: e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; } },
                React.createElement('div', { style: { height: 78, background: 'color-mix(in srgb,' + f.label.c + ' 12%, transparent)', display: 'grid', placeItems: 'center', position: 'relative' } },
                  React.createElement(Icon, { name: 'file', size: 26, style: { color: f.label.c, opacity: 0.7 } }),
                  React.createElement('span', { className: 'badge', style: { position: 'absolute', top: 10, left: 10, background: 'color-mix(in srgb,' + f.label.c + ' 18%, transparent)', color: f.label.c } }, f.label.t)),
                React.createElement('div', { className: 'card-pad', style: { flex: 1, display: 'flex', flexDirection: 'column', gap: 5 } },
                  React.createElement('div', { className: 'head', style: { fontWeight: 600, fontSize: 'var(--fs-base)' } }, f.name),
                  React.createElement('div', { className: 'page-sub', style: { margin: 0, flex: 1 } }, f.desc),
                  React.createElement('div', { className: 'row', style: { justifyContent: 'space-between', marginTop: 6 } },
                    React.createElement(SB, { status: f.status }),
                    React.createElement('span', { className: 'dim', style: { fontSize: 11 } }, f.fields + ' fields')))))
            )
          : React.createElement('div', { className: 'card themed tbl-wrap' },
              React.createElement('table', { className: 'tbl' },
                React.createElement('thead', null, React.createElement('tr', null, ['Form', 'Label', 'Status', 'Submissions', 'Updated', ''].map(h => React.createElement('th', { key: h }, h)))),
                React.createElement('tbody', null, list.map(f => React.createElement('tr', { key: f.id, style: { cursor: 'pointer' }, onClick: () => go('builder') },
                  React.createElement('td', null, React.createElement('div', { className: 'r-media' },
                    React.createElement('span', { className: 'r-ico', style: { background: 'color-mix(in srgb,' + f.label.c + ' 14%, transparent)', color: f.label.c } }, React.createElement(Icon, { name: 'file', size: 15 })),
                    React.createElement('div', null, React.createElement('div', { className: 'cell-strong' }, f.name), React.createElement('div', { className: 'r-sub' }, f.desc)))),
                  React.createElement('td', null, React.createElement('span', { className: 'badge', style: { background: 'color-mix(in srgb,' + f.label.c + ' 14%, transparent)', color: f.label.c } }, f.label.t)),
                  React.createElement('td', null, React.createElement(SB, { status: f.status })),
                  React.createElement('td', { className: 'tnum cell-mut' }, f.subs.toLocaleString()),
                  React.createElement('td', { className: 'cell-mut' }, f.updated),
                  React.createElement('td', null, React.createElement('button', { className: 'icon-btn', style: { width: 30, height: 30 }, onClick: e => e.stopPropagation() }, React.createElement(Icon, { name: 'moreH', size: 15 })))))))
            )
      )
    )
  );
}

// ---------------- Builder ----------------
function FieldCard({ f, sel, onSel }) {
  return React.createElement('div', { className: 'fld' + (sel ? ' sel' : ''), onClick: onSel },
    React.createElement('span', { className: 'fld-grip' }, React.createElement(Icon, { name: 'drag', size: 16 })),
    React.createElement('div', { className: 'fld-label' }, React.createElement(Icon, { name: f.icon, size: 15, style: { color: 'var(--text-3)' } }), f.label, f.req && React.createElement('span', { className: 'req-star' }, '*')),
    f.type === 'Dropdown'
      ? React.createElement('div', { className: 'fake-input' }, f.opts ? f.opts[0] : 'Select…', React.createElement(Icon, { name: 'chevD', size: 14, style: { marginLeft: 'auto' } }))
      : f.type === 'Signature'
      ? React.createElement('div', { className: 'fake-input fake-area', style: { fontStyle: 'italic' } }, 'Sign here')
      : f.type === 'Photo Capture'
      ? React.createElement('div', { className: 'fake-input fake-area', style: { gap: 8, color: 'var(--text-3)' } }, React.createElement(Icon, { name: 'image', size: 16 }), 'Tap to capture photo')
      : f.type === 'Barcode Scan'
      ? React.createElement('div', { className: 'fake-input' }, React.createElement(Icon, { name: 'box', size: 15, style: { marginRight: 8 } }), f.ph)
      : React.createElement('div', { className: 'fake-input' }, f.ph || '')
  );
}

function BuilderScreen({ go }) {
  const { data: D, isLoading, error, refetch } = useCollections(['builderFields']);
  const [fields, setFields] = useState(null);
  const [sel, setSel] = useState(null);
  const [tab, setTab] = useState('build');
  if (isLoading) return React.createElement(ScreenLoading);
  if (error) return React.createElement(ScreenError, { error, retry: refetch });
  const activeFields = fields ?? D.builderFields;
  const activeSel = sel ?? D.builderFields[0].id;
  const cur = activeFields.find(f => f.id === activeSel) || activeFields[0];

  function addField(type, icon) {
    const id = 'b' + Date.now();
    const nf = { id, type, label: type, req: false, ph: 'Enter value', icon };
    setFields(f => [...(f ?? D.builderFields), nf]); setSel(id);
  }
  function update(patch) { setFields(fs => (fs ?? D.builderFields).map(f => f.id === activeSel ? { ...f, ...patch } : f)); }
  function remove(id) { const nx = activeFields.filter(f => f.id !== id); setFields(nx); if (activeSel === id && nx.length) setSel(nx[0].id); }

  return React.createElement('div', null,
    // builder topbar
    React.createElement('div', { className: 'topbar themed' },
      React.createElement('button', { className: 'icon-btn', onClick: () => go('forge') }, React.createElement(Icon, { name: 'chevL', size: 17 })),
      React.createElement('div', { className: 'col', style: { gap: 0 } },
        React.createElement('div', { className: 'row', style: { gap: 8 } }, React.createElement('b', { style: { fontSize: 'var(--fs-base)' } }, 'Cycle Count \u2013 Standard'), React.createElement('span', { className: 'badge badge-amber' }, 'Draft')),
        React.createElement('span', { className: 'dim', style: { fontSize: 11 } }, 'Autosaved \u00b7 ' + activeFields.length + ' fields')),
      React.createElement('div', { className: 'spacer' }),
      React.createElement('div', { className: 'seg' },
        ['build', 'rules', 'theme', 'publish'].map(t => React.createElement('button', { key: t, className: tab === t ? 'on' : '', onClick: () => setTab(t), style: { textTransform: 'capitalize' } }, t))),
      React.createElement('button', { className: 'btn btn-ghost' }, React.createElement(Icon, { name: 'eye', size: 16 }), 'Preview'),
      React.createElement('button', { className: 'btn btn-primary' }, React.createElement(Icon, { name: 'send', size: 16 }), 'Publish')
    ),
    React.createElement('div', { className: 'builder' },
      // left palette
      React.createElement('div', { className: 'bld-pane' },
        React.createElement('div', { className: 'bld-head' }, React.createElement('div', { className: 'card-title', style: { fontSize: 'var(--fs-sm)' } }, 'Field Elements'), React.createElement('div', { className: 'dim', style: { fontSize: 11, marginTop: 2 } }, 'Drag onto the form')),
        palette.map((grp, gi) => React.createElement('div', { key: gi },
          React.createElement('div', { className: 'eyebrow', style: { padding: '14px 14px 2px' } }, grp.group),
          React.createElement('div', { className: 'pal-grid' }, grp.items.map(it => React.createElement('button', { key: it.t, className: 'pal-item', onClick: () => addField(it.t, it.icon) },
            React.createElement(Icon, { name: it.icon, size: 16 }), it.t, React.createElement(Icon, { name: 'plus', size: 14, style: { marginLeft: 'auto', color: 'var(--text-3)' } }))))))
      ),
      // center canvas
      React.createElement('div', { className: 'bld-canvas' },
        React.createElement('div', { className: 'bld-sheet' },
          React.createElement('div', { className: 'bld-sheet-banner' }),
          React.createElement('div', { style: { padding: '22px 26px 8px' } },
            React.createElement('input', { className: 'head', defaultValue: 'Cycle Count \u2013 Standard', style: { border: 'none', background: 'none', outline: 'none', fontSize: 22, fontWeight: 600, color: 'var(--text)', width: '100%' } }),
            React.createElement('input', { defaultValue: 'Aisle-by-aisle SKU verification for in-store inventory audits.', style: { border: 'none', background: 'none', outline: 'none', fontSize: 'var(--fs-sm)', color: 'var(--text-2)', width: '100%', marginTop: 4 } })),
          React.createElement('div', { style: { padding: '6px 14px 18px' } },
            activeFields.map(f => React.createElement(FieldCard, { key: f.id, f, sel: activeSel === f.id, onSel: () => setSel(f.id) })),
            React.createElement('button', { className: 'btn btn-outline', style: { width: '100%', marginTop: 10, borderStyle: 'dashed', height: 46 } }, React.createElement(Icon, { name: 'plus', size: 16 }), 'Add field or drag from the left'))
        )
      ),
      // right properties
      React.createElement('div', { className: 'bld-pane right' },
        React.createElement('div', { className: 'bld-head' }, React.createElement('div', { className: 'card-title', style: { fontSize: 'var(--fs-sm)' } }, tab === 'build' ? 'Field Properties' : tab === 'publish' ? 'Publish' : tab[0].toUpperCase() + tab.slice(1))),
        tab === 'publish'
          ? React.createElement('div', { style: { padding: 16, display: 'grid', gap: 14 } },
              React.createElement('div', { className: 'field' }, React.createElement('label', null, 'Assign to customers'), React.createElement('div', { className: 'select', style: { display: 'flex', alignItems: 'center' } }, 'Tesco PLC, Carrefour…', React.createElement(Icon, { name: 'chevD', size: 14, style: { marginLeft: 'auto' } }))),
              React.createElement('div', { className: 'field' }, React.createElement('label', null, 'Offline mode'), React.createElement('div', { className: 'row', style: { justifyContent: 'space-between' } }, React.createElement('span', { className: 'muted', style: { fontSize: 'var(--fs-sm)' } }, 'Allow offline submission'), React.createElement('span', { className: 'switch on' }))),
              React.createElement('button', { className: 'btn btn-primary', style: { width: '100%' } }, React.createElement(Icon, { name: 'send', size: 16 }), 'Publish form'))
          : !cur ? null : React.createElement('div', { style: { padding: 16, display: 'grid', gap: 14 } },
              React.createElement('div', { className: 'row', style: { gap: 8 } }, React.createElement('span', { className: 'r-ico', style: { background: 'var(--red-soft)', color: 'var(--rgis-red)' } }, React.createElement(Icon, { name: cur.icon, size: 15 })), React.createElement('div', null, React.createElement('div', { style: { fontWeight: 600, fontSize: 'var(--fs-sm)' } }, cur.type), React.createElement('div', { className: 'dim', style: { fontSize: 11 } }, 'Field type'))),
              React.createElement('div', { className: 'field' }, React.createElement('label', null, 'Label'), React.createElement('input', { className: 'input', value: cur.label, onChange: e => update({ label: e.target.value }) })),
              React.createElement('div', { className: 'field' }, React.createElement('label', null, 'Placeholder'), React.createElement('input', { className: 'input', value: cur.ph || '', onChange: e => update({ ph: e.target.value }) })),
              cur.opts && React.createElement('div', { className: 'field' }, React.createElement('label', null, 'Options'), cur.opts.map((o, i) => React.createElement('div', { key: i, className: 'row', style: { marginBottom: 6 } }, React.createElement('input', { className: 'input', defaultValue: o }), React.createElement('button', { className: 'icon-btn', style: { width: 'var(--ctrl-h)' } }, React.createElement(Icon, { name: 'x', size: 14 }))))),
              React.createElement('div', { className: 'divider' }),
              React.createElement('div', { className: 'row', style: { justifyContent: 'space-between' } }, React.createElement('label', { style: { fontSize: 'var(--fs-sm)', fontWeight: 600 } }, 'Required field'), React.createElement('button', { className: 'switch' + (cur.req ? ' on' : ''), onClick: () => update({ req: !cur.req }) })),
              React.createElement('div', { className: 'row', style: { justifyContent: 'space-between' } }, React.createElement('label', { style: { fontSize: 'var(--fs-sm)', fontWeight: 600 } }, 'Hide label'), React.createElement('button', { className: 'switch' })),
              React.createElement('div', { className: 'divider' }),
              React.createElement('button', { className: 'btn btn-outline', style: { width: '100%', color: 'var(--rgis-red)', borderColor: 'color-mix(in srgb,var(--rgis-red) 30%,transparent)' }, onClick: () => remove(cur.id) }, React.createElement(Icon, { name: 'trash', size: 15 }), 'Delete field'))
      )
    )
  );
}

export { ForgeScreen, BuilderScreen };
