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
  }, [running])

  function start(){ 
    console.log('Start clicked. seconds:', seconds, 'running:', running)
    if (seconds === 0) {
      reset()
    }
    // If already running, do nothing
    if (!running) setRunning(true)
  }

  function reset(){ 
    setSeconds(600)
    setRunning(false) 
  }

  function format(sec){
    const m = String(Math.floor(sec/60)).padStart(2,'0')
    const s = String(sec%60).padStart(2,'0')
    return `${m}:${s}`
  }

  return (
    <div className="max-w-2xl mx-auto text-center card-soft">
      <h2 className="text-2xl font-semibold mb-2">10-minute silent reflection</h2>
      <p className="text-sm text-gray-400 mb-6">Just breathe and reset your mind.</p>

      <div className="text-6xl font-mono mb-6 text-accent tracking-widest 
                    shadow-glow inline-block px-8 py-4 rounded-2xl 
                    bg-accent-muted border border-accent">{format(seconds)}</div>

      <div className="flex justify-center gap-3">
        <button onClick={start} className="btn-primary" disabled={running || showModal}>{running ? 'Running…' : 'Start'}</button>
        <button onClick={reset} className="btn-secondary" disabled={showModal}>Reset</button>
        <button 
          onClick={() => {
            console.log('Navigating to questions page');
            nav('/questions');
          }} 
          className="btn-ghost"
        >
          Skip for now
        </button>
        {/* Test/shortcut button: immediately finish the reflection and go to questions (visible during testing) */}
        <button
          onClick={() => {
            console.log('Finish now clicked — forcing navigation to /questions')
            if (timerRef.current) {
              clearInterval(timerRef.current)
              timerRef.current = null
            }
            if (modalTimeoutRef.current) {
              clearTimeout(modalTimeoutRef.current)
              modalTimeoutRef.current = null
            }
            setRunning(false)
            setShowModal(false)
            nav('/questions')
          }}
          className="btn-ghost"
          aria-label="Finish now and go to questions"
        >
          Finish now
        </button>
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
