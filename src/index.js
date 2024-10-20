import React from 'react';
import ReactDOM from 'react-dom/client'; // Update this import
import App from './App';
import './index.css';

// Initialize the app with createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
