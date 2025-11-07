import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMatchesFromAnalysis } from '../api/mockApi'

export default function SwipeBuddies() {
  const [loading, setLoading] = useState(true)
  const [searchProgress, setSearchProgress] = useState(0)
  const [matches, setMatches] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [swipeDirection, setSwipeDirection] = useState(null)
  const [dragStart, setDragStart] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const nav = useNavigate()

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem('innerlift_user')||'null')
    } catch (e) {
      return null
    }
  })()

  const analysis = (() => {
    try {
      const data = JSON.parse(localStorage.getItem('innerlift_analysis')||'null')
      return data && data.tags ? data : null
    } catch (e) {
      return null
    }
  })()

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
    }, 2000)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(loadingTimeout)
    }
  }, [analysis])

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (swipeDirection !== null) return // Don't allow input during animation
      
      if (e.key === 'ArrowLeft') {
        handleSwipe('left')
      } else if (e.key === 'ArrowRight') {
        handleSwipe('right')
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [swipeDirection, currentIndex, matches])

  const handleSwipe = (direction) => {
    setSwipeDirection(direction)
    
    const currentBuddy = matches[currentIndex]
    
    if (direction === 'right') {
      // Send connection request
      setTimeout(() => {
        alert(`Connection request sent to ${currentBuddy.name}! 💪`)
      }, 300)
    }

    // Move to next card after animation
    setTimeout(() => {
      if (currentIndex < matches.length - 1) {
        setCurrentIndex(currentIndex + 1)
        setSwipeDirection(null)
        setDragOffset(0)
      } else {
        // All done
        setTimeout(() => {
          nav('/dashboard')
        }, 500)
      }
    }, 400)
  }

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setDragStart(e.clientX)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    const offset = e.clientX - dragStart
    setDragOffset(offset)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    
    // If dragged far enough, trigger swipe
    if (Math.abs(dragOffset) > 100) {
      if (dragOffset > 0) {
        handleSwipe('right')
      } else {
        handleSwipe('left')
      }
    } else {
      // Reset position
      setDragOffset(0)
    }
  }

  const handleTouchStart = (e) => {
    setIsDragging(true)
    setDragStart(e.touches[0].clientX)
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return
    const offset = e.touches[0].clientX - dragStart
    setDragOffset(offset)
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    
    if (Math.abs(dragOffset) > 100) {
      if (dragOffset > 0) {
        handleSwipe('right')
      } else {
        handleSwipe('left')
      }
    } else {
      setDragOffset(0)
    }
  }

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 mb-4">
              <svg className="animate-spin h-16 w-16 text-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <h4 className="text-lg font-semibold mb-2 text-accent">Searching for compatible buddies...</h4>
            <p className="text-sm text-gray-400 mb-4">Analyzing {user?.location || 'your area'} for the best matches</p>
            
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
            
            <div className="mt-6 text-sm text-gray-400 text-center space-y-1">
              {searchProgress < 30 && <p>🔍 Scanning emotional profiles...</p>}
              {searchProgress >= 30 && searchProgress < 60 && <p>📍 Filtering by location...</p>}
              {searchProgress >= 60 && searchProgress < 90 && <p>🎯 Calculating compatibility scores...</p>}
              {searchProgress >= 90 && <p>✨ Finalizing your matches...</p>}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!matches.length) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card text-center">
          <h3 className="text-xl font-semibold mb-4">No matches found</h3>
          <p className="text-gray-400 mb-4">Complete your emotional profile to find buddies!</p>
          <button onClick={() => nav('/silence')} className="btn-primary">
            Take Assessment
          </button>
        </div>
      </div>
    )
  }

  if (currentIndex >= matches.length) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-2xl font-semibold mb-2 text-accent">All done!</h3>
          <p className="text-gray-400 mb-6">You've reviewed all your matches. Check your dashboard for connections!</p>
          <button onClick={() => nav('/dashboard')} className="btn-primary">
            Go to Dashboard
          </button>
        </div>
      </div>
    )
  }

  const currentBuddy = matches[currentIndex]
  const rotation = dragOffset * 0.1
  const opacity = 1 - Math.abs(dragOffset) / 500

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => nav('/dashboard')} className="btn-ghost">
          ← Dashboard
        </button>
        <div className="text-gray-400 text-sm">
          {currentIndex + 1} / {matches.length}
        </div>
      </div>

      {/* Keyboard hint */}
      <div className="text-center mb-4 p-3 bg-surface rounded-lg border border-border">
        <p className="text-sm text-gray-400">
          ⌨️ Use keyboard: <span className="text-accent font-semibold">← Left Arrow</span> to skip, <span className="text-accent font-semibold">Right Arrow →</span> to connect
        </p>
      </div>

      {/* Card Stack */}
      <div className="relative h-[600px]">
        {/* Next cards preview (behind) */}
        {currentIndex + 1 < matches.length && (
          <div className="absolute inset-0 card scale-95 opacity-50 blur-sm" style={{ zIndex: 0 }}>
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold">{matches[currentIndex + 1].name}</div>
                <div className="text-gray-400">{matches[currentIndex + 1].location}</div>
              </div>
            </div>
          </div>
        )}

        {/* Current card */}
        <div
          className="absolute inset-0 card cursor-grab active:cursor-grabbing select-none overflow-hidden"
          style={{
            transform: swipeDirection 
              ? `translateX(${swipeDirection === 'right' ? '150%' : '-150%'}) rotate(${swipeDirection === 'right' ? '30deg' : '-30deg'})`
              : `translateX(${dragOffset}px) rotate(${rotation}deg)`,
            transition: swipeDirection || !isDragging ? 'transform 0.4s ease-out' : 'none',
            opacity: swipeDirection ? 0 : opacity,
            zIndex: 10
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Swipe indicators */}
          {dragOffset > 50 && (
            <div className="absolute top-8 right-8 z-20 bg-red-600 text-white px-6 py-3 rounded-lg font-bold text-xl rotate-12 border-4 border-red-500">
              CONNECT!
            </div>
          )}
          {dragOffset < -50 && (
            <div className="absolute top-8 left-8 z-20 bg-red-500 text-white px-6 py-3 rounded-lg font-bold text-xl -rotate-12 border-4 border-red-400">
              SKIP
            </div>
          )}

          {/* Card content */}
          <div className="h-full flex flex-col p-6">
            {/* Match badge */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-3xl font-bold">{currentBuddy.name}</h2>
                <p className="text-gray-400 flex items-center gap-2 mt-1">
                  <span>📍 {currentBuddy.location}</span>
                  <span>•</span>
                  <span>{currentBuddy.activity}</span>
                </p>
              </div>
              <span className="badge-accent text-lg px-4 py-2">{currentBuddy.match}%</span>
            </div>

            {/* Bio */}
            <div className="mb-4">
              <p className="text-gray-300 italic">"{currentBuddy.bio}"</p>
            </div>

            {/* Details */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-gray-400">
                <span>🎯 Goal:</span>
                <span className="text-gray-300">{currentBuddy.goals}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <span>⏰ Prefers:</span>
                <span className="text-gray-300">{currentBuddy.time}</span>
              </div>
            </div>

            {/* Traits */}
            <div className="flex flex-wrap gap-2 mb-4">
              {currentBuddy.traits.map(trait => (
                <span key={trait} className="badge-accent text-xs">{trait}</span>
              ))}
            </div>

            {/* Action buttons - Positioned at bottom of card */}
            <div className="mt-auto pt-4">
              <div className="flex justify-center gap-8 items-center">
                <button
                  onClick={() => handleSwipe('left')}
                  className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-all hover:scale-110 shadow-lg"
                  disabled={swipeDirection !== null}
                >
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="text-center">
                  <div className="text-sm text-gray-400 mb-1">Swipe or Click</div>
                  <div className="text-xs text-gray-500">← Skip | Connect! →</div>
                </div>

                <button
                  onClick={() => handleSwipe('right')}
                  className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center transition-all hover:scale-110 shadow-lg"
                  disabled={swipeDirection !== null}
                >
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-6 card-soft text-center">
        <p className="text-sm text-gray-400">
          💡 Drag the card, click buttons, or use arrow keys to review matches
        </p>
      </div>
    </div>
  )
}
