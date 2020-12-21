const state = {
  axiosRequestTasks: {}
}
const getters = {
  axiosRequestTasks: state => state.axiosRequestTasks
}
const actions = {
}
const mutations = {
  SetRequestTask (state, { action, cancelFunc }) {
    state.axiosRequestTasks[action] = cancelFunc
  },
  CancelRequestTask (state, action) {
    for (let [tname, task] of Object.entries(state.axiosRequestTasks)) {
      const msg = `${tname}对应的Axios请求任务被取消`
      if (!action) return task(msg)
      if (tname === action) return task(msg)
    }
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}