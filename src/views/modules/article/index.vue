<style lang="stylus" scoped>
@import './../../../assets/stylus/variable.stylus'
@import './../../../assets/stylus/articleContent.stylus'
#article
  > .fl
    width 800px
    .article-container
      background #fff
      border-radius 5px
      padding 60px 30px
    .list-loading
      width 100%
      height 185px
      background #fff
      text-align center
      .anticon-loading
        margin-top 20px
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
      font-family Microsoft Yahei
      padding 30px 0
    .article-buttons
      margin-top 100px
      text-align center
      button
        margin 0 10px
        border-radius 16px
      /deep/ .ant-btn-primary
        background-color $hoverColor
        border-color $hoverColor
    .article-tags
      min-height 100px
      margin-top 30px
      a
        display inline-block
        padding 3px 15px
        margin 2px
        background #f3f3f3
        border-radius 5px
        color $grayColor
        transition all 0.05s
        -ms-transition all 0.08s
        &:hover
          color $hoverColor
          background #eef7ff
          transform scale(1.05)
    .article-copyright
      border 1px dashed #b5ddfb
      padding 15px
      margin-top 30px
      background #f1f9ff
      border-radius 5px
  > .fr
    width 380px
  article
    padding 0 30px 60px 30px
</style>
<template>
  <div id="article" class="container mt30 clearfix">
    <div class="fl">
      <a-spin v-if="!article.title && loading" class="article-container list-loading">
        <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
      </a-spin>
      <div v-else-if="article.status === 'publish'" class="article-container">
        <h1 class="article-title">{{article.title}}</h1>
        <div class="article-time">发布时间：{{article.date}}<span style="margin-right:15px"></span>修正时间：{{article.modified.substr(0, 10)}}</div>
        <div class="title-split-block clearfix">
          <breadcrumb :addRoutes="routes" class="fl" />
          <div class="actions fr">
            <span v-for="({ icon, text }, index) in article.actions" :key="icon">
              <template v-if="[2].includes(index)">
                <a-icon :type="icon" />
                <a-icon v-if="text === 'N/A'" type="loading" :style="{'font-size': '14px'}" />
                <span v-else>{{text}}</span>
              </template>
            </span>
          </div>
        </div>
        <article v-if="article.needPassword && !article.content" class="article-content content">
          <a-input-password v-model="password" placeholder="请输入密码后查看" style="width: 200px; margin-right: 15px" />
          <a-button type="primary" :loading="passwordLoading" @click="getArticleDetailByPassword">提交</a-button>
        </article>
        <article v-else class="article-content content" v-html="article.content" v-code="article.id"></article>
        <div class="article-buttons">
          <a-button type="primary" icon="like"> 点赞 </a-button>
          <award placement="top">
            <a-button type="danger"> ￥ 打赏 </a-button>
          </award>
        </div>
        <div class="article-tags">
          <a-divider>标签</a-divider>
          <template v-if="article.tags.length > 0">
            <a v-for="tag in tags" :key="tag.id" :href="tag.link + '?id=' + tag.id">{{tag.name}}</a>
          </template>
          <a-empty v-else ><span slot="description">暂无标签  </span></a-empty>
        </div>
        <div class="article-copyright">
          版权声明：本站原创文章遵循 CC 4.0 BY-SA 版权协议，转载请署名以及注明原文链接。<br>
          版权信息：{{siteSetting.title}} {{article.link}}
        </div>
      </div>
      <div v-else class="article-container">无法查看该文章</div>
      <comments v-if="visible" :postId="article.id" @commentsLength="(length)=>{article.actions[4].text = length}" />
    </div>
    <div class="fr">
      <focus />
      <series v-if="visible" :postSlug="slug" :seriesId="article.series[0]" />
      <recommend-article class="mt15" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import breadcrumb from '@/components/breadcrumb'
import award from '@/components/award'
import focus from '@/components/focus'
import recommendArticle from '@/components/recommendArticle'
import comments from './layer/comments.vue'
import series from './layer/series.vue'
export default {
  components: {
    breadcrumb,
    award,
    focus,
    recommendArticle,
    comments,
    series
  },
  data() {
    return {
      slug: this.$route.params.pathMatch.split('/')[0],
      password: '',
      passwordLoading: false,
      visible: false,
      loading: false,
      routes: [], // 面包屑路由
      article: {} // 文章
    }
  },
  computed: {
    ...mapGetters([
      'siteSetting',
      'tags',
      'categories'
    ])
  },
  watch: {
    '$route' () {
      this.slug = this.$route.params.pathMatch.split('/')[0]
      this.visible = false
      this.init()
    }
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions([
      'GetTags',
      'article/GetPosts',
      'article/AddPostViews',
      'article/GetPostViews'
    ]),
    async init () {
      await this.getArticleDetail()
      document.title = `${this.article.title} | ${this.siteSetting.title}`
      this.visible = true
      this.genBreadcrumb()
      this.getPostViews()
      this.addPostViews()
      this.getTags()
    },
    getArticleDetailByPassword () {
        if (!this.password.trim()) return
        this.passwordLoading = true
        this['article/GetPosts']({ pathParams: { id: this.article.id }, params: { password: this.password } }).then(list => {
          if (Array.isArray(list) && list.length === 1) {
            Object.assign(this.article, {
              content: list[0].content.rendered
            })
            this.passwordLoading = false
          } else {
            this.passwordLoading = false
          }
        }).catch(() => {
          this.passwordLoading = false
          this.$message.error('文章密码错误')
        })
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
          throw new Error('获取文章数据出错', err)
        })
      })
    },
    genBreadcrumb () {
      const categoryId = this.article.categories[0]
      const routes = this.getCategories(categoryId)
      const parentCategory = routes[routes.length - 2]
      if (parentCategory) {
        parentCategory.children = this.categories.filter(item => item.parent === parentCategory.id)
        this.routes = [{ id: 1, link: '#/category/', name: '博客分类' }].concat(routes)
      } else {
        this.routes = routes
      }
    },
    getCategories (categoryId) {
      const category = this.categories.find(item => item.id === categoryId)
      const { id, link, name, parent } = category
      return parent ? this.getCategories(parent).concat([{ id, link, name }]) : [{ id, link, name }]
    },
    getPostViews () {
      this['article/GetPostViews']({ params: { id: this.article.id } }).then(views => {
        this.article.actions[2].text = Number(views) + 1
      }).catch(err => {
        throw new Error('获取文章查看次数数据出错', err)
      })
    },
    addPostViews () {
      this['article/AddPostViews']({ params: { id: this.article.id } }).catch(err => {
        throw new Error('增加文章查看次数出错', err)
      })
    },
    getTags () {
      this.GetTags().then(list => {
        const articleTags = this.article.tags.reduce((result, item) => {
          result.push(list.find(tag => tag.id === item))
          return result
        }, [])
        this.article.tags = articleTags
      }).catch(err => {
        throw new Error('获取标签数据出错', err)
      })
    }
  }
}
</script>
