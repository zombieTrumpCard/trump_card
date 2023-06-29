import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import axios from "axios";
import App from "./App";
import "./styles/style.scss";
import "@sakun/system.css/dist/system.css";

// axios.defaults.baseURL = process.env.REACT_APP_SERVER_TAEWOOK_URL; // 태욱님컴
// axios.defaults.baseURL = process.env.REACT_APP_SERVER_DASEUL_URL; // 다슬님컴
// axios.defaults.baseURL = process.env.REACT_APP_SERVER_TAEKYUNG_URL; // 태경님컴
axios.defaults.baseURL = process.env.REACT_APP_SERVER_JIHYUN_URL; // 지현님컴

axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
