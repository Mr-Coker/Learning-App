import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { registerSW } from 'virtual:pwa-register';

registerSW({ immediate: true });

const convex = new ConvexReactClient((import.meta as any).env.VITE_CONVEX_URL);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConvexProvider client={convex}>
      <App />
    </ConvexProvider>
  </StrictMode>,
);

