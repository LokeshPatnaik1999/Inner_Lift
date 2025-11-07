import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMatchesFromAnalysis } from '../api/mockApi'

export default function Dashboard(){
  const [loading, setLoading] = useState(true)
  const [searchProgress, setSearchProgress] = useState(0)
  const [connectingId, setConnectingId] = useState(null)
  const nav = useNavigate()
  
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
      return data && data.tags ? data : null
    } catch (e) {
      console.error('Error parsing analysis data:', e)
      return null
    }
  })()

  const [matches, setMatches] = useState([])

  // Simulate loading with progress bar
  useEffect(() => {
    if (!analysis) {
      setLoading(false)
      return
    }

    const progressInterval = setInterval(() => {
      setSearchProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 10
      })
    }, 150)

    const loadingTimeout = setTimeout(() => {
      try {
        const foundMatches = getMatchesFromAnalysis(analysis)
        setMatches(foundMatches)
        setLoading(false)
      } catch (e) {
        console.error('Error getting matches:', e)
        setMatches([])
        setLoading(false)
      }
    }, 2000) // 2 second delay for effect

    return () => {
      clearInterval(progressInterval)
      clearTimeout(loadingTimeout)
    }
  }, [analysis])

  function handleConnect(buddyId, buddyName) {
    setConnectingId(buddyId)
    // Simulate connection request
    setTimeout(() => {
      alert(`Connection request sent to ${buddyName}! They'll be notified.`)
      setConnectingId(null)
    }, 1000)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card-soft mb-6">
        <h2 className="text-2xl font-semibold">{user?.name || 'Welcome'}</h2>
        <p className="text-sm text-gray-400">{user?.location ? `${user.location} · ${user.activity || ''}` : 'No profile saved'}</p>
      </div>

      <div className="card mb-6">
        <h3 className="text-xl font-semibold mb-3">Your analysis</h3>
        {analysis ? (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-gray-400">Traits:</span>
              {analysis.tags && analysis.tags.map(tag => (
                <span key={tag} className="badge-accent">{tag}</span>
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
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-semibold">Suggested Buddies</h3>
          {matches.length > 0 && (
            <button 
              onClick={() => nav('/swipe')} 
              className="btn-energetic text-sm px-4 py-2"
            >
              🔥 Swipe Mode
            </button>
          )}
        </div>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 mb-4">
              <svg className="animate-spin h-16 w-16 text-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <h4 className="text-lg font-semibold mb-2 text-accent">Searching for compatible buddies...</h4>
            <p className="text-sm text-gray-400 mb-4">Analyzing {user?.location || 'your area'} for the best matches</p>
            
            {/* Progress bar */}
            <div className="w-full max-w-md">
              <div className="w-full bg-border rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-yellow h-2 transition-all duration-150 ease-out"
                  style={{ width: `${searchProgress}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Matching profiles...</span>
                <span>{searchProgress}%</span>
              </div>
            </div>
            
            {/* Loading messages */}
            <div className="mt-6 text-sm text-gray-400 text-center space-y-1">
              {searchProgress < 30 && <p>🔍 Scanning emotional profiles...</p>}
              {searchProgress >= 30 && searchProgress < 60 && <p>📍 Filtering by location...</p>}
              {searchProgress >= 60 && searchProgress < 90 && <p>🎯 Calculating compatibility scores...</p>}
              {searchProgress >= 90 && <p>✨ Finalizing your matches...</p>}
            </div>
          </div>
        ) : matches.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {matches.map(m => (
              <div key={m.id} className="p-5 border border-border rounded-lg bg-gradient-radial relative overflow-hidden group hover:shadow-glow-sm transition-all duration-200 hover:border-accent">
                <div className="absolute top-0 left-0 w-1 h-full bg-accent opacity-50"/>
                
                {/* Header with name and match */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-semibold text-lg">{m.name}</div>
                    <div className="text-sm text-gray-400 flex items-center gap-2 mt-1">
                      <span>📍 {m.location}</span>
                      <span>•</span>
                      <span>{m.activity}</span>
                    </div>
                  </div>
                  <div className="badge-accent">{m.match}%</div>
                </div>

                {/* Bio */}
                <p className="text-sm text-gray-300 mb-3 italic">"{m.bio}"</p>

                {/* Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-400">
                    <span>🎯 Goal:</span>
                    <span className="text-gray-300">{m.goals}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <span>⏰ Prefers:</span>
                    <span className="text-gray-300">{m.time}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {m.traits.map(trait => (
                      <span key={trait} className="badge text-xs">{trait}</span>
                    ))}
                  </div>
                </div>

                {/* Connect button */}
                <button 
                  onClick={() => handleConnect(m.id, m.name)}
                  disabled={connectingId === m.id}
                  className="mt-4 w-full btn-primary text-sm py-2 flex items-center justify-center gap-2"
                >
                  {connectingId === m.id ? (
                    <>
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Connecting...</span>
                    </>
                  ) : (
                    <span>Connect</span>
                  )}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-gray-400">No matches found yet. Complete your emotional profile to find buddies!</div>
        )}
      </div>
    </div>
  )
}
