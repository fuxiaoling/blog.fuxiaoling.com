import apis from './../apis'
export default {
  /** 获取Token */
  getToken: {
    method: 'post',
    url: apis.getToken,
    data: {},
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    }
  },
  /** 获取用户列表 */
  getUsers: {
    method: 'get',
    url: apis.getUsers
  },
  /** 获取当前用户 */
  getUser: {
    method: 'get',
    url: apis.getUser
  },
  /** 获取网站设置 */
  getSiteSetting: {
    method: 'get',
    url: apis.getSiteSetting
  },
  /** 获取菜单 */
  getMenus: {
    method: 'get',
    url: apis.getMenus
  },
  /** 获取目录分类 */
  getCategories: {
    method: 'get',
    url: apis.getCategories
  },
  /** 获取TAGS */
  getTags: {
    method: 'get',
    url: apis.getTags
  },
  /** 获取pages */
  getPages: {
    method: 'get',
    url: apis.getPages
  },
  /** 根据媒体分类获取媒体所有IDs */
  getMediaIdsByFolder: {
    method: 'get',
    url: apis.getMediaIdsByFolder
  },
  /** 根据媒体ids获取媒体详情 */
  getMedia: {
    method: 'get',
    url: apis.getMedia
  }
}