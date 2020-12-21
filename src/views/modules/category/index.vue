<style lang="stylus" scoped>
#category
  .category-container
    min-height 1000px
    > .fl
      width 800px
    > .fr
      width 380px
</style>
<template>
  <div id="category" class="container">
    <breadcrumb @init="init" />
    <div class="category-container clearfix">
      <div class="fl">
        <post-list v-if="postsListVisible" styleMode="list" :params="postsQueryParams" />
        <div class="w100p mt15 tar">
          <a-pagination
            :hideOnSinglePage="false"
            :default-current="postsQueryParams.page"
            :page-size="postsQueryParams.per_page"
            :show-total="total => `共 ${total} 篇`"
            :total="pageTotal"
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
import breadcrumb from './layer/breadcrumb'
import postList from '@/components/postList'
import focus from '@/components/focus'
import recommendArticle from '@/components/recommendArticle'
export default {
  components: {
    breadcrumb,
    postList,
    focus,
    recommendArticle
  },
  data() {
    return {
      postsListVisible: false,
      postsQueryParams: {
        page: 1,
        per_page: 10,
        orderby: 'date'
      },
      pageTotal: 0
    }
  },
  methods: {
    init (routes) {
      const current = routes[routes.length - 1]
      this.pageTotal = current.count
      this.postsQueryParams = Object.assign(JSON.parse(JSON.stringify(this.postsQueryParams)), {
        page: 1,
        categories: current.id
      })
      this.postsListVisible = true
    },
    handlePageChange (page, pageSize) {
      this.postsQueryParams = Object.assign(JSON.parse(JSON.stringify(this.postsQueryParams)), {
        page,
        per_page: pageSize
      })
    }
  }
}
</script>
