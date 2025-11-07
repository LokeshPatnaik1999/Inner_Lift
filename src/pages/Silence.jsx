import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Silence(){
  const [seconds, setSeconds] = useState(600)
  const [running, setRunning] = useState(false)
  const timerRef = useRef(null)
  const modalTimeoutRef = useRef(null)
  const [showModal, setShowModal] = useState(false)
  const nav = useNavigate()

  useEffect(()=>{
    if(running){
      timerRef.current = setInterval(()=>{
        setSeconds(s => {
          console.log('Silence timer tick:', s)
          if(s <= 1){
            // clear and null the ref so cleanup is explicit
            clearInterval(timerRef.current)
            timerRef.current = null
            setRunning(false)
            console.log('Silence timer finished — showing completion modal')
            // Show a small modal to make the navigation obvious
            setShowModal(true)
            // Auto-navigate after 3s unless the user acts first
            modalTimeoutRef.current = setTimeout(()=> nav('/questions'), 3000)
            return 0
          }
          return s-1
        })
      }, 1000)
    }
    return ()=> {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
      if (modalTimeoutRef.current) {
        clearTimeout(modalTimeoutRef.current)
        modalTimeoutRef.current = null
      }
    }
  }, [running, nav])

  function start(){ 
    console.log('Start clicked - navigating to questions page')
    // Navigate directly to questions page when start is clicked
    nav('/questions')
  }

  function format(sec){
    const m = String(Math.floor(sec/60)).padStart(2,'0')
    const s = String(sec%60).padStart(2,'0')
    return `${m}:${s}`
  }

  return (
    <div className="max-w-2xl mx-auto text-center card-soft relative">
      {/* Timer in top left corner when running */}
      {running && (
        <div className="absolute top-4 left-4 text-2xl font-mono text-accent">
          {format(seconds)}
        </div>
      )}

      {/* Motivational Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">
          Take a Deep Breath <span className="text-orange-400">✨</span>
        </h2>
        <p className="text-lg text-gray-300 leading-relaxed mb-4">
          Click <span className="text-orange-400 font-semibold">Start</span> to answer a few quick questions about your fitness mindset.
        </p>
        <p className="text-md text-gray-400">
          Relax — our AI will find someone special who matches your energy, goals, and workout vibe. 💪
        </p>
      </div>

      {/* Optional: Timer Display */}
      {!running && (
        <div className="mb-8">
          <div className="inline-block px-6 py-4 bg-purple-500/10 border border-purple-500/30 rounded-2xl">
            <p className="text-sm text-purple-400 mb-2">Optional: 10-Minute Mindfulness Reset</p>
            <div className="text-4xl font-mono text-accent tracking-wider">
              {format(seconds)}
            </div>
          </div>
        </div>
      )}

      {/* Main CTA */}
      <div className="flex flex-col items-center gap-4 mt-8">
        <button onClick={start} className="btn-energetic text-lg px-12 py-4" disabled={showModal}>
          🚀 Start My Journey
        </button>
        
        <p className="text-sm text-gray-500 max-w-md">
          Answer 8 quick questions → Get your emotional profile → Meet your perfect gym buddy
        </p>
      </div>

      {/* Motivational Footer */}
      <div className="mt-12 pt-8 border-t border-border/50">
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl mb-2">⚡</div>
            <p className="text-sm text-gray-400">2 minutes to complete</p>
          </div>
          <div>
            <div className="text-3xl mb-2">🎯</div>
            <p className="text-sm text-gray-400">AI-powered matching</p>
          </div>
          <div>
            <div className="text-3xl mb-2">🤝</div>
            <p className="text-sm text-gray-400">Find your workout soulmate</p>
          </div>
        </div>
      </div>

      {/* Completion modal */}
      {showModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-surface p-6 rounded-lg max-w-md w-full text-center">
            <h3 className="text-xl font-semibold mb-2">Reflection complete</h3>
            <p className="text-gray-300 mb-4">Nice work — your 10-minute reflection is finished. Ready to continue to the questions?</p>
            <div className="flex justify-center gap-3">
              <button onClick={() => { if(modalTimeoutRef.current){ clearTimeout(modalTimeoutRef.current); modalTimeoutRef.current = null } setShowModal(false); nav('/questions') }} className="btn-primary">Continue</button>
              <button onClick={() => { if(modalTimeoutRef.current){ clearTimeout(modalTimeoutRef.current); modalTimeoutRef.current = null } setShowModal(false); setSeconds(0) }} className="btn-secondary">Stay here</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
