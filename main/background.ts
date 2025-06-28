import path from 'path'
import { app, ipcMain, dialog } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'
import Store from 'electron-store'
import { autoUpdater } from 'electron-updater'

const isProd: boolean = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

// Initialize electron store
const store = new Store()

// Initialize auto updater
autoUpdater.logger = require('electron-log')
autoUpdater.logger.transports.file.level = 'info'

// Configure auto updater
function sendStatusToWindow(text: string) {
  dialog.showMessageBox({
    title: 'Update Status',
    message: text
  })
}

autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...')
})

autoUpdater.on('update-available', (info) => {
  sendStatusToWindow('Update available. Downloading...')
})

autoUpdater.on('update-not-available', (info) => {
  sendStatusToWindow('Application is up to date.')
})

autoUpdater.on('error', (err) => {
  sendStatusToWindow('Error in auto-updater: ' + err.message)
})

autoUpdater.on('download-progress', (progressObj) => {
  sendStatusToWindow(
    `Download speed: ${progressObj.bytesPerSecond} - Downloaded ${progressObj.percent}% (${progressObj.transferred}/${progressObj.total})`
  )
})

autoUpdater.on('update-downloaded', (info) => {
  dialog.showMessageBox({
    type: 'info',
    title: 'Update Ready',
    message: 'A new version has been downloaded. Restart the application to apply the updates.',
    buttons: ['Restart', 'Later']
  }).then((buttonIndex) => {
    if (buttonIndex.response === 0) {
      autoUpdater.quitAndInstall()
    }
  })
})

// Create main window
app.whenReady().then(() => {
  createWindow()
  // Check for updates after app is ready
  if (isProd) {
    autoUpdater.checkForUpdates()
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (!app.windows.length) {
    createWindow()
  }
})

ipcMain.on('message', async (event, arg) => {
  event.reply('message', `${arg} World!`)
})
