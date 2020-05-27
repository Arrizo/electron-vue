import request from '@/utils/request'

// 列表
export function getList() {
  return request({
    url: '/sys/menu/treeList',
    method: 'get'
  })
}

// 获取信息
export function getInfo(params) {
  return request({
    url: '/sys/menu/info/' + params,
    method: 'post'
  })
}

// 新增
export function add(params) {
  return request({
    url: '/sys/menu/save',
    method: 'post',
    data: params
  })
}

// 修改
export function update(params) {
  return request({
    url: '/sys/menu/update',
    method: 'post',
    data: params
  })
}

// 删除
export function del(params) {
  return request({
    url: '/sys/menu/delete/' + params,
    method: 'post'
  })
}

// 上级菜单列表
export function getParentList() {
  return request({
    url: '/sys/menu/select',
    method: 'get'
  })
}

// 导航菜单
export function getNav() {
  return request({
    url: '/sys/menu/getNav',
    method: 'get'
  })
}
