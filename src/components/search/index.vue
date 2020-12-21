<style lang="stylus" scoped>
  @import './../../assets/stylus/variable.stylus'
  .list-loading
    width 100%
    height 320px
    border-radius 5px
    text-align center
    .anticon-loading
      margin-top 70px
  #global-search
    /deep/ .ant-modal-body
      min-height 400px
      padding 65px 50px
    /deep/ .ant-input-group-wrapper
      margin-bottom 40px
    .search-tips
      padding 15px 0 20px 0
      .search-tips-box
        width 49%
        .title
          font-weight 700
          font-size 18px
          margin-bottom 10px
          .anticon
            margin-right 8px
            font-size 18px
      .tag-search-list
        .tags
          min-height 320px
          max-height 320px
          overflow-y auto
        a
          display inline-block
          padding 3px 15px
          margin 2px
          background #f3f3f3
          border-radius 5px
          color $grayColor
          transition all 0.05s
          -ms-transition all 0.08s
        a:hover
          color $hoverColor
          background #eef7ff
          transform scale(1.05)
      .record-search-list
        position relative
        .clean
          position absolute
          top 3px
          right 0
          color $hoverColor
          cursor pointer
        a
          display block
          padding 5px 5px
          border-bottom 1px dashed #ededed
          transition all 0.5s
          -ms-transition all 0.8s
          color $hoverColor
        a:hover
          background #eef7ff

</style>
<template>
  <a-modal id="global-search" v-model="searchVisible" centered :footer="null" width="40%">
    <a-input-search ref="search" placeholder="请输入搜索关键词" enter-button="搜索" size="large" allow-clear @search="handleSearch" />
    <div class="search-tips clearfix">
      <div class="search-tips-box tag-search-list fl">
        <div class="title"><a-icon type="tags" />热门标签</div>
        <a-spin v-if="loading" class="list-loading">
          <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
        </a-spin>
        <div v-else class="tags">
          <template v-if="tags.length > 0">
            <a v-for="tag in tags" :key="tag.id" href="javascript:void(0)" @click="handleTagJump(tag.link, tag.id)">{{tag.name}}</a>
          </template>
          <a-empty v-else />
        </div>
      </div>
      <div class="search-tips-box record-search-list fr">
        <div class="title"><a-icon type="file-search" />搜索记录</div>
        <div class="clean" v-if="searchKeywords.length > 0" @click="cleanCacheKeyword"><a-icon type="delete" />清空</div>
        <template v-if="searchKeywords.length > 0">
          <a v-for="item in searchKeywords" :key="item" href="javascript:void(0)" @click="handleSearch(item)">{{item}}</a>
        </template>
        <a-empty v-else />
      </div>
    </div>
  </a-modal>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      loading: false,
      searchVisible: false,
      storageName: 'FXL_BLOG_SEARCH',
      searchKeywords: []
    }
  },
  computed: {
    ...mapGetters([
      'tags'
    ])
  },
  watch: {
    searchVisible (nVal, oVal) {
      if (nVal && nVal !== oVal) {
        this.init()
      }
    }
  },
  methods: {
    ...mapActions([
      'GetTags'
    ]),
    init () {
      this.searchKeywords = this.getCacheKeyword()
      this.getTags()
    },
    handleSearch (keyword) {
      if (!keyword.trim()) return
      if (/[!@#$^|/*"'<>%;)(&+]/.test(keyword)) {
        this.$message.error('请勿输入特殊字符')
        return
      }
      this.searchVisible = false
      this.setCacheKeyword(keyword)
      this.$router.push({path: '/search', query: { keyword }})
    },
    setCacheKeyword (keyword) {
      let { storageName, searchKeywords } = this
      if (searchKeywords.length === 0) {
        localStorage.setItem(storageName, JSON.stringify([keyword]))
      } else {
        let records = [...new Set([keyword].concat(searchKeywords))]
        if (records.length > 10) records = records.splice(0, 10)
        localStorage.setItem(storageName, JSON.stringify(records))
      }
    },
    getCacheKeyword () {
      return JSON.parse(localStorage.getItem(this.storageName)) || []
    },
    cleanCacheKeyword () {
      localStorage.removeItem(this.storageName)
      this.searchKeywords = []
    },
    getTags () {
      this.loading = true
      this.GetTags().then(() => {
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    handleTagJump (link, id) {
      window.location.href = `${link}?id=${id}`
      this.searchVisible = false
    }
  }
}
</script>