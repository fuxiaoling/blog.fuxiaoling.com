/**
 * @author 傅小凌 279811056#qq.com 
 * 
 * 在store中注入loading插件所需属性及方法
 * 记录全局loading的状态及耗时
 * 
 */
const config = {
  moduleName: 'loading'
}
export default store => {
  const { moduleName } = config
  if (store.hasModule[moduleName]) throw new Error(`store模块命名冲突：${moduleName}`)
  store.registerModule(moduleName, {
    namespaced: true,
    state: {
      enable: false,
      record: []
    },
    getters: {
      enable: state => state.enable,
      record: state => state.record
    },
    mutations: {
      show (state, { payload: { actionType } }) {
        state.enable = true
        state.record.push({
          actionType,
          startTime: new Date().getTime(),
          endTime: null,
          time: null
        })
      },
      hidden (state, { payload: { actionType } }) {
        state.enable = false
        let currentCord = state.record[state.record.length - 1]
        if (currentCord.actionType === actionType) {
          const endTime = new Date().getTime()
          currentCord = JSON.parse(JSON.stringify(Object.assign(currentCord, {
            endTime,
            time: `${endTime - currentCord.startTime}ms`
          })))
        }
      }
    }
  })
  store.subscribeAction({
    before: action => {
      store.commit(
        {
          type: `${moduleName}/show`,
          payload: { 
            actionType: action.type
          }
        },
        { 
          root: true
        }
      )
    },
    after: action => {
      store.commit(
        {
          type: `${moduleName}/hidden`,
          payload: { 
            actionType: action.type
          }
        },
        { 
          root: true
        }
      )
    }
  })
}
