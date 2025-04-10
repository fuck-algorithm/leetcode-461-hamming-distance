import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
// 引入i18n配置
import './i18n/i18n'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
) 