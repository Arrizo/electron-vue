import request from '@/utils/request'

// 列表
export function getList(params) {
  return request({
    url: '/sys/user/list',
    method: 'get',
    params
  })
}

// 获取角色列表
export function getRoles() {
  return request({
    url: '/sys/role/selectRole',
    method: 'post'
  })
}

// 获取机构弹框列表
export function getDepts(params) {
  return request({
    url: '/sys/dept/cs_select',
    method: 'get',
    params
  })
}

// 获取信息
export function getInfo(params) {
  return request({
    url: '/sys/user/info/' + params,
    method: 'get'
  })
}

// 新增
export function add(params) {
  return request({
    url: '/sys/user/save',
    method: 'post',
    data: params
  })
}

// 修改
export function update(params) {
  return request({
    url: '/sys/user/update',
    method: 'post',
    data: params
  })
}

// 删除
export function del(params) {
  return request({
    url: '/sys/user/delete',
    method: 'post',
    data: params
  })
}
