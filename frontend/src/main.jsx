import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { RouterProvider } from 'react-router-dom';
import { ContextProvider } from './contexts/ContextProvider';
import router from './router.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </React.StrictMode>,
)
