<template>
  <div class="container pt15 pb15">
    <div class="container-header clearfix">
      <div class="container-title fl"><a-icon type="container" :style="{ 'font-size': '17px' }" />&nbsp;&nbsp;&nbsp;&nbsp;系列文章</div>
      <a href="#/series" class="container-more fr">MORE</a>
    </div>
    <series-list />
  </div>
</template>
<script>
import seriesList from '@/components/seriesList'
export default {
  components: {
    seriesList
  }
}
</script>