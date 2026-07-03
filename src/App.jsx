/* RGIS Universe — App root */
import React, { useState, useEffect } from 'react';
import { Icon } from './components/Icon.jsx';
import { Sidebar, Topbar } from './components/Shell.jsx';
import { HubScreen } from './screens/Hub.jsx';
import { DashboardScreen } from './screens/Dashboard.jsx';
import { ForgeScreen, BuilderScreen } from './screens/Forge.jsx';
import { CustomersScreen, StoresScreen, ReviewsScreen } from './screens/Customers.jsx';
import { TasksScreen, CapacityScreen, ScheduleScreen } from './screens/Tasks.jsx';
import { ARIEL, AdminScreen, LandingScreen } from './screens/Ariel.jsx';

const LS = {
  get: (k, d) => { try { return localStorage.getItem(k) || d; } catch { return d; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch {} },
};

export default function App() {
  const [theme, setTheme] = useState(() => LS.get('rgis.theme', 'light'));
  const [density, setDensity] = useState(() => LS.get('rgis.density', 'comfortable'));
  const [route, setRoute] = useState(() => LS.get('rgis.route', 'hub'));
  const [landed, setLanded] = useState(() => LS.get('rgis.landed', '0') === '1');
  const [collapsed, setCollapsed] = useState(() => LS.get('rgis.rail', '0') === '1');
  const [ariel, setAriel] = useState(false);

  useEffect(() => { document.documentElement.setAttribute('data-theme', theme); LS.set('rgis.theme', theme); }, [theme]);
  useEffect(() => { document.documentElement.setAttribute('data-density', density); LS.set('rgis.density', density); }, [density]);
  useEffect(() => { LS.set('rgis.route', route); }, [route]);
  useEffect(() => { LS.set('rgis.rail', collapsed ? '1' : '0'); }, [collapsed]);

  function go(r) { setRoute(r); document.querySelector('.content') && (document.querySelector('.content').scrollTop = 0); }
  function enter() { setLanded(true); LS.set('rgis.landed', '1'); }

  if (!landed) {
    return React.createElement(LandingScreen, { enter, theme });
  }

  // Builder is a full-bleed surface (own topbar)
  const isBuilder = route === 'builder';

  let Screen = null;
  switch (route) {
    case 'hub': Screen = HubScreen; break;
    case 'dashboard': Screen = DashboardScreen; break;
    case 'forge': Screen = ForgeScreen; break;
    case 'builder': Screen = BuilderScreen; break;
    case 'reviews': Screen = ReviewsScreen; break;
    case 'tasks': Screen = TasksScreen; break;
    case 'capacity': Screen = CapacityScreen; break;
    case 'schedule': Screen = ScheduleScreen; break;
    case 'customers': Screen = CustomersScreen; break;
    case 'stores': Screen = StoresScreen; break;
    case 'admin': Screen = AdminScreen; break;
    default: Screen = HubScreen;
  }

  return React.createElement('div', { className: 'app' },
    React.createElement(Sidebar, { route: isBuilder ? 'forge' : route, go, collapsed, setCollapsed }),
    React.createElement('div', { className: 'main' },
      !isBuilder && React.createElement(Topbar, { route, theme, setTheme, density, setDensity, onAssistant: () => setAriel(true) }),
      isBuilder
        ? React.createElement('div', { className: 'content', style: { overflow: 'hidden' } }, React.createElement(Screen, { go }))
        : React.createElement('div', { className: 'content' }, React.createElement(Screen, { go }))
    ),
    // floating ARIEL trigger when topbar hidden (builder)
    isBuilder && React.createElement('button', { className: 'ariel-fab', onClick: () => setAriel(true), title: 'ARIEL' }, React.createElement(Icon, { name: 'sparkles', size: 24 })),
    ariel && React.createElement(ARIEL, { route, onClose: () => setAriel(false) })
  );
}
