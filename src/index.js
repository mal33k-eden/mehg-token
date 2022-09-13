import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; 
import { MoralisProvider } from 'react-moralis';

const root = ReactDOM.createRoot(document.getElementById('root'));
const appId = "Hc7duO9epvHaRxPKNjlafT6SRfMmAobBUhITYSWe"
const serverUrl="https://treqgmp8uplh.usemoralis.com:2053/server"



root.render(
  <React.StrictMode>
    <MoralisProvider appId={appId} serverUrl={serverUrl}  >
    <App />
    </MoralisProvider>
  </React.StrictMode>
); 