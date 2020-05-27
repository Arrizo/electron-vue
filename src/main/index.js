import { app, BrowserWindow, ipcMain } from 'electron'
import { autoUpdater } from 'electron-updater'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

const feedUrl = `http://22.32.81.46:9080/order/sys/version/update/` // 更新包位置

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000
  })
  mainWindow.maximize()
  mainWindow.loadURL(winURL)
  // mainWindow.webContents.openDevTools()

  mainWindow.on('closed', () => {
    mainWindow = null
  })
  // 关闭窗口前触发
  mainWindow.on('close', () => {
    mainWindow.webContents.send('close')
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */

// let printWindow
// ipcMain.on('openPrintWin', (event) => {
//   const windowOptions = {
//     width: 600,
//     height: 400,
//     title: '打印页',
//     show: false
//   }
//   printWindow = new BrowserWindow(windowOptions)
//   const printWindowURL = process.env.NODE_ENV === 'development'
//     ? `http://localhost:9080/#/destoryPrint`
//     : `file://${__dirname}/index.html#/destoryPrint`
//   printWindow.loadURL(printWindowURL)
// printWindow.webContents.openDevTools()
//   printWindow.once('ready-to-show', () => {
//     printWindow.show()
//     event.sender.send('openSuccesss')
//   })

//   // printWindow.webContents.on('did-finish-load', () => {
//   //   printWindow.webContents.print({ silent: false, printBackground: true },
//   //     (data) => {
//   //       console.log('回调', data)
//   //     })
//   // })
// })
// ipcMain.on('print', (event) => {
//   console.log('print')
//   printWindow.webContents.print({ silent: false, printBackground: true, deviceName: 'PCL6 V4 Print' },
//     (data) => {
//       console.log('回调', data)
//     })
// })

ipcMain.on('update', (e, arg) => {
  console.log('update')
  checkForUpdates()
})

// const feedUrl = `http://127.0.0.1:8100/` // 更新包位置
const checkForUpdates = () => {
  // 配置安装包远端服务器
  autoUpdater.setFeedURL(feedUrl)

  // 下面是自动更新的整个生命周期所发生的事件
  autoUpdater.on('error', function(message) {
    sendUpdateMessage('error', message)
  })
  autoUpdater.on('checking-for-update', function(message) {
    sendUpdateMessage('checking-for-update', message)
  })
  autoUpdater.on('update-available', function(message) {
    sendUpdateMessage('update-available', message)
  })
  autoUpdater.on('update-not-available', function(message) {
    sendUpdateMessage('update-not-available', message)
  })

  // 更新下载进度事件
  autoUpdater.on('download-progress', function(progressObj) {
    sendUpdateMessage('downloadProgress', progressObj)
  })
  // 更新下载完成事件
  autoUpdater.on('update-downloaded', function(event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
    sendUpdateMessage('isUpdateNow')
    ipcMain.on('updateNow', (e, arg) => {
      autoUpdater.quitAndInstall()
    })
  })

  // 执行自动更新检查
  autoUpdater.checkForUpdates()
}

// 主进程主动发送消息给渲染进程函数
function sendUpdateMessage(message, data) {
  console.log({ message, data })
  mainWindow.webContents.send('message', { message, data })
}

require('./process/index')
require('./process/destory/print')
require('./process/change/print')
require('./process/open/print')
