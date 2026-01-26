import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "bootstrap-icons/font/bootstrap-icons.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Teams from './pages/Teams.jsx'
import TeamDetails from './pages/TeamDetails.jsx'
import Project from './pages/Project.jsx'
import Reports from './pages/Reports.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/projects",
    element: <Project />
  },
  {
    path: "/project/:projectId",
    element: <Project />
  },
  {
    path: "/teams",
    element: <Teams />
  },
  {
    path: "/teams/:teamId",
    element: <TeamDetails />
  },
  {
    path: "/reports",
    element: <Reports />
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
