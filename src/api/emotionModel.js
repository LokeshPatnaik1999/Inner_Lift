// Mock ML model results - replace with real ML inference later
const dimensions = {
  calm: { color: '#22d3ee', label: 'Calm' },
  motivation: { color: '#facc15', label: 'Motivation' },
  social: { color: '#38bdf8', label: 'Social' },
  consistency: { color: '#84cc16', label: 'Consistency' },
  intensity: { color: '#ef4444', label: 'Intensity' }
}

// Accumulate emotional scores based on question weights
export function calculateEmotionalProfile(answers) {
  const scores = {
    calm: 50,
    motivation: 50,
    social: 50,
    consistency: 50,
    intensity: 50
  }
  
  // Add weights from each answer
  Object.values(answers).forEach(answer => {
    Object.entries(answer.weights).forEach(([dim, weight]) => {
      scores[dim] = Math.max(0, Math.min(100, scores[dim] + weight * 10))
    })
  })
  
  // Convert to percentages
  const total = Object.values(scores).reduce((a, b) => a + b, 0)
  Object.keys(scores).forEach(key => {
    scores[key] = parseFloat((scores[key] / total).toFixed(2))
  })
  
  return {
    dimensions: scores,
    colors: Object.fromEntries(Object.entries(dimensions).map(([k,v]) => [k, v.color])),
    labels: Object.fromEntries(Object.entries(dimensions).map(([k,v]) => [k, v.label])),
    tags: generateTags(scores),
    score: calculateOverallScore(scores)
  }
}

function generateTags(scores) {
  const tags = []
  if (scores.calm > 0.22) tags.push('Calm Mind')
  if (scores.motivation > 0.22) tags.push('Self-Driven')
  if (scores.social > 0.22) tags.push('Team Player')
  if (scores.consistency > 0.22) tags.push('Consistent')
  if (scores.intensity > 0.22) tags.push('High Energy')
  return tags
}

function calculateOverallScore(scores) {
  return Math.round(
    (scores.motivation * 30 + 
     scores.consistency * 25 + 
     scores.intensity * 20 + 
     scores.social * 15 + 
     scores.calm * 10) * 100
  )
}

// Calculate match percentage between two emotional profiles
export function calculateMatch(profileA, profileB) {
  const dimensions = Object.keys(profileA.dimensions)
  
  // Euclidean distance normalized to [0,1]
  const distance = Math.sqrt(
    dimensions.reduce((sum, dim) => {
      const diff = profileA.dimensions[dim] - profileB.dimensions[dim]
      return sum + diff * diff
    }, 0)
  ) / Math.sqrt(dimensions.length)
  
  // Convert to similarity score [0,100]
  const similarity = (1 - distance) * 100
  
  // Apply bonuses
  let score = similarity
  
  // Bonus for complementary consistency
  if (profileA.dimensions.consistency < 0.15 && profileB.dimensions.consistency > 0.25) {
    score += 10
  }
  
  // Bonus for mutual high motivation
  if (profileA.dimensions.motivation > 0.22 && profileB.dimensions.motivation > 0.22) {
    score += 5
  }
  
  return Math.round(Math.min(100, score))
}