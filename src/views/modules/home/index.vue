<style lang="stylus" scoped>
  @import './../../../assets/stylus/variable.stylus'
  .topic-article-container,
  .new-article-container
    border-bottom 1px solid #ededed
</style>
<template>
  <div id="home">
    <!--banner和focus | 开始-->
    <div class="banner-focus-container clearfix">
      <div class="container pt25 pb25 clearfix">
        <banner class="fl" />
        <focus class="fr" />
      </div>
    </div>
    <!--banner和focus | 结束-->
    <!--系列文章 | 开始-->
    <div class="topic-article-container ffffff">
      <series-article />
    </div>
    <!--系列文章 | 结束-->
    <!--最新发布 精选推荐 | 开始-->
    <div class="new-article-container ffffff">
      <div class="container pt15 pb15 clearfix">
        <new-article class="fl" />
        <retweet-article  class="fr" />
      </div>
    </div>
    <!--最新发布 精选推荐 | 结束-->
  </div>
</template>
<script>
import banner from './layer/banner'
import focus from '@/components/focus'
import seriesArticle from './layer/seriesArticle'
import newArticle from './layer/newArticle'
import retweetArticle from './layer/retweetArticle'
export default {
  components: {
    banner,
    focus,
    seriesArticle,
    newArticle,
    retweetArticle
  }
}
</script>
