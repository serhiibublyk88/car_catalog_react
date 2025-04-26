import React from 'react';
import ReactDOM from 'react-dom/client';
import Modal from 'react-modal';
import './assets/styles/global.css';
import Router from './components/ui/Router.jsx';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import GlobalToaster from './components/ui/GlobalToaster';
import { AuthProvider } from './context/AuthProvider';

Modal.setAppElement('#root');

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router />
          <GlobalToaster />
          <ReactQueryDevtools initialIsOpen={false} />
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
