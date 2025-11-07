// Adaptive questionnaire schema with branching logic and emotional weights
export const questionTree = {
  "q1": {
    "id": "q1",
    "text": "How do you feel right now?",
    "options": [
      { 
        "label": "Calm and focused", 
        "next": "q2a",
        "weights": {"calm": 2, "motivation": 1, "social": 0, "consistency": 1, "intensity": -1}
      },
      { 
        "label": "Energetic and excited", 
        "next": "q2b",
        "weights": {"calm": -1, "motivation": 2, "social": 1, "consistency": 0, "intensity": 2}
      },
      { 
        "label": "Stressed but determined", 
        "next": "q2c",
        "weights": {"calm": -2, "motivation": 1, "social": -1, "consistency": 1, "intensity": 1}
      },
      { 
        "label": "Low energy today", 
        "next": "q2d",
        "weights": {"calm": 0, "motivation": -1, "social": -1, "consistency": -1, "intensity": -2}
      }
    ]
  },
  "q2a": {
    "id": "q2a",
    "text": "What drives you most in the gym?",
    "options": [
      {
        "label": "Personal growth and discipline",
        "next": "q3",
        "weights": {"calm": 1, "motivation": 2, "social": 0, "consistency": 2, "intensity": 1}
      },
      {
        "label": "Mental clarity and stress relief",
        "next": "q3",
        "weights": {"calm": 2, "motivation": 1, "social": -1, "consistency": 1, "intensity": -1}
      }
    ]
  },
  "q2b": {
    "id": "q2b",
    "text": "How do you prefer to work out?",
    "options": [
      {
        "label": "High-intensity, pushing limits",
        "next": "q3",
        "weights": {"calm": -1, "motivation": 2, "social": 1, "consistency": 1, "intensity": 2}
      },
      {
        "label": "Social and motivating others",
        "next": "q3",
        "weights": {"calm": 0, "motivation": 1, "social": 2, "consistency": 0, "intensity": 1}
      }
    ]
  },
  "q2c": {
    "id": "q2c",
    "text": "What helps you handle stress in the gym?",
    "options": [
      {
        "label": "Focused, intense sessions",
        "next": "q3",
        "weights": {"calm": -1, "motivation": 2, "social": -1, "consistency": 1, "intensity": 2}
      },
      {
        "label": "Structured routine",
        "next": "q3",
        "weights": {"calm": 1, "motivation": 1, "social": 0, "consistency": 2, "intensity": 0}
      }
    ]
  },
  "q2d": {
    "id": "q2d",
    "text": "What would help you most right now?",
    "options": [
      {
        "label": "A motivating workout partner",
        "next": "q3",
        "weights": {"calm": 0, "motivation": 1, "social": 2, "consistency": 1, "intensity": 0}
      },
      {
        "label": "A gentle, steady approach",
        "next": "q3",
        "weights": {"calm": 2, "motivation": 1, "social": 0, "consistency": 1, "intensity": -1}
      }
    ]
  },
  "q3": {
    "id": "q3",
    "text": "Your ideal gym environment is...",
    "options": [
      {
        "label": "High energy, social atmosphere",
        "next": "q4",
        "weights": {"calm": -1, "motivation": 1, "social": 2, "consistency": 0, "intensity": 1}
      },
      {
        "label": "Focused, minimal distractions",
        "next": "q4",
        "weights": {"calm": 2, "motivation": 1, "social": -1, "consistency": 1, "intensity": 0}
      },
      {
        "label": "Structured with regular partners",
        "next": "q4",
        "weights": {"calm": 1, "motivation": 1, "social": 1, "consistency": 2, "intensity": 0}
      }
    ]
  },
  "q4": {
    "id": "q4",
    "text": "How consistent is your gym schedule?",
    "options": [
      {
        "label": "Very consistent, same times weekly",
        "next": "final",
        "weights": {"calm": 1, "motivation": 2, "social": 0, "consistency": 2, "intensity": 1}
      },
      {
        "label": "Flexible but regular",
        "next": "final",
        "weights": {"calm": 0, "motivation": 1, "social": 1, "consistency": 1, "intensity": 0}
      },
      {
        "label": "Variable, when motivated",
        "next": "final",
        "weights": {"calm": -1, "motivation": 0, "social": 0, "consistency": -1, "intensity": 1}
      }
    ]
  }
}