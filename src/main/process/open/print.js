import { BrowserWindow, ipcMain } from 'electron'

let printWindow
ipcMain.on('openPrintWin', (event, param) => {
  const windowOptions = {
    width: 1920,
    height: 1080,
    title: '打印页',
    show: true
  }
  printWindow = new BrowserWindow(windowOptions)
  const printWindowURL = process.env.NODE_ENV === 'development' ? `http://localhost:9080/#/open/print/${param}` : `file://${__dirname}/index.html#/open/print/${param}`
  printWindow.loadURL(printWindowURL)
  printWindow.webContents.openDevTools()
  printWindow.once('ready-to-show', () => {
    printWindow.show()
    // event.sender.send('openSuccesss')
  })
})

ipcMain.on('openPrintWinDdf', (event, param) => {
  const windowOptions = {
    width: 1920,
    height: 1080,
    title: '打印页',
    show: false
  }
  printWindow = new BrowserWindow(windowOptions)
  const printWindowURL = process.env.NODE_ENV === 'development' ? `http://localhost:9080/#/open/printPdf/${param}` : `file://${__dirname}/index.html#/open/printPdf/${param}`
  printWindow.loadURL(printWindowURL)
  // printWindow.webContents.openDevTools()
  printWindow.once('ready-to-show', () => {
    printWindow.show()
    // event.sender.send('openSuccesss')
  })
})

ipcMain.on('openPrint', (event) => {
  printWindow.webContents.print({ silent: false, printBackground: true },
    (data) => {
      console.log('回调', data)
    })
})
