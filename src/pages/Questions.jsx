import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { analyzeProfile } from '../api/mockApi'

const QUESTIONS = [
  {key:'mood', label:'Current mood', type:'options', options:['Calm','Stressed','Excited','Low']},
  {key:'motivation', label:'Gym motivation', type:'options', options:['Strength','Stress relief','Aesthetics','Health','Discipline']},
  {key:'support', label:'Desired buddy support', type:'options', options:['Hype','Quiet presence','Hard push','Gentle check-in']},
  {key:'energy', label:'Energy level (1-5)', type:'range', min:1, max:5},
  {key:'days', label:'Days per week goal (1-7)', type:'range', min:1, max:7},
  {key:'time', label:'Typical workout time', type:'options', options:['Morning','Afternoon','Evening','Flexible']}
]

export default function Questions(){
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState({energy:3, days:3})
  const nav = useNavigate()

  function handleChange(k, v){ setAnswers(a=>({...a, [k]: v})) }

  async function handleNext(){
    if(idx < QUESTIONS.length-1){ setIdx(i=>i+1); return }
    // submit
    const user = JSON.parse(localStorage.getItem('innerlift_user')||'{}')
    const result = analyzeProfile({...user, ...answers})
    localStorage.setItem('innerlift_analysis', JSON.stringify(result))
    nav('/dashboard')
  }

  const q = QUESTIONS[idx]

  return (
    <div className="max-w-2xl mx-auto card">
      <h3 className="text-xl font-semibold mb-4">{q.label}</h3>

      <div className="mb-6">
        {q.type === 'options' && (
          <div className="grid grid-cols-2 gap-3">
            {q.options.map(opt => (
              <button 
                key={opt} 
                onClick={()=>handleChange(q.key, opt)} 
                className={`p-3 border rounded-lg text-left transition-all duration-200
                  ${answers[q.key]===opt
                    ? 'bg-accent-muted border-accent text-accent'
                    : 'border-border hover:border-accent hover:shadow-glow-sm'
                  }`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        {q.type === 'range' && (
          <div className="px-4">
            <input 
              type="range" 
              min={q.min} 
              max={q.max} 
              value={answers[q.key]} 
              onChange={(e)=>handleChange(q.key, Number(e.target.value))}
              className="w-full accent-accent" 
            />
            <div className="mt-2 text-accent font-mono text-lg">{answers[q.key]}</div>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <button 
          disabled={idx===0} 
          onClick={()=>setIdx(i=>Math.max(0,i-1))} 
          className={`btn-secondary ${idx===0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Back
        </button>
        <button 
          onClick={handleNext} 
          className="btn-primary"
        >
          {idx < QUESTIONS.length-1 ? 'Next' : 'Submit'}
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 mt-6">
        {[...Array(QUESTIONS.length)].map((_, i) => (
          <div 
            key={i} 
            className={`w-2 h-2 rounded-full transition-colors duration-200
              ${i === idx ? 'bg-accent' : i < idx ? 'bg-accent-muted' : 'bg-border'}`}
          />
        ))}
      </div>

      <div className="text-sm text-gray-400 mt-4 text-center">
        Question {idx+1} of {QUESTIONS.length}
      </div>
    </div>
  )
}
