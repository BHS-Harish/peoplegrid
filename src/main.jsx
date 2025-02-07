import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import AdminMain from './pages/Admin/AdminMain.jsx';
import { Provider } from 'react-redux'
import store from './store.js'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AdminMain />
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
