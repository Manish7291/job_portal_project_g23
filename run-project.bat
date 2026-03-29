@echo off
REM JobFlux Project Startup Script

echo.
echo ========================================
echo    JOBFLUX - Job Portal Application
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js version: 
node --version
echo.

REM Install backend dependencies if node_modules doesn't exist
echo [1/4] Checking backend dependencies...
cd backend
if not exist node_modules (
    echo Installing backend dependencies...
    call npm install
) else (
    echo Backend dependencies already installed
)
cd ..
echo.

REM Install frontend dependencies if node_modules doesn't exist
echo [2/4] Checking frontend dependencies...
cd frontend
if not exist node_modules (
    echo Installing frontend dependencies...
    call npm install
) else (
    echo Frontend dependencies already installed
)
cd ..
echo.

echo ========================================
echo [3/4] Starting Backend Server...
echo ========================================
echo Backend will run on http://localhost:5000
echo.

REM Start backend in a new window
start "Backend Server" cmd /k "cd backend && npm start"
echo Backend server started in new window

timeout /t 3

echo.
echo ========================================
echo [4/4] Starting Frontend Server...
echo ========================================
echo Frontend will run on http://localhost:5173
echo.

REM Start frontend in a new window
start "Frontend Server" cmd /k "cd frontend && npm run dev"
echo Frontend server started in new window

echo.
echo ========================================
echo    JOBFLUX is Starting!
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Opening frontend in browser in 5 seconds...
timeout /t 5

REM Try to open the frontend in default browser
start http://localhost:5173

echo.
echo To stop the servers, close the terminal windows.
echo.
pause
