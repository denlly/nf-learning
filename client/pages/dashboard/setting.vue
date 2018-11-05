<style lang="scss" rel="stylesheet/scss" scoped>
.setting {
  padding: 40px 0 80px 0;
  background-color: #f9f9f9;
}
.el-row {
  margin: 0;
}

@media only screen and (max-width: 768px) {
  .setting {
    padding: 24px 0 48px 0;
    background-color: #f7f7fa;
  }
}
</style>

<template>
    <div class="setting">
        <!--<div class="banner-box">-->
            <!--<canvas id="qrccode-canvas"></canvas>-->
        <!--</div>-->
        <!--<div class="btn-wrap">-->
            <!--<textarea type="textarea" v-model="bannerUrl" placeholder="输入链接"></textarea>-->
            <!--<button @click="createQrc">点击生成二维码</button>-->
        <!--</div>-->
        <settingCommon></settingCommon>
        <settingAddress></settingAddress>
    </div>
</template>

<script>
import settingCommon from '../../components/dashboard/setting/setting-common';
import settingAddress from '../../components/dashboard/setting/setting-address';
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
var QRCode = require('qrcode');
var canvas = '';
export default {
  head() {
    return {
      title: this.$t('navbar.settings'),
    };
  },

  components: {
    settingCommon,
    settingAddress,
  },
  data() {
    return {
      title: 'Setting',
      // bannerUrl: '1231231232131'
    };
  },
  mounted() {
    // console.log("Setting Page console",this.currentUser)
    // this.$nextTick(function () {
    //     // DOM操作
    //     canvas = document.getElementById('qrccode-canvas')
    // })
  },
  computed: {
    ...mapState('auth', ['currentUser']),
  },
  methods: {
    // createQrc(){
    //     QRCode.toCanvas(canvas, this.bannerUrl, (error) => {
    //         if (error) {
    //             console.log(error,"error")
    //         } else {
    //             console.log('success')
    //         }
    //     })
    // }
  },
};
</script>
