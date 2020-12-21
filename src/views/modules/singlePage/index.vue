<style lang="stylus" scoped>
@import './../../../assets/stylus/variable.stylus'
@import './../../../assets/stylus/articleContent.stylus'
  .page-container
    background #fff
    border-radius 5px
    padding 60px 30px
  .loading
    width 100%
    height 185px
    background #fff
    text-align center
    .anticon-loading
      margin-top 20px
  .page-title
    font 700 24px Microsoft Yahei
    line-height 30px
    margin-bottom 15px
  .page-time
    color $grayColor
    margin-bottom 10px
  .page-content
    font-family Microsoft Yahei
    padding 30px 0
    margin-top 30px
    border-top 1px solid #dedede
  .page-buttons
    margin-top 100px
    text-align center
    button
      margin 0 10px
      border-radius 16px
    /deep/ .ant-btn-primary
      background-color $hoverColor
      border-color $hoverColor
</style>
<template>
  <div class="container">
    <breadcrumb :addRoutes="[{id: page.id, link: page.link, name: page.title}]" />
    <div class="mt15 ffffff minheight br6">
      <a-spin v-if="!page.title && loading" class="page-container loading">
        <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
      </a-spin>
      <div v-else class="page-container">
        <h1 class="page-title">{{page.title}}</h1>
        <div class="page-time">
          发布时间：{{page.date.replace('T', ' ')}}
          <span style="margin-right:15px"></span>
          修正时间：{{page.modified.substr(0, 10)}}
          <span style="margin-right:15px"></span>
          <a-icon type="eye-o" :style="{'margin-right': '6px'}"/>
          <a-icon v-if="views === 'N/A'" type="loading" :style="{'font-size': '12px'}" />
          <span v-else>{{views}}</span>
        </div>
        <article class="page-content content" v-html="page.content" v-code></article>
        <div class="page-buttons">
          <award placement="top">
            <a-button type="danger"> ￥ 打赏 </a-button>
          </award>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import breadcrumb from '@/components/breadcrumb'
import award from '@/components/award'
export default {
  components: {
    award,
    breadcrumb
  },
  data() {
    return {
      visible: false,
      views: 'N/A',
      page: {}
    }
  },
  computed: {
    ...mapGetters([
      'siteSetting'
    ])
  },
  watch: {
    '$route' () {
      this.init()
    }
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions([
      'GetPages',
      'article/AddPostViews',
      'article/GetPostViews'
    ]),
    async init () {
      await this.getPages()
      this.getPostViews()
      this.addPostViews()
    },
    getPages () {
      return new Promise((resolve, reject) => {
        this.loading = true
        this.GetPages({ params: { slug: this.$route.path.replace(/\//g, '') } }).then(pages => {
          this.page = pages[0]
          document.title = `${this.page.title} | ${this.siteSetting.title}`
          this.loading = false
          resolve()
        }).catch(() => {
          this.loading = false
          reject()
        })
      })
    },
    getPostViews () {
      this['article/GetPostViews']({ params: { id: this.page.id } }).then(views => {
        this.views = Number(views) + 1
      }).catch(err => {
        throw new Error('获取文章查看次数数据出错', err)
      })
    },
    addPostViews () {
      this['article/AddPostViews']({ params: { id: this.page.id } }).catch(err => {
        throw new Error('增加文章查看次数出错', err)
      })
    }
  }
}
</script>
