<style lang="stylus" scoped>
  @import './../../../../assets/stylus/variable.stylus'
  .focus
    width 380px
    height 300px
    background linear-gradient(0deg, #dedede, #eeeeee)
    overflow hidden
    position relative
    .waves
      position absolute
      bottom 0
      width 100%
      height 40px
      margin-bottom -7px
      min-height 40px
      max-height 50px
      z-index  5
      use
        animation move-forever 25s cubic-bezier(.55,.5,.45,.5) infinite
      use:nth-child(1)
        animation-delay -2s
        animation-duration 7s
      use:nth-child(2)
        animation-delay -3s
        animation-duration 10s
      use:nth-child(3)
        animation-delay -4s
        animation-duration 13s
      use:nth-child(4)
        animation-delay -5s
        animation-duration 20s
      @keyframes move-forever {
        0% { transform: translate3d(-90px,0,0); }
        100% { transform: translate3d(85px,0,0); }
      }
    .focus-content
      padding 15px
      color $color
      .today
        height 50px
        overflow hidden
        .today-time
          position relative
          width 60px
          height 50px
          margin-right 20px
          color #ff6600
          .today-time-date
            position absolute
            left 0
            top -18px
            font-size 45px
            font-weight 800
            &.less-10
              left 15px
          .today-time-month-year
            position absolute
            left 2px
            top 36px
            font-size 12px
        .today-notice
          width 270px
          height 50px
          line-height 25px
          .notice
            .notice-sound
              color #999
              vertical-align middle
              margin-right 5px
              font-size 18px
            a
              color #999
              font-size 12px
            a:hover
              color $hoverColor
              text-decoration underline
          .total
            color $grayColor
            .ant-divider
              background #b5b5b5
            a
              color $hoverColor
              font-size 24px
              font-weight 700
      .author
        margin-top 20px
        .avatar
          width 80px
          height 80px
          margin 0 auto
          img
            width 80px
            height 80px
            border-radius 50%
        .name
          margin-top 5px
          text-align center
          font-size 20px
          font-weight 700
        .popover-list
          text-align center
          .icon-circle
            width 45px
            height 45px
            line-height 45px
            text-align center
            background-color #f5f5f5
            border-radius 50%
            display inline-block
            margin 20px 5px
            &:hover .anticon
              color $hoverColor
            .anticon
              cursor pointer
              color #d5d5d5
              font-size 30px
              vertical-align middle
              margin 0 0 0 2px
  .wechart-friend
    text-align center
  .payment-wrapper
    display flex
    p
      text-align center
  .thanks
    text-align center
</style>
<template>
  <div class="focus br6">
      <div class="focus-content">
        <div class="today clearfix">
          <div class="today-time fl">
            <div class="today-time-date">{{ `${10 - date > 0 ? '0' + date : date}` }}</div>
            <div class="today-time-month-year">{{ `${10 - month > 0 ? '0' + month : month}` }}月&nbsp;&nbsp;&nbsp;{{year}}</div>
          </div>
          <div  class="today-notice fr">
            <div class="notice">
              <a-icon class="notice-sound" type="sound" />
              <a-icon v-if="noticeEnable == null" type="loading" />
              <a v-else :href="notice.link" target="_block">{{notice.title}}</a>
            </div>
            <div class="total">
              原创：<span><a href="#/category">{{originalCount}}</a></span> 篇
              <a-divider type="vertical" />
              转载：<span><a :href="retweetCategory.link">{{retweetCount}}</a></span> 篇
            </div>
          </div>
        </div>
        <div class="author">
          <div class="avatar"><img src="./../../../../assets/images/avatar.png" /></div>
          <div class="name"> F.凌 </div>
          <div class="popover-list">
            <!--微信加好友 | 开始-->
            <a-popover placement="bottom">
              <template slot="content">
                <div class="wechart-friend">
                  <img style="" src="./../../../../assets/images/Wechat-Friend.png" />
                  <p>微信加好友，请注明“F.凌”</p>
                </div>
              </template>
              <div class="icon-circle"><a-icon type="wechat" /></div>
            </a-popover>
            <!--微信加好友 | 结束-->
            <!--QQ联系 | 开始-->
            <a :href="`http://wpa.qq.com/msgrd?v=3&amp;uin=${siteSetting.email.split('@qq.com')[0]}&amp;site=qq&amp;menu=yes`" target="blank">
              <div class="icon-circle"><a-icon type="qq" /></div>
            </a>
            <!--QQ联系 | 结束-->
            <!--邮件 | 开始-->
            <a :href="`http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&amp;email=${siteSetting.email}`" target="_blank">
              <div class="icon-circle"><a-icon type="mail" theme="filled" :style="{ fontSize: '26px'}" /></div>
            </a>
            <!--邮件 | 结束-->
            <!--打赏 | 开始-->
            <a-popover placement="bottom">
              <template slot="content">
                <div class="payment-wrapper">
                  <div class="payment-content">
                    <img src="./../../../../assets/images/Alipay-Payment-Code.png">
                    <p>支付宝</p>
                  </div>
                  <div class="payment-content" style="margin-left: 30px">
                    <img src="./../../../../assets/images/WeChat-Payment-Code.png">
                    <p>微信</p>
                  </div>
                </div>
                <div class="thanks">— 分享不易，多谢打赏 —</div>
              </template>
              <div class="icon-circle"><a-icon type="pay-circle" theme="filled" :style="{ fontSize: '26px'}"/></div>
            </a-popover>
            <!--打赏 | 结束-->
          </div>
        </div>
      </div>
      <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
        <defs>
          <path id="wave-prototype" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
        </defs>
        <g>
          <use xlink:href="#wave-prototype" x="48" y="0" fill="rgba(245,245,245,0.7)" />
          <use xlink:href="#wave-prototype" x="48" y="3" fill="rgba(245,245,245,0.5)" />
          <use xlink:href="#wave-prototype" x="48" y="5" fill="rgba(245,245,245,0.3)" />
          <use xlink:href="#wave-prototype" x="48" y="7" fill="rgba(245,245,245,1)" />
        </g>
      </svg>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      date: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      noticeEnable: null,
      notice: {
        title: '暂时没有通知',
        link: '#'
      }
    }
  },
  computed: {
    ...mapGetters([
      'siteSetting',
      'home/lastNotice',
      'originalCount',
      'retweetCount',
      'retweetCategory'
    ])
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions([
      'home/GetLastNotice',
    ]),
    init () {
      this.getLastNotice()
    },
    getLastNotice () {
      const params = {
        categories: 1,
        page: 1,
        per_page: 1
      }
      this['home/GetLastNotice']({ params }).then(response => {
        this.noticeEnable = response
        this.notice = this['home/lastNotice']
      })
    }
  }
}
</script>