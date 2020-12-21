import apis from './../apis'
export default {
  /** 获取Posts */
  getPosts: {
    method: 'get',
    url: apis.getPosts
  },
  /** 根据搜索获取Posts */
  getPostBySearch: {
    method: 'get',
    url: apis.getPostBySearch
  },
  /** 根据postId提交查看次数+1 */
  addPostViews: {
    method: 'get',
    url: apis.addPostViews
  },
  /** 根据postId获取浏览次数 */
  getPostViews: {
    method: 'get',
    url: apis.getPostViews
  },
  /** 获取浏览量最高的posts */
  getTopPostIds: {
    method: 'get',
    url: apis.getTopPostIds
  },
  /** GET根据postId获取评论列表（comments） */
  getComments: {
    method: 'get',
    url: apis.getComments
  },
  /** POST根据postId提交评论（comments） */
  postComments: {
    method: 'post',
    url: apis.postComments
  }
}