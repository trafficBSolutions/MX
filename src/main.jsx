// Import necessary modules
import React from 'react';
import { createRoot } from 'react-dom/client'; // React 18 import
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router-dom';

// Create the root and render the app
const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

