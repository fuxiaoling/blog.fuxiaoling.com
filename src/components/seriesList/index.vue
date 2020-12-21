<style lang="stylus" scoped>
  @import './../../assets/stylus/variable.stylus'
  .series-list
    padding 30px 0 20px 0
  .series-item
    position relative
    margin-bottom 10px
    .series-image
      position relative
      width 286px
      height 150px
      border-radius 30px 30px 0 0
      overflow hidden
      img
        width 286px
        height 150px
        transition all 0.3s
        -ms-transition all 0.5s
        &.pa
          position absolute
          top 0
          left 0
          opacity 0
    &:hover
      img.pa
        opacity 1
        transform scale(1.1)
        -ms-transform scale(1.1)
    .series-title
      line-height 20px
      padding 15px 0
      border-radius 30px
      text-align center
      border-bottom 2px solid #ededec
      font-weight 700
    .series-count
      position absolute
      top 124px
      right 10px
      width 75px
      height 26px
      text-align center
      line-height 26px
      color #999
      background-color #ededed
      border-radius 30px 0 0 0
  .list-type
    background #ffffff
    margin 15px 0
    .series-image
      float left
      border-radius 5px
      margin-right 10px
    .series-text
      float right
      width 266px
      padding-right 12px
      .series-title
        padding 0 0 10px 0
        border-radius 0
        border-bottom none
        text-align left
        font-weight 700
      .series-count
        left 219px
        border-radius 5px 0 5px 0
      .series-desc
        color $grayColor
</style>
<template>
  <a-list class="series-list" :grid="{ gutter: 16, column }" :data-source="seriesList">
    <a-list-item slot="renderItem" slot-scope="item" class="series-item" :class="{'list-type': column == 2}">
      <a :href="`${item.link}?seriesId=${item.id}`">
        <div class="series-image">
          <template v-if="Object.keys(images).includes(item.tag)">
            <img :alt="item.name" :src="images[`${item.tag}Gray`]" />
            <img class="pa" :alt="item.name" :src="images[item.tag]" />
          </template>
          <img v-else :alt="item.name" :src="images.default" />
        </div>
        <div class="series-text">
          <div class="series-title">{{item.name}}</div>
          <div class="series-count">{{item.count}} 篇</div>
          <div v-if="column == 2" class="series-desc">{{item.description}}</div>
        </div>
      </a>
    </a-list-item>
  </a-list>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    num: {
      type: Number,
      default: 8
    },
    column: {
      type: Number,
      default: 4
    }
  },
  data() {
    return {
      seriesList: []
    }
  },
  computed: {
    ...mapGetters([
      'series/series',
      'series/images'
    ]),
    images () {
      const result = {}
      for (let [key, value] of Object.entries(this['series/images'])) {
        Reflect.set(result, key, require('./../../' + value + '.png'))
        if (key !== 'default') Reflect.set(result, `${key}Gray`, require('./../../' + value + '-gray.png'))
      }
      return result
    }
  },
  created() {
    this.init()
  },
  methods: {
    init () {
      this.getSeriesList()
    },
    getSeriesList () {
      const list = this['series/series']
      this.seriesList = list.length < this.num && this.num <= 8 ? this.getMockData(list, this.num - list.length) : list
      this.$emit('seriesCount', this.seriesList.length)
    },
    getMockData (result = [], num) {
      for (let i = 0; i < num;  i++) result.push({ id: 0, name: '......', count: 0, link: '#/home', tag: 'normal' })
      return result
    }
  }
}
</script>