<style lang="stylus" scoped>
@import './../../../../assets/stylus/variable.stylus'
.article-series
  padding 30px
  .series-name
    width 100%
    line-height 35px
    background $color
    border-radius 5px
    text-align left
    padding-left 15px
    color #d3d3d3
  .series-articles
    padding 15px 0 0 0
    li
      border-bottom 1px dashed #ededed
      a
        display block
        padding 10px 0 5px 0
        &.current
          color $hoverColor
        &:hover
          color $hoverColor
          text-decoration underline
      .series-times
        padding-bottom 10px
        color $grayColor
      &:last-child
        border-bottom none
</style>
<template>
  <div>
    <div v-if="series.seriesArticles && series.seriesArticles.length > 0" class="article-series br5 ffffff mt15">
      <div class="series-name"><a-icon type="container" :style="{ 'margin-right': '5px' }" />{{series.seriesName}}</div>
      <div class="series-articles">
        <ul>
          <li v-for="item in series.seriesArticles" :key="item.id">
              <a :href="item.link" :class="{ 'current': item.slug === postSlug }">
                <a-icon type="file" :theme="item.slug === postSlug ? 'filled' : 'outlined'" :style="{ 'margin-right': '5px' }" />
                {{item.title}}
              </a>
              <div class="series-times clearfix">
                <span class="fl">发布时间：{{item.date}}</span>
              </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: {
    postSlug: {
      type: String,
      requried: true
    },
    seriesId: {
      type: Number,
      requried: true
    }
  },
  data() {
    return {
      series: {}
    }
  },
  computed: {
    ...mapGetters([
      'series/series'
    ])
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions([
      'article/GetPosts'
    ]),
    init () {
      this.getSeries()
    },
    getSeries () {
      const { seriesId } = this
      if (seriesId) {
        const series = this['series/series'].find(item => item.id === seriesId)
        const params = { series: seriesId, page: 1, per_page: 100, orderby: 'date', order: 'asc' }
        this['article/GetPosts']({ params }).then(list => {
          Object.assign(this, {
            series: {
              seriesName: series.name,
              seriesArticles: list
            }
          })
        }).catch(err => {
          throw new Error('获取文章系列数据出错', err)
        })
      }
    }
  }
}
</script>