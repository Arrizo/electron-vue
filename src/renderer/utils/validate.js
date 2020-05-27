/**
 * Created by jiachenpan on 16/11/18.
 */

export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/** 表单校验规则 */
/** 身份证校验 */
export const idCardRule = (rule, value, callback) => {
  var aCity = { 11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江',
    31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北', 43: '湖南',
    44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏', 61: '陕西', 62: '甘肃',
    63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外' }
  var iSum = 0
  if (!/^\d{17}(\d|x)$/i.test(value)) {
    callback(new Error('你输入的身份证长度或格式错误'))
  }
  value = value.replace(/x$/i, 'a')
  if (aCity[parseInt(value.substr(0, 2))] == null) {
    callback(new Error('身份证地区非法'))
  }
  var sBirthday = value.substr(6, 4) + '-' + Number(value.substr(10, 2)) + '-' + Number(value.substr(12, 2))
  var d = new Date(sBirthday.replace(/-/g, '/'))
  if (sBirthday !== (d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate())) {
    callback(new Error('身份证出生日期非法'))
  }
  for (var i = 17; i >= 0; i--) iSum += (Math.pow(2, i) % 11) * parseInt(value.charAt(17 - i), 11)
  if (iSum % 11 !== 1) {
    callback(new Error('身份证号码有误'))
  }
  callback()
}

export const phoneRule = (rule, value, callback) => {
  if (!/^1[34578]\d{9}$/.test(value)) {
    callback(new Error('手机号码格式不正确'))
  }
  callback()
}

export const nameRule = (rule, value, callback) => {
  if (!/^[\u4E00-\u9FA5A-Za-z0-9',.-/() ]+$/.test(value)) {
    callback(new Error('请输入中文、字母或数字，可包含\',.-/()和空格'))
  }
  callback()
}

export const accountRule = (rule, value, callback) => {
  if (!/^[0-9a-zA-Z]*$/g.test(value)) {
    callback(new Error('请输入字母或数字'))
  }
  callback()
}
