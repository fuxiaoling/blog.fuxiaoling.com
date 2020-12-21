import Vue from "vue"
import Vuex from "vuex"
import system from './system'
import { modules, plugins } from './utils'
import loading from '@/plugins/loading/storePlugin'
Vue.use(Vuex)
export default new Vuex.Store({
  ...system,
  modules: modules(),
  plugins: [
    ...plugins(),
    loading
  ]
})
