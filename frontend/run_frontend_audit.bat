@echo off
cd /d "%~dp0"
npm audit --production > post-fix-audit.json 2>&1
echo Frontend audit completed. Output saved to post-fix-audit.json
type post-fix-audit.json

