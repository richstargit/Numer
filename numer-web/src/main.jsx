import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx'
import './index.css'
import Home from './components/Home/Home.jsx';
import Root_of_equations from './components/Root/MainRoot.jsx'
import Matrixmath from './components/Matrix/MainMatrix.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'root_of_equations',
        element: <Root_of_equations />,
      },
      {
        path: 'Linear',
        element: <Matrixmath />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)