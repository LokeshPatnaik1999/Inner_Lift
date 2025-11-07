import React from 'react'
import { Link } from 'react-router-dom'

export default function Landing(){
  return (
    <div className="max-w-4xl mx-auto text-center py-16">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-wide">
        Find a gym buddy who matches your <span className="bg-gradient-yellow bg-clip-text text-transparent">mindset.</span>
      </h1>
      <p className="text-lg text-gray-400 mb-8">Because fitness is mental as much as physical.</p>

      <div className="flex justify-center gap-4 mb-8">
        <Link to="/onboarding" className="btn-primary">Get Started</Link>
        <Link to="/dashboard" className="btn-secondary">Log In</Link>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-soft text-center">
          <div className="text-2xl mb-3">🧘</div>
          <h3 className="font-semibold text-accent">Breathe</h3>
          <p className="text-sm text-gray-400">Start with a 10-minute reset.</p>
        </div>
        <div className="card-soft text-center">
          <div className="text-2xl mb-3">🤔</div>
          <h3 className="font-semibold text-accent">Reflect</h3>
          <p className="text-sm text-gray-400">Answer short questions about mood and motivation.</p>
        </div>
        <div className="card-soft text-center">
          <div className="text-2xl mb-3">🤝</div>
          <h3 className="font-semibold text-accent">Connect</h3>
          <p className="text-sm text-gray-400">Get matched with emotionally compatible buddies.</p>
        </div>
      </div>
    </div>
  )
}
