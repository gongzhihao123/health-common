<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    // 识别设备
    device () {
      let ua = navigator.userAgent
      let isWindowsPhone = /(?:Windows Phone)/.test(ua)
      let isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone
      let isAndroid = /(?:Android)/.test(ua)
      let isFireFox = /(?:Firefox)/.test(ua)
      // let isChrome = /(?:Chrome|CriOS)/.test(ua)
      let isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua))
      let isPhone = /(?:iPhone)/.test(ua) && !isTablet
      let isPc = !isPhone && !isAndroid && !isSymbian
      return {
        isTablet: isTablet,
        isPhone: isPhone,
        isAndroid: isAndroid,
        isPc: isPc
      }
    }
  },
  watch: {
    '$route' (to) {
      if (to.path !== '/totalEntry' && to.path !== '/healthCheck/checkManage') {
        sessionStorage.HEALTH_CHECKMANAGE_SCHOOL = ''
        sessionStorage.HEALTH_CHECKMANAGE_GRADE = ''
        sessionStorage.HEALTH_CHECKMANAGE_CLASS = ''
      }
    }
  },
  async created () {
    let accessType = ''
    this.device().isTablet === true ? accessType = 'app' : accessType = 'web'
    const href = window.location.href
    let url = href.slice(href.indexOf('#') + 1)
    this.$router.push('/firstPage')
    this.$store.dispatch('init', { url, accessType: accessType })
  }
}
</script>

<style lang="scss">
@import '../assets/scss/variable.scss';
@import '../assets/scss/mixin.scss';
@import '../assets/scss/index.scss';

#app {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  // overflow-y: hidden;
}
</style>
