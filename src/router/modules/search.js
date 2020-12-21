export default [
  {
    component: () => import(/* webpackChunkName: "search" */ "@/views/modules/search"),
    path: '/search',
    name: 'Search',
    meta: { 
      title: process.env.VUE_APP_ROUTE_TITLE_SEARCH,
      keepAlive: true,
      permission: []
    }
  }
]