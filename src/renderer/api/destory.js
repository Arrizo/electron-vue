import request from '@/utils/request'

// 获取图片验证码
export function getCode() {
  return request({
    url: '/account/vcode1.jpg',
    method: 'get'
  })
}

// 第一次获取短信验证码
export function getFirstMCode(valCode1, cusName, cusId, telNo) {
  return request({
    url: '/account/get_msg_code_first?valCode1=' + valCode1 + '&cusName=' + cusName + '&cusId=' + cusId + '&telNo=' + telNo,
    method: 'get'
  })
}

// 注册
export function register(valCode1, cusName, cusId, telNo, msgCode1) {
  return request({
    url: '/account/destroy_register?valCode1=' + valCode1 + '&cusName=' + cusName + '&cusId=' + cusId + '&telNo=' + telNo + '&msgCode1=' + msgCode1,
    method: 'get'
  })
}

// 登录
export function login(valCode2, cusName, cusId, msgCode2) {
  return request({
    url: '/account/destroy_login?valCode2=' + valCode2 + '&cusName=' + cusName + '&cusId=' + cusId + '&msgCode2=' + msgCode2,
    method: 'get'
  })
}

// 提交销户信息
export function submit(accountDestroy) {
  return request({
    url: '/account/destroy_submit',
    method: 'post',
    data: accountDestroy
  })
}

// 第二次获取短信验证码
export function getSecondMCode(valCode2, cusName, cusId, telNo) {
  return request({
    url: '/account/get_msg_code_second?valCode2=' + valCode2 + '&cusName=' + cusName + '&cusId=' + cusId + '&telNo=' + telNo,
    method: 'get'
  })
}

// 通过申请的预约编号获取结果信息渲染到打印页面
export function getPrinitResult(busApplyNum) {
  return request({
    url: '/account/get_bus_apply_num?busApplyNum=' + busApplyNum,
    method: 'get'
  })
}

