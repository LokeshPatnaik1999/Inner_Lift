import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const nav = useNavigate()

  useEffect(() => {
    // Redirect if already logged in
    try {
      const user = JSON.parse(localStorage.getItem('innerlift_user') || 'null')
      if (user) {
        const analysis = JSON.parse(localStorage.getItem('innerlift_analysis') || 'null')
        nav(analysis ? '/dashboard' : '/silence')
      }
    } catch (e) {
      console.error('Error checking user status:', e)
    }
  }, [nav])

  function handleSubmit(e){
    e.preventDefault()
    setError('')
    // Basic required validation
    if(String(email || '').trim() === '' || String(password || '').trim() === ''){
      setError('Please enter both email and password.')
      return
    }
    try{
      const stored = JSON.parse(localStorage.getItem('innerlift_user') || 'null')
      if(!stored){
        setError('No account found. Please sign up first.')
        return
      }
      if(stored.email !== email || stored.password !== password){
        setError('Email or password incorrect')
        return
      }
      // login success - ensure stored user is set and notify
      localStorage.setItem('innerlift_user', JSON.stringify(stored))
      try{ window.dispatchEvent(new Event('innerlift_auth')) }catch(e){}
      nav('/dashboard')
    }catch(e){
      console.error('Login error', e)
      setError('Unexpected error - check console')
    }
  }

  return (
    <div className="max-w-md mx-auto card">
      <h2 className="text-2xl font-semibold mb-4">Log in to InnerLift</h2>
      <p className="text-sm text-gray-400 mb-3">Fields marked <span className="text-red-400">*</span> are mandatory.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300">Email <span className="text-red-400">*</span></label>
          <input value={email} onChange={e=>setEmail(e.target.value)} required type="email" className="mt-1 block w-full bg-background border border-border rounded-lg px-3 py-2 text-gray-100" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Password <span className="text-red-400">*</span></label>
          <input value={password} onChange={e=>setPassword(e.target.value)} required type="password" className="mt-1 block w-full bg-background border border-border rounded-lg px-3 py-2 text-gray-100" />
        </div>
        {error && <div className="text-sm text-red-400">{error}</div>}
        <div className="flex items-center justify-between">
          <button type="submit" className="btn-primary">Log In</button>
          <Link to="/onboarding" className="text-sm text-gray-400">Create an account</Link>
        </div>
      </form>
    </div>
  )
}
