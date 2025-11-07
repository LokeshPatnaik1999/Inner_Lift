# InnerLift — Emotional Fitness Buddy Matcher

A React + Tailwind app that matches fitness enthusiasts based on emotional compatibility, location, and activity preferences.

## 🚀 Features

### Core Flow
- **Landing Page** - Introduction with auto-redirect for logged-in users
- **Smart Signup** - Dropdowns for Location (Boca Raton, Delray Beach, West Palm Beach, Miami) and Activity (Gym, Crossfit, Yoga, Walk, Bike)
- **Silent Reflection** - Optional 10-minute meditation timer (click Start to skip to questions)
- **Adaptive Questionnaire** - 8 branching questions analyzing emotional dimensions
- **Results Page** - Visual emotional profile with Chart.js pie chart
- **Dashboard** - View your profile and discover compatible buddies
- **Profile Page** - Edit your info and retake the emotional quiz

### Smart Matching
- Matches by location, activity preference, and emotional compatibility
- 10 diverse mock buddies with bios, goals, and personality traits
- Match scores based on shared traits, time preferences, and goals

## 🎯 What Makes This Special

### User-Centric Features
1. **Location-First Matching** - Prioritizes buddies in your area
2. **Activity-Specific** - Find partners for your preferred workout style
3. **Emotional Intelligence** - 5 dimensions: Calm, Motivation, Social, Consistency, Intensity
4. **Rich Profiles** - See bios, goals, and personality traits before connecting
5. **Authentication Flow** - Smart redirects based on user state
6. **Profile Management** - Edit details and retake quiz anytime

### Technical Highlights
- React Router with authentication guards
- LocalStorage state management
- Responsive Tailwind design
- Chart.js data visualization
- Adaptive branching questionnaire logic
- Clean component architecture

## 📦 Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation

```powershell
# Navigate to project folder
cd "C:\Users\lokes\OneDrive\Desktop\copilotdemo\Gym Bud"

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 🗂️ Project Structure

```
src/
├── api/
│   ├── emotionModel.js    # Emotional profile calculation
│   └── mockApi.js         # Mock user database & matching logic
├── data/
│   └── questions.js       # Adaptive questionnaire tree
├── pages/
│   ├── Landing.jsx        # Home page with smart routing
│   ├── Onboarding.jsx     # Signup with dropdowns
│   ├── Login.jsx          # Authentication
│   ├── Silence.jsx        # Meditation timer
│   ├── AdaptiveQuestions.jsx  # 8-question flow
│   ├── Results.jsx        # Profile visualization
│   ├── Dashboard.jsx      # Match discovery
│   └── Profile.jsx        # User settings
├── App.jsx                # Main layout with nav
├── main.jsx               # Router config
└── index.css              # Tailwind + custom styles
```

## 🎨 Design System

- **Colors**: Dark theme (#020617 bg) with yellow accent (#facc15)
- **Components**: Reusable buttons (btn-primary, btn-secondary, btn-ghost)
- **Cards**: Gradient overlays with hover effects
- **Badges**: Tag-style labels for traits

## 💾 Data Storage

Currently uses localStorage:
- `innerlift_user` - User profile (name, email, location, activity)
- `innerlift_analysis` - Emotional profile (dimensions, tags, score)

## 🔮 Future Enhancements

### Recommended Next Steps
1. **Real-time Messaging** - Chat with matched buddies
2. **Calendar Integration** - Schedule workouts together
3. **Workout Logging** - Track sessions and progress
4. **Social Feed** - Share achievements and motivate others
5. **Backend Integration** - Firebase/Supabase for real data
6. **Push Notifications** - Remind users of scheduled workouts
7. **Advanced Filtering** - Search by specific traits or goals
8. **Video Profiles** - 15-second intro videos
9. **Verified Badges** - Trust indicators for active users
10. **Streak Tracking** - Gamify consistency

### Technical Improvements
- Replace localStorage with real database
- Add ML-based sentiment analysis (replace mock)
- Implement real authentication (JWT/OAuth)
- Add unit/integration tests
- Progressive Web App (PWA) support
- Image uploads for profiles
- Geolocation for distance calculation

## 🤔 User Feedback Needed

Key questions to validate:
- Is 8 questions the right length? (vs 5 or 12)
- Should the silent reflection be required or optional?
- What other activities should we add?
- Are the emotional dimensions clear?
- Would users pay for premium features?

## 🛠️ Built With

- **Vite** - Fast build tool
- **React 18** - UI framework
- **React Router 6** - Navigation
- **Tailwind CSS** - Styling
- **Chart.js** - Data visualization
- **PostCSS** - CSS processing

## 📝 Notes

- This is an MVP/prototype focusing on core flow
- Mock data simulates a user base of 10 people
- Matching algorithm is rule-based (not ML)
- No backend or real authentication yet

## 🐛 Known Issues

None currently! Report issues as they come up.

---

Built with ❤️ for the fitness community
