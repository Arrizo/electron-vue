import request from '@/utils/request'

// 列表
export function getList(params) {
  return request({
    url: '/sys/role/list',
    method: 'get',
    params
  })
}

// 获取信息
export function getInfo(params) {
  return request({
    url: '/sys/role/info/' + params,
    method: 'get'
  })
}

// 新增
export function add(params) {
  return request({
    url: '/sys/role/save',
    method: 'post',
    data: params
  })
}

// 新增
export function update(params) {
  return request({
    url: '/sys/role/update',
    method: 'post',
    data: params
  })
}

// 删除
export function del(params) {
  return request({
    url: '/sys/role/delete',
    method: 'post',
    data: params
  })
}

// 获取菜单
export function getMenu(params) {
  return request({
    url: '/sys/menu/select',
    method: 'get',
    data: params
  })
}
