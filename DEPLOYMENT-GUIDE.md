# 🚀 Deploy InnerLift to GitHub Pages

## Step-by-Step Deployment Guide

### **Prerequisites**
- GitHub account
- Git installed
- Project code ready

---

## 📝 **Step 1: Configure Vite for GitHub Pages**

### Update `vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/innerlift/',  // ⚠️ REPLACE 'innerlift' with your repo name
  server: {
    open: true
  },
  build: {
    sourcemap: true,
    outDir: 'dist'
  }
})
```

**Important:** Replace `'/innerlift/'` with your actual GitHub repository name!

---

## 📦 **Step 2: Update package.json**

Add deployment scripts:

```json
{
  "name": "innerlift",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "chart.js": "^4.0.0",
    "react-router-dom": "^6.14.1"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.0.0",
    "patch-package": "^6.5.0",
    "tailwindcss": "^3.3.3",
    "postcss": "^8.4.31",
    "autoprefixer": "^10.4.16",
    "gh-pages": "^6.1.0"
  }
}
```

---

## 🔧 **Step 3: Install gh-pages**

```bash
npm install --save-dev gh-pages
```

---

## 🌐 **Step 4: Create GitHub Repository**

### Option A: New Repository (Web Interface)
1. Go to https://github.com/new
2. Repository name: `innerlift` (or your choice)
3. Description: "AI-powered emotional gym buddy matching app"
4. Make it **Public** (required for free GitHub Pages)
5. Don't initialize with README (you already have one)
6. Click **Create repository**

### Option B: If Already Created
Skip to Step 5

---

## 📤 **Step 5: Push Code to GitHub**

```bash
# Navigate to your project
cd "C:\Users\lokes\OneDrive\Desktop\copilotdemo\Gym Bud"

# Initialize git (if not already done)
git init

# Add remote repository (replace YOUR-USERNAME and YOUR-REPO)
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git

# Add all files
git add .

# Commit
git commit -m "Initial commit: InnerLift app with AI matching"

# Push to main branch
git branch -M main
git push -u origin main
```

---

## 🚀 **Step 6: Deploy to GitHub Pages**

```bash
npm run deploy
```

This will:
1. Build your production app (`npm run build`)
2. Create a `gh-pages` branch
3. Push the `dist` folder to that branch
4. Deploy automatically

---

## ⚙️ **Step 7: Enable GitHub Pages**

1. Go to your repository on GitHub
2. Click **Settings** (top right)
3. Scroll to **Pages** (left sidebar)
4. Under **Source**, select:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
5. Click **Save**

GitHub will show a message: "Your site is ready to be published at..."

---

## 🌍 **Step 8: Access Your App**

Your app will be live at:
```
https://YOUR-USERNAME.github.io/YOUR-REPO/
```

For example:
```
https://john-smith.github.io/innerlift/
```

⏰ **Note:** First deployment takes 1-5 minutes to go live.

---

## 🔄 **Updating Your App (Future Changes)**

Whenever you make changes:

```bash
# 1. Make your changes to the code
# 2. Test locally
npm run dev

# 3. Commit changes
git add .
git commit -m "Add new feature"
git push origin main

# 4. Deploy to GitHub Pages
npm run deploy
```

---

## 🛠️ **Troubleshooting**

### **Issue: Blank page after deployment**

**Fix:** Check `vite.config.js` base path matches your repo name

```javascript
base: '/YOUR-REPO-NAME/'  // Must match exactly!
```

### **Issue: 404 on page refresh**

**Fix:** Add a `404.html` in your `public` folder:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>InnerLift</title>
    <script>
      sessionStorage.redirect = location.href;
    </script>
    <meta http-equiv="refresh" content="0;URL='/innerlift/'">
  </head>
</html>
```

Then update `index.html` to handle redirects:

```html
<script>
  (function(){
    var redirect = sessionStorage.redirect;
    delete sessionStorage.redirect;
    if (redirect && redirect !== location.href) {
      history.replaceState(null, null, redirect);
    }
  })();
</script>
```

### **Issue: Images/assets not loading**

**Fix:** Use relative paths or import assets:

```javascript
// Good
import logo from './assets/logo.png'

// Avoid
<img src="/logo.png" />
```

### **Issue: Router doesn't work**

**Fix:** Already using React Router with BrowserRouter - this should work fine with the 404 fix above.

---

## 📋 **Complete Deployment Checklist**

- [ ] Update `vite.config.js` with correct `base` path
- [ ] Add `predeploy` and `deploy` scripts to `package.json`
- [ ] Install `gh-pages` package
- [ ] Create GitHub repository (public)
- [ ] Push code to GitHub
- [ ] Run `npm run deploy`
- [ ] Enable GitHub Pages in repository settings
- [ ] Wait 1-5 minutes
- [ ] Visit your live site!
- [ ] Test all routes and features

---

## 🎯 **Custom Domain (Optional)**

Want to use your own domain like `innerlift.com`?

1. Buy domain from provider (Namecheap, GoDaddy, etc.)
2. Add `CNAME` file to `public/` folder with your domain:
   ```
   innerlift.com
   ```
3. Configure DNS records at your domain provider:
   ```
   Type: CNAME
   Host: www
   Value: YOUR-USERNAME.github.io
   ```
4. In GitHub Settings → Pages → Custom domain, enter your domain
5. Enable HTTPS (automatic)

---

## 📱 **Testing Before Deploy**

Always test production build locally:

```bash
npm run build
npm run preview
```

Opens at `http://localhost:4173`

---

## 💡 **Pro Tips**

1. **Environment Variables:** 
   - Don't commit secrets
   - Use GitHub Secrets for sensitive data

2. **Performance:**
   - GitHub Pages has bandwidth limits
   - Consider CDN for heavy traffic

3. **Analytics:**
   - Add Google Analytics to track visitors
   - Monitor usage patterns

4. **SEO:**
   - Add meta tags for social sharing
   - Create sitemap.xml
   - Add Open Graph tags

---

## 🆘 **Need Help?**

Common URLs:
- Your code: `https://github.com/YOUR-USERNAME/YOUR-REPO`
- Your app: `https://YOUR-USERNAME.github.io/YOUR-REPO/`
- GitHub Pages docs: https://docs.github.com/pages

---

**Ready to deploy?** Follow Step 1! 🚀
