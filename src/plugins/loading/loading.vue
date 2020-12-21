<template>
  <div></div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      loading: () => {}
    }
  },
  computed: {
    ...mapGetters([
      'loading/enable'
    ]),
    enable () {
      return this['loading/enable']
    }
  },
  watch: {
    enable (nVal) {
      this[nVal ? 'show' : 'hidden']()
    }
  },
  methods: {
    show () {
      this.loading = this.$message.loading('Loading...', 0)
    },
    hidden () {
      this.loading()
    }
  }
};
</script>