@echo off
echo Running fresh audit in backend folder...
rm -rf node_modules package-lock.json
npm install
npm audit --json > pre-fix-audit.json
echo Backend audit complete - results saved to pre-fix-audit.json

