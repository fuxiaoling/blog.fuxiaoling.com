import services from '@/services'
import { replaceLink } from './../utils'
const state = {
  lastNotice: {}
}
const getters = {
  lastNotice: state => state.lastNotice
}
const actions = {
  GetLastNotice ({ commit }, payload = {}) {
    return new Promise((resolve, reject) => {
      services.fetch('getPosts', payload).then(res => {
        const { data } = res
        if (Array.isArray(data) && data.length === 1) {
          commit("setLastNotice", data)
          resolve(true)
        } else {
          resolve(false)
        }
      }).catch(err => {
        reject()
        throw new Error(err)
      })
    })
  }
}
const mutations = {
  setLastNotice (state, data) {
    const { title: { rendered: title }, link } = data[0]
    state.lastNotice = { title, link: replaceLink(link) }
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}