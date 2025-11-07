# Quick Deployment to GitHub Pages

## 🚀 Fast Setup (5 Steps)

### 1️⃣ Install gh-pages
```bash
npm install --save-dev gh-pages
```

### 2️⃣ Update Repository Name in vite.config.js
**Open:** `vite.config.js`

**Change this line:**
```javascript
base: '/innerlift/'  // ⚠️ Change 'innerlift' to YOUR repo name
```

If your GitHub repo is called `gym-buddy`, change to:
```javascript
base: '/gym-buddy/'
```

### 3️⃣ Create GitHub Repository
1. Go to: https://github.com/new
2. Name it (e.g., `innerlift`)
3. Make it **Public**
4. Don't initialize anything
5. Click Create

### 4️⃣ Push Your Code
```bash
cd "C:\Users\lokes\OneDrive\Desktop\copilotdemo\Gym Bud"

# If not already a git repo
git init

# Add remote (replace YOUR-USERNAME and YOUR-REPO)
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git

# Add all files
git add .

# Commit
git commit -m "Initial commit: InnerLift gym buddy app"

# Push
git branch -M main
git push -u origin main
```

### 5️⃣ Deploy!
```bash
npm run deploy
```

Wait 2 minutes, then visit:
```
https://YOUR-USERNAME.github.io/YOUR-REPO/
```

---

## ⚙️ Enable GitHub Pages (One-Time Setup)

1. Go to your repo on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
4. Click **Save**

Done! 🎉

---

## 🔄 Update Your Site Later

After making changes:
```bash
git add .
git commit -m "Update feature"
git push origin main
npm run deploy
```

---

## ✅ What I've Already Done For You:

- ✅ Added `base: '/innerlift/'` to vite.config.js
- ✅ Added deploy scripts to package.json
- ✅ Added gh-pages to devDependencies
- ✅ Created .gitignore file

**You just need to:**
1. Change repo name in vite.config.js
2. Install gh-pages
3. Create GitHub repo
4. Push code
5. Run `npm run deploy`

That's it! 🚀
