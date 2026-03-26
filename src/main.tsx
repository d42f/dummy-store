import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import { AuthProvider } from '@/context/Auth';
import { FetchProvider } from '@/context/Fetch';

import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <FetchProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </FetchProvider>
    </BrowserRouter>
  </StrictMode>,
);
