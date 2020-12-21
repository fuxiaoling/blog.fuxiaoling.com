<style lang="stylus" scoped>
  .tags-result-container
    min-height 1000px
    > .fl
      width 800px
    > .fr
      width 380px
</style>
<template>
  <div class="container">
    <breadcrumb :addRoutes="routes">
      <template slot="total-slot">共 {{total}} 篇</template>
    </breadcrumb>
    <div class="tags-result-container clearfix">
      <div class="fl">
        <post-list v-if="postsListVisible" styleMode="list" :params="postsQueryParams" @curPagePostsCount="getTotals"/>
        <div class="w100p mt15 tar">
          <a-pagination
            :hideOnSinglePage="false"
            :default-current="postsQueryParams.page"
            :page-size="postsQueryParams.per_page"
            :show-total="total => `共 ${total} 篇`"
            :total="Number(total)"
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
import { mapGetters } from 'vuex'
import breadcrumb from '@/components/breadcrumb'
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
      routes: [],
      postsListVisible: false,
      postsQueryParams: {
        page: 1,
        per_page: 10,
        orderby: 'date'
      },
      total: 0
    }
  },
  computed: {
    ...mapGetters([
      'responseTotals'
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
    init () {
      this.getRoutes()
      this.postsQueryParams = Object.assign(JSON.parse(JSON.stringify(this.postsQueryParams)), {
        tags: this.$route.query.id
      })
      this.postsListVisible = true
    },
    getRoutes () {
      this.routes = JSON.parse(JSON.stringify([{
        id: 0,
        link: '',
        name: '标签'
      }, {
        id: 1,
        link: window.location.href,
        name: `${this.$route.params.pathMatch.replace('/', '')}`
      }]))
    },
    getTotals () {
      const state = this.responseTotals[`posts_tags_${this.$route.query.id}`]
      this.total = state && state.total || 0
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