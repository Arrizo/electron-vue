import { BrowserWindow, ipcMain } from 'electron'

let printWindow
ipcMain.on('openChangePrintWin', (event, param) => {
  const windowOptions = {
    width: 600,
    height: 400,
    title: '打印页',
    show: false
  }
  printWindow = new BrowserWindow(windowOptions)
  const printWindowURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080/#/change/print/${param}`
    : `file://${__dirname}/index.html#/change/print/${param}`
  printWindow.loadURL(printWindowURL)
  // printWindow.webContents.openDevTools()
  printWindow.once('ready-to-show', () => {
    printWindow.show()
    // event.sender.send('openSuccesss')
  })
})
ipcMain.on('changePrint', (event) => {
  console.log('changePrint')
  printWindow.webContents.print({ silent: false, printBackground: true },
    (data) => {
      console.log('回调', data)
    })
})
