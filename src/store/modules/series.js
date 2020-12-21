import services from '@/services'
import { replaceLink } from './../utils'
const state = {
  series: [],
  images: {
    vue: `${process.env.VUE_APP_SERIES_IMAGES_VUE}`,
    vueMicro: `${process.env.VUE_APP_SERIES_IMAGES_VUE_MICRO}`,
    wordpress: `${process.env.VUE_APP_SERIES_IMAGES_WORDPRESS}`,
    python: `${process.env.VUE_APP_SERIES_IMAGES_PYTHON}`,
    rollup: `${process.env.VUE_APP_SERIES_IMAGES_ROLLUP}`,
    nodejs: `${process.env.VUE_APP_SERIES_IMAGES_NODEJS}`,
    vscode: `${process.env.VUE_APP_SERIES_IMAGES_VSCODE}`,
    default: `${process.env.VUE_APP_SERIES_IMAGES_DEFAULT}`
  }
}
const getters = {
  series: state => state.series,
  images: state => state.images
}
const actions = {
  GetSeries ({ commit, state }, payload = {}) {
    return new Promise((resolve, reject) => {
      if (state.series.length > 0) {
        resolve(state.series)
      } else {
        services.fetch('getSeries', payload).then(res => {
          const { data } = res
          if (Array.isArray(data) && data.length > 0) {
            commit("setSeries", data)
            resolve(data)
          } else {
            resolve([])
          }
        }).catch(err => {
          reject()
          throw new Error(err)
        })
      }
    })
  }
}
const mutations = {
  setSeries (state, data) {
    state.series = data.reduce((tempArr, item) => {
      const { id, count, link, name, description, slug } = item
      tempArr.push({ id, count, link: replaceLink(link), name, description, slug, tag: (() => {
        const match = /【([\s\S]*?)】/.exec(name)
        return match ? (match[1]).toLowerCase() : 'normal'
      })() })
      return tempArr
    }, [])
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}