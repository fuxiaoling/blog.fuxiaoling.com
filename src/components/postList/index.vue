<style lang="stylus" scoped>
@import './../../assets/stylus/variable.stylus'
  .posts-list-loading
    width 100%
    height 185px
    background #fff
    border-radius 5px
    text-align center
    .anticon-loading
      margin-top 70px
  .ant-list-item
    padding 35px 30px 30px 0 
    position relative
    &:hover
      .ant-list-item-meta-title > a
        padding-left 5px
  .ant-list-vertical .ant-list-item-meta-title
    a
      color $color
      font-size 18px
      font-weight 700
      &:hover
        color $hoverColor
  .ant-list-item-meta-description
    color $grayColor
  .ant-list-item-action > li
    cursor auto!important
    a
      color $grayColor
      &:hover
        color $hoverColor
  .category-list
    width 100%
    margin-bottom 15px
    /deep/ .ant-list-item
      background #ffffff
      padding 35px 30px 30px 30px
      margin-bottom 15px
      border-radius 5px
    /deep/ .ant-list-empty-text
      background #ffffff
      border-radius 5px
</style>
<template>
  <div class="w100p">
    <a-spin v-if="listData.length === 0 && loading" class="posts-list-loading">
      <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
    </a-spin>
    <a-list v-else item-layout="vertical" size="large" :data-source="listData" class="post-list" :class="{ 'category-list': styleMode == 'list' }" >
      <a-list-item slot="renderItem" key="item.title" slot-scope="item">
        <a-list-item-meta :description="item.excerpt">
          <a slot="title" :href="item.link">{{ item.title }}</a>
        </a-list-item-meta>
        <template v-for="({ icon, text, link }, index) in item.actions" slot="actions">
          <template v-if="index <= toolsNum - 1">
            <a :key="icon" v-if="link" :href="link">
              <span :key="icon"> <a-icon :type="icon" style="margin-right: 8px" /> {{ text }} </span>
            </a>
            <span v-else :key="icon"> <a-icon :type="icon" style="margin-right: 5px" /> {{ text }} </span>
          </template>
        </template>
      </a-list-item>
    </a-list>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: {
    styleMode: {
      type: String,
      default: 'home'
    },
    params: {
      type: Object,
      required: true,
      default () {
        return {
          page: 1, // 页码
          per_page: 5, // 每页返回结果个数
          categories_exclude: Number(process.env.VUE_APP_EXCLUDE_CATEGORIES_ID), // 排除的分类
          orderby: 'date', // 排序字段
        }
      }
    },
    toolsNum: {
      type: Number,
      default: 5
    }
  },
  watch: {
    params () {
      this.init()
    }
  },
  data() {
    return {
      loading: false,
      listData: [],
      mock: {
        link: '#/article/notice-hisite/',
        title: `给nginx从Let's Encrypt申请个SSL证书`,
        excerpt: '时间久了就忘记了做个记录而已先介绍下Let’s Encrypt是国外一个公共的免费SSL项目，由 Linux 基金会托管，它的来头不小，由Mozilla、思科、Akamai、IdenTrust和EFF... ',
        categories: '14',
        series: '63',
        date: '2020-11-18T15:32:06',
        actions: [
          { icon: 'folder-open-o', text: 'TypeScript', link: '#/category/vue' },
          { icon: 'clock-circle-o', text: '2020-11-18', link: '' },
          { icon: 'eye-o', text: 'N/A', link: '' },
          { icon: 'like-o', text: 'N/A', link: '' },
          { icon: 'message', text: 'N/A', link: '#/category/vue' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'siteSetting'
    ])
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions([
      'article/GetPosts'
    ]),
    init () {
      this.getPosts()
    },
    getPosts () {
      this.loading = true
      this['article/GetPosts']({ params: this.params }).then(list => {
        this.thenGetPosts(list)
      }).catch(err => {
        this.thenGetPosts([])
        throw new Error('获取posts数据出错', err)
      })
    },
    thenGetPosts (list) {
      this.listData = list
      this.loading = false
      this.$emit('curPagePostsCount', this.listData.length)
    },
    getMockData (result, num = 5) {
      for (let i = 0; i < num; i++) result.push(this.mock)
      return result
    }
  }
}
</script>