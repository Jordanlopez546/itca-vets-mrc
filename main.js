const { app, BrowserWindow } = require('electron');
const path = require('path');
const { exec } = require('child_process');

function createWindow() {
  // Start the Next.js dev server
  const nextProcess = exec('npm run dev', { cwd: __dirname });

  // Wait a few seconds to make sure the server is running
  setTimeout(() => {
    const win = new BrowserWindow({
  width: 1200,
  height: 800,
  title: "🩺 PneumoScan",
  autoHideMenuBar: true,
  icon: path.join(__dirname, 'public', 'app.ico'),
  webPreferences: {
    nodeIntegration: false
  }
});


    // Load the running Next.js app (default port 3000)
    win.loadURL('http://localhost:3000');
  }, 4000);
}

app.whenReady().then(createWindow);
