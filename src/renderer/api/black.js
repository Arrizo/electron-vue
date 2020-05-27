import request from '@/utils/request'

// 列表
export function getList(params) {
  console.log(params)
  return request({
    url: '/blackList/list',
    method: 'get',
    params
  })
}

// 获取信息
export function getInfo(params) {
  return request({
    url: '/blackList/info/' + params,
    method: 'get'
  })
}

// 新增或修改
export function addOrupdate(params) {
  return request({
    url: '/blackList/insertOrUpdate',
    method: 'post',
    data: params
  })
}

// 删除
export function del(params) {
  return request({
    url: '/blackList/delete',
    method: 'post',
    data: params
  })
}
