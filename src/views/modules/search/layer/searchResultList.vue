<style lang="stylus" scoped>
@import './../../../../assets/stylus/variable.stylus'
.list-loading
  width 100%
  height 185px
  background #fff
  border-radius 5px
  text-align center
  .anticon-loading
    margin-top 70px
.search-result-list
  width 100%
  min-height 300px
  border-radius 5px
  .loading
    color #999
    text-align center
    padding-top 30px
    .anticon
      font-size 30px
      margin-right 10px
  .search-result-ul
    padding 30px
    .search-result-li
      line-height 45px
      border-bottom 1px dashed #ededed
      &:last-child
        border-bottom none
      a
        display block
        color #3c3c3c
        font-size 18px
        font-weight 700
        transition all 0.2s
        -ms-transition all 0.5s
      a:hover
        color $hoverColor
        text-decoration underline
        transform translate(2px)
</style>
<template>
  <div class="w100p">
    <a-spin v-if="listData === null && loading" class="list-loading">
      <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
    </a-spin>
    <div v-else class="search-result-list ffffff">
      <div v-if="listData === null" class="loading"><a-icon type="loading" />搜索中...</div>
      <ul v-else-if="listData.length > 0" class="search-result-ul">
        <li class="search-result-li" v-for="item in listData" :key="item.id"><a :href="item.url" target="_block" >{{item.title}}</a></li>
      </ul>
      <a-empty style="padding-top:75px" v-else>
        <span slot="description"> 没有找到相关的内容 </span>
      </a-empty>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: {
    params: {
      type: Object,
      required: true
    }
  },
  watch: {
    '$route' () {
      this.init()
    }
  },
  data() {
    return {
      loading: false,
      listData: null
    }
  },
  computed: {
    ...mapGetters([
      'responseTotals'
    ])
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions([
      'article/GetPostBySearch'
    ]),
    init () {
      this.getPostBySearch()
    },
    getPostBySearch () {
      this.loading = true
      this['article/GetPostBySearch']({ params: { ...{
        search: this.$route.query.keyword,
        page: 1,
        per_page: 100,
        subtype: 'post'
      }, ...this.params
      } }).then(list => {
        this.thenGetPosts(list)
      }).catch(err => {
        this.thenGetPosts([])
        throw new Error('搜索数据出错', err)
      })
    },
    thenGetPosts (list) {
      this.listData = list
      this.loading = false
      this.$emit('setResultLength', this.responseTotals.search.total)
    }
  }
}
</script>