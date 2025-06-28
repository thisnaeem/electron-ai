import path from 'path'
import { app, ipcMain, dialog } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'
import Store from 'electron-store'
import { autoUpdater } from 'electron-updater'

const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

// Initialize electron store
const store = new Store()

// Configure auto updater
if (isProd) {
  // Check for updates on startup
  app.on('ready', () => {
    autoUpdater.checkForUpdates()
  })

  // Check for updates every hour
  setInterval(() => {
    autoUpdater.checkForUpdates()
  }, 60 * 60 * 1000)

  autoUpdater.on('update-available', () => {
    dialog.showMessageBox({
      type: 'info',
      title: 'Update Available',
      message: 'A new version of Electron AI is available. Downloading now...',
      buttons: ['Okay']
    })
  })

  autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
    const dialogOpts = {
      type: 'info',
      buttons: ['Restart', 'Later'],
      title: 'Application Update',
      message: process.platform === 'win32' ? releaseNotes : releaseName,
      detail: 'A new version has been downloaded. Restart the application to apply the updates.'
    }

    dialog.showMessageBox(dialogOpts).then((returnValue) => {
      if (returnValue.response === 0) autoUpdater.quitAndInstall()
    })
  })

  autoUpdater.on('error', (message) => {
    console.error('There was a problem updating the application')
    console.error(message)
    dialog.showMessageBox({
      type: 'error',
      title: 'Update Error',
      message: 'There was a problem updating the application.',
      detail: message.toString(),
      buttons: ['Okay']
    })
  })
}

;(async () => {
  await app.whenReady()

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
  })

  if (isProd) {
    await mainWindow.loadURL('app://./home')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/home`)
    mainWindow.webContents.openDevTools()
  }
})()

app.on('window-all-closed', () => {
  app.quit()
})

ipcMain.on('message', async (event, arg) => {
  event.reply('message', `${arg} World!`)
})
