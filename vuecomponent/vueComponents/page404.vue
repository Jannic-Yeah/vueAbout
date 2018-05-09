<template lang="pug">
section.b__page-404
  .__title 404
  .__desc 服务器加载失败，请稍后重试
</template>

<script>
export default {
  name: 'page404'
}
</script>

<style lang="stylus">
@import '../stylus/base'

.page-404
  padding 20spx
  text-align center
  &__title
    padding-top 100spx
    fontDpr(60)
  &__desc
    padding-top 30spx
    fontDpr(18)
</style>