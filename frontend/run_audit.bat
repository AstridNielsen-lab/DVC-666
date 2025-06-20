@echo off
echo Running fresh audit in frontend folder...
rm -rf node_modules package-lock.json
npm install
npm audit --json > pre-fix-audit.json
echo Frontend audit complete - results saved to pre-fix-audit.json

