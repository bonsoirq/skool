const { app, BrowserWindow, globalShortcut } = require('electron')
const isDevelopment = require('electron-is-dev')
const path = require('path')

app.on('ready', () => {
  let window = new BrowserWindow({
    webPreferences: {
      enableRemoteModule: true,
      preload: path.join(__dirname, './preload.js'),
    },
  })

  const startURL = isDevelopment ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`

  window.loadURL(startURL)
  window.on('closed', () => {
    window = null
  })

  globalShortcut.register('F12', () => {
    window.webContents.openDevTools()
  })
})
