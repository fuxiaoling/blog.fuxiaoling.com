
<style lang="stylus" scoped>
  .sidebar
    box-sizing border-box
    margin 0
    padding 0
    color rgba(0,0,0,.65)
    font-size 12px
    font-variant tabular-nums
    line-height 1.5
    list-style none
    font-feature-settings "tnum"
    position fixed
    right 100px
    bottom 240px
    width 50px
    z-index 10
    .sidebar-item
      position relative
      display flex
      -webkit-box-align center
      -webkit-align-items center
      -ms-flex-align center
      align-items center
      -webkit-box-pack center
      -webkit-justify-content center
      -ms-flex-pack center
      justify-content center
      -webkit-box-orient vertical
      -webkit-box-direction normal
      -webkit-flex-direction column
      -ms-flex-direction column
      flex-direction column
      cursor pointer
      margin 10px 0
      width 50px
      height 54px
      font-size 12px
      -webkit-box-sizing border-box
      box-sizing border-box
      text-align center
      background-color #fff
      border-radius 4px
      border 1px solid #eee
      &:hover
        background-color #52b1ff
        color #fff
  .qrcode-wrapper
    #qrcode
      margin 3px
    p
      text-align center
  .payment-wrapper
    display flex
    p
      text-align center
  .thanks
    text-align center
  .goto-top
    .ant-back-top
      width 50px
      height 50px
      bottom 200px
</style>
<template>
  <div class="sidebar clearfix">
    <!--扫码分享 | 开始-->
    <a-popover placement="left" @visibleChange="handleHoverCreateQrcode">
      <template slot="content">
        <div class="qrcode-wrapper">
          <div id="qrcode"></div>
          <p>微信扫码分享</p>
        </div>
      </template>
      <div class="sidebar-item">
        <a-icon type="share-alt" :style="{ fontSize: '22px' }" />
        <div>分享</div>
      </div>
    </a-popover>
    <!--扫码分享 | 结束-->
    <!--打赏 | 开始-->
    <award placement="left">
      <div class="sidebar-item">
        <a-icon type="pay-circle" :style="{ fontSize: '22px' }" />
        <span>打赏</span>
      </div>
    </award>
    <!--打赏 | 结束-->
    <!--回到顶部 | 开始-->
    <div class="goto-top">
      <a-back-top :visibilityHeight="0">
        <div class="ant-back-top-inner sidebar-item">
          <a-icon type="up" :style="{ fontSize: '22px' }" />
          <span>顶部</span>
        </div>
      </a-back-top>
    </div>
    <!--回到顶部 | 结束-->
  </div>
</template>
<script>
import QRCode from 'qrcodejs2'
import award from '@/components/award'
export default {
  components: {
    award
  },
  data() {
    return {
      qrcode: null
    }
  },
  methods: {
    handleHoverCreateQrcode () {
      if (!this.qrcode) {
        setTimeout(() => {
          this.qrcode = new QRCode(document.getElementById('qrcode'), {
            text: window.location.href,
            width: 130,
            height: 130,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
          })
        }, 0)
      }
    }
  }
}
</script>