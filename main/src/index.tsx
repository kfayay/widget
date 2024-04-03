import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { loadComponent } from './utils';

const propertyPromise = loadComponent('Widget1', 'http://localhost:9002', 'SampleWidget');

propertyPromise().then((data) => {
  const { register, widgetInfo } = data.default as any;
  console.log('🚀 ~ propertyPromise ~ widgetInfo:', widgetInfo);
  register();
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
