export default [
  {
    component: () => import(/* webpackChunkName: "article" */ "@/views/modules/article"),
    path: '/article/*',
    name: 'Article',
    meta: { 
      title: process.env.VUE_APP_ROUTE_TITLE_ARTICLE,
      keepAlive: true,
      permission: []
    }
  }
]