<style lang="stylus" scoped>
.container .container-header
  padding-left 12px
.recommend-article
  padding 15px
  border-radius 5px
  background #ffffff
  /deep/ .ant-list-vertical .ant-list-item-meta-title a
    font-size 16px
  /deep/ .ant-list-item
    padding 20px 15px
  /deep/ .ant-list-item-meta-description
    max-height 44px
    overflow hidden
</style>
<template>
  <div class="recommend-article">
    <div class="container-header clearfix">
      <div class="container-title fl"><a-icon type="fire" :style="{ 'font-size': '20px' }" />&nbsp;&nbsp;&nbsp;&nbsp;热门文章</div>
    </div>
    <post-list v-if="visible" :params="params" :toolsNum="3" />
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import postList from '@/components/postList'
export default {
  components: {
    postList
  },
  data() {
    return {
      visible: false,
      params: {
        include: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'topPostIds'
    ])
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions([
      'article/GetTopPostIds'
    ]),
    async init () {
      this.getTopPostIds()
    },
    getTopPostIds () {
      this['article/GetTopPostIds']({ params: { limit: 10 } }).then(ids => {
        this.params.include = ids.join(',')
        this.visible = true
      }).catch(err => {
        throw new Error('获取posts数据出错', err)
      })
    }
  }
}
</script>