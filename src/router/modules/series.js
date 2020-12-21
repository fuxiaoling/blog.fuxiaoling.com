export default [
  {
    component: () => import(/* webpackChunkName: "series" */ "@/views/modules/series"),
    path: '/series',
    name: 'Series',
    meta: { 
      title: process.env.VUE_APP_ROUTE_TITLE_SERIES,
      keepAlive: true,
      permission: []
    }
  },
  {
    component: () => import(/* webpackChunkName: "seriesList" */ "@/views/modules/series/list"),
    path: '/series/*',
    name: 'SeriesList',
    meta: { 
      title: process.env.VUE_APP_ROUTE_TITLE_SERIES,
      keepAlive: true,
      permission: []
    }
  }
]