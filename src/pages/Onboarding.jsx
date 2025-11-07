import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Onboarding(){
  console.log('Onboarding component rendering')
  const [form, setForm] = useState({name:'', email:'', password:'', location:'', activity:''})
  const [error, setError] = useState('')
  const nav = useNavigate()
  
  React.useEffect(() => {
    console.log('Onboarding component mounted')
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

  function handleChange(e){
    setForm({...form, [e.target.name]: e.target.value})
  }

  function handleSelectChange(e){
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
          <label className="block text-sm font-medium text-gray-300">Location <span className="text-red-400">*</span></label>
          <select 
            name="location" 
            value={form.location} 
            onChange={handleSelectChange} 
            required
            aria-required="true"
            className="mt-1 block w-full bg-background border border-border rounded-lg px-3 py-2 
                    text-gray-100 focus:border-accent focus:ring-1 focus:ring-accent 
                    transition-colors duration-200" 
          >
            <option value="">Select a location</option>
            <option value="Boca Raton">Boca Raton</option>
            <option value="Delray Beach">Delray Beach</option>
            <option value="West Palm Beach">West Palm Beach</option>
            <option value="Miami">Miami</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Preferred Activity <span className="text-red-400">*</span></label>
          <select 
            name="activity" 
            value={form.activity} 
            onChange={handleSelectChange} 
            required
            aria-required="true"
            className="mt-1 block w-full bg-background border border-border rounded-lg px-3 py-2 
                    text-gray-100 focus:border-accent focus:ring-1 focus:ring-accent 
                    transition-colors duration-200" 
          >
            <option value="">Select an activity</option>
            <option value="Gym">Gym</option>
            <option value="Crossfit">Crossfit</option>
            <option value="Yoga">Yoga</option>
            <option value="Walk">Walk</option>
            <option value="Bike">Bike</option>
          </select>
        </div>

        {error && <div className="text-sm text-red-400">{error}</div>}

        <div className="flex justify-end">
          <button type="submit" className="btn-primary">Save & Continue</button>
        </div>
      </form>
    </div>
  )
}
