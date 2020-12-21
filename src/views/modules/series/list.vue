<style lang="stylus" scoped>
#series-article-list
  .page-header
    background #ffffff
    padding 10px 0 30px 0
    border-radius 5px
    > .fl
      width 286px
      height 150px
      margin-right 15px
      .series-image
        border-radius 5px
        img
          border-radius 5px
    > .fr
      width 839px
      .name
        font-size 20px
        font-weight 700
        margin-bottom 25px
      .count
        padding-left 10px
        color #999
      .line
        margin 10px 0 10px 10px
        width 100%
        height 1px
        background #ededed
      .description
        padding-left 10px
        color #999
  .category-container
    min-height 1000px
    > .fl
      width 800px
    > .fr
      width 380px
</style>
<template>
  <div id="series-article-list" class="container">
    <breadcrumb :addRoutes="[{id: 1, link: `#/series`, name: `系列文章`}]">
      <template v-if="currentSeries" slot="page-header">
        <div class="page-header clearfix">
          <div class="fl">
            <div class="series-image">
              <template v-if="Object.keys(images).includes(currentSeries.tag)">
                <img class="pa" :alt="currentSeries.name" :src="images[currentSeries.tag]" />
              </template>
              <img v-else :alt="currentSeries.name" :src="images.default" />
            </div>
          </div>
          <div class="fr">
            <div class="name">{{currentSeries.name}}</div>
            <div class="count"><a-icon type="file" /> 共 {{currentSeries.count}} 篇</div>
            <div class="line"></div>
            <div class="description">概述：{{currentSeries.description}}</div>
          </div>
        </div>
      </template>
    </breadcrumb>
    <div class="category-container clearfix">
      <div class="fl">
        <post-list styleMode="list" :params="postsQueryParams" @curPagePostsCount="(count) => { this.seriesCount = count }" class="fl" />
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
import postList from '@/components/postList'
import focus from '@/components/focus'
import recommendArticle from '@/components/recommendArticle'
import { mapGetters } from 'vuex'
export default {
  components: {
    breadcrumb,
    postList,
    focus,
    recommendArticle
  },
  data() {
    return {
      seriesCount: 0,
      postsQueryParams: {
        series: this.$route.query.seriesId,
        page: 1,
        per_page: 100,
        orderby: 'date'
      }
    }
  },
  computed: {
    ...mapGetters([
      'siteSetting',
      'series/series',
      'series/images'
    ]),
    images () {
      const result = {}
      for (let [key, value] of Object.entries(this['series/images'])) {
        Reflect.set(result, key, require('./../../../' + value + '.png'))
      }
      return result
    },
    currentSeries () {
      const seriesList = this['series/series']
      const result = seriesList.find(item => item.id === Number(this.$route.query.seriesId)) || null
      if (result) document.title = `${result.name} | ${this.siteSetting.title}`
      return result
    }
  }
}
</script>