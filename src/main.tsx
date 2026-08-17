import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Capacitor } from '@capacitor/core';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Native-safe-area: Android WebView often reports env(safe-area-inset-top)=0.
// We set a CSS var based on the StatusBar height when available.
async function initSafeTop() {
  if (!Capacitor.isNativePlatform()) return;
  try {
    const { StatusBar } = await import('@capacitor/status-bar');
    const info = await StatusBar.getInfo();
    const height = info?.height ?? 0;
    if (height > 0) {
      document.documentElement.style.setProperty('--app-safe-top', `${height}px`);
    }
    // Ensure the WebView is not drawing under the status bar if possible.
    await StatusBar.setOverlaysWebView({ overlay: false });
  } catch {
    // Ignore if plugin isn't available; CSS env() will still handle iOS.
  }
}

initSafeTop();

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);