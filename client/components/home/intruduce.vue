<style lang="scss" rel="stylesheet/scss" scoped>
.intruduce {
  padding: 112px 0 94px 0;
  width: 100%;
  min-width: 1176px;
  background-color: #fff;
  &-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    width: 1176px;

    &-box {
      width: 253px;
      font-size: 12px;

      &:last-child {
        margin: 0;
      }
      .imgbox {
        margin-bottom: 39px;
        height: 90px;
      }
      .imgbox4 {
        padding-top: 10px;
      }
      .boxTitle {
        margin-bottom: 20px;
        font-size: 24px;
        height: 86px;
        color: #2f2c37;
      }
      hr {
        margin: 20px auto;
        width: 80px;
        background-color: #888888;
      }
      .boxText {
        margin-bottom: 24px;
        width: 238px;
        height: 110px;
        font-size: 14px;
        text-align: left;
        color: #7b7494;
      }
      .button {
        min-height: 60px;
        span {
          display: block;
          height: 100%;
          font-size: 22px;
          font-weight: bold;
          color: #00c6bc;
          text-align: left;
          cursor: pointer;
        }
      }
    }
  }
}

@media only screen and (max-width: 768px) {
  .intruduce {
    min-width: 100%;
    &-container {
      width: 100%;
      flex-direction: column;

      &-box {
        margin-bottom: 100px;
        text-align: center;

        &:last-child {
          margin: 0;
        }
        .boxTitle {
          margin-bottom: 38px;
        }
        .boxText {
          height: auto;
        }
        .button {
          margin-top: 24px;
          span {
            font-weight: bold;
            text-align: center;
            background-color: #fff;
          }
        }
      }
      .boxText {
        margin: 0 auto;
        text-align: center;
      }
    }
  }
}
</style>

<template>
    <section class="intruduce">
        <div class="intruduce-container">

            <div  v-for="(data,key) in redataLists" :key="data.src"  class="intruduce-container-box ">
                <!--<div >-->
                    <p class="imgbox"><img :src="data.src" :class="'imgbox'+(key+1)" alt=""></p>
                    <p class="boxTitle finalFWBBold" v-html="data.boxTittle"></p>
                    <p class="boxText finalFWNormal">{{ data.boxText }}</p>
                    <p class="button">
                        <span @click="goTOLinks(data.linkto,key)">{{ data.button }}</span>
                    </p>
            </div>
        </div>
    </section>
</template>

<script>
import icon1 from '../../assets/images/home/intrduce-icon1.svg';
import icon2 from '../../assets/images/home/intrduce-icon2.svg';
import icon3 from '../../assets/images/home/intrduce-icon3.svg';
import icon4 from '../../assets/images/home/intrduce-icon4.svg';

export default {
  components: {},
  data() {
    return {
      title: 'intruduce',
      dataLists: [
        {
          src: icon1,
          boxTittle: this.$t('home.2.h1'),
          boxText: this.$t('home.2.t1'),
          button: this.$t('home.2.b1'),
          linkto: '/data-center',
        },
        {
          src: icon2,
          boxTittle: this.$t('home.2.h2'),
          boxText: this.$t('home.2.t2'),
          button: this.$t('home.2.b2'),
          linkto: '/dashboard/dashboard',
        },
        {
          src: icon3,
          boxTittle: this.$t('home.2.h3'),
          boxText: this.$t('home.2.t3'),
          button: this.$t('home.2.b3'),
          linkto: '/product',
        },
        {
          src: icon4,
          boxTittle: this.$t('home.2.h4'),
          boxText: this.$t('home.2.t4'),
          button: this.$t('home.2.b4'),
          linkto: '/dashboard/dashboard',
        },
      ],
    };
  },
  mounted() {},
  computed: {
    redataLists() {
      let a = [
        {
          src: icon1,
          boxTittle: this.$t('home.2.h1'),
          boxText: this.$t('home.2.t1'),
          button: this.$t('home.2.b1'),
          linkto: '/data-center',
        },
        {
          src: icon2,
          boxTittle: this.$t('home.2.h2'),
          boxText: this.$t('home.2.t2'),
          button: this.$t('home.2.b2'),
          linkto: '/dashboard/dashboard',
        },
        {
          src: icon3,
          boxTittle: this.$t('home.2.h3'),
          boxText: this.$t('home.2.t3'),
          button: this.$t('home.2.b3'),
          linkto: '/product',
        },
        {
          src: icon4,
          boxTittle: this.$t('home.2.h4'),
          boxText: this.$t('home.2.t4'),
          button: this.$t('home.2.b4'),
          linkto: '/dashboard/dashboard',
        },
      ];
      return a;
    },
  },
  methods: {
    // 跳转链接
    goTOLinks(str, key) {
      // this.$router.push({path:str+"?#navtop"})
      location.href = str;
    },
  },
};
</script>
