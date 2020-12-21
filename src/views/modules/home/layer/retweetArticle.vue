<template>
  <div class="w50p">
    <div class="container-header clearfix">
      <div class="container-title fl"><a-icon type="bulb" :style="{ 'font-size': '20px' }" />&nbsp;&nbsp;&nbsp;&nbsp;最新转载</div>
      <a href="#/category/retweet/" class="container-more fr">MORE</a>
    </div>
    <post-list :params="params" />
  </div>
</template>

<script>
import postList from '@/components/postList'
export default {
  components: {
    postList
  },
  data() {
    return {
      params: {
        page: 1,
        per_page: 10,
        categories: Number(process.env.VUE_APP_RETWEET_GATEGORY_ID), // 转载分类
        orderby: 'date', // 排序字段
      }
    }
  }
}
</script>