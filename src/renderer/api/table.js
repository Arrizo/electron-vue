import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/printReport/list',
    method: 'get',
    params
  })
}

// 获取信息
export function getInfo(params) {
  return request({
    url: '/sys/user/info/' + params,
    method: 'post'
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

