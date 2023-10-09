import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient } from 'react-query';
import './assets/css/index.css';
import RouterList from './routes/RouterList';


const queryMovie = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <QueryClientProvider client={queryMovie}>
  <RouterList/>
  </QueryClientProvider>
  </React.StrictMode>
);