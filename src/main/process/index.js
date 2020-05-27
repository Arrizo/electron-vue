import { BrowserWindow, ipcMain } from 'electron'

let win
ipcMain.on('openNewWin', (event, title, url) => {
  // console.log(param)
  const windowOptions = {
    width: 600,
    height: 400,
    title: title
  }
  win = new BrowserWindow(windowOptions)
  win.loadURL(url)
  win.maximize()
})

