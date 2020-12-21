export default [
  {
    component: () => import(/* webpackChunkName: "about" */ "@/views/modules/singlePage"),
    path: '/about',
    name: 'About',
    meta: { 
      title: process.env.VUE_APP_ROUTE_TITLE_ABOUT,
      keepAlive: true,
      permission: []
    }
  },
  {
    component: () => import(/* webpackChunkName: "about" */ "@/views/modules/singlePage"),
    path: '/disclaimer',
    name: 'Disclaimer',
    meta: { 
      title: process.env.VUE_APP_ROUTE_TITLE_DISCLAIMER,
      keepAlive: true,
      permission: []
    }
  },
  {
    component: () => import(/* webpackChunkName: "about" */ "@/views/modules/singlePage"),
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    meta: { 
      title: process.env.VUE_APP_ROUTE_TITLE_PRIVACYPOLICY,
      keepAlive: true,
      permission: []
    }
  }
]