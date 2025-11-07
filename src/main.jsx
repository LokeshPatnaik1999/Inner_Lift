import React from 'react'
import { createRoot } from 'react-dom/client'
import { 
  createBrowserRouter, 
  RouterProvider,
  createRoutesFromElements,
  Route,
  Navigate
} from 'react-router-dom'
import App from './App'
import Landing from './pages/Landing'
import Onboarding from './pages/Onboarding'
import Login from './pages/Login'
import Silence from './pages/Silence'
import AdaptiveQuestions from './pages/AdaptiveQuestions'
import Results from './pages/Results'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import SwipeBuddies from './pages/SwipeBuddies'
import './index.css'

// Debug logging
const withLogging = (Component, name) => (props) => {
  console.log(`Rendering ${name}`, props)
  return <Component {...props} />
}

// Create router with future flags enabled
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      <Route index element={<Landing />} />
  <Route path="onboarding" element={<Onboarding />} />
  <Route path="login" element={<Login />} />
      <Route path="silence" element={<Silence />} />
      <Route path="questions" element={<AdaptiveQuestions />} />
      <Route path="results" element={<Results />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="profile" element={<Profile />} />
      <Route path="swipe" element={<SwipeBuddies />} />
      <Route path="*" element={<Navigate to="/" replace />} /> {/* Catch all invalid routes */}
    </Route>
  ),
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }
  }
)

import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}> // <-- ADD THIS LINE
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
