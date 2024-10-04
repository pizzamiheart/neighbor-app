import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

function renderApp() {
  console.log('Attempting to render app');
  const container = document.getElementById('root');
  console.log('Container:', container);
  if (container) {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } else {
    console.error('Root element not found');
  }
}

// Ensure the DOM is fully loaded before rendering
if (document.readyState === 'loading') {
  console.log('DOM not ready, adding event listener');
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  console.log('DOM ready, rendering immediately');
  renderApp();
}