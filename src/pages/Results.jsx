import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Chart from 'chart.js/auto'

export default function Results() {
  const chartRef = useRef(null)
  const analysis = JSON.parse(localStorage.getItem('innerlift_analysis') || 'null')

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
          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Your Traits</h3>
            <div className="flex flex-wrap gap-2">
              {analysis.tags.map(tag => (
                <span key={tag} className="badge-accent">{tag}</span>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Compatibility Score</h3>
            <div className="flex items-center gap-4">
              <div className="text-4xl font-mono text-accent">
                {analysis.score}
              </div>
              <div className="text-sm text-gray-400">
                Based on your emotional balance and motivation patterns
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Link to="/matches" className="btn-primary">
              Find Compatible Buddies
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}