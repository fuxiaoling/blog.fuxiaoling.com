import services from '@/services'
import { replaceLink } from './../utils'
const state = {
  posts: {},
  topPostIds:[]
}
const getters = {
}
const actions = {
  GetPosts ({ commit, rootState, state }, payload = {}) {
    return new Promise((resolve, reject) => {
      const { params: { slug } } = payload
      if (slug && state.posts[`post_${slug}`]) { // 查询文章详情，直接尝试从缓存中获取
        resolve([state.posts[`post_${slug}`]])
      } else { // 通用查询文章详情列表
        services.fetch('getPosts', payload).then(res => {
          let { data } = res
          if (Object.prototype.toString.call(data) === "[object Object]") data = [data]
          if (Array.isArray(data) && data.length > 0) {
            const list = data.reduce((tempArr, item) => {
              const { id, title: { rendered: title }, content: { protected: needPassword, rendered: content }, excerpt: { rendered: excerpt }, categories, series,
                tags, date, modified, slug, status, link, comment_status } = item
              let category = rootState.categories.find(item => item.id === categories[0])
              tempArr.push({
                excerpt: excerpt && /<p>([\s\S]*?)<\/p>/.exec(excerpt)[1],
                date: date.replace(/T/g, ' '),
                modified: modified.replace(/T/g, ' '),
                link: replaceLink(link),
                actions: [
                  { icon: 'folder-open-o', text: category && category.name || 'vue', link: category && category.link || '#/category/frontend/framework/vue' },
                  { icon: 'clock-circle-o', text: date.substr(0, 10), link: '' },
                  { icon: 'eye-o', text: 'N/A', link: '' },
                  { icon: 'like-o', text: 'N/A', link: '' },
                  { icon: 'message', text: 'N/A', link: replaceLink(link) }
                ],
                id, title, needPassword, content, categories, series, tags, slug, status, comment_status
              })
              return tempArr
            }, [])
            commit("SetPosts", list)
            resolve(list)
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
  GetPostBySearch (...args) {
    const payload = args[1]
    return new Promise((resolve, reject) => {
      services.fetch('getPostBySearch', payload).then(res => {
        const { data } = res
        if (Array.isArray(data) && data.length > 0) {
          const list = data.reduce((tempArr, item) => {
            const { id, title, url } = item
            tempArr.push({ id, title, url: replaceLink(url) })
            return tempArr
          }, [])
          resolve(list)
        } else {
          resolve([])
        }
      }).catch(err => {
        reject()
        throw new Error(err)
      })
    })
  },
  AddPostViews (...args) {
    const payload = args[1]
    return new Promise((resolve, reject) => {
      services.fetch('addPostViews', payload).then(res => {
        resolve(res)
      }).catch(err => {
        reject()
        throw new Error(err)
      })
    })
  },
  GetPostViews (...args) {
    const payload = args[1]
    return new Promise((resolve, reject) => {
      services.fetch('getPostViews', payload).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject()
        throw new Error(err)
      })
    })
  },
  GetTopPostIds ({ commit }, payload = {}) {
    return new Promise((resolve, reject) => {
      services.fetch('getTopPostIds', payload).then(res => {
        const { data } = res
        if (Array.isArray(data) && data.length > 0) {
          commit("SetTopPostIds", data)
          resolve(data)
        } else {
          resolve([])
        }
      }).catch(err => {
        reject()
        throw new Error(err)
      })
    })
  },
  GetComments (...args) {
    const payload = args[1]
    return new Promise((resolve, reject) => {
      services.fetch('getComments', payload).then(res => {
        const { data } = res
        if (Array.isArray(data) && data.length > 0) {
          resolve(data)
        } else {
          resolve([])
        }
      }).catch(err => {
        reject()
        throw new Error(err)
      })
    })
  },
  PostComments (...args) {
    const payload = args[1]
    return new Promise((resolve, reject) => {
      services.fetch('postComments', payload).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject()
        throw new Error(err)
      })
    })
  }
}
const mutations = {
  SetPosts (state, data) {
    for (let item of data) state.posts[`post_${item.slug}`] = item
  },
  SetTopPostIds (state, data) {
    state.topPostIds = data
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}