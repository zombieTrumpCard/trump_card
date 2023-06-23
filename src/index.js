import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import axios from 'axios';
import App from './App';
import './styles/style.scss';
import '@sakun/system.css/dist/system.css';

// axios.defaults.baseURL = "http://192.168.0.50:1788"; // 태욱님컴
axios.defaults.baseURL = "http://192.168.0.81:1788"; // 태경님컴
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />,
);
