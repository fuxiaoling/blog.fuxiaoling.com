<style lang="stylus" scoped>
  .banner
    width 800px
    height 300px
    background #fff
    overflow hidden
  .ant-carousel >>> .slick-slide
    width 800px
    height 300px
    text-align center
  .ant-carousel >>> .slick-dots
    height 8px!important
  .ant-carousel >>> .slick-dots-bottom
    bottom 16px!important
  .ant-carousel >>> button
    width 24px!important
    height 8px!important
    background #ffffff!important
</style>
<template>
  <a-carousel autoplay dot-position="bottom" dots-class="dot-class" class="banner br6">
    <div v-for="image in banenr" :key="image.id"><a :href="image.href"><img :src="image.src"></a></div>
    <div><img src="./../../../../assets/images/banner.png"></div>
  </a-carousel>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      banenr: []
    }
  },
  computed: {
    ...mapGetters([
      'medias'
    ])
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions([
      'GetMediaIdsByFolder'
    ]),
    init () {
      this.initData()
    },
    async initData () {
      const folder_id = process.env.VUE_APP_MEDIA_BANNER_FOLDERID
      this.GetMediaIdsByFolder({ params: { folder_id } }).then(() => {
        this.banenr = this.medias[`folder_${folder_id}`]
      })
    }
  }
}
</script>
