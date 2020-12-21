<style lang="stylus" scoped>
  .search-result-container
    min-height 1000px
    > .fl
      width 800px
    > .fr
      width 380px
</style>
<template>
  <div class="container">
    <breadcrumb :addRoutes="routes" />
    <div class="search-result-container clearfix">
      <div class="fl">
        <search-result-list v-if="searchListVisible" :params="searchQueryParams" @setResultLength="setResultLength" />
        <div class="w100p mt15 tar">
          <a-pagination
            :hideOnSinglePage="false"
            :default-current="searchQueryParams.page"
            :page-size="searchQueryParams.per_page"
            :show-total="total => `共 ${total} 篇`"
            :total="total"
            @change="handlePageChange"/>
        </div>
      </div>
      <div class="fr">
        <focus />
        <recommend-article class="mt15" />
      </div>
    </div>
  </div>
</template>
<script>
import breadcrumb from '@/components/breadcrumb'
import searchResultList from './layer/searchResultList'
import focus from '@/components/focus'
import recommendArticle from '@/components/recommendArticle'
export default {
  components: {
    breadcrumb,
    searchResultList,
    focus,
    recommendArticle
  },
  data() {
    return {
      routes: [],
      searchListVisible: false,
      searchQueryParams: {
        page: 1,
        per_page: 100
      },
      total: 0
    }
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
    init (count = null) {
      this.pageTotal = count && Number(count) || 0
      this.routes = JSON.parse(JSON.stringify([{
        id: 1,
        link: `#/search?keyword=${this.$route.query.keyword}`,
        name: `<span style="color:#f00;font-weight:700">${this.$route.query.keyword}</span> 的搜索结果 ${count !==null ? '：共' + count + '条' : '' }`
      }]))
      this.searchListVisible = true
    },
    setResultLength (count) {
      this.init(count)
    },
    handlePageChange (page, pageSize) {
      this.searchQueryParams = Object.assign(JSON.parse(JSON.stringify(this.searchQueryParams)), {
        page,
        per_page: pageSize
      })
    }
  }
}
</script>