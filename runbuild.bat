@echo off
cd /d "C:\Users\Fast\OneDrive\Desktop\ebnyly-main"
call npm run build > "%~dp0bl6.txt" 2>&1
echo BUILD_DONE_EXIT_%ERRORLEVEL% >> "%~dp0bl6.txt"