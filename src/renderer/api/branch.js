import request from '@/utils/request'

// 列表
export function getList(params) {
  return request({
    url: '/sys/dept/list',
    method: 'get',
    params: params
  })
}

// 获取信息
export function getInfo(params) {
  return request({
    url: '/sys/dept/info/' + params,
    method: 'get'
  })
}

// 新增
export function add(sysDept) {
  return request({
    url: '/sys/dept/save',
    method: 'post',
    data: sysDept
  })
}

// 修改
export function update(sysDept) {
  return request({
    url: '/sys/dept/update',
    method: 'post',
    data: sysDept
  })
}

// 删除
export function del(deptIds) {
  return request({
    url: '/sys/dept/delete',
    method: 'post',
    data: deptIds
  })
}

// 获取机构弹框列表
export function getDeptSelect() {
  return request({
    url: '/sys/dept/cs_select',
    method: 'get',
    params: {
      branchName: '',
      deptId: '0'
    }
  })
}

// 获取当前用户上级机构id
export function getCurrentUserPid() {
  return request({
    url: 'sys/dept/getpIdBySysUser',
    method: 'get'
  })
}
