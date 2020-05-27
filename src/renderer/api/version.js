import request from '@/utils/request'

// 列表
export function getList(params) {
  return request({
    url: '/sys/version/list',
    method: 'get',
    params
  })
}

// 获取信息
export function getInfo(params) {
  return request({
    url: '/sys/version/info/' + params,
    method: 'get'
  })
}

// 新增
export function add(params) {
  return request({
    url: '/sys/version/save',
    method: 'post',
    data: params
  })
}

// 修改
export function update(params) {
  return request({
    url: '/sys/version/edit',
    method: 'post',
    data: params
  })
}

// 删除
export function del(params) {
  return request({
    url: '/sys/version/delete',
    method: 'post',
    data: params
  })
}

// 生效
export function effect(params) {
  return request({
    url: '/sys/version/effect/' + params,
    method: 'get'
  })
}

// 失效
export function failure(params) {
  return request({
    url: '/sys/version/failure/' + params,
    method: 'get'
  })
}

