<template>
  <div class="w50p">
    <div class="container-header clearfix">
      <div class="container-title fl"><a-icon type="clock-circle" />&nbsp;&nbsp;&nbsp;&nbsp;最新原创</div>
      <a href="#/category" class="container-more fr">MORE</a>
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
        categories_exclude: Number(process.env.VUE_APP_EXCLUDE_CATEGORIES_ID), // 排除的分类
        orderby: 'date', // 排序字段
      }
    }
  }
}
</script>