import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import axios from 'axios';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './styles/style.scss';

axios.defaults.baseURL = "http://192.168.0.50:1788";
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />,
);
