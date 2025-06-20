@echo off
echo Running npm audit --production for backend...
npm audit --production > post-fix-audit.json 2>&1
if %errorlevel% equ 0 (
    echo Backend audit completed successfully. Results saved to post-fix-audit.json
) else (
    echo Backend audit completed with warnings/errors. Results saved to post-fix-audit.json
)
echo.
echo === Backend Audit Results ===
type post-fix-audit.json
echo.
echo =====================================

