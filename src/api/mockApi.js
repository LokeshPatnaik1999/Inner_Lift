// Simple rule-based mock sentiment analysis and matching for MVP

const MOCK_USERS = [
  {
    id: 1, 
    name: 'Alex Rivera', 
    location: 'Boca Raton', 
    activity: 'Gym',
    motivation: 'Build strength', 
    traits: ['Early Morning','Self-Driven','High Energy'], 
    time: 'Morning',
    bio: 'Powerlifter focused on strength gains. Looking for a consistent morning partner.',
    goals: 'Deadlift 500lbs by year end'
  },
  {
    id: 2, 
    name: 'Maria Santos', 
    location: 'Delray Beach', 
    activity: 'Yoga',
    motivation: 'Mental health', 
    traits: ['Calm Mind','Gentle Approach','Evening'], 
    time: 'Evening',
    bio: 'Yoga instructor who loves combining breathwork with gentle movement.',
    goals: 'Master advanced inversions'
  },
  {
    id: 3, 
    name: 'Jordan Kim', 
    location: 'West Palm Beach', 
    activity: 'Crossfit',
    motivation: 'Competition training', 
    traits: ['High Energy','Team Player','Consistent'], 
    time: 'Evening',
    bio: 'Training for local CrossFit competitions. Love the community vibe!',
    goals: 'Top 10 in regional competition'
  },
  {
    id: 4, 
    name: 'Taylor Brooks', 
    location: 'Boca Raton', 
    activity: 'Bike',
    motivation: 'Weight loss', 
    traits: ['Morning Rider','Motivated','Social'], 
    time: 'Morning',
    bio: 'Cycling enthusiast riding 50+ miles weekly. Coffee after rides?',
    goals: 'Complete a century ride'
  },
  {
    id: 5, 
    name: 'Sam Patel', 
    location: 'Miami', 
    activity: 'Gym',
    motivation: 'Stay healthy', 
    traits: ['Flexible Schedule','Balanced','Steady'], 
    time: 'Flexible',
    bio: 'Software engineer balancing work and fitness. Flexible schedule.',
    goals: 'Consistent 4x/week routine'
  },
  {
    id: 6, 
    name: 'Casey Martinez', 
    location: 'Delray Beach', 
    activity: 'Walk',
    motivation: 'Stress relief', 
    traits: ['Calm','Social','Daily Walker'], 
    time: 'Morning',
    bio: 'Love morning beach walks and meaningful conversations.',
    goals: '10k steps daily'
  },
  {
    id: 7, 
    name: 'Jamie Chen', 
    location: 'Boca Raton', 
    activity: 'Crossfit',
    motivation: 'Build strength', 
    traits: ['High Energy','Hard Pusher','Evening'], 
    time: 'Evening',
    bio: 'Competitive mindset, always pushing for PRs. Let\'s motivate each other!',
    goals: 'Muscle-up mastery'
  },
  {
    id: 8, 
    name: 'Morgan Taylor', 
    location: 'West Palm Beach', 
    activity: 'Yoga',
    motivation: 'Flexibility & peace', 
    traits: ['Calm Mind','Consistent','Afternoon'], 
    time: 'Afternoon',
    bio: 'Corporate professional finding balance through afternoon yoga sessions.',
    goals: 'Full splits & handstands'
  },
  {
    id: 9, 
    name: 'Riley Johnson', 
    location: 'Miami', 
    activity: 'Gym',
    motivation: 'Aesthetics', 
    traits: ['Disciplined','Evening Lifter','Self-Driven'], 
    time: 'Evening',
    bio: 'Bodybuilding prep, strict nutrition, and heavy lifting.',
    goals: 'First physique competition'
  },
  {
    id: 10, 
    name: 'Dakota Lee', 
    location: 'Delray Beach', 
    activity: 'Bike',
    motivation: 'Mental health', 
    traits: ['Morning Rider','Calm','Nature Lover'], 
    time: 'Morning',
    bio: 'Nature trails and sunrise rides are my therapy. Join me?',
    goals: 'Explore every trail in Florida'
  }
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
  if(!analysis || !analysis.tags) return []
  
  // Get user's location and activity preference from localStorage
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem('innerlift_user')||'null')
    } catch (e) {
      return null
    }
  })()
  
  // Score mock users by matching location, activity, traits, and motivation
  const matches = MOCK_USERS.map(u => {
    let m = 30
    
    // Location match is important
    if(user && u.location === user.location) m += 25
    
    // Activity match
    if(user && u.activity === user.activity) m += 20
    
    // Trait overlap
    m += traitMatchScore(analysis.tags, u.traits || [])
    
    // Time preference
    if(analysis.tags.includes('Early Morning') && u.time === 'Morning') m += 10
    if(analysis.tags.includes('High Energy') && u.traits.includes('High Energy')) m += 10
    if(analysis.tags.includes('Calm Mind') && u.traits.includes('Calm')) m += 10
    
    return {...u, match: Math.min(100, m)}
  })
  
  // Filter by same location first, then sort by match score
  const sameLocation = matches.filter(m => user && m.location === user.location)
  const otherLocation = matches.filter(m => !user || m.location !== user.location)
  
  const sorted = [...sameLocation, ...otherLocation].sort((a,b) => b.match - a.match)
  
  // return top 6 matches
  return sorted.slice(0, 6)
}
