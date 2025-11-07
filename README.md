# InnerLift — Emotional Gym Buddy Matcher (Prototype)

A minimal React + Tailwind prototype that matches gym users by emotional/motivational compatibility.

Features:
- Landing, Onboarding, 10-minute silent reflection timer, Multi-step questionnaire, Dashboard with mock matches.
- Rule-based (mock) sentiment analysis and buddy suggestions.

Getting started (Windows PowerShell):

1. Open PowerShell in the project folder (`c:/Users/lokes/OneDrive/Desktop/copilotdemo/Gym Bud`).
2. Install dependencies:

```powershell
npm install
```

3. Run the dev server:

```powershell
npm run dev
```

This project uses Vite + React + Tailwind CSS. Tailwind is preconfigured via `tailwind.config.cjs` and `postcss.config.cjs`.

Notes:
- Data is stored in localStorage for the prototype (`innerlift_user`, `innerlift_analysis`).
- Matching logic is in `src/api/mockApi.js` and intentionally simple for an MVP.

Next steps (optional):
- Add a real backend and authentication.
- Replace mock analysis with an ML-backed sentiment pipeline.
- Add profile editing and location-based filtering.
