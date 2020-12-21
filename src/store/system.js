import services from '@/services'
import apis from '@/services/apis'
import cookies from 'js-cookie'
import { replaceLink } from './utils'
const state = {
  responseTotals: {},
  token: '',
  users: {
    all: [],
    user: {}
  },
  roles: {
    role: null,
    permissions: []
  },
  siteSetting: {}, // 站点设置
  medias: {}, // 媒体
  tags: [], // tags
  pages: {}, // pages
  categories: [], // 目录分类
  counts: {}, // 文章提交总数
  top_nav: [], // 顶部导航
  header_nav: [], // 站点导航
  footer_nav: [], // 脚部导航
  social_nav: [] // 友情链接
}
const getters = {
  responseTotals: state => state.responseTotals,
  token: state => state.token,
  siteSetting: state => state.siteSetting,
  counts: state => state.counts,
  originalCount: state => {
    return state.counts['0'] - (state.counts[`${process.env.VUE_APP_RETWEET_GATEGORY_ID}`] || 0)
  },
  retweetCount: state => {
    return state.counts[`${process.env.VUE_APP_RETWEET_GATEGORY_ID}`] || 0
  },
  medias: state => state.medias,
  tags: state => state.tags,
  pages: state => state.pages,
  categories: state => state.categories,
  retweetCategory: state => state.categories.find(item => item.id === Number(process.env.VUE_APP_RETWEET_GATEGORY_ID)),
  users: state => state.users.all,
  user: state => state.users.user,
  role: state => state.roles.role,
  permissions: state => state.roles.permissions,
  topNav: state => state.top_nav,
  headerNav: state => state.header_nav,
  footerNav: state => state.footer_nav
}
const actions = {
  /** 获取并存储Token */
  GetToken ({ commit, state }, payload = {}) {
    return new Promise((resolve, reject) => {
      if (state.token) {
        cookies.set(process.env.VUE_APP_TOKEN_STOREAGENAME, state.token)
        resolve()
      } else {
        services.fetch('getToken', payload).then(res => {
          const { statusCode, success, data: { token } } = res.data
          if (statusCode === 200 && success === true) {
            commit("SetToken", token)
            cookies.set(process.env.VUE_APP_TOKEN_STOREAGENAME, state.token)
            resolve()
          } else {
            reject()
            throw new Error('获取token失败')
          }
        }).catch(err => {
          reject()
          throw new Error(err)
        })
      }
    })
  },
  /** 获取用户列表 */
  GetUsers ({ commit, state }, payload = {}) {
    return new Promise((resolve, reject) => {
      if (state.users.all.length > 0) {
        resolve(state.users.all)
      } else {
        services.fetch('getUsers', payload).then(res => {
          const { data } = res
          if (Array.isArray(data) && data.length > 0) {
            commit("SetUsers", data)
            resolve(data)
          } else {
            reject()
          }
        }).catch(err => {
          reject()
          throw new Error(err)
        })
      }
    })
  },
  /** 获取当前用户 */
  GetUser ({ commit, state }, payload = {}) {
    return new Promise((resolve, reject) => {
      if (Object.keys(state.users.user).length > 0) {
        resolve(state.users.user)
      } else {
        services.fetch('getUser', payload).then(res => {
          const { data } = res
          commit("SetUser", data)
          resolve(data)
        }).catch(err => {
          reject()
          throw new Error(err)
        })
      }
    })
  },
  /** 获取站点设置 */
  GetSiteSetting ({ commit, state }, payload = {}) {
    return new Promise((resolve) => {
      if (Object.keys(state.siteSetting).length > 0) {
        resolve(true)
      } else {
        services.fetch('getSiteSetting', payload).then(res => {
          const { data } = res
          if (data) {
            commit("SetSiteSetting", data)
            resolve(true)
          } else {
            resolve(false)
          }
        }).catch(err => {
          resolve(false)
          throw new Error(err)
        })
      }
    })
  },
  /** 获取菜单 */
  GetMenus ({ commit, state, rootState }, payload = {}) {
    return new Promise((resolve, reject) => {
      const menuLocation = payload.pathParams.menuLocation
      if (Object.keys(state[menuLocation]).length > 0) {
        resolve(true)
      } else {
        if (rootState.siteSetting.date_format === 'Y年n月j日'){
          services.fetch('getMenus', payload).then(res => {
            const { data } = res
            if (data) {
              commit("SetMenus", {
                stateName: menuLocation,
                stateData: data
              })
              resolve(true)
            } else {
              resolve(false)
            }
          }).catch(err => {
            reject()
            throw new Error(err)
          })
        } else {
          const mock_top_nav = [
            {"ID":16,"order":1,"parent":0,"title":"首页","url":process.env.VUE_APP_DOMAIN + "#/home/","attr":"","target":"","classes":"","xfn":"","description":"home","object_id":16,"object":"custom","type":"custom","type_label":"自定义链接","children":[]},
            {"ID":17,"order":2,"parent":0,"title":"关于","url":process.env.VUE_APP_DOMAIN + "#/about/","attr":"","target":"","classes":"","xfn":"","description":"info-circle","object_id":8,"object":"page","type":"post_type","type_label":"页面","children":[]},
            {"ID":3804,"order":3,"parent":0,"title":"作者","url":"http://hi.fuxiaoling.com/","attr":"","target":"_blank","classes":"","xfn":"","description":"idcard","object_id":3804,"object":"custom","type":"custom","type_label":"自定义链接","children":[]}
          ]
          const mock_header_nav = [
            {"ID":4355,"order":1,"parent":0,"title":"前端技术","url":process.env.VUE_APP_DOMAIN + "#/category/frontend/","attr":"Front-End","target":"","classes":"","xfn":"","description":"layout","object_id":11,"object":"category","type":"taxonomy","type_label":"分类目录","children":[]},
            {"ID":4362,"order":2,"parent":0,"title":"后端技术","url":process.env.VUE_APP_DOMAIN + "#/category/backend/","attr":"Back-End","target":"","classes":"","xfn":"","description":"cloud-server","object_id":12,"object":"category","type":"taxonomy","type_label":"分类目录","children":[]},
            {"ID":4369,"order":3,"parent":0,"title":"开发运维","url":process.env.VUE_APP_DOMAIN + "#/category/devops/","attr":"DevOps","target":"","classes":"","xfn":"","description":"apartment","object_id":13,"object":"category","type":"taxonomy","type_label":"分类目录","children":[]},
            {"ID":4851,"order":4,"parent":0,"title":"其他技术","url":process.env.VUE_APP_DOMAIN + "#/category/other/","attr":"Other","target":"","classes":"","xfn":"","description":"experiment","object_id":26,"object":"category","type":"taxonomy","type_label":"分类目录","children":[]},
            {"ID":6378,"order":5,"parent":0,"title":"精品转载","url":process.env.VUE_APP_DOMAIN + "#/category/retweet/","attr":"Retweet","target":"","classes":"","xfn":"","description":"global","object_id":62,"object":"category","type":"taxonomy","type_label":"分类目录","children":[]}
          ]
          const mock_footer_nav = [
            {"ID":4082,"order":1,"parent":0,"title":"免责声明","url":process.env.VUE_APP_DOMAIN + "#/disclaimer/","attr":"","target":"","classes":"","xfn":"","description":"","object_id":4040,"object":"page","type":"post_type","type_label":"页面","children":[]},
            {"ID":4083,"order":2,"parent":0,"title":"隐私政策","url":process.env.VUE_APP_DOMAIN + "#/privacy-policy/","attr":"","target":"","classes":"","xfn":"","description":"","object_id":3,"object":"page","type":"post_type","type_label":"页面","children":[]}
          ]
          const mock = {
            top_nav: mock_top_nav,
            header_nav: mock_header_nav,
            footer_nav: mock_footer_nav
          }
          commit("SetMenus", {
            stateName: menuLocation,
            stateData: mock[menuLocation]
          })
        }
      }
    })
  },
  /** 获取菜单 */
  GetCategories ({ commit, state }, payload = {}) {
    return new Promise((resolve, reject) => {
      if (Object.keys(state.categories).length > 0) {
        resolve(state.categories)
      } else {
        services.fetch('getCategories', payload).then(res => {
          const { data } = res
          if (data) {
            if (Array.isArray(data) && data.length > 0) {
              const list = data.reduce((result, item) => {
                const { id, count, link, name, slug, parent } = item
                result.push({ id, count, link: replaceLink(link), name, slug, parent })
                return result
              }, [])
              commit("SetCategories", list)
              resolve(list)
            } else {
              resolve([])
            }
          } else {
            reject()
          }
        }).catch(err => {
          reject()
          throw new Error(err)
        })
      }
    })
  },
  /** 获取标签 */
  GetTags ({ commit, state }, payload = {}) {
    return new Promise((resolve, reject) => {
      if (state.tags.length > 0) {
        resolve(state.tags)
      } else {
        services.fetch('getTags', payload).then(res => {
          const { data } = res
          if (Array.isArray(data) && data.length > 0) {
            commit("SetTags", data)
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
  },
  /** 根据媒体分类获取媒体所有IDs banner */
  GetMediaIdsByFolder ({ commit, state, dispatch }, payload = {}) {
    return new Promise((resolve, reject) => {
      const folderId = payload.params.folder_id
      const mediaIdsState = state.medias && state.medias[`folder_${folderId}`]
      if (mediaIdsState && mediaIdsState.length > 0) {
        resolve(mediaIdsState)
      } else {
        services.fetch('getMediaIdsByFolder', payload).then(res => {
          const { data } = res
          if (data) {
            const mediaIds = data.data.attachment_ids
            if (mediaIds.length > 0) {
              dispatch('GetMedia', mediaIds).then(medias => {
                commit("SetMedias", { folderId, medias })
                resolve()
              })
            } else {
              resolve()
            }
          } else {
            reject()
          }
        }).catch(err => {
          reject()
          throw new Error(err)
        })
      }
    })
  },
  /** 根据媒体ids获取媒体详情 */
  GetMedia (...args) {
    let mediaIds = args[1] || []
    return new Promise((resolve) => {
      Promise.all(mediaIds.reduce((promiseTasks, mediaId) => {
        promiseTasks.push(new Promise((resolve, reject) => {
          services.fetch('getMedia', { pathParams: { mediaId } }).then(res => {
            resolve(res.data || {})
          }).catch(err => {
            reject()
            throw new Error(err)
          })
        }))
        return promiseTasks
      }, [])).then(medias => { 
        resolve(medias.length > 0 ? medias : [])
      })
    })
  },
  /** 根据slug获取单页 */
  GetPages ({ commit, state }, payload = {}) {
    return new Promise((resolve, reject) => {
      const { params: { slug } } = payload
      if (slug) {
        if (Reflect.has(state.pages, slug)) {
          resolve([state.pages[slug]])
        } else {
          services.fetch('getPages', payload).then(res => {
            const { data } = res
            if (Array.isArray(data) && data.length > 0) {
              const list = data.reduce((result, item) => {
                const { id, date, modified, slug, status, type, link, title: { rendered: title }, content: { rendered: content, needPassWord } } = item
                result.push({ id, date, modified, slug, status, type, link: replaceLink(link), title, content, needPassWord })
                return result
              }, [])
              commit("SetPages", list)
              resolve(list)
            } else {
              resolve([])
            }
          }).catch(err => {
            reject()
            throw new Error(err)
          })
        }
      } else {
        throw new Error('缺少单页slug参，不支持批量请求')
      }
    })
  } 
}
const mutations = {
  SetResponseTotals (state, response) {
    const apisRange = [
      apis.getPostBySearch,
      apis.getPosts
    ]
    const { config: { params, url: api }, headers } = response
    const total = headers['x-wp-total']
    const totalpages = headers['x-wp-totalpages']
    if (total && totalpages && apisRange.includes(api)) {
      switch (api) {
        case apisRange[0]:
          Object.assign(state.responseTotals, {
            search: { total, totalpages }
          })
          break
        case apisRange[1]:
          if (params.categories) {
            Object.assign(state.responseTotals, {
              [`posts_categories_${params.categories}`]: { total, totalpages }
            })
          } else if (params.series) {
            Object.assign(state.responseTotals, {
              [`posts_series_${params.series}`]: { total, totalpages }
            })
          } else if (params.tags) {
            Object.assign(state.responseTotals, {
              [`posts_tags_${params.tags}`]: { total, totalpages }
            })
          }
          break
      }
    }
  },
  SetToken (state, token) {
    state.token = token
  },
  SetUsers (state, data) {
    state.users.all = data
  },
  SetUser (state, data) {
    state.users.user = data
  },
  SetSiteSetting (state, data) {
    state.siteSetting = data
  },
  SetMenus (state, { stateName, stateData }) {
    for (let menu of stateData) menu.url = replaceLink(menu.url)
    state[stateName] = stateData
  },
  SetCategories (state, data) {
    const l2CountMap = new Map()
    for (let category of data) {
      const { parent, count } = category
      if (parent !== 0) l2CountMap.set(parent, l2CountMap.has(parent) ? l2CountMap.get(parent) + count : count)
    }
    const l1CountMap = new Map()
    for (let [key, value] of l2CountMap.entries()) {
      const current = data.find(item =>item.id === key)
      const { parent } = current
      if (parent !== 0) l1CountMap.set(parent, l1CountMap.has(parent) ? l1CountMap.get(parent) + value : value)
    }
    const counts = Object.fromEntries(new Map([...l2CountMap, ...l1CountMap]))
    Reflect.set(counts, '0', Array.from(l1CountMap.values()).reduce((x, y) => x + y))
    state.counts = counts
    state.categories = data
  },
  SetTags (state, data) {
    const list = data.reduce((result, item) => {
      const { id, name, count, link } = item
      result.push({ id, name, count, link: replaceLink(link) })
      return result
    }, [])
    state.tags = list.sort((i1, i2) => i2.count - i1.count)
  },
  SetMedias (state, { folderId, medias }) {
    state.medias = Object.assign(JSON.parse(JSON.stringify(state.medias)), {
      [`folder_${folderId}`]: medias.reduce((tempMedias, media) => {
        const item = {
          id: media.id,
          slug: media.slug,
          width: media.media_details.width,
          height: media.media_details.height,
          media_type: media.media_type,
          mime_type: media.mime_type,
          src: media.guid.rendered,
        }
        if (folderId === process.env.VUE_APP_MEDIA_BANNER_FOLDERID) {
          Object.assign(item, {
            href: /<p>([\s\S]*?)<\/p>/.exec(media.caption.rendered)[1]
          })
        }
        tempMedias.push(item)
        return tempMedias
      }, [])
    })
  },
  SetPages (state, list) {
    list.forEach(item => { state.pages[item.slug] = item })
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}