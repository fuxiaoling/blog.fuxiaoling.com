/**
 * @author 傅小凌 279811056#qq.com 
 * 
 */
import $router from '@/router'
import store from '@/store'

export const modules = () => {
  const modulesFiles = require.context('./modules', true, /\/.*\.js$/)
  return modulesFiles.keys().reduce((tempArr, modulePath) => {
    tempArr = [...tempArr, ...modulesFiles(modulePath).default]
    return tempArr
  }, [])
}
export const dynamicRouterRegister = (path) => {
  return new Promise(resolve => {
    const routeIsExist = !!$router.options.routes.find(item => item.path === path)
    if (routeIsExist) {
      resolve()
    } else {
      const name = path.replace(/\//g, '')
      store.dispatch('GetPages', { params: { slug: name } }).then(pages => {
        const pageIsExist = !!pages[0]
        if (pageIsExist) {
          $router.addRoutes([{
            component: () => import('@/views/modules/singlePage'),
            path,
            name
          }])
          resolve(path)
        } else {
          resolve()
        }
      }).catch(() => {
        resolve()
      })
    }
  })
}
