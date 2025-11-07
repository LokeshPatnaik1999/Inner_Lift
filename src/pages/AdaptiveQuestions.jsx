import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { questionTree } from '../data/questions'
import { calculateEmotionalProfile } from '../api/emotionModel'

export default function AdaptiveQuestions() {
  console.log('AdaptiveQuestions component mounting')
  const [currentQ, setCurrentQ] = useState('q1')
  const [answers, setAnswers] = useState({})
  const [isTransitioning, setTransitioning] = useState(false)
  const questionRef = useRef()
  const nav = useNavigate()

  if (!questionTree[currentQ]) {
    console.error('No question found for:', currentQ)
    return (
      <div className="max-w-2xl mx-auto text-center card">
        <h2 className="text-2xl font-semibold mb-4">Error Loading Questions</h2>
        <p className="text-gray-400">Please try refreshing the page</p>
      </div>
    )
  }

  // Initialize and fade animation
  useEffect(() => {
    console.log('Question effect running', { currentQ, questionTree: !!questionTree })
    // Ensure we have the first question
    if (!questionTree[currentQ]) {
      console.error('Question tree not loaded properly')
      return
    }

    // Fade in the question
    if (questionRef.current) {
      questionRef.current.style.opacity = 1
    }
  }, [currentQ])

  // Debug logging
  useEffect(() => {
    console.log('Current question:', currentQ)
    console.log('Question data:', questionTree[currentQ])
  }, [currentQ])

  function handleAnswer(option) {
    setTransitioning(true)
    
    // Record answer with its weights
    setAnswers(prev => ({
      ...prev,
      [currentQ]: option
    }))

    // Fade out
    if (questionRef.current) {
      questionRef.current.style.opacity = 0
    }

    // Wait for fade, then change question
    setTimeout(() => {
      if (option.next === 'final') {
        const profile = calculateEmotionalProfile(answers)
        localStorage.setItem('innerlift_analysis', JSON.stringify(profile))
        nav('/results')
      } else {
        setCurrentQ(option.next)
        setTransitioning(false)
      }
    }, 300)
  }

  const question = questionTree[currentQ]

  console.log('AdaptiveQuestions render:', { currentQ, question: questionTree[currentQ], answers })

  return (
    <div className="max-w-2xl mx-auto">
      <div 
        ref={questionRef}
        className="card transition-opacity duration-300 ease-in-out"
        style={{ opacity: 0 }}
      >
        <h3 className="text-xl font-semibold mb-6">{question.text}</h3>

        <div className="grid gap-3">
          {question.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => !isTransitioning && handleAnswer(opt)}
              className="p-4 border border-border rounded-lg text-left transition-all duration-200
                hover:border-accent hover:shadow-glow-sm
                group relative overflow-hidden"
              disabled={isTransitioning}
            >
              {/* Yellow gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent 
                           opacity-0 group-hover:opacity-100 transition-opacity duration-200"/>
              
              {/* Content */}
              <div className="relative">
                <span className="block text-gray-100">{opt.label}</span>
                
                {/* Subtle dimension indicators */}
                <div className="flex gap-2 mt-2">
                  {Object.entries(opt.weights).map(([dim, weight]) => 
                    weight !== 0 && (
                      <span 
                        key={dim}
                        className={`text-xs px-2 py-0.5 rounded-full
                          ${weight > 0 ? 'bg-accent/10 text-accent' : 'bg-border text-gray-400'}`}
                      >
                        {dim}
                      </span>
                    )
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Progress indicator */}
        <div className="mt-8 flex justify-center gap-2">
          {Object.keys(questionTree).map((qId, i) => (
            <div
              key={qId}
              className={`w-2 h-2 rounded-full transition-colors duration-200
                ${currentQ === qId ? 'bg-accent' : 
                  answers[qId] ? 'bg-accent/30' : 'bg-border'}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}