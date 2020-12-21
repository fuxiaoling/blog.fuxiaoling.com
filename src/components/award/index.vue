<style lang="stylus" scoped>
  .payment-wrapper
    display flex
    p
      text-align center
  .thanks
    text-align center
</style>
<template>
  <a-popover :placement="placement">
    <template slot="content">
      <div class="payment-wrapper">
        <div class="payment-content">
          <img src="./../../assets/images/Alipay-Payment-Code.png">
          <p>支付宝</p>
        </div>
        <div class="payment-content" style="margin-left: 30px">
          <img src="./../../assets/images/WeChat-Payment-Code.png">
          <p>微信</p>
        </div>
      </div>
      <div class="thanks">— 分享不易，多谢打赏 —</div>
    </template>
    <slot></slot>
  </a-popover>
</template>
<script>
export default {
  props: {
    placement: {
      type: String,
      default: 'bottom'
    }
  }
}
</script>