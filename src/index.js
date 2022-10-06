import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; 
import { MoralisProvider } from 'react-moralis';

const root = ReactDOM.createRoot(document.getElementById('root'));
const appId = "sx2UvKCsO9ni1MfCpBCIZpsYYqk8OVXKLR4yxrmF"
const serverUrl="https://skxzl1aqb0h7.grandmoralis.com:2053/server"



root.render(
  <React.StrictMode>
    <MoralisProvider appId={appId} serverUrl={serverUrl}  >
    <App />
    </MoralisProvider>
  </React.StrictMode>
); 