export default [
  {
    component: () => import(/* webpackChunkName: "home" */ "@/views/modules/home"),
    path: '/home',
    name: 'Home',
    meta: {
      title: process.env.VUE_APP_ROUTE_TITLE_HOME,
      permission: []
    }
  }
]