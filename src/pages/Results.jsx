import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Chart from 'chart.js/auto'

export default function Results() {
  const chartRef = useRef(null)
  const analysis = JSON.parse(localStorage.getItem('innerlift_analysis') || 'null')
  const [searching, setSearching] = useState(false)
  const nav = useNavigate()

  function handleFindBuddies() {
    setSearching(true)
    // Small delay before navigation for better UX
    setTimeout(() => {
      nav('/swipe')
    }, 500)
  }

  useEffect(() => {
    if (!analysis || !chartRef.current) return

    const ctx = chartRef.current.getContext('2d')
    
    // Destroy existing chart if any
    const existingChart = Chart.getChart(ctx)
    if (existingChart) {
      existingChart.destroy()
    }

    const { dimensions, colors, labels } = analysis
    
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(dimensions).map(k => labels[k]),
        datasets: [{
          data: Object.values(dimensions),
          backgroundColor: Object.values(dimensions).map((_, i) => 
            colors[Object.keys(dimensions)[i]]
          ),
          borderColor: '#111827',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        animation: {
          animateScale: true,
          animateRotate: true,
          duration: 2000
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#f9fafb',
              padding: 20,
              font: {
                size: 14
              }
            }
          }
        }
      }
    })
  }, [analysis])

  if (!analysis) return (
    <div className="text-center">No analysis available.</div>
  )

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card-soft mb-6 text-center">
        <h2 className="text-2xl font-semibold mb-2">Your Emotional Profile</h2>
        <p className="text-gray-400">
          Your mind's reflection shapes your lift.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Chart */}
        <div className="card p-4">
          <canvas ref={chartRef} />
        </div>

        {/* Analysis */}
        <div className="space-y-6">
          {/* Compatibility Score Breakdown */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Compatibility Score</h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="text-4xl font-mono text-accent">
                {analysis.score}
              </div>
              <div className="text-sm text-gray-400">
                Based on your emotional balance and motivation patterns
              </div>
            </div>
            
            {/* Score Breakdown */}
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between items-center p-2 bg-background rounded">
                <span className="text-gray-400">Motivation Level</span>
                <span className="text-accent font-mono">30%</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-background rounded">
                <span className="text-gray-400">Consistency Factor</span>
                <span className="text-accent font-mono">25%</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-background rounded">
                <span className="text-gray-400">Intensity Match</span>
                <span className="text-accent font-mono">20%</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-background rounded">
                <span className="text-gray-400">Social Alignment</span>
                <span className="text-accent font-mono">15%</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-background rounded">
                <span className="text-gray-400">Calm Index</span>
                <span className="text-accent font-mono">10%</span>
              </div>
              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-xs text-gray-500 italic">
                  💡 Higher scores indicate better workout partner compatibility based on shared emotional patterns and fitness approaches.
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Your Traits</h3>
            <div className="flex flex-wrap gap-2">
              {analysis.tags.map(tag => (
                <span key={tag} className="badge-accent">{tag}</span>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button 
              onClick={handleFindBuddies} 
              disabled={searching}
              className="btn-energetic flex items-center gap-2"
            >
              {searching ? (
                <>
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Searching...</span>
                </>
              ) : (
                <span>🔥 Find Compatible Buddies</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}