<style lang="scss" rel="stylesheet/scss" scoped>
</style>

<template>
    <nuxt-child/>
</template>

<script>
export default {
  middleware: 'auth',
  name: 'dashboard',
};
</script>
