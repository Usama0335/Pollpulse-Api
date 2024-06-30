import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
// Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css';

import './i18n'; // Import i18n configuration

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
