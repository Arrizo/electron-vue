import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
// import { getNav } from '@/api/menu'
import { ipcRenderer } from 'electron'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
import { Message } from 'element-ui'
import routes from '@/router/common'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/

const globalRoterMap = [{
  path: '/login',
  component: () =>
            import('@/views/login/index'),
  hidden: true
},
{
  path: '/404',
  component: () =>
            import('@/views/404'),
  hidden: true
},
// {
//   path: '/destory/print/:id',
//   component: () =>
//             import('@/views/destory/print'),
//   hidden: true
// },
// {
//   path: '/change/print/:id',
//   component: () =>
//             import('@/views/change/print'),
//   hidden: true
// },
// {
//   path: '/open/print/:id',
//   component: () =>
//             import('@/views/open/print'),
//   hidden: true
// },
// {
//   path: '/open/printPdf/:id',
//   component: () =>
//             import('@/views/open/printPdf'),
//   hidden: true
// },
{ path: '*', redirect: '/404', hidden: true },
{
  path: '',
  component: Layout,
  redirect: 'dashboard',
  name: 'Dashboard',
  // hidden: true,
  children: [
    {
      path: 'dashboard',
      component: () =>
                  import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'form' }
    }
  ]
},
...routes
]

const router = new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  isAddDynamicMenuRoutes: false, // 是否已经添加动态(菜单)路由
  routes: globalRoterMap
})

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (store.getters.token) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (JSON.stringify(store.getters.user) === '{}') {
        store.dispatch('GetInfo').then(res => { // 拉取用户信息
          if (!router.options.isAddDynamicMenuRoutes) {
          //   getNav().then(function(r) {
          //     addMenuRouter(r.menuList)
            router.options.isAddDynamicMenuRoutes = true
            next()
          //   })
          }
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
      } else {
        if (to.path === '/inspect/inspect') {
          NProgress.done() // 结束Progress
          ipcRenderer.send('openNewWin', '年检', 'http://139.9.0.39/inspect-web/login.html')
        } else {
          next()
        }
      }
    }
  } else {
    // let flag = false
    // for (var white of whiteList) {
    //   if (to.path.indexOf(white) !== -1) {
    //     flag = true
    //     break
    //   }
    // }
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})

/**
 * 添加菜单动态路由
 */
// function addMenuRouter(menuList) {
//   const routers = []
//   for (var menu of menuList) {
//     let routerObj
//     if (menu.list && menu.list.length > 0) {
//       routerObj = {
//         path: `/${menu.url}`,
//         component: Layout,
//         redirect: `/${menu.url}/${menu.list[0].url}`,
//         alwaysShow: true,
//         name: menu.url,
//         meta: { title: menu.name, icon: menu.icon },
//         children: []
//       }
//       for (var subMenu of menu.list) {
//         const comp =
//                     import(`@/views/${subMenu.url}`)
//         const subRouterObj = {
//           path: subMenu.url,
//           name: subMenu.url,
//           component: () => comp,
//           meta: { title: subMenu.name, icon: subMenu.icon }
//         }
//         routerObj.children.push(subRouterObj)
//       }
//     } else {
//       if (menu.type === 3) { // 判断菜单类型是否为打开新窗口
//         routerObj = {
//           path: `/${menu.url}`,
//           // name: '',
//           component: Layout,
//           children: [{
//             path: menu.url,
//             name: menu.url,
//             meta: { title: menu.name, icon: menu.icon }
//           }]
//         }
//       } else {
//         const comp =
//                     import(`@/views/${menu.url}`)
//         routerObj = {
//           path: `/${menu.url}`,
//           // name: '',
//           component: Layout,
//           children: [{
//             path: menu.url,
//             name: menu.url,
//             component: () => comp,
//             meta: { title: menu.name, icon: menu.icon }
//           }]
//         }
//       }
//     }
//     routers.push(routerObj)
//   }
//   // console.log(routers)
//   const allRouters = globalRoterMap.concat(routers)
//   router.options.routes = allRouters
//   router.addRoutes(routers)

//   // console.log(router)
// }

export default router
