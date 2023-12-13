import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@fortawesome/fontawesome-free/css/all.css';
// import 'slicknav/slicknav.min.css';
// import $ from 'jquery';

const root = ReactDOM.createRoot(document.getElementById('root'));

// window.$ = $;
// window.jQuery = $;

function Preloader() {
  useEffect(() => {
    // Run your preloader hide logic here
    const preloader = document.getElementById('preloader-active');
    const body = document.body;

    if (preloader && body) {
      setTimeout(() => {
        preloader.style.display = 'none';
        body.style.overflow = 'visible';
      }, 450);
    }
  }, []);

  return null; // This component doesn't render anything
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
