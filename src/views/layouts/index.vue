<template>
  <div>
    <my-header />
    <main class="clearfix">
      <transition>
        <router-view v-if="Object.keys(categories).length > 0" />
      </transition>
    </main>
    <my-footer />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import myHeader from './header'
import myFooter from './footer'
export default {
  components: {
    myHeader,
    myFooter
  },
  data() {
    return {
      transitionName: ''
    }
  },
  computed: {
    ...mapGetters([
      'siteSetting',
      'categories'
    ])
  },
  watch: {
    $route(to) {
      document.title = `${to.meta.title} | ${this.siteSetting.title}`
    }
  }
}
</script>
