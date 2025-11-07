// Simple rule-based mock sentiment analysis and matching for MVP

const MOCK_USERS = [
  {id:1, name:'Avery', city:'Seattle', motivation:'Strength', traits:['Evening Lifter','Motivated Introvert'], time:'Evening'},
  {id:2, name:'Jordan', city:'Seattle', motivation:'Stress relief', traits:['Morning Mover','Social'], time:'Morning'},
  {id:3, name:'Sam', city:'Portland', motivation:'Aesthetics', traits:['Flexible','Hype'], time:'Flexible'},
  {id:4, name:'Riley', city:'Seattle', motivation:'Health', traits:['Gentle Check-in','Quiet presence'], time:'Afternoon'},
  {id:5, name:'Casey', city:'Seattle', motivation:'Discipline', traits:['Hard Pusher','Evening Lifter'], time:'Evening'}
]

export function analyzeProfile(profile){
  // profile includes mood, motivation, support, energy, days, time
  const sentiment = profile.mood || 'Calm'
  const motivation = profile.motivation || 'Health'

  const traits = []
  if(profile.time === 'Evening') traits.push('Evening Lifter')
  if(profile.time === 'Morning') traits.push('Morning Mover')
  if(profile.energy >=4) traits.push('High Energy')
  if(profile.support === 'Quiet presence') traits.push('Motivated Introvert')
  if(profile.support === 'Hype') traits.push('Hype')
  if(profile.support === 'Hard push') traits.push('Hard Pusher')
  if(profile.support === 'Gentle check-in') traits.push('Gentle Check-in')

  // score is a rough combination
  let score = 50
  if(sentiment === 'Calm') score += 10
  if(sentiment === 'Excited') score += 5
  if(profile.energy >=4) score += 10
  if(profile.days >=4) score += 10
  if(profile.motivation === 'Strength') score += 7

  score = Math.min(100, score)

  return {
    sentiment,
    motivation,
    traits: traits.length ? traits : ['Balanced'],
    score
  }
}

function traitMatchScore(userTraits = [], otherTraits = []){
  let s = 0
  // Ensure both arrays exist before comparing
  if (Array.isArray(userTraits) && Array.isArray(otherTraits)) {
    userTraits.forEach(t => { 
      if (otherTraits.includes(t)) s += 25 
    })
  }
  return s
}

export function getMatchesFromAnalysis(analysis){
  if(!analysis || !analysis.traits) return []
  // Score mock users by matching motivation, trait overlap, and time
  const matches = MOCK_USERS.map(u => {
    let m = 40
    if(u.motivation === analysis.motivation) m += 20
    m += traitMatchScore(analysis.traits, u.traits || [])
    if(analysis.traits.includes('Evening Lifter') && u.time === 'Evening') m += 10
    if(analysis.traits.includes('Morning Mover') && u.time === 'Morning') m += 10
    return {...u, match: Math.min(100, m)}
  })
  // sort desc and return top 4
  return matches.sort((a,b)=>b.match-a.match).slice(0,4)
}
