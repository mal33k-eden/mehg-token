import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; 
import { MoralisProvider } from 'react-moralis';

const root = ReactDOM.createRoot(document.getElementById('root'));
const appId = "Zr85SXS6pJ5juuJoW2xd81h4zQohzmtIP8e9TIFP"
const serverUrl="https://siljlrtx7x0a.usemoralis.com:2053/server"



root.render(
  <React.StrictMode>
    <MoralisProvider appId={appId} serverUrl={serverUrl}  >
    <App />
    </MoralisProvider>
  </React.StrictMode>
); 