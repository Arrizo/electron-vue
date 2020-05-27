import request from '@/utils/request'
import qs from 'Qs'

// 获取图片验证码
export function getImgCode() {
  return request({
    url: '/change/regCode.jpg',
    method: 'get'
  })
}

// 获取注册短信验证码
export function getRegPhoneCode(imgCode, username, idCard, phone) {
  return request({
    url: '/change/sendRegCode',
    method: 'post',
    data: qs.stringify({
      imgCode,
      username,
      idCard,
      phone
    })
  })
}

// 注册
export function registerAjax(imgCode, username, idCard, phone, phoneCode) {
  return request({
    url: '/change/registerUser',
    method: 'post',
    data: qs.stringify({
      imgCode,
      username,
      idCard,
      phone,
      phoneCode
    })
  })
}

// 获取登录短信验证码
export function getLogPhoneCode(imgCode, username, idCard, phone) {
  return request({
    url: '/change/sendLogCode',
    method: 'post',
    data: qs.stringify({
      imgCode,
      username,
      idCard,
      phone
    })
  })
}

// 登录
export function loginAjax(imgCode, username, idCard, phoneCode) {
  return request({
    url: '/change/loginUser',
    method: 'post',
    data: qs.stringify({
      imgCode,
      username,
      idCard,
      phoneCode
    })
  })
}

// 上传身份证图片到服务器
export function uploadImg(base64Str, name, parentPath) {
  return request({
    url: '/change/uploadImg',
    method: 'post',
    data: qs.stringify({
      base64Str,
      name,
      parentPath
    })
  })
}

// 上传营业执照到服务器
export function uploadBusinessImg(base64Str, name, parentPath) {
  return request({
    url: '/change/uploadBusinessImg',
    method: 'post',
    data: qs.stringify({
      base64Str,
      name,
      parentPath
    })
  })
}

// 提交变更信息
export function submitAjax(changeData) {
  return request({
    url: '/change/save',
    method: 'post',
    data: changeData
  })
}

// 根据名称模糊查询开户银行
export function getDeptListByName(name) {
  return request({
    url: '/sys/dept/getDeptList/' + name,
    method: 'get'
  })
}

// 根据行号模糊查询开户银行
export function getDeptListByAccount(account) {
  return request({
    url: '/sys/dept/getList/' + account,
    method: 'get'
  })
}

// 根据id查询
export function getInfo(id) {
  return request({
    url: '/change/info/' + id,
    method: 'get'
  })
}

// 预约编号查询
export function getBusApplyNum(busApplyNum) {
  return request({
    url: '/change/' + busApplyNum,
    method: 'get'
  })
}

// 列表
export function getList(params) {
  return request({
    url: '/change/list',
    method: 'get',
    params
  })
}
