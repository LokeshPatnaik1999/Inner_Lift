import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({name:'', email:'', location:'', activity:''})
  const [user, setUser] = useState(null)
  const [analysis, setAnalysis] = useState(null)
  const nav = useNavigate()

  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem('innerlift_user') || 'null')
      const analysisData = JSON.parse(localStorage.getItem('innerlift_analysis') || 'null')
      
      if (!userData) {
        nav('/login')
        return
      }
      
      setUser(userData)
      setAnalysis(analysisData)
      setForm({
        name: userData.name || '',
        email: userData.email || '',
        location: userData.location || '',
        activity: userData.activity || ''
      })
    } catch (e) {
      console.error('Error loading profile:', e)
      nav('/login')
    }
  }, [nav])

  function handleChange(e) {
    setForm({...form, [e.target.name]: e.target.value})
  }

  function handleSave() {
    try {
      const updatedUser = {...user, ...form}
      localStorage.setItem('innerlift_user', JSON.stringify(updatedUser))
      setUser(updatedUser)
      setEditing(false)
      window.dispatchEvent(new Event('innerlift_auth'))
    } catch (e) {
      console.error('Error saving profile:', e)
    }
  }

  function handleRetakeQuiz() {
    localStorage.removeItem('innerlift_analysis')
    nav('/silence')
  }

  if (!user) return null

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="card-soft">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold">{user.name}</h2>
            <p className="text-gray-400 mt-1">
              📍 {user.location} • {user.activity}
            </p>
          </div>
          {!editing ? (
            <button onClick={() => setEditing(true)} className="btn-secondary">
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button onClick={handleSave} className="btn-primary">Save</button>
              <button onClick={() => setEditing(false)} className="btn-ghost">Cancel</button>
            </div>
          )}
        </div>
      </div>

      {/* Profile Details */}
      <div className="card">
        <h3 className="text-xl font-semibold mb-4">Profile Information</h3>
        
        {editing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
              <input 
                name="name" 
                value={form.name} 
                onChange={handleChange}
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-gray-100 focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <input 
                name="email" 
                type="email"
                value={form.email} 
                onChange={handleChange}
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-gray-100 focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Location</label>
              <select 
                name="location" 
                value={form.location} 
                onChange={handleChange}
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-gray-100 focus:border-accent focus:ring-1 focus:ring-accent"
              >
                <option value="">Select a location</option>
                <option value="Boca Raton">Boca Raton</option>
                <option value="Delray Beach">Delray Beach</option>
                <option value="West Palm Beach">West Palm Beach</option>
                <option value="Miami">Miami</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Preferred Activity</label>
              <select 
                name="activity" 
                value={form.activity} 
                onChange={handleChange}
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-gray-100 focus:border-accent focus:ring-1 focus:ring-accent"
              >
                <option value="">Select an activity</option>
                <option value="Gym">Gym</option>
                <option value="Crossfit">Crossfit</option>
                <option value="Yoga">Yoga</option>
                <option value="Walk">Walk</option>
                <option value="Bike">Bike</option>
              </select>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <span className="text-sm text-gray-400">Email:</span>
              <span className="ml-2 text-gray-100">{user.email}</span>
            </div>
            <div>
              <span className="text-sm text-gray-400">Location:</span>
              <span className="ml-2 text-gray-100">{user.location}</span>
            </div>
            <div>
              <span className="text-sm text-gray-400">Activity:</span>
              <span className="ml-2 text-gray-100">{user.activity}</span>
            </div>
          </div>
        )}
      </div>

      {/* Emotional Profile */}
      {analysis && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Your Emotional Profile</h3>
            <button onClick={handleRetakeQuiz} className="btn-ghost text-sm">
              Retake Quiz
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {analysis.tags.map(tag => (
                <span key={tag} className="badge-accent">{tag}</span>
              ))}
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center p-4 bg-background rounded-lg border border-border">
                <div className="text-3xl font-mono text-accent">{analysis.score}</div>
                <div className="text-sm text-gray-400 mt-1">Compatibility Score</div>
              </div>
              <div className="text-center p-4 bg-background rounded-lg border border-border">
                <div className="text-3xl font-mono text-accent">{Object.keys(analysis.dimensions).length}</div>
                <div className="text-sm text-gray-400 mt-1">Dimensions Analyzed</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Activity Stats */}
      <div className="card">
        <h3 className="text-xl font-semibold mb-4">Your Activity</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-background rounded-lg border border-border">
            <div className="text-2xl font-mono text-accent">0</div>
            <div className="text-sm text-gray-400 mt-1">Connections</div>
          </div>
          <div className="text-center p-4 bg-background rounded-lg border border-border">
            <div className="text-2xl font-mono text-accent">0</div>
            <div className="text-sm text-gray-400 mt-1">Workouts Logged</div>
          </div>
          <div className="text-center p-4 bg-background rounded-lg border border-border">
            <div className="text-2xl font-mono text-accent">0</div>
            <div className="text-sm text-gray-400 mt-1">Days Active</div>
          </div>
        </div>
      </div>
    </div>
  )
}
