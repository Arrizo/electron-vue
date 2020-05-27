import ffi from 'ffi'
import fs from 'fs'
import Jimp from 'jimp'
// import path from 'path'
import { slugify } from 'transliteration'
import { Message, MessageBox, Loading } from 'element-ui'
// import idcardFont from '@/assets/idcard/front.png'

// const dllLibPath = path.join(__dirname, '../dll')
// process.env.PATH = `${process.env.PATH}${path.delimiter}${dllLibPath}`
// console.log(process.env)
const idCardDll = ffi.Library('./termb.dll', {
  // 打开串口
  'InitComm': ['int', ['int']],
  // 卡认证
  'Authenticate': ['int', []],
  // 读卡
  'Read_Content': ['int', ['int']],
  // 关闭串口
  'CloseComm': ['int', []]
})

// 打开串口
export function openComm() {
  if (idCardDll.InitComm(1001) === 1) {
    return true
  }
  return false
}

// 卡认证
export function authCard() {
  if (idCardDll.Authenticate() === 1) {
    return true
  }
  return false
}

// 读卡
export function readCard() {
  if (idCardDll.Read_Content(1) === 1) {
    const text = readContent()
    closeComm()
    return text
  }
  return false
}

// 关闭串口
export function closeComm() {
  if (idCardDll.CloseComm() === 1) {
    return true
  }
  return false
}

/**
 * 获取身份证读取内容
 */
function readContent() {
  const result = { code: 1, msg: '读取失败' }
  // 获取身份证读取内容
  const filePath = './wz.txt'
  // const filePath2 = './xp.wlt'
  // const filePath3 = './zp.bmp'
  try {
    const text = fs.readFileSync(filePath, 'UTF-16LE')
    // console.log('读取内容', text)
    if (text) {
      // 姓名
      const name = text.substring(0, 15).trim()
      // 姓名拼音
      let namePinYin = ''
      // 名
      let firstName = ''
      // 姓
      let lastName = ''
      // 名拼音
      let firstNamePinYin = ''
      // 姓拼音
      let lastNamePinYin = ''
      if (name.length <= 3) {
        lastName = name.substring(0, 1)
        firstName = name.substring(1, name.length)
      } else if (name.length > 3 && name.length <= 5) {
        lastName = name.substring(0, 2)
        firstName = name.substring(2, name.length)
      } else {
        lastName = name.substring(0, 4)
        firstName = name.substring(4, name.length)
      }
      lastNamePinYin = slugify(lastName)
      firstNamePinYin = slugify(firstName).replace('-', '')
      namePinYin = firstNamePinYin + ' ' + lastNamePinYin
      // 性别
      let sex
      if (text.substring(15, 16) % 2 === 0) {
        sex = '女'
      } else {
        sex = '男'
      }
      // 民族
      const nation = getNation(text.substring(16, 18).trim())

      // 出生日期
      let birthday = text.substring(18, 26).trim()
      birthday = birthday.substring(0, 4) + '-' + birthday.substring(4, 6) + '-' + birthday.substring(6, 8)
      // 住址
      const address = text.substring(26, 61).trim()
      // 身份证号码
      const idCardNo = text.substring(61, 79).trim()
      // 签发机关
      const belongOrg = text.substring(79, 94).trim()
      // 证件有效期开始日期
      let expireDateStart = text.substring(94, 102).trim()
      expireDateStart = expireDateStart.substring(0, 4) + '-' + expireDateStart.substring(4, 6) + '-' + expireDateStart.substring(6, 8)
      // 证件有效期结束日期
      let expireDateEnd = text.substring(102, 128).trim()
      expireDateEnd = expireDateEnd.substring(0, 4) + '-' + expireDateEnd.substring(4, 6) + '-' + expireDateEnd.substring(6, 8)
      const data = { name, namePinYin, firstName, lastName, firstNamePinYin, lastNamePinYin,
        nation, sex, birthday, address, idCardNo, belongOrg, expireDateStart, expireDateEnd }
      result.code = 0
      result.data = data
      result.msg = '读取成功'
      // console.log(result);
      // fs.unlink(filePath, (error) => {
      //   if (error) {
      //     console.error('文件删除失败', error)
      //   }
      // })
      // fs.unlink(filePath2, (error) => {
      //   if (error) {
      //     console.error('文件删除失败', error)
      //   }
      // })
      // fs.unlink(filePath3, (error) => {
      //   if (error) {
      //     console.error('文件删除失败', error)
      //   }
      // })
    }
  } catch (error) {
    console.error('读取失败', error)
  }
  return result
}

export function readIdCard(callback) {
  let tip, auth
  let count = 10
  if (!openComm()) {
    MessageBox.alert('身份证模块异常', {
      confirmButtonText: '确定'
    })
    return
  }
  auth = authCard()
  if (auth) {
    const loading = Loading.service({
      lock: true,
      text: '正在读取...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })

    const idCardData = readCard()
    // console.log(idCardData)
    callback(idCardData)
    setTimeout(() => {
      loading.close()
    }, 500)
    return
  } else {
    tip = Message.warning({
      message: '请将身份证放置在身份证识别区',
      type: 'warning',
      showClose: true,
      duration: 0,
      onClose: () => {
        clearInterval(interval)
        closeComm()
      }
    })
  }
  const interval = setInterval(() => {
    count--
    auth = authCard()
    console.log('卡认证中')
    if (count === 0) {
      clearInterval(interval)
      tip.close()
      MessageBox.alert('身份证读取失败，请重试', {
        confirmButtonText: '确定'
      })
    }
    if (auth) {
      const loading = Loading.service({
        lock: true,
        text: '正在读取...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      const idCardData = readCard()
      // console.log(idCardData)
      callback(idCardData)

      setTimeout(() => {
        loading.close()
      }, 500)
      clearInterval(interval)
      tip.close()
    }
  }, 500)
}

export function backzp(name) {
  const fs = require('fs')
  const readStream = fs.createReadStream('zp.bmp')
  const writeStream = fs.createWriteStream(name)
  readStream.pipe(writeStream)
}

/**
 * 生成身份证图片
 * @param {*} idCardData
 */
export function createIdCardImage(idCardData, checkResult, imgPath, zpath, callback) {
  console.log(11, checkResult, imgPath)
  new Jimp(1050, 1485, 0xffffffff, (err, idcard) => {
    // 正面
    Jimp.read('./static/idcard/img/front.png').then(front => {
      Jimp.loadFont('./static/idcard/font/fangzhengheitijianti_32/fangzhengheitijianti.fnt').then(font => {
        front.print(font, 370, 420, idCardData.belongOrg)
        let expireDate = ''
        if (idCardData.expireDateEnd === '长期--') {
          expireDate = idCardData.expireDateStart.split('-').join('.') + '-' + '长期'
        } else {
          expireDate = idCardData.expireDateStart.split('-').join('.') + '-' + idCardData.expireDateEnd.split('-').join('.')
        }
        front.print(font, 370, 492, expireDate)
        // front.write('idcardFront.jpg')
        // idcard.composite(front.resize(428, 270), 550, 82)
        idcard.composite(front.resize(448, 282.5), 550, 82)

        // 反面
        Jimp.read('./static/idcard/img/back.png').then(back => {
          Jimp.read(zpath).then(
            avatar => {
              avatar = avatar.resize(282, 349)
              // avatar.resize(479, 512).write('lena-small-bw.jpg')
              Jimp.loadFont('./static/idcard/font/fangzhengheitijianti_40/fangzhengheitijianti.fnt').then(font => {
              // Jimp.loadFont('./static/idcard/font/fangzhengheitijianti_40/fangzhengheitijianti.fnt')).then(font => {
                back.print(font, 170, 82, idCardData.name)
                back.print(font, 170, 82, idCardData.name)
                Jimp.loadFont('./static/idcard/font/fangzhengheitijianti_36/fangzhengheitijianti.fnt').then(font => {
                  back.print(font, 170, 152, idCardData.sex)
                  back.print(font, 370, 152, idCardData.nation)
                  const birthdayArr = idCardData.birthday.split('-')
                  back.print(font, 170, 222, parseInt(birthdayArr[0]))
                  back.print(font, 315, 222, parseInt(birthdayArr[1]))
                  back.print(font, 395, 222, parseInt(birthdayArr[2]))

                  let address = idCardData.address
                  address = address.replace(/１/g, '1').replace(/２/g, '2').replace(/３/g, '3').replace(/４/g, '4').replace(/５/g, '5').replace(/６/g, '6').replace(/７/g, '7').replace(/８/g, '8').replace(/９/g, '9').replace(/０/g, '0')
                  if (address.length >= 11) {
                    if (address.length < 22) {
                      back.print(font, 170, 302, address.substring(0, 11))
                      back.print(font, 170, 352, address.substring(11, address.length))
                    } else {
                      back.print(font, 170, 302, address.substring(0, 11))
                      back.print(font, 170, 352, address.substring(11, 22))
                      back.print(font, 170, 402, address.substring(22, address.length))
                    }
                  }

                  Jimp.loadFont('./static/idcard/font/OCR-B10BT/OCR-B10BT.fnt').then(font => {
                    back.print(font, 320, 485, idCardData.idCardNo)
                    back.composite(avatar, 590, 82, {
                      mode: Jimp.BLEND_MULTIPLY
                    })
                    // back.write('idcardBack.jpg')

                    idcard.composite(back.resize(448, 282.5), 100, 82)

                    Jimp.loadFont('./static/idcard/font/fangsong_24_red/font.fnt').then(font => {
                      idcard.print(font, 200, 80, '本证件仅用于中国邮储银行账户相关业务办理,复印无效')
                      Jimp.loadFont('./static/idcard/font/fangsong_24_black/font.fnt').then(font => {
                        idcard.print(font, 100, 400, '姓名:' + idCardData.name)
                        idcard.print(font, 100, 440, '身份证号码:' + idCardData.idCardNo)
                        idcard.print(font, 100, 480, '签发机关:此项暂不返回核查结果')
                        idcard.print(font, 100, 520, '如有疑义,请填写意见并向公安部反馈')
                        Jimp.loadFont('./static/idcard/font/fangsong_24_red/font.fnt').then(font => {
                          idcard.print(font, 100, 560, '联网核查结果:' + checkResult)
                          if (imgPath !== '') {
                            Jimp.read(imgPath).then(image => {
                              idcard.composite(image.resize(102, 126), 700, 400)
                              // idcard.write('idcard.jpg')
                              idcard.getBase64(Jimp.AUTO, (r1, r2) => {
                                callback(r2)
                              })
                            }
                            ).catch(err => {
                              console.error(err)
                            })
                          } else {
                            idcard.write('idcard.jpg')
                            idcard.getBase64(Jimp.AUTO, (r1, r2) => {
                              callback(r2)
                            })
                          }
                        })
                      })
                    })
                  })
                })
              })
            }
          )
        }
        ).catch(err => {
          console.error(err)
        })
        // 核查图片
        // Jimp.read('./src/renderer/../../zp.bmp')).then(image => {
        //   idcard.composite(image.resize(102, 126), 700, 400)
        // }
        // ).catch(err => {
        //   console.error(err)
        // })

        if (err) {
          console.error(err)
        }
      })
    }).catch(err => {
      console.error(err)
    })
  })
}

/**
 * 获取民族
 * @param {*} code
 */
function getNation(code) {
  switch (code) {
    case '01' : return '汉'
    case '02' : return '蒙古'
    case '03' : return '回'
    case '04' : return '藏'
    case '05' : return '维吾尔'
    case '06' : return '苗'
    case '07' : return '彝'
    case '08' : return '壮'
    case '09' : return '布依'
    case '10' : return '朝鲜'
    case '11' : return '满'
    case '12' : return '侗'
    case '13' : return '瑶'
    case '14' : return '白'
    case '15' : return '土家'
    case '16' : return '哈尼'
    case '17' : return '哈萨克'
    case '18' : return '傣'
    case '19' : return '黎'
    case '20' : return '傈僳'
    case '21' : return '佤'
    case '22' : return '畲'
    case '23' : return '高山'
    case '24' : return '拉祜'
    case '25' : return '水'
    case '26' : return '东乡'
    case '27' : return '纳西'
    case '28' : return '景颇'
    case '29' : return '柯尔克孜'
    case '30' : return '土'
    case '31' : return '达斡尔'
    case '32' : return '仫佬'
    case '33' : return '羌'
    case '34' : return '布朗'
    case '35' : return '撒拉'
    case '36' : return '毛南'
    case '37' : return '仡佬'
    case '38' : return '锡伯'
    case '39' : return '阿昌'
    case '40' : return '普米'
    case '41' : return '塔吉克'
    case '42' : return '怒'
    case '43' : return '乌孜别克'
    case '44' : return '俄罗斯'
    case '45' : return '鄂温克'
    case '46' : return '德昂'
    case '47' : return '保安'
    case '48' : return '裕固'
    case '49' : return '京'
    case '50' : return '塔塔尔'
    case '51' : return '独龙'
    case '52' : return '鄂伦春'
    case '53' : return '赫哲'
    case '54' : return '门巴'
    case '55' : return '珞巴'
    case '56' : return '基诺'
  }
}
