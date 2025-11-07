import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function BuddyProfile() {
  const { id } = useParams()
  const nav = useNavigate()
  const [connectionSent, setConnectionSent] = useState(false)
  const [message, setMessage] = useState('')
  
  // Mock buddy data - in real app this would come from API
  const buddy = {
    id: 1,
    name: 'Alex Rivera',
    location: 'Boca Raton',
    activity: 'Gym',
    motivation: 'Build strength',
    traits: ['Early Morning', 'Self-Driven', 'High Energy'],
    time: 'Morning',
    bio: 'Powerlifter focused on strength gains. Looking for a consistent morning partner.',
    goals: 'Deadlift 500lbs by year end',
    match: 87,
    joined: 'September 2024',
    workoutsLogged: 45,
    connections: 8
  }

  function handleConnect() {
    setConnectionSent(true)
    // In real app, this would send a connection request
    setTimeout(() => {
      nav('/dashboard')
    }, 2000)
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Back button */}
      <button onClick={() => nav('/dashboard')} className="btn-ghost mb-4">
        ← Back to Dashboard
      </button>

      {/* Profile Header */}
      <div className="card-soft mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold">{buddy.name}</h2>
            <p className="text-gray-400 mt-2 flex items-center gap-2">
              <span>📍 {buddy.location}</span>
              <span>•</span>
              <span>{buddy.activity}</span>
            </p>
            <div className="mt-4">
              <span className="badge-accent text-lg px-4 py-2">{buddy.match}% Match</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">Member since</div>
            <div className="text-gray-200">{buddy.joined}</div>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="card mb-6">
        <h3 className="text-xl font-semibold mb-3">About</h3>
        <p className="text-gray-300 italic mb-4">"{buddy.bio}"</p>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="p-3 bg-background rounded-lg border border-border">
            <div className="text-sm text-gray-400">Current Goal</div>
            <div className="text-gray-200 mt-1">{buddy.goals}</div>
          </div>
          <div className="p-3 bg-background rounded-lg border border-border">
            <div className="text-sm text-gray-400">Prefers</div>
            <div className="text-gray-200 mt-1">{buddy.time} workouts</div>
          </div>
        </div>
      </div>

      {/* Traits */}
      <div className="card mb-6">
        <h3 className="text-xl font-semibold mb-3">Personality Traits</h3>
        <div className="flex flex-wrap gap-2">
          {buddy.traits.map(trait => (
            <span key={trait} className="badge-accent">{trait}</span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="card mb-6">
        <h3 className="text-xl font-semibold mb-3">Activity Stats</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-background rounded-lg border border-border">
            <div className="text-2xl font-mono text-accent">{buddy.workoutsLogged}</div>
            <div className="text-sm text-gray-400 mt-1">Workouts Logged</div>
          </div>
          <div className="text-center p-4 bg-background rounded-lg border border-border">
            <div className="text-2xl font-mono text-accent">{buddy.connections}</div>
            <div className="text-sm text-gray-400 mt-1">Connections</div>
          </div>
          <div className="text-center p-4 bg-background rounded-lg border border-border">
            <div className="text-2xl font-mono text-accent">5x</div>
            <div className="text-sm text-gray-400 mt-1">Per Week</div>
          </div>
        </div>
      </div>

      {/* Connection Request */}
      {!connectionSent ? (
        <div className="card">
          <h3 className="text-xl font-semibold mb-3">Send Connection Request</h3>
          <p className="text-sm text-gray-400 mb-4">
            Introduce yourself and let {buddy.name} know why you'd like to work out together!
          </p>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Hey! I noticed we both work out in the morning and have similar goals. Would love to connect and motivate each other!"
            className="w-full bg-background border border-border rounded-lg px-4 py-3 text-gray-100 focus:border-accent focus:ring-1 focus:ring-accent mb-4 min-h-[120px]"
          />
          <div className="flex gap-3">
            <button onClick={handleConnect} className="btn-primary flex-1">
              Send Connection Request
            </button>
            <button onClick={() => nav('/dashboard')} className="btn-ghost">
              Maybe Later
            </button>
          </div>
        </div>
      ) : (
        <div className="card text-center">
          <div className="text-5xl mb-4">✅</div>
          <h3 className="text-2xl font-semibold mb-2 text-accent">Request Sent!</h3>
          <p className="text-gray-400 mb-4">
            We'll notify you when {buddy.name} responds to your connection request.
          </p>
          <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
        </div>
      )}
    </div>
  )
}
