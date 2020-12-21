<style lang="stylus" scoped>
@import './../../../assets/stylus/variable.stylus'
#article
  .layer_1
    width 100%
    padding 60px 30px
    &.isSeries
      .article-series.fl
        width 330px
        min-height 500px
        border-right 1px solid #ededed
        padding 0 29px 60px 0
        .series-name
          width 100%
          line-height 35px
          background $color
          border-radius 5px
          text-align left
          padding-left 15px
          color #d3d3d3
        .series-articles
          padding 15px 0
          li
            border-bottom 1px dashed #ededed
            a
              display block
              padding 10px 0 5px 0
              &.current
                color $hoverColor
              &:hover
                color $hoverColor
                text-decoration underline
            .series-times
              padding-bottom 10px
              color $grayColor
      .article-container.fr
        width 780px
        min-height 500px
    .article-container.fr
      width 100%
      border-left none
      padding-left 0
      .article-title
        font 700 24px Microsoft Yahei
        line-height 30px
        margin-bottom 15px
      /deep/ .breadcrumb
        padding 0
        margin 0
      .article-time
        color $grayColor
        margin-bottom 10px
      .title-split-block
        border-bottom 1px solid #dedede
        .actions
          color $grayColor
          .anticon
            margin-left 15px
            margin-right 5px
      .article-content
        padding 30px 0
        >>> p
          text-indent 28px
          font-size 16px
          line-height 32px
          margin-bottom 20px
          text-align justify
          word-break break-all
  .layer_2
    width 100%
    padding 30px 0 60px 30px
    .article-buttons
      margin-top 100px
      text-align center
      button
        margin 0 10px
    .article-copyright
      border 1px dashed #ffcb2a
      padding 15px
      margin-top 15px
      background #fff8e1
      border-radius 5px
</style>
<template>
  <div id="article" class="container mt30">
    <a-spin v-if="!article.title && loading" class="list-loading br5 ffffff">
      <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
    </a-spin>
    <div v-else-if="article.status === 'publish'" class="pr br5 ffffff">
      <div class="layer_1 clearfix" :class="{ 'isSeries': article.series.length > 0 }">
        <div v-if="article.series.length > 0" class="article-series fl">
          <div class="series-name"><a-icon type="container" :style="{ 'margin-right': '5px' }" />{{series.seriesName}}</div>
          <div class="series-articles">
            <ul>
              <li v-for="item in series.seriesArticles" :key="item.id">
                  <a :href="item.link" :class="{ 'current': item.slug === slug }">
                    <a-icon type="file" :style="{ 'margin-right': '5px' }" />
                    {{item.title}}
                  </a>
                  <div class="series-times clearfix">
                    <span class="fl">发布时间：{{item.date}}</span>
                  </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="article-container fr">
          <h1 class="article-title">{{article.title}}</h1>
          <div class="article-time">发布时间：{{article.date}}<span style="margin-right:15px"></span>修正时间：{{article.modified.substr(0, 10)}}</div>
          <div class="title-split-block clearfix">
            <breadcrumb :addRoutes="routes" class="fl" />
            <div class="actions fr">
              <span v-for="({ icon, text }, index) in article.actions" :key="icon">
                <template v-if="index >= 2">
                  <a-icon :type="icon" />{{text}}
                </template>
              </span>
            </div>
          </div>
          <article class="article-content" v-html="article.content"></article>
        </div>
      </div>
      <div class="layer_2">
        <div class="article-buttons">
          <a-button type="primary" icon="like"> 点赞 </a-button>
          <award placement="top">
            <a-button type="danger"> ￥ 打赏 </a-button>
          </award>
        </div>
        <div class="article-tags">
          <a-divider>本文标签</a-divider>
          <a v-for="tag in article.tags" :key="tag.id" :href="tag.link">{{tag.name}}</a>
        </div>
        {{JSON.stringify(comments)}}
        <div class="article-copyright">
          版权声明：本站原创文章遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。<br>
          原文链接：{{article.link}}
        </div>
      </div>
    </div>
    <div v-else class=" br5 ffffff fl">无法查看该文章</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import breadcrumb from '@/components/breadcrumb'
import award from '@/components/award'
// import focus from '@/components/focus'
// import recommendArticle from '@/components/recommendArticle'
export default {
  components: {
    breadcrumb,
    award,
    // focus,
    // recommendArticle
  },
  data() {
    return {
      slug: this.$route.params.pathMatch.split('/')[0],
      seriesVisible: false,
      loading: false,
      routes: [], // 面包屑路由
      article: {}, // 文章
      series: {}, // 文章所在系列
      comments: [] // 文章评论
    }
  },
  computed: {
    ...mapGetters([
      'tags',
      'categories',
      'series/series'
    ])
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions([
      'GetTags',
      'article/GetPosts',
      'series/GetSeries',
      'article/AddPostViews',
      'article/GetPostViews',
      'article/GetComments',
      'article/postComments'
    ]),
    async init () {
      this.getTags()
      await this.getArticleDetail()
      this.genBreadcrumb(this.article.categories[0])
      this.getSeries(this.article.series[0])
      this.getPostViews(this.article.id)
      this.addPostViews(this.article.id)
      this.getComments(this.article.id)
    },
    getTags () {
      this.GetTags()
    },
    getArticleDetail () {
      return new Promise((resolve, reject) => {
        this.loading = true
        this['article/GetPosts']({ params: { slug: this.slug } }).then(list => {
          if (Array.isArray(list) && list.length === 1) {
            Object.assign(this.article, list[0])
            this.loading = false
            resolve()
          } else {
            this.loading = false
            reject()
          }
        }).catch(err => {
          this.loading = false
          reject()
          throw new Error('获取posts数据出错', err)
        })
      })
    },
    genBreadcrumb (categoryId) {
      const routes = this.getCategories(categoryId)
      routes[routes.length - 2].children = this.categories.filter(item => item.parent === routes[routes.length - 2].id)
      this.routes = [{ id: 1, link: '#/category/', name: '博客分类' }].concat(routes)
    },
    getCategories (categoryId) {
      const category = this.categories.find(item => item.id === categoryId)
      const { id, link, name, parent } = category
      return parent ? this.getCategories(parent).concat([{ id, link, name }]) : [{ id, link, name }]
    },
    getSeries (seriesId) {
      if (seriesId) {
        const series = this['series/series'].find(item => item.id === seriesId)
        const params = { series: seriesId, page: 1, per_page: 100, orderby: 'date', order: 'asc' }
        this['article/GetPosts']({ params }).then(list => {
          Object.assign(this, {
            series: {
              seriesName: series.name,
              seriesArticles: list
            }
          })
        }).catch(err => {
          throw new Error('获取文章系列数据出错', err)
        })
      }
    },
    getPostViews (postId) {
      this['article/GetPostViews']({ params: { id: postId } }).then(views => {
        this.article.actions[2].text = Number(views) + 1
      }).catch(err => {
        throw new Error('获取文章查看数据出错', err)
      })
    },
    addPostViews (postId) {
      this['article/AddPostViews']({ params: { id: postId } }).catch(err => {
        throw new Error('增加文章查看次数出错', err)
      })
    },
    getComments (postId) {
      this['article/GetComments']({ params: { post: postId } }).then(list => {
        this.article.actions[4].text = list.length
        Object.assign(this, {
          comments: list
        })
      }).catch(err => {
        throw new Error('获取文章评论数据出错', err)
      })
    },
    postComments () {
      // const params = {
      //   author: 3,
      //   author_email: '279811056@qq.com',
      //   author_name: '傅小凌',
      //   content: '这是评论内容',
      //   post: this.article.id
      // }
    }
  }
}
</script>
