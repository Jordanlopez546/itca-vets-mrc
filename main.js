const { app, BrowserWindow } = require('electron');
const path = require('path');
const { exec } = require('child_process');
const waitOn = require('wait-on');

const NEXT_PORT = process.env.NEXT_PORT || 3004;

function createWindow() {
  // Start Next.js dev server
  const nextProcess = exec(`npm run dev`, { cwd: __dirname });
  nextProcess.stdout.on('data', data => process.stdout.write(`[Next.js] ${data}`));
  nextProcess.stderr.on('data', err => process.stderr.write(`[Next.js ERROR] ${err}`));

  // Wait until the server is ready
  waitOn({ resources: [`http://localhost:3004`], timeout: 60000 }, (err) => {
    if (err) {
      console.error('Next.js server failed to start', err);
      return;
    }

    console.log(`Next.js is ready at http://localhost:3004, launching Electron...`);

    const win = new BrowserWindow({
      width: 1200,
      height: 800,
      title: "🩺 PneumoScan",
      autoHideMenuBar: true,
      icon: path.join(__dirname, 'public', 'app.ico'),
      webPreferences: { nodeIntegration: false }
    });

    win.loadURL(`http://localhost:3004`);

    // 🧹 Kill the Next.js process and free the port when Electron quits
    app.on('before-quit', () => {
      if (nextProcess) {
        console.log('🧹 Killing Next.js process...');
        nextProcess.kill('SIGTERM');
      }

      exec(`npx kill-port ${NEXT_PORT}`, (err) => {
        if (err) console.error(`⚠️ Could not kill port ${NEXT_PORT}:`, err.message);
        else console.log(`✅ Port ${NEXT_PORT} cleared`);
      });
    });
  });
}

app.whenReady().then(createWindow);
