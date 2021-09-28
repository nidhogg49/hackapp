import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AssistantProvider } from './context/assistantContext';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AssistantProvider>
        <App />
      </AssistantProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
