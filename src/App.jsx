import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

function App(){
  // Track user state from localStorage so nav updates after sign up/login
  const [user, setUser] = useState(null)
  const nav = useNavigate()

  useEffect(() => {
    try{
      const u = JSON.parse(localStorage.getItem('innerlift_user') || 'null')
      setUser(u)
    }catch(e){
      console.error('Error reading user from storage', e)
      setUser(null)
    }

    // Update if another tab changes localStorage or app dispatches auth event
    const onStorage = (e) => {
      if(e.key === 'innerlift_user'){
        try{ setUser(JSON.parse(e.newValue || 'null')) }catch{ setUser(null) }
      }
    }
    const onAuth = () => {
      try{ setUser(JSON.parse(localStorage.getItem('innerlift_user') || 'null')) }catch{ setUser(null) }
    }
    window.addEventListener('storage', onStorage)
    window.addEventListener('innerlift_auth', onAuth)
    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('innerlift_auth', onAuth)
    }
  }, [])

  function handleLogout(){
    localStorage.removeItem('innerlift_user')
    localStorage.removeItem('innerlift_analysis')
    setUser(null)
    // navigate home
    nav('/')
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-white">
      <nav className="bg-surface border-b border-border">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="font-bold text-xl text-accent">InnerLift</Link>
          <div className="flex items-center space-x-3">
            {user ? (
              <>
                <Link to="/dashboard" className="btn-ghost">Dashboard</Link>
                <Link to="/profile" className="btn-ghost">Profile</Link>
                <button onClick={handleLogout} className="btn-secondary">Log Out</button>
              </>
            ) : (
              <>
                <Link to="/onboarding" className="btn-primary">Sign Up</Link>
                <Link to="/login" className="btn-ghost">Log In</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="bg-surface border-t border-border">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-400">© InnerLift — Emotional Gym Buddy Matcher</div>
      </footer>
    </div>
  )
}

export default App
