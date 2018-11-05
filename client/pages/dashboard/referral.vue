<style lang="scss" rel="stylesheet/scss" scoped>
.extension {
  background-color: #fff;
}
</style>

<template>
    <div class="extension">
        <!-- Rank Level -->
        <extension-rank></extension-rank>

        <extension-bonus></extension-bonus>

        <!-- Extension Rules-->
        <extension-rules></extension-rules>
    </div>
</template>

<script>
import extensionRank from '../../components/dashboard/extension/extension-rank';
import extensionBonus from '../../components/dashboard/extension/extension-bonus';
import extensionRules from '../../components/dashboard/extension/extension-rules';

export default {
  head() {
    return {
      title: this.$t('navbar.affiliate'),
    };
  },

  components: { extensionRank, extensionRules, extensionBonus },
  data() {
    return {
      title: 'extension',
    };
  },
  mounted() {},
  computed: {},
  methods: {},
};
</script>
