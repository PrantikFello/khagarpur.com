
git rm -r --cached node_modules
git rm -r --cached dist
git status


git reset
git status
git add -p
git diff --cached
git commit -m "Precise change"
git push



git push -u origin main --force
