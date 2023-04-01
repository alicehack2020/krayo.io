import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
// import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
// const clientId = "164254241743-1mnk3o9k8v4p63851ktbah3kuae0oo9i.apps.googleusercontent.com";

root.render(
  // <GoogleOAuthProvider clientId={clientId}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  // </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
