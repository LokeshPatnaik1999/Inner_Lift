@echo off
echo ========================================
echo Replacing GitHub Repo with New Version
echo ========================================
echo.

cd /d "C:\Users\lokes\OneDrive\Desktop\copilotdemo\Gym Bud"

echo Step 1: Checking git status...
git status
echo.

echo Step 2: Setting up remote (if needed)...
git remote remove origin 2>nul
git remote add origin https://github.com/LokeshPatnaik1999/Inner_Lift.git
git remote -v
echo.

echo Step 3: Checking current branch...
git branch
echo.

echo Step 4: Ensuring we're on main branch...
git checkout -b main 2>nul || git checkout main
echo.

echo Step 5: Adding all files...
git add .
echo.

echo Step 6: Committing changes...
git commit -m "feat: Complete redesign with AI matching, swipe interface, and research-backed features"
echo.

echo Step 7: Force pushing to replace old code...
echo WARNING: This will replace all old code in the repo!
pause
git push origin main --force
echo.

echo Step 8: Deploying to GitHub Pages...
call npm run deploy
echo.

echo ========================================
echo DONE! Your site will be live at:
echo https://lokeshpatnaik1999.github.io/Inner_Lift/
echo Wait 2-5 minutes for deployment to complete.
echo ========================================
pause
