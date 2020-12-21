export default [
  {
    component: () => import(/* webpackChunkName: "tag" */ "@/views/modules/tag"),
    path: '/tag/*',
    name: 'Tag',
    meta: { 
      title: process.env.VUE_APP_ROUTE_TITLE_TAG,
      keepAlive: true,
      permission: []
    }
  }
]