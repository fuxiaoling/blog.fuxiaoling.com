<style lang="stylus">
@import './../../assets/stylus/variable.stylus'
.blog-header
  padding 0
  height 140px
  background-color #fff
  .top-sider
    height 40px
    line-height 40px
    background-color $color
    color #d3d3d3
    .logo
      img
        vertical-align bottom
      span
        color #d3d3d3
    .top-nav
      a
        margin-left 15px
        color #d3d3d3
        &:hover
          color $hoverColor
        .anticon
          font-size 16px
          margin-right 3px
  .ant-affix
    .header-nav
      box-shadow 0 2px 8px rgba(0, 0, 0, 0.15)
  .header-nav
    background-color #fff
    height 100px
    .nav-item
      display flex
      line-height 24px
      height 100px
      width 14%
      margin 0 1px
      .item-content
        position relative
        display flex
        color #d3d3d3
        &:hover
          color #d3d3d3
          .item-post-count
            opacity 1
            height 45px
            transform translate(-20px)
        .item-post-count
          position absolute
          top 28px
          left 0
          opacity 0
          width 35px
          height -10px
          line-height 16px
          text-align center
          transition all 0.5s
          -ms-transition all 0.8s
          border-right 1px solid #dedede
          span
            display block
            color $grayColor
        .item-profile
          display inline-block
          transition all 0.5s
          -ms-transition all 0.8s
          .item-icon, .item-label
            padding 28px 0 24px 10px
          .item-label
            width 100px
            .item-title
              font-size 20px
              font-weight 700
              color $color
              transition all 0.5s
              -ms-transition all 0.8s
          &:hover
            .item-label
              .item-title
                color $hoverColor
        .translate
          &:hover
            transform translate(10px)
      .children-nav
        padding 26px 0
        .item-child
          display block
.child-categories-container
  display flex
  .child-categories-group
    padding: 10px 5px
    .group-name
      display block
      border-bottom 1px solid #ededed
      margin-bottom 10px
      color #d3d3d3
      padding 0 20px 0 10px
    a
      display block
      color $color
      line-height 26px
      padding-left 10px
      border-bottom 1px solid #ffffff
    a:hover
      color $hoverColor
      border-bottom 1px solid $hoverColor
</style>
<template>
  <a-layout-header class="blog-header">
    <div class="top-sider clearfix">
      <div class="container">
        <div class="fl logo">
          <a href="#/home">
            <img src="./../../assets/images/logo.png" :alt="siteSetting.title">
            <span class="f14 pl10">{{siteSetting.title}}</span>
          </a>
          <span class="pl30 top-nav">
            <a v-for="nav in topNav" :key="nav.ID" :href="nav.url" :target="nav.target">
              <a-icon :type="nav.description" />
              {{nav.title}}
            </a>
          </span>
        </div>
        <div class="fr" v-html="siteSetting.description"></div>
      </div>
    </div>
    <a-affix :offset-top="0">
      <nav class="header-nav">
        <div class="container" v-if="menuVisible">
          <a-row :gutter="10" container>
            <a-col :span="3" class="nav-item">
              <a class="item-content" href="#/series">
                <div class="item-profile clearfix">
                  <div class="item-icon fl"><a-icon type="container" :style="{ fontSize: '43px' }" /></div>
                  <div class="item-label fr">
                    <p class="item-title">系列文章</p>
                    <p>Series</p>
                  </div>
                </div>
              </a>
            </a-col>
            <a-col :span="3" class="nav-item" v-for="nav in headerNav" :key="nav.ID">
              <template v-if="childs[`id${nav.object_id}`]">
                <a-popover placement="bottom">
                  <template slot="content">
                    <div class="child-categories-container">
                      <div class="child-categories-group" v-for="child in childs[`id${nav.object_id}`]" :key="child.id">
                        <template v-if="childs[`id${child.id}`]">
                          <span class="group-name">{{child.name}}</span>
                          <a v-for="grandChild in childs[`id${child.id}`]" :key="grandChild.id" :href="grandChild.link"> {{grandChild.name}}<span style="color: #999">（{{grandChild.count}}）</span> </a>
                        </template>
                        <template v-else>
                          <a :href="child.link"> {{child.name}}<span style="color: #999">（{{child.count}}）</span></a>
                        </template>
                      </div>
                    </div>
                  </template>
                  <div class="item-content">
                    <div class="item-post-count"><span>{{counts[nav.object_id] || 0}}</span>篇</div>
                    <div class="item-profile clearfix" :class="{ 'translate': nav.object === 'category' }">
                      <div class="item-icon fl"><a-icon :type="nav.description" :style="{ fontSize: '45px' }" /></div>
                      <div class="item-label fr">
                        <p class="item-title">{{nav.title}}</p>
                        <p>{{nav.attr}}</p>
                      </div>
                    </div>
                  </div>
                </a-popover>
              </template>
              <a v-else class="item-content" :href="nav.url">
                <div v-if="nav.object === 'category'" class="item-post-count"><span>{{nav.count || 0}}</span>篇</div>
                  <div class="item-profile clearfix" :class="{ 'translate': nav.object === 'category' }">
                  <div class="item-icon fl"><a-icon :type="nav.description" :style="{ fontSize: '45px' }" /></div>
                  <div class="item-label fr">
                    <p class="item-title">{{nav.title}}</p>
                    <p>{{nav.attr}}</p>
                  </div>
                </div>
              </a>
            </a-col>
            <a-col :span="3" class="nav-item">
              <a class="item-content" href="javascript:void(0)" @click="handleSearch">
                <div class="item-profile clearfix">
                  <div class="item-icon fl"><a-icon type="search" :style="{ fontSize: '46px' }" /></div>
                  <div class="item-label fr">
                    <p class="item-title">搜索</p>
                    <p>Search</p>
                  </div>
                </div>
              </a>
              <search ref="globalSearch" />
            </a-col>
          </a-row>
        </div>
      </nav>
    </a-affix>
  </a-layout-header>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Search from '@/components/search'
export default {
  components: {
    Search
  },
  data() {
    return {
      menuVisible: true,
      childs: {}
    }
  },
  computed: {
    ...mapGetters([
      'siteSetting',
      'topNav',
      'headerNav',
      'counts',
      'categories'
    ])
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions([
      'GetMenus',
      'GetCategories'
    ]),
    init () {
      this.initData()
    },
    async initData () {
      this.GetMenus({ pathParams: { menuLocation: 'top_nav' } })
      this.GetMenus({ pathParams: { menuLocation: 'header_nav' } })
      await this.GetCategories({ params: { per_page: 60 } }).then(categories => {
        this.menuVisible = false
        this.setChilds(JSON.parse(JSON.stringify(categories)))
        this.menuVisible = true
      })
      this.GetMenus({ pathParams: { menuLocation: 'footer_nav' } })
    },
    setChilds (categories) {
      for (let category of categories) {
        if (category.id !== 1) {
          const key = `id${category.parent}`
          if (key in this.childs) {
            this.childs[key].push(category)
          } else {
            this.childs[key] = [category]
          }
        }
      }
    },
    handleSearch () {
      const searchComp = this.$refs.globalSearch
      searchComp.searchVisible = true
      searchComp.init()
    }
  }
}
</script>
