<style lang="stylus" scoped>
.breadcrumb
  padding 15px 30px
  border-radius 5px
  margin 25px 0 15px 0
.ant-dropdown-menu-item:hover
  background-color #ffffff
.ant-dropdown-menu-item
  padding 4px 12px
</style>
<template>
  <div class="breadcrumb ffffff clearfix">
    <div class="fl">
      <a-breadcrumb>
        <template v-if="routes.length == 2">
          <a-breadcrumb-item v-for="item in routes" :key="item.id">
            <a :href="item.link" v-html="item.name"></a>
          </a-breadcrumb-item>
        </template>
        <template v-else>
          <a-breadcrumb-item v-for="(item, index) in routes" :key="item.id">
            <a v-if="index === 0" :href="item.link" v-html="item.name">{{item.name}}</a>
            <template v-else>
              {{item.name}}
            </template>
            <a-menu v-if="item.children && item.children.length > 0 && index === routes.length - 2" slot="overlay" >
              <a-menu-item v-for="child in item.children" :key="child.id"><a :href="child.link">{{child.name}} ({{child.count}})</a></a-menu-item>
            </a-menu>
          </a-breadcrumb-item>
        </template>
      </a-breadcrumb>
      <slot name="page-header"></slot>
    </div>
    <div class="fr"><slot name="total-slot"></slot></div>
  </div>
</template>
<script>
export default {
  props: {
    addRoutes: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data() {
    return {
      routes: [],
      baseRoutes: [
        {
          id: 0,
          link: process.env.VUE_APP_DOMAIN,
          name: '首页'
        }
      ]
    }
  },
  watch: {
    '$route' () {
      this.init()
    },
    'addRoutes' () {
      this.init()
    }
  },
  created() {
    this.init()
  },
  methods: {
    init () {
      this.routes = JSON.parse(JSON.stringify(this.baseRoutes)).concat(this.addRoutes)
    }
  }
}
</script>