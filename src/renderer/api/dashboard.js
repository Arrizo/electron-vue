import request from '@/utils/request'
import qs from 'Qs'

// 总数
export function getTotal(id) {
  return request({
    url: '/sys/statis/totoals',
    method: 'post',
    data: qs.stringify({
      id
    })
  })
}

// 开户排行
export function openRank(id) {
  return request({
    url: '/sys/statis/rankList',
    method: 'post',
    data: qs.stringify({
      id
    })
  })
}

// 柱形图
export function getBarList(id, yea, mon) {
  return request({
    url: '/sys/statis/pillarList',
    method: 'post',
    data: qs.stringify({
      id,
      yea,
      mon
    })
  })
}

// 饼图
export function getPieData(id, yea, mon) {
  return request({
    url: '/sys/statis/sumRegistCapital',
    method: 'post',
    data: qs.stringify({
      id,
      yea,
      mon
    })
  })
}

// 获取机构弹框列表
export function getDepts() {
  return request({
    url: '/sys/dept/deptList',
    method: 'get'
  })
}
