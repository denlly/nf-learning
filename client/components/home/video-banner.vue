<style lang="scss" rel="stylesheet/scss" scoped>
/*[v-cloak]{ display:none}*/
.video_banner {
  position: relative;
  min-width: 1176px;
  height: 800px;
  background-color: #000;
  /*background:url("../../assets/images/index_bg.jpg") no-repeat center ;*/
  background-size: cover;
  overflow: hidden;

  &_video {
    position: absolute;
    width: 100%;
    z-index: 1;
  }
  &_text {
    margin: auto;
    width: 895px;
    height: 310px;
    position: absolute;
    z-index: 2;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    text-align: center;
    color: #fff;

    .topTitle {
      margin-bottom: 9px;
      font-size: 18px;
    }
    .centerTitiel {
      margin-bottom: 32px;
      font-size: 54px;
    }
    hr {
      display: block;
      margin: 30px auto 30px auto;
      width: 205px;
      background-color: #fff;
    }
    .subTitle {
      font-family: 'CircularAirLight', 'PingFang SC', 'Microsoft YaHei' !important;
      margin-bottom: 75px;
      padding: 0 130px;
      font-size: 16px;
      opacity: 0.7;
    }
    .toMining {
      box-sizing: border-box;
      display: inline-block;
      padding: 15px 39px;
      min-width: 200px;
      font-size: 16px;
      color: #fff;
      background-color: #00c6bc;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  }
  &_address {
    position: absolute;
    z-index: 2;
    right: 80px;
    bottom: 78px;
    font-size: 16px;
    font-weight: lighter;
    color: #fff;

    img {
      display: inline-block;
      margin-right: 6px;
    }

    p {
      font-size: 14px;
    }
  }
}

@media only screen and (max-width: 768px) {
  .video_banner {
    min-width: 100%;
    background: url('../../assets/images/home/videofirstpic.jpg') no-repeat center;
    background-size: cover;

    &_video {
      display: none;
    }
    &_text {
      width: 100%;
      height: 500px;

      .subTitle {
        padding: 0;
      }
    }

    &_address {
      display: none;
    }
  }
}
</style>

<template>
    <section class="video_banner">
        <div class="video_banner_text">
            <p class="topTitle" v-show="numberOfPeople">{{numberOfPeople}} {{$t('hdr.t1')}}</p>
            <P class="centerTitiel finalFWBBold" v-html="$t('hdr.h1')"></P>
            <p class="subTitle finalFWNormal" v-html="$t('hdr.t2')"></p>

            <span v-if="isShow" class="toMining" @click="linkto('/product')">{{$t('hdr.btn')}}</span>
        </div>
    </section>
</template>

<script>
import { ERR_OK } from '../../assets/js/config.js';

export default {
  components: {},

  data() {
    return {
      title: 'video-banner',
      numberOfPeople: null,
      hasShow: true,
      autoplay: 'autoplay',
      isShow: false, // 控制按钮是否显示
    };
  },
  beforeMount() {
    if (localStorage.miningUserTmp !== undefined || localStorage.miningUserTmp !== null) {
      this.numberOfPeople = localStorage.miningUserTmp;
    }
    this.getMiningUserCount();
  },
  mounted() {
    this.init();
  },
  computed: {},
  watch: {},
  methods: {
    // 统一出口
    init() {
      // this.getMiningUserCount()
      this.toHideAddressAndButton();
    },

    // 隐藏右下角地址及Button
    toHideAddressAndButton() {
      // 判断是否在在Product页面下，如果在，则隐藏右下角的 Address 信息
      if (this.$route.path.indexOf('product') !== -1) {
        this.hasShow = false;
        this.isShow = false;
      } else {
        this.hasShow = true;
        this.isShow = true;
      }
    },

    //  跳转到指定地址
    linkto(str) {
      this.$router.push({ path: str });
    },

    // 获取挖矿人数
    async getMiningUserCount() {
      let resultMiningUserCount = await this.$axios('miningnumber');
      // console.log("!resultMiningUserCount",resultMiningUserCount)
      if (resultMiningUserCount.code === ERR_OK) {
        if (localStorage.miningUserTmp !== undefined) {
          this.numberOfPeople = localStorage.miningUserTmp;
        }

        // console.log("~",resultMiningUserCount.data)
        let miningUserTmp = resultMiningUserCount.data.miningCount;
        localStorage.setItem('miningUserTmp', miningUserTmp);
        // console.log("localStorage",localStorage.miningUserTmp)
        this.numberOfPeople = localStorage.miningUserTmp;
      } else {
        // console.log("getMiningUserCount has something wrong")
      }
    },
  },
};
</script>
