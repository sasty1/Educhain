@echo off
echo ========================================
echo Starting Private School Eligibility System
echo ========================================
echo.

echo [1/3] Starting Hardhat Node...
start "Hardhat Node" cmd /k "cd /d %~dp0 && node_modules\.bin\hardhat.cmd node"
timeout /t 5 /nobreak >nul

echo [2/3] Deploying Contract...
timeout /t 3 /nobreak >nul
call deploy-windows.bat

echo [3/3] Starting Frontend...
start "Frontend Server" cmd /k "cd /d %~dp0\contracts\scripts\frontend && node node_modules\next\dist\bin\next dev"

echo.
echo ========================================
echo All services started!
echo ========================================
echo.
echo Hardhat Node: http://localhost:8545
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit this window (services will keep running)...
pause >nul
