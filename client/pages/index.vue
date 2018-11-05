<style lang="scss" rel="stylesheet/scss" scoped>
</style>

<template>
    <div>
        <video-banner></video-banner>
        <intruduce></intruduce>
        <product-price></product-price>
        <self-cloud-contrast></self-cloud-contrast>
    </div>
</template>

<script>
import videoBanner from '../components/home/video-banner';
import intruduce from '../components/home/intruduce';
import productPrice from '../components/home/product-price';
import selfCloudContrast from '../components/home/self-cloud-contrast';

export default {
  layout: 'default',
  // middleware:"auth",
  head() {
    return {
      title: 'Hash.Pro',
    };
  },
  data() {
    return {
      title: '2',
    };
  },
  mounted() {
    this.init();

    // 20180725 新增逻辑
    this.urlParame = { invitationCode: localStorage.getItem('invitationCode') };
    let code = this.urlParame.invitationCode;
    let codeHistory = localStorage.getItem('codeHistory');
    if (!codeHistory && this.urlParame.invitationCode) {
      localStorage.setItem('codeHistory', code);
      this.invitation_clicks(code);
    }
    if (codeHistory && codeHistory.indexOf(code) === -1) {
      codeHistory = codeHistory + ',' + code;
      localStorage.setItem('codeHistory', codeHistory);
      this.invitation_clicks(code);
    }
  },
  methods: {
    // 统一出口
    init() {
      this.getUrlCode();
    },

    // 获取推广码
    getUrlCode() {
      if (location.href.indexOf('?')) {
        // console.log("getUrlCode",this.$route.path,location.href)

        if (location.href.split('?')[1]) {
          let tmp = location.href.split('?')[1];
          if (tmp.length === 6 || tmp.length === 10) {
            localStorage.setItem('invitationCode', tmp);
          }
        }
      }
    },

    // 20180725 新增逻辑 发送埋点
    invitation_clicks(code) {
      if (code.length < 7) {
        return false;
      }
      this.$axios('invitation_clicks', {}, code).then(res => {
        // console.log('!!!invitation_clicks');
      });
    },
  },
  components: {
    videoBanner,
    intruduce,
    productPrice,
    selfCloudContrast,
  },
};
</script>
