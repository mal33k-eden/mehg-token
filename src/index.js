import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; 
import { MoralisProvider } from 'react-moralis';

const root = ReactDOM.createRoot(document.getElementById('root'));
const appId = "NZj37cxbBrpHyRpr53iI3AfZFXTd0YxyqOM1wO1V"
const serverUrl="https://bwmvrytmqi9c.usemoralis.com:2053/server"



root.render(
  <React.StrictMode>
    <MoralisProvider appId={appId} serverUrl={serverUrl}  >
    <App />
    </MoralisProvider>
  </React.StrictMode>
); 