<template>
  <breadcrumb :addRoutes="routes">
    <template slot="total-slot">共 {{count}} 篇</template>
  </breadcrumb>
</template>
<script>
import breadcrumb from '@/components/breadcrumb'
import { mapGetters } from 'vuex'
export default {
  components: {
    breadcrumb
  },
  data() {
    return {
      count: 0,
      routes: [],
      baseRoutes: [{
        id: 1,
        link: '#/category/',
        name: '博客分类'
      }]
    }
  },
  computed: {
    ...mapGetters([
      'siteSetting',
      'categories',
      'counts'
    ])
  },
  watch: {
    '$route' () {
      this.init()
    }
  },
  created() {
    this.init()
  },
  methods: {
    init () {
      this.routes = JSON.parse(JSON.stringify(this.baseRoutes)).concat(this.genRoutes())
      const current = this.routes[this.routes.length - 1]
      this.count = current.count
      document.title = `${current.name} | ${this.siteSetting.title}`
      this.$emit('init', this.routes)
    },
    genRoutes () {
      const result = []
      const categories = JSON.parse(JSON.stringify(this.categories))
      const { params: { pathMatch } } = this.$route
      if (pathMatch) {
        const pathSlices = pathMatch.split('/')
        for (let path of pathSlices) {
          if (path) {
            const category = categories.find(item => item.slug === path)
            if (category) {
              const children = categories.filter(item => item.parent === category.id)
              children.forEach(element => { if (element.count === 0) element.count = this.counts[`${element.id}`] || 0 })
              result.push({ ...category, children })
            }
          }
        }
      }
      return result
    }
  }
}
</script>