import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import { AuthContextprovider } from './context/AuthContext.jsx'
import { SocketContextProvider } from './context/SocketContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextprovider>
        <SocketContextProvider>
          <App />
        </SocketContextProvider>
      </AuthContextprovider>
    </BrowserRouter>
  </React.StrictMode>,
)
