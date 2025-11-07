import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Onboarding(){
  console.log('Onboarding component rendering')
  const [form, setForm] = useState({name:'', email:'', password:'', city:'', gym:''})
  const [error, setError] = useState('')
  const nav = useNavigate()
  
  React.useEffect(() => {
    console.log('Onboarding component mounted')
  }, [])

  function handleChange(e){
    setForm({...form, [e.target.name]: e.target.value})
  }

  function handleSubmit(e){
    e.preventDefault()
    setError('')
    // Basic validation: all fields mandatory
    const missing = Object.entries(form).filter(([k,v]) => String(v || '').trim() === '').map(([k])=>k)
    if(missing.length){
      setError('Please complete all fields before continuing.')
      return
    }

    // Save to localStorage (mock save)
    localStorage.setItem('innerlift_user', JSON.stringify(form))
    // Notify app about auth change so nav updates immediately
    try{ window.dispatchEvent(new Event('innerlift_auth')) }catch(e){ /* ignore */ }
    nav('/silence')
  }

  return (
    <div className="max-w-2xl mx-auto card">
      <h2 className="text-2xl font-semibold mb-4">Create your InnerLift profile</h2>
      <p className="text-sm text-gray-400 mb-4">Fields marked <span className="text-red-400">*</span> are mandatory.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300">Name <span className="text-red-400">*</span></label>
          <input 
            name="name" 
            value={form.name} 
            onChange={handleChange} 
            required 
            className="mt-1 block w-full bg-background border border-border rounded-lg px-3 py-2 
                     text-gray-100 focus:border-accent focus:ring-1 focus:ring-accent 
                     transition-colors duration-200" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Email <span className="text-red-400">*</span></label>
          <input 
            name="email" 
            type="email" 
            value={form.email} 
            onChange={handleChange} 
            required 
            className="mt-1 block w-full bg-background border border-border rounded-lg px-3 py-2 
                     text-gray-100 focus:border-accent focus:ring-1 focus:ring-accent 
                     transition-colors duration-200" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Password <span className="text-red-400">*</span></label>
          <input 
            name="password" 
            type="password" 
            value={form.password} 
            onChange={handleChange} 
            required 
            className="mt-1 block w-full bg-background border border-border rounded-lg px-3 py-2 
                     text-gray-100 focus:border-accent focus:ring-1 focus:ring-accent 
                     transition-colors duration-200" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">City <span className="text-red-400">*</span></label>
          <input 
            name="city" 
            value={form.city} 
            onChange={handleChange} 
            required
            aria-required="true"
            className="mt-1 block w-full bg-background border border-border rounded-lg px-3 py-2 
                    text-gray-100 focus:border-accent focus:ring-1 focus:ring-accent 
                    transition-colors duration-200" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Preferred Gym <span className="text-red-400">*</span></label>
          <input 
            name="gym" 
            value={form.gym} 
            onChange={handleChange} 
            required
            aria-required="true"
            className="mt-1 block w-full bg-background border border-border rounded-lg px-3 py-2 
                    text-gray-100 focus:border-accent focus:ring-1 focus:ring-accent 
                    transition-colors duration-200" 
          />
        </div>

        {error && <div className="text-sm text-red-400">{error}</div>}

        <div className="flex justify-end">
          <button type="submit" className="btn-primary">Save & Continue</button>
        </div>
      </form>
    </div>
  )
}
