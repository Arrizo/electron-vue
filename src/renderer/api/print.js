const NodePdfPrinter = require('node-pdf-printer')
const childProcess = require('child_process')
const fs = require('fs')
import { allPrint } from '@/utils/print'
const nodeCmd = require('node-cmd')
const path = require('path')
const ROOT_PATH = process.cwd()

/* ------------------------------------------------------------- */
const printerUtilHome = path.join(ROOT_PATH, 'printer-util')
const PDFtoPrinterPath = path.join(printerUtilHome, 'PDFtoPrinter.exe')
const tempBatFilePath = path.join(printerUtilHome, 'printTmp.bat')

// eslint-disable-next-line no-unused-vars
export class PdfPrinter {
  constructor() {
    this.OUT_PATH = 'D:\\material'
    this.INPUT_PATH1 = 'D:\\开户照片\\1'
    this.INPUT_PATH = path.join(ROOT_PATH, 'server-pdf')
    this.that = this
    this.listPrinter = listPrinter
  }

  // pdfList @see open.json.print.list
  renderingTemplate(pdfList, data) {
    const outFilePath = this.createFile()
    this.pdfList = pdfList
    pdfList.filter(x => x.type === 'JG').forEach(x => {
      const p1 = path.join(this.INPUT_PATH, x.value)
      const p2 = path.join(outFilePath, x.outFileName)
      const z = {
        oldUrl: p1.replace(/\\/g, '//'),
        newUrl: p2.replace(/\\/g, '//'),
        printer: data.replace(/\\/g, '')
      }
      PdfPrinter.render(z)
    })
    // 针式打印
    pdfList.filter(x => x.type === 'ZS').forEach(x => {
      const p1 = path.join(this.INPUT_PATH1, x.value)
      const p2 = path.join(outFilePath, x.outFileName)
      const z = {
        oldUrl: p1.replace(/\\/g, '//'),
        newUrl: p2.replace(/\\/g, '//'),
        printer: data.replace(/\\/g, '')
      }
      PdfPrinter.render(z)
    })

    return this
  }
  timeout(millisecond) {
    this.millisecond = millisecond
    return this
  }
  static sleep(millisecond) {
    var now = new Date()
    var exitTime = now.getTime() + millisecond
    // eslint-disable-next-line no-constant-condition
    while (true) {
      now = new Date()
      if (now.getTime() > exitTime) {
        return
      }
    }
  }

  executePrint() {
    setTimeout(() => {
      const outFilePath = this.OUT_PATH
      console.log('pdfList :: ', this.pdfList)
      const fileList = []
      this.pdfList.filter(x => x.type === 'JG').forEach(x => {
        for (let key = 0; key < x.number; key++) {
          fileList.push(path.join(outFilePath, x.outFileName))
        }
      })
      console.log('executePrint :: ', fileList)
      if (fileList.length > 0) { printFiles(fileList) }
      this.pdfList.filter(x => x.type === 'IMG').forEach(x => {
        for (let key = 0; key < x.number; key++) {
        // todo print img
          printImg(path.join(outFilePath, x.outFileName))
        }
      })
    }, 3000)
  }

  executePrint_zs() {
    setTimeout(() => {
      const outFilePath = this.OUT_PATH
      console.log('pdfList :: ', this.pdfList)
      const fileList = []
      this.pdfList.filter(x => x.type === 'ZS').forEach(x => {
        for (let key = 0; key < x.number; key++) {
          fileList.push(path.join(outFilePath, x.outFileName))
        }
      })
      console.log('executePrint :: ', fileList)
      nodeCmd.run('start iexplore ' + fileList)
    }, 3000)
  }

  createFile() {
    const outFilePath = this.OUT_PATH

    mkdirsSync(outFilePath)

    return outFilePath
  }

  static render(printerDto) {
    allPrint(JSON.stringify((JSON.stringify(printerDto))))
  }
}

// eslint-disable-next-line no-unused-vars
function printImg(imgSrc, printName) {
  console.log('img src :: ', imgSrc)
  console.log('printName :: ', printName)
  // nodeCmd.run('mspaint /pt "' + imgSrc + '" "' + printName + '"')
  nodeCmd.run('start iexplore /pt "' + imgSrc + '" "')
}

// eslint-disable-next-line no-unused-vars
function listPrinter() {
  return NodePdfPrinter.listPrinter()
}

// eslint-disable-next-line no-unused-vars
function printFiles(pdfFiles) {
  return new Promise((resolve, reject) => {
    // printerName = printerName ? ' "' + printerName + '"' : ''
    let createFile = '@echo off \n'
    createFile += '%~d0\n'
    for (var i = 0; i < pdfFiles.length; i++) {
      createFile += '"' + PDFtoPrinterPath + '" "' + pdfFiles[i] + '"' + '\n'
    }
    createFile += 'exit /b 0 \n'
    createFile += 'pause>nul \n'
    fs.writeFile(tempBatFilePath, createFile, function(err) {
      if (err) {
        reject(err)
      } else {
        console.log(tempBatFilePath)
        childProcess.exec('"' + tempBatFilePath + '"', function(error) {
          if (error) {
            console.log(error)
            reject(error)
          } else {
            console.log('---=-=-=-=--结束-=-=-=------', new Date())
            resolve(true)
          }
        })
      }
    })
  })
}

// 递归创建目录 同步方法
function mkdirsSync(dirname) {
  if (fs.existsSync(dirname)) {
    return true
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname)
      return true
    }
  }
}

