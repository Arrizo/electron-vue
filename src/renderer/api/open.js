import request from '@/utils/request'
import qs from 'Qs'

// 扫描二维码
export function getQrCode(base64Str) {
  return request({
    url: '/interaction/recognitionCode',
    method: 'post',
    data: qs.stringify({ base64Str })
  })
}

// 电子营业执照
export function getEblImgSrc() {
  return request({
    url: '/interaction/eblCode.jpg',
    method: 'get'
  })
}

// 扫描二维码
export function getEblCode(qrid) {
  return request({
    url: '/interaction/spAuthorization',
    method: 'post',
    data: qs.stringify({ qrid })
  })
}

// 自选靓号
export function niceAccount(account, verificationCode, functionCode) {
  return request({
    url: '/account/previewAccount',
    method: 'post',
    data: qs.stringify({ account, verificationCode, functionCode })
  })
}

// 开户许可证核查
export function checkLicNum(checkLicenseKey) {
  return request({
    url: '/ams/checkLicenseKey',
    method: 'post',
    data: qs.stringify({ checkLicenseKey })
  })
}

// 基本户联网核查
export function basic(data) {
  return request({
    url: '/ams/compareBaseAccountInfo',
    method: 'post',
    data
  })
}

// 一般户联网核查
export function general(data) {
  return request({
    url: '/ams/compareCommonAccount',
    method: 'post',
    data
  })
}

// 身份证联网核查
export function personVerification(params) {
  return request({
    url: '/pivs/networkVerification',
    method: 'post',
    params
  })
}

// 获取地区代码和邮编
export function getCodes(creditCode) {
  return request({
    url: '/printReport/getAreaAndPostCode',
    method: 'post',
    data: qs.stringify({ creditCode })
  })
}

// 保存开户信息
export function saveAccount(data) {
  return request({
    url: '/account/saveOpenAccountAll',
    method: 'post',
    data
  })
}

// 获取去上报详情
export function getBankConfirmData(id) {
  return request({
    url: '/account/getBankConfirmData',
    method: 'post',
    data: qs.stringify({ id })
  })
}

// 上报人行信息修改
export function updateSubmitBankInfos(data) {
  return request({
    url: '/account/updateSubmitBankInfos',
    method: 'post',
    data
  })
}

// 获取图片验证码
export function getImgSrc() {
  return request({
    url: '/AccountSubmit/regCode.jpg',
    method: 'get'
  })
}

// 获取注册短信验证码
export function getRegPhoneCode(valCode1, cusName, cusId, telNo) {
  return request({
    url: '/AccountSubmit/regCode',
    method: 'post',
    data: qs.stringify({
      valCode1,
      cusName,
      cusId,
      telNo
    })
  })
}

// 注册
export function registerAjax(imgCode, phoneCode, username, idCard, phone) {
  return request({
    url: '/AccountSubmit/open_register',
    method: 'post',
    data: qs.stringify({
      imgCode,
      phoneCode,
      username,
      idCard,
      phone
    })
  })
}

// 获取登录短信验证码
export function getLogPhoneCode(imgCode, username, idCard, phone) {
  return request({
    url: '/AccountSubmit/logCode',
    method: 'post',
    data: qs.stringify({
      imgCode,
      username,
      idCard,
      phone
    })
  })
}

// 上报
export function loginAjax(tradeId, valcode, SND, cusName, cusId, telNo) {
  return request({
    url: '/AccountSubmit/submitBoc',
    method: 'post',
    data: qs.stringify({
      tradeId,
      valcode,
      SND,
      cusName,
      cusId,
      telNo
    })
  })
}

// 开户列表
export function getList(params) {
  return request({
    url: '/printReport/list',
    method: 'post',
    params
  })
}

// 征信备案地址回显
export function getAddress(id) {
  return request({
    url: '/printReport/getAddress',
    method: 'post',
    data: qs.stringify({ id })
  })
}

// 上报回显
export function getDetail(id) {
  return request({
    url: '/printReport/getDetail?id=' + id,
    method: 'get'
  })
}

// 人行上报
export function subBank(id, accountNumber) {
  return request({
    url: '/ams/amsAccountSubmit',
    method: 'post',
    data: qs.stringify({
      id,
      accountNumber
    })
  })
}

// 征信上报
export function subCredit(licenseNumber, id, coutryCode, detAddress, moneyerSubType, type) {
  return request({
    url: '/eccs/creditReportCommit',
    method: 'post',
    data: qs.stringify({
      licenseNumber,
      id,
      coutryCode,
      detAddress,
      moneyerSubType,
      type
    })
  })
}

// 上传图片到服务器
export function uploadImg(base64Str, name, parentPath) {
  return request({
    url: '/AccountSubmit/uploadImg',
    method: 'post',
    data: qs.stringify({
      base64Str,
      name,
      parentPath
    })
  })
}

// 根据id查询
export function getInfo(openAccountNum) {
  return request({
    url: '/printReport/getInfoByReservationNum/' + openAccountNum,
    method: 'get'
  })
}

// 获取下级机构机构编号
export function getNoItems() {
  return request({
    url: '/printReport/getBranchNoItems',
    method: 'post'
  })
}

// 根据id查询
export function getCredCode(id) {
  return request({
    url: '/printReport/getCreditCode/' + id,
    method: 'get'
  })
}

export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}

// 获取当前日期
export function getNowFormatDate() {
  var date = new Date()
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var strDate = date.getDate()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  var currentdate = year + '年' + month + '月' + strDate + '日'
  return currentdate
}

/** 数字金额大写转换(可以处理整数,小数,负数) */
export function smalltoBIG(n) {
  var fraction = ['角', '分']
  var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  var unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟']
  ]
  var head = n < 0 ? '欠' : ''
  n = Math.abs(n)
  var s = ''
  for (var i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '')
  }
  s = s || '整'
  n = Math.floor(n)

  for (var k = 0; k < unit[0].length && n > 0; k++) {
    var p = ''
    for (var j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p
      n = Math.floor(n / 10)
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][k] + s
  }
  return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整')
}

/**
 * 打印基本存款账户信息和查询密码
 * @param {人行反馈xml信息} xmlInfo
 */
export function ocxPrint(xmlInfo) {
  var exec = require('child_process').exec
  exec('ocxPrint\\OcxPrint.exe ' + xmlInfo)
}
