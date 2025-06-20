@echo off
echo Running npm audit --production for frontend...
npm audit --production > post-fix-audit.json 2>&1
if %errorlevel% equ 0 (
    echo Frontend audit completed successfully. Results saved to post-fix-audit.json
) else (
    echo Frontend audit completed with warnings/errors. Results saved to post-fix-audit.json
)
echo.
echo === Frontend Audit Results ===
type post-fix-audit.json
echo.
echo =====================================

