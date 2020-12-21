import config from '@/global.config.js'
import { modules } from './utils'
export default {
  mode: process.env.VUE_APP_ROUTE_MODE,
  routes: [
    {
      path: '/404',
      component: () => import(/* webpackChunkName: "index" */'@/views/modules/system/404'),
      hidden: true
    },
    {
      component: () => import(/* webpackChunkName: "index" */ '@/views/layouts'),
      path: '/',
      name: 'Frame',
      redirect: '/home',
      meta: { 
        title: config.APPLICATION.name
      },
      children: [
        ...modules()
      ]
    },
    { path: '*', redirect: '/404', hidden: true }
  ]
}