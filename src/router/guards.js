import store from '@/store'
import cookies from 'js-cookie'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { dynamicRouterRegister } from './utils'
NProgress.configure({ showSpinner: false })
export default (router) => {
  router.beforeEach(async(to, from, next) => {
    NProgress.start()
    if (cookies.get(process.env.VUE_APP_TOKEN_STOREAGENAME) && JSON.parse(process.env.VUE_APP_AUTHORIZATION)) {
      if (to.path === '/404' && to.redirectedFrom) {
        dynamicRouterRegister(to.redirectedFrom).then(path => { path && next(path) || next() })
      } else {
        store.commit('axios/CancelRequestTask')
        next()
      }
    } else {
      try {
        await store.dispatch('GetToken')
        next({ ...to, replace: true })
      } catch {
        NProgress.done()
        throw new Error('获取token失败，被禁止访问')
      }
    }
  })
  router.afterEach(() => {
    NProgress.done()
  })
  return router
}
