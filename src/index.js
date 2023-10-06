import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //StrictMode 으로 인해 두번씩 console.log 가 찍히는 경우가 있음
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);

