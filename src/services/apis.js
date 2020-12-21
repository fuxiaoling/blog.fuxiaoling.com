export default {
  getToken: '/jwt-auth/v1/token', // POST请求/生成令牌（token）
  getUsers: '/wp/v2/users', // GET用户列表（users）
  getUser: '/wp/v2/users/me', // GET当前用户信息（user）
  getSiteSetting: '/wp/v2/settings', // GET站点设置（settings）
  getMenus: '/wp-api-menus/v2/menu-locations', // GET获取所有菜单
  getCategories: '/wp/v2/categories', // GET分类列表（categories）
  getTags: '/wp/v2/tags', // GET标签列表（tags）
  getPostBySearch: '/wp/v2/search', // GET搜索（search）
  getPages: '/wp/v2/pages', // GET根据postId获取页面（subtype:page）对象详情（pages）
  getPosts: '/wp/v2/posts', // GET根据postId获取post（subtype:post）详情（posts）
  getComments: '/wp/v2/comments', // GET根据postId获取评论列表（comments）
  postComments: '/wp/v2/comments', // GET根据postId获取评论列表（comments）
  getMediaIdsByFolder: '/filebird/public/v1/attachment-id', // GET根据媒体分类获取媒体所有IDs
  getMedia: '/wp/v2/media', // GET根据媒体ids获取媒体详情
  getSeries: '/wp/v2/series', // GET所有series列表（Series）
  addPostViews: '/post-views-counter/view-post', // 根据postId提交查看次数+1
  getPostViews: '/post-views-counter/get-post-views', // GET根据postId获取浏览次数
  getTopPostIds: '/post-views-counter/get-top-post-views' // GET获取指定个数的浏览最高的post
}