
<style lang="stylus" scoped>
  @import './../../assets/stylus/variable.stylus'
  .ant-layout-footer
    margin-top 60px
    background-color $color
    padding 20px 0
    .container
      color #d3d3d3
      height 40px
      line-height 20px
      span
        padding 0 5px
      span:first-child
        padding-left 0
      a
        color #d3d3d3
        $:hover
          color $hoverColor
</style>
<template>
  <a-layout-footer>
    <div class="container clearfix">
      <div class="fl">
        <div>
          <span>© {{new Date().getFullYear()}} <a href="#/home">{{siteSetting.title}}</a></span>
          /
          <span><a :href="`http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&amp;email=${siteSetting.email}`" target="blank">{{siteSetting.email}}</a></span>
          /
          <a v-for="nav in footerNav" :key="nav.ID" :href="nav.url" :target="nav.target">
            {{nav.title}}
          </a>
        </div>
        <div>
            <span>本站原创文章遵循 CC 4.0 BY-SA 版权协议，转载请署名以及注明原文链接及出处，如引用代码，请遵循代码仓库的开源版权协议。</span>
        </div>
      </div>
      <div class="fr" style="text-align:right"> Powered by FuXiaoLing <br> 本站基于 VUE + WP REST API + JWT + Ant Design Vue 开发 </div>
    </div>
  </a-layout-footer>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'siteSetting',
      'footerNav'
    ])
  },
  mounted() {
    this.init()
  },
  methods: {
    ...mapActions([
      'GetMenus'
    ]),
    init () {
      this.initData()
    },
    async initData () {
      this.GetMenus({ pathParams: { menuLocation: 'footer_nav' } })
    }
  }
}
</script>
