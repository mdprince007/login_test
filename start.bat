@echo off
title Login Server
cd /d "%~dp0"
echo ==================================================
echo   Starting Login Page Server on Unique Localhost
echo ==================================================
node server.js
pause
