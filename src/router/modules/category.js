export default [
  {
    component: () => import(/* webpackChunkName: "category" */ "@/views/modules/category"),
    path: '/category',
    name: 'Category',
    meta: { 
      title: process.env.VUE_APP_ROUTE_TITLE_CATEGORY,
      keepAlive: true,
      permission: []
    }
  },
  {
    component: () => import(/* webpackChunkName: "category" */ "@/views/modules/category"),
    path: '/category/*',
    name: 'DeepCategory',
    meta: { 
      title: process.env.VUE_APP_ROUTE_TITLE_CATEGORY,
      keepAlive: true,
      permission: []
    }
  }
]