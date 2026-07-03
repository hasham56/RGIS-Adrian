import React from 'react'
import { Icon } from './Icon.jsx'

// Shared loading / error surfaces for screens backed by API queries.

export function ScreenLoading({ label = 'Loading…' }) {
  return React.createElement('div', { className: 'async-state' },
    React.createElement('div', { className: 'async-spinner', 'aria-hidden': true }),
    React.createElement('div', { className: 'dim' }, label)
  )
}

export function ScreenError({ error, retry }) {
  return React.createElement('div', { className: 'async-state' },
    React.createElement(Icon, { name: 'alert', size: 28, style: { color: 'var(--rgis-red)' } }),
    React.createElement('div', { style: { fontWeight: 600 } }, 'Couldn’t load this screen'),
    React.createElement('div', { className: 'dim', style: { fontSize: 'var(--fs-sm)', maxWidth: 420, textAlign: 'center' } },
      (error && error.message) || 'The API request failed.'),
    retry && React.createElement('button', { className: 'btn btn-primary', onClick: () => retry() }, 'Try again')
  )
}
