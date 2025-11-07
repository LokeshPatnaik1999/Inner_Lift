import React from 'react'
import { getMatchesFromAnalysis } from '../api/mockApi'

export default function Dashboard(){
  // Safely parse localStorage data with error handling
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem('innerlift_user')||'null')
    } catch (e) {
      console.error('Error parsing user data:', e)
      return null
    }
  })()

  const analysis = (() => {
    try {
      const data = JSON.parse(localStorage.getItem('innerlift_analysis')||'null')
      return data && data.traits ? data : null
    } catch (e) {
      console.error('Error parsing analysis data:', e)
      return null
    }
  })()

  const matches = (() => {
    try {
      return analysis ? getMatchesFromAnalysis(analysis) : []
    } catch (e) {
      console.error('Error getting matches:', e)
      return []
    }
  })()

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card-soft mb-6">
        <h2 className="text-2xl font-semibold">{user?.name || 'Welcome'}</h2>
        <p className="text-sm text-gray-400">{user?.city ? `${user.city} · ${user.gym || ''}` : 'No profile saved'}</p>
      </div>

      <div className="card mb-6">
        <h3 className="text-xl font-semibold mb-3">Your analysis</h3>
        {analysis ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Sentiment:</span> 
              <span className="badge-accent">{analysis.sentiment}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Motivation:</span>
              <span className="badge-accent">{analysis.motivation}</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-gray-400">Traits:</span>
              {analysis.traits.map(trait => (
                <span key={trait} className="badge">{trait}</span>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Score:</span>
              <span className="text-accent font-mono text-lg">{analysis.score}</span>
            </div>
          </div>
        ) : (
          <div className="text-sm text-gray-400">No analysis yet. Try onboarding → silence → questions.</div>
        )}
      </div>

      <div className="card">
        <h3 className="text-xl font-semibold mb-3">Suggested Buddies</h3>
        {matches.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {matches.map(m => (
              <div key={m.id} className="p-4 border border-border rounded-lg bg-gradient-radial relative overflow-hidden group hover:shadow-glow-sm transition-shadow duration-200">
                <div className="absolute top-0 left-0 w-1 h-full bg-accent opacity-50"/>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{m.name}</div>
                    <div className="text-sm text-gray-400">{m.city} · {m.traits.join(', ')}</div>
                  </div>
                  <div className="badge-accent">Match {m.match}%</div>
                </div>
                <div className="mt-3 text-sm text-gray-300">Motivation: {m.motivation}</div>
                <div className="mt-2 text-sm text-gray-400">Availability: {m.time}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-gray-400">No matches found yet.</div>
        )}
      </div>
    </div>
  )
}
