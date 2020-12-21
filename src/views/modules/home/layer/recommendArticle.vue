<template>
  <div class="w50p">
    <div class="container-header clearfix">
      <div class="container-title fl"><a-icon type="fire" :style="{ 'font-size': '20px' }" />&nbsp;&nbsp;&nbsp;&nbsp;热门文章</div>
      <a href="#/category" class="container-more fr">MORE</a>
    </div>
    <post-list v-if="enable" :params="params" />
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
      enable: false,
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
      await this.initData()
      this.enable = true
    },
    initData () {
      return new Promise(resolve => {
        this['article/GetTopPostIds']({ params: { limit: 10 } }).then(ids => {
          this.params.include = ids.toString()
          resolve()
        }).catch(err => {
          resolve()
          throw new Error('获取posts数据出错', err)
        })
      })
    }
  }
}
</script>