<template>
  <div id="app">
      <div class="router-view">
        <router-view v-if="visible" />
        <a-alert v-else-if="visible === null" message="系统维护中，请稍后访问。" banner />
      </div>
    <loading />
    <sidebar />
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: "App",
  data() {
    return {
      spinning: true,
      visible: false,
      transitionName: ''
    }
  },
  computed: {
    ...mapGetters([
      'siteSetting'
    ])
  },
  created() {
    this.$disableDebugging(false, this)
    this.init()
  },
  methods: {
    ...mapActions([
      'GetToken',
      'GetSiteSetting',
      'GetCategories',
      'series/GetSeries'
    ]),
    async init () {
      await this.GetToken()
      const isTrue = await this.getSiteSetting()
      if (isTrue) {
        Promise.all([this.getCategories(), this.getSeries()]).then(() => {
          this.visible = true
          this.initApp()
        })
      } else {
        this.visible = null
      }
    },
    getSiteSetting () {
      return new Promise(resolve => {
        this.GetSiteSetting().then(result => {
          resolve(result)
        })
      })
    },
    getCategories () {
      return new Promise((resolve, reject) => {
        this.GetCategories({ params: { per_page: 60 } }).then(result => {
          if (Array.isArray(result)) {
            resolve()
          } else {
            reject()
          }
        }).catch(() => {
          reject()
        })
      })
    },
    getSeries () {
      return new Promise((resolve, reject) => {
        this['series/GetSeries']().then(result => {
          if (Array.isArray(result)) {
            resolve()
          } else {
            reject()
          }
        }).catch(() => {
          reject()
        })
      })
    },
    initApp () {
      document.title = `${this.siteSetting.title}`
    }
  }
}
</script>