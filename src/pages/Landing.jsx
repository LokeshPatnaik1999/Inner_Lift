import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Landing(){
  const nav = useNavigate()

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem('innerlift_user') || 'null')
      const analysis = JSON.parse(localStorage.getItem('innerlift_analysis') || 'null')
      
      if (user) {
        // If user has completed analysis, go to dashboard
        if (analysis) {
          nav('/dashboard')
        } else {
          // If user exists but no analysis, continue their flow
          nav('/silence')
        }
      }
    } catch (e) {
      console.error('Error checking user status:', e)
    }
  }, [nav])

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center py-12 px-4">
        <div className="mb-6">
          <span className="inline-block px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-400 text-sm font-semibold mb-4">
            Science Meets Motivation
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
          Did you know? You're <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">2–3× more likely</span> to stay consistent when you train with a partner.
        </h1>
        
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Half of all gym-goers lose motivation within 3 months — but when you have someone who shares your energy, discipline, and vibe, <span className="text-orange-400 font-semibold">consistency becomes natural.</span>
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <Link to="/onboarding" className="btn-energetic text-lg px-8 py-4">
            🔥 Find My Gym Mindset Buddy
          </Link>
          <Link to="/login" className="btn-secondary text-lg px-8 py-4">Log In</Link>
        </div>

        <p className="text-sm text-gray-500 italic">AI-driven emotional matching for real fitness consistency.</p>
      </div>

      {/* Research Stats Section */}
      <div className="grid md:grid-cols-3 gap-6 mb-16 px-4">
        <div className="card-soft text-center p-8 hover:scale-105 transition-transform">
          <div className="text-5xl font-bold text-orange-400 mb-2">+64%</div>
          <div className="text-sm text-gray-400 mb-3">Sustained Motivation</div>
          <p className="text-xs text-gray-500">
            <strong>2023 | Hailey et al.</strong><br/>
            16,980 UK adults | Strong social support = 64% higher odds of staying active
          </p>
        </div>

        <div className="card-soft text-center p-8 hover:scale-105 transition-transform">
          <div className="text-5xl font-bold text-orange-400 mb-2">+40%</div>
          <div className="text-sm text-gray-400 mb-3">More Activity</div>
          <p className="text-xs text-gray-500">
            <strong>2021 | Golaszewski & Bartholomew</strong><br/>
            506 adults | Group exercisers logged 1,000+ extra MET-minutes/week
          </p>
        </div>

        <div className="card-soft text-center p-8 hover:scale-105 transition-transform">
          <div className="text-5xl font-bold text-orange-400 mb-2">-26%</div>
          <div className="text-sm text-gray-400 mb-3">Less Stress</div>
          <p className="text-xs text-gray-500">
            <strong>2017 | Yorks et al.</strong><br/>
            69 med students | Group training = 26% less stress + better well-being
          </p>
        </div>
      </div>

      {/* Value Proposition */}
      <div className="card-soft mb-16 px-4">
        <div className="max-w-4xl mx-auto text-center py-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Train your body. <span className="text-orange-400">Sync your mindset.</span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-8">
            InnerLift connects you with people who <span className="text-orange-400 font-semibold">think like you, train like you, and feel like you</span> — so motivation isn't forced, it's shared.
          </p>
          <div className="inline-block px-6 py-3 bg-red-500/10 border border-red-500/30 rounded-full">
            <p className="text-lg font-bold text-red-400">
              🎯 Your gym bro with one swipe
            </p>
          </div>
        </div>
      </div>

      {/* AI Features Section */}
      <div className="mb-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-orange-400">AI-Powered</span> Emotional Matching
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Not just location and goals — we match you based on motivation patterns, energy levels, and workout mindset.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="card text-center p-6 hover:border-orange-500/50 transition-all">
            <div className="text-5xl mb-4">🤖</div>
            <h3 className="font-semibold text-lg text-orange-400 mb-2">AI Decision Engine</h3>
            <p className="text-sm text-gray-400">
              Advanced algorithms analyze 5+ emotional dimensions to find your perfect match
            </p>
          </div>

          <div className="card text-center p-6 hover:border-orange-500/50 transition-all">
            <div className="text-5xl mb-4">🧠</div>
            <h3 className="font-semibold text-lg text-orange-400 mb-2">Emotional Profiling</h3>
            <p className="text-sm text-gray-400">
              Deep analysis of motivation, consistency, intensity, social alignment, and calm
            </p>
          </div>

          <div className="card text-center p-6 hover:border-orange-500/50 transition-all">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="font-semibold text-lg text-orange-400 mb-2">Smart Compatibility</h3>
            <p className="text-sm text-gray-400">
              Real-time compatibility scoring ensures you connect with the right workout partner
            </p>
          </div>

          <div className="card text-center p-6 hover:border-orange-500/50 transition-all">
            <div className="text-5xl mb-4">👥</div>
            <h3 className="font-semibold text-lg text-orange-400 mb-2">Swipe to Connect</h3>
            <p className="text-sm text-gray-400">
              Tinder-style interface makes finding your gym buddy fast, fun, and intuitive
            </p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="mb-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-4">How InnerLift Works</h2>
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          Our AI analyzes your emotional state and workout preferences to match you with compatible fitness partners in minutes.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card text-center p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              STEP 1
            </div>
            <div className="text-5xl mb-4">🧘</div>
            <h3 className="font-semibold text-xl text-orange-400 mb-3">Breathe & Center</h3>
            <p className="text-sm text-gray-400">Start with a 10-minute mindfulness reset to understand your current emotional state and fitness mindset.</p>
          </div>
          <div className="card text-center p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              STEP 2
            </div>
            <div className="text-5xl mb-4">🤔</div>
            <h3 className="font-semibold text-xl text-orange-400 mb-3">AI Analysis</h3>
            <p className="text-sm text-gray-400">Answer 8 adaptive questions while our AI builds your emotional profile and compatibility score.</p>
          </div>
          <div className="card text-center p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              STEP 3
            </div>
            <div className="text-5xl mb-4">🔥</div>
            <h3 className="font-semibold text-xl text-orange-400 mb-3">Swipe & Connect</h3>
            <p className="text-sm text-gray-400">Swipe through AI-matched profiles and connect instantly with your perfect gym partner.</p>
          </div>
        </div>
      </div>

      {/* Taglines Section */}
      <div className="card-soft mb-16 px-4">
        <div className="max-w-4xl mx-auto py-12">
          <div className="grid md:grid-cols-2 gap-8 text-center">
            <div>
              <div className="text-6xl mb-4">💪</div>
              <p className="text-lg font-semibold text-gray-300">
                "Your motivation doubles when it's shared."
              </p>
            </div>
            <div>
              <div className="text-6xl mb-4">🧬</div>
              <p className="text-lg font-semibold text-gray-300">
                "Built from research. Matched by emotion."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Research Sources */}
      <div className="text-center text-xs text-gray-500 mb-12 px-4">
        <p className="font-semibold mb-2">Research Sources:</p>
        <p className="mb-1">Psychology of Sport & Exercise (2021) | International Journal of Behavioral Medicine (2023)</p>
        <p>The Journal of the American Osteopathic Association (2017)</p>
      </div>

      {/* Final CTA */}
      <div className="text-center pb-16 px-4">
        <h2 className="text-3xl font-bold mb-6">Ready to transform your fitness journey?</h2>
        <Link to="/onboarding" className="btn-primary text-lg px-10 py-4 inline-block">
          Get Started Now
        </Link>
      </div>
    </div>
  )
}
