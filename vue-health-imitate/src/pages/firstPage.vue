<template>
  <div id="first-page">
  </div>
</template>

<script>
export default {
  created () {
    this.$store.dispatch('validation')
  }
}
</script>

<style lang="scss">
@import '../assets/scss/main.scss';
#home{
}
</style>
