import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; 
import { MoralisProvider } from 'react-moralis';

const root = ReactDOM.createRoot(document.getElementById('root'));
const appId = "c6mV4xVQQ4NPNx591osXsyB8K2GqQDwdxYfNXCOV"
const serverUrl="https://ogs9evweucp4.grandmoralis.com:2053/server"



root.render(
  <React.StrictMode>
    <MoralisProvider appId={appId} serverUrl={serverUrl}  >
    <App />
    </MoralisProvider>
  </React.StrictMode>
); 