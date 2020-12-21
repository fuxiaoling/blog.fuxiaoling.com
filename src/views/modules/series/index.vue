<style lang="stylus" scoped>
.series-list
  padding 15px
</style>
<template>
  <div class="container">
    <breadcrumb :addRoutes="[{id: 1, link: `#/series`, name: `系列文章`}]">
      <template slot="total-slot">共 {{seriesCount}} 个系列</template>
    </breadcrumb>
    <div class="series-list mt15 ffffff">
      <series-list :num="100" :column="2" @seriesCount="(count) => { this.seriesCount = count }" />
    </div>
  </div>
</template>
<script>
import breadcrumb from '@/components/breadcrumb'
import seriesList from '@/components/seriesList'
export default {
  components: {
    seriesList,
    breadcrumb
  },
  data() {
    return {
      seriesCount: 0
    }
  }
}
</script>