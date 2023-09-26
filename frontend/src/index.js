import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';

let protocol = window.location.protocol; //协议
let hostname = window.location.hostname; //主机
let reg = /^localhost+/;

if(reg.test(hostname)) {
  //若本地项目调试使用
    axios.defaults.baseURL = 'http://localhost:3001';
} else if (protocol !== "https:"){
    //动态请求地址             协议               主机        端口
    axios.defaults.baseURL = protocol + "//" + hostname  +":3001";
}
else {
      //动态请求地址             协议               主机        端口
    axios.defaults.baseURL = protocol + "//" + 'api.'+ hostname.slice(1).join('.')  +":3001";
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

