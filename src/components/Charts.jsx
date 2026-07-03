/* RGIS Universe — SVG chart primitives */
import React, { useId } from 'react';

  function smoothPath(pts) {
    if (pts.length < 2) return '';
    let d = `M ${pts[0][0]},${pts[0][1]}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] || p2;
      const c1x = p1[0] + (p2[0] - p0[0]) / 6;
      const c1y = p1[1] + (p2[1] - p0[1]) / 6;
      const c2x = p2[0] - (p3[0] - p1[0]) / 6;
      const c2y = p2[1] - (p3[1] - p1[1]) / 6;
      d += ` C ${c1x},${c1y} ${c2x},${c2y} ${p2[0]},${p2[1]}`;
    }
    return d;
  }

  // Area + line chart. data: [{label, v, v2?}]
  function AreaChart({ data, h = 200, color = 'var(--rgis-red)', color2 = 'var(--rgis-blue)', showAxis = true, dual = false }) {
    const id = useId().replace(/:/g, '');
    const W = 600, H = h, padB = showAxis ? 22 : 6, padT = 10, padL = 2, padR = 2;
    const all = dual ? data.flatMap(d => [d.v, d.v2]) : data.map(d => d.v);
    const max = Math.max(...all) * 1.12, min = 0;
    const x = i => padL + (i / (data.length - 1)) * (W - padL - padR);
    const y = v => padT + (1 - (v - min) / (max - min)) * (H - padT - padB);
    const pts = data.map((d, i) => [x(i), y(d.v)]);
    const pts2 = dual ? data.map((d, i) => [x(i), y(d.v2)]) : [];
    const line = smoothPath(pts);
    const area = line + ` L ${x(data.length - 1)},${H - padB} L ${x(0)},${H - padB} Z`;
    const grid = [0, 0.25, 0.5, 0.75, 1].map(t => padT + t * (H - padT - padB));
    return React.createElement('svg', { viewBox: `0 0 ${W} ${H}`, preserveAspectRatio: 'none', style: { width: '100%', height: h, display: 'block', overflow: 'visible' } },
      React.createElement('defs', null,
        React.createElement('linearGradient', { id: `ar${id}`, x1: 0, y1: 0, x2: 0, y2: 1 },
          React.createElement('stop', { offset: '0%', stopColor: color, stopOpacity: 0.28 }),
          React.createElement('stop', { offset: '100%', stopColor: color, stopOpacity: 0 }))),
      grid.map((gy, i) => React.createElement('line', { key: i, x1: 0, x2: W, y1: gy, y2: gy, stroke: 'var(--chart-grid)', strokeWidth: 1, vectorEffect: 'non-scaling-stroke' })),
      React.createElement('path', { d: area, fill: `url(#ar${id})` }),
      dual && React.createElement('path', { d: smoothPath(pts2), fill: 'none', stroke: color2, strokeWidth: 2, strokeDasharray: '4 4', vectorEffect: 'non-scaling-stroke', opacity: 0.85 }),
      React.createElement('path', { d: line, fill: 'none', stroke: color, strokeWidth: 2.4, vectorEffect: 'non-scaling-stroke', strokeLinecap: 'round' }),
      pts.map((p, i) => i === pts.length - 1 && React.createElement('circle', { key: i, cx: p[0], cy: p[1], r: 4, fill: color, stroke: 'var(--surface)', strokeWidth: 2.5, vectorEffect: 'non-scaling-stroke' })),
      showAxis && data.map((d, i) => (i % Math.ceil(data.length / 7) === 0 || i === data.length - 1) &&
        React.createElement('text', { key: i, x: x(i), y: H - 5, fill: 'var(--text-3)', fontSize: 11, textAnchor: i === 0 ? 'start' : i === data.length - 1 ? 'end' : 'middle', style: { fontFamily: 'var(--font-ui)' } }, d.label)));
  }

  // Bar chart. data:[{label, v, hl?}]
  function BarChart({ data, h = 200, color = 'var(--rgis-blue)', hlColor = 'var(--rgis-red)', showAxis = true }) {
    const W = 600, H = h, padB = showAxis ? 22 : 6, padT = 10;
    const max = Math.max(...data.map(d => d.v)) * 1.12;
    const n = data.length, gap = 0.34, bw = (W / n) * (1 - gap);
    const y = v => padT + (1 - v / max) * (H - padT - padB);
    const grid = [0, 0.33, 0.66, 1].map(t => padT + t * (H - padT - padB));
    return React.createElement('svg', { viewBox: `0 0 ${W} ${H}`, preserveAspectRatio: 'none', style: { width: '100%', height: h, display: 'block' } },
      grid.map((gy, i) => React.createElement('line', { key: i, x1: 0, x2: W, y1: gy, y2: gy, stroke: 'var(--chart-grid)', strokeWidth: 1, vectorEffect: 'non-scaling-stroke' })),
      data.map((d, i) => {
        const cx = (i + 0.5) * (W / n);
        const top = y(d.v), bh = (H - padB) - top;
        return React.createElement('rect', { key: i, x: cx - bw / 2, y: top, width: bw, height: Math.max(bh, 2), rx: 4, fill: d.hl ? hlColor : color, opacity: d.hl ? 1 : 0.82 });
      }),
      showAxis && data.map((d, i) => React.createElement('text', { key: 'l' + i, x: (i + 0.5) * (W / n), y: H - 5, fill: 'var(--text-3)', fontSize: 11, textAnchor: 'middle', style: { fontFamily: 'var(--font-ui)' } }, d.label)));
  }

  // Donut. segs:[{v,color,label}]
  function Donut({ segs, size = 150, thickness = 18, center }) {
    const r = (size - thickness) / 2, c = size / 2, circ = 2 * Math.PI * r;
    const total = segs.reduce((s, x) => s + x.v, 0) || 1;
    let off = 0;
    return React.createElement('div', { style: { position: 'relative', width: size, height: size } },
      React.createElement('svg', { width: size, height: size, viewBox: `0 0 ${size} ${size}`, style: { transform: 'rotate(-90deg)' } },
        React.createElement('circle', { cx: c, cy: c, r, fill: 'none', stroke: 'var(--track)', strokeWidth: thickness }),
        segs.map((s, i) => {
          const len = (s.v / total) * circ;
          const el = React.createElement('circle', { key: i, cx: c, cy: c, r, fill: 'none', stroke: s.color, strokeWidth: thickness, strokeDasharray: `${len} ${circ - len}`, strokeDashoffset: -off, strokeLinecap: 'round' });
          off += len; return el;
        })),
      center && React.createElement('div', { style: { position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center' } }, center));
  }

  // Sparkline
  function Spark({ data, w = 120, h = 38, color = 'var(--rgis-red)', fillArea = true }) {
    const id = useId().replace(/:/g, '');
    const max = Math.max(...data), min = Math.min(...data);
    const x = i => (i / (data.length - 1)) * w;
    const y = v => h - 3 - ((v - min) / (max - min || 1)) * (h - 6);
    const pts = data.map((v, i) => [x(i), y(v)]);
    const line = smoothPath(pts);
    return React.createElement('svg', { width: w, height: h, viewBox: `0 0 ${w} ${h}`, style: { display: 'block', overflow: 'visible' } },
      React.createElement('defs', null,
        React.createElement('linearGradient', { id: `sp${id}`, x1: 0, y1: 0, x2: 0, y2: 1 },
          React.createElement('stop', { offset: '0%', stopColor: color, stopOpacity: 0.32 }),
          React.createElement('stop', { offset: '100%', stopColor: color, stopOpacity: 0 }))),
      fillArea && React.createElement('path', { d: line + ` L ${w},${h} L 0,${h} Z`, fill: `url(#sp${id})` }),
      React.createElement('path', { d: line, fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round' }));
  }

  // Radial gauge (0..1)
  function Gauge({ value, size = 130, color = 'var(--rgis-red)', label }) {
    const r = (size - 16) / 2, c = size / 2, circ = Math.PI * r; // half
    const len = value * circ;
    return React.createElement('div', { style: { position: 'relative', width: size, height: size / 2 + 14 } },
      React.createElement('svg', { width: size, height: size / 2 + 14, viewBox: `0 0 ${size} ${size / 2 + 14}` },
        React.createElement('path', { d: `M 8 ${c} A ${r} ${r} 0 0 1 ${size - 8} ${c}`, fill: 'none', stroke: 'var(--track)', strokeWidth: 12, strokeLinecap: 'round' }),
        React.createElement('path', { d: `M 8 ${c} A ${r} ${r} 0 0 1 ${size - 8} ${c}`, fill: 'none', stroke: color, strokeWidth: 12, strokeLinecap: 'round', strokeDasharray: `${len} ${circ}` })),
      React.createElement('div', { style: { position: 'absolute', bottom: 0, left: 0, right: 0, textAlign: 'center' } },
        React.createElement('div', { className: 'head tnum', style: { fontSize: 24, fontWeight: 700, letterSpacing: '-0.03em' } }, Math.round(value * 100) + '%'),
        label && React.createElement('div', { className: 'dim', style: { fontSize: 11 } }, label)));
  }

export { AreaChart, BarChart, Donut, Spark, Gauge };
