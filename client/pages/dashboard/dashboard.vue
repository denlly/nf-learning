<style scoped>
.dashboarddashboard {
  padding: 1px 0 102px 0;
  background-color: #fff;
}
@media only screen and (max-width: 768px) {
  .dashboarddashboard {
    padding: 1px 0 0 0;
  }
}
</style>

<template>
    <section class="dashboarddashboard">

        <!-- News Card -->
        <tips-components></tips-components>
        <!-- Coin Card -->
        <!-- Coin Chart -->

    </section>
</template>

<script>
import tipsComponents from '../../components/base/tips-components';
export default {
  components: { tipsComponents, coinCard, coinChart },
  head() {
    return {
      title: this.$t('navbar.dashboard'),
    };
  },

  data() {
    return {
      title: 'dashboard',
    };
  },
  mounted() {},
  computed: {},
  methods: {},
};
</script>
