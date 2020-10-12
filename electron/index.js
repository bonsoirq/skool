const { app, BrowserWindow } = require('electron')
const isDevelopment = require('electron-is-dev')
const path = require('path')

app.on('ready', () => {
  let window = new BrowserWindow()

  const startURL = isDevelopment ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`

  window.loadURL(startURL)
  window.webContents.openDevTools()
  window.on('closed', () => {
    window = null
  })
})
