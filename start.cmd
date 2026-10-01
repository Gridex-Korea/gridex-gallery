@echo off
rem Anatomy gallery: start the local server (http://localhost:8765) and open the browser.
cd /d "%~dp0"

where python >nul 2>nul
if not errorlevel 1 (
  python serve.py %*
  goto done
)
where py >nul 2>nul
if not errorlevel 1 (
  py -3 serve.py %*
  goto done
)

echo Python was not found. Opening index.html directly instead.
start "" "%~dp0index.html"
exit /b 0

:done
if errorlevel 1 pause
