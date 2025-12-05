@echo off
echo Stopping all services...
taskkill /F /IM node.exe /T 2>nul
echo All services stopped!
pause
