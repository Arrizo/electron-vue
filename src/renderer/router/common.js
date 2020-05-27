import Layout from '../views/layout/Layout'
const routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'filescanner',
        component: () => import('@/views/filescanner'),
        meta: { title: '营业执照扫描', icon: 'form' }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'idcard',
        component: () => import('@/views/idCard'),
        meta: { title: '身份证扫描', icon: 'form' }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'open',
        component: () => import('@/views/accountMessage'),
        meta: { title: '开户信息', icon: 'form' }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'check',
        component: () => import('@/views/messageCheck'),
        meta: { title: '开户信息复核并提交', icon: 'form' }
      }
    ]
  }
]

export default routes
