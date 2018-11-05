<style lang="scss" rel="stylesheet/scss" scoped>
.navbar {
  /*[v-cloak]{ display:none}*/
  z-index: 3;
  top: 0;
  width: 100%;
  min-width: 1176px;
  background-color: transparent;

  .m_outer_nav {
    display: none;
  }
  .outer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 37px 50px;
    line-height: 50px;
    .left {
      /*width:260px;*/
      flex: 1;
      .m_menu {
        display: none;
      }

      a {
        img {
          width: 151px;
          height: 25px;
          vertical-align: sub;
        }
      }
    }
    .center {
      display: flex;
      justify-content: space-between;
      width: 616px;
      flex: 2;
      a {
        display: inline-block;
        /*margin-right:40px;*/
        font-size: 14px;
        color: #fff;
        opacity: 0.4;
      }
      a:last-child {
        margin-right: 0;
      }

      .is-active {
        opacity: 1;
      }
    }
    .right {
      display: flex;
      justify-content: space-between;
      align-items: center;
      /*width:260px;*/
      flex: 1;

      .select {
        display: inline-block;
        width: 100px;
        /* 修改Element UI  样式 */
        .el-input__inner {
          border: none !important;
        }
      }

      .buttons_lang {
        position: relative;
        text-align: right;
        flex: 1;
        /*background: url(../assets/images/pc_triangle.svg) no-repeat 84px 9px ;*/

        .currentLangDIV {
          padding-right: 1px;
          /*background: url(../assets/images/pc_triangle.svg) no-repeat 63px 9px ;*/
          background-image: url(../../assets/images/pc_triangle.svg);
          background-repeat: no-repeat;
          background-position: center right;
        }

        .currentLang {
          /*display: inline;*/
          /*padding-right:13px;*/
          /*padding-right:20px;*/
          cursor: pointer;
          color: #fff;
          /*background: url(../../assets/images/pc_triangle.svg) no-repeat 50px 8px ;*/
        }
        .innertrangle {
          margin-left: 4px;
          width: 10px;
          height: 18px;
          line-height: 18px;
          background: url(../../assets/images/pc_triangle.svg) no-repeat 0px 8px;
        }
      }
      .buttons_droplist {
        // 移动PC公用
        padding: 18px 0;
        position: absolute;
        z-index: 2002;
        right: 0;
        top: 0;
        width: 110px;
        border-radius: 5px;
        background-color: #ffffff;
        box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.2);
        border: solid 1px #c8c8c8;
        li {
          margin-bottom: 16px;
          width: 100%;
          text-align: left;
          padding-left: 12px;
          color: #2e2b35;
          line-height: 14px;
          height: 14px;
          font-size: 14px;
          cursor: pointer;
          &:hover {
            color: #00c6bc;
          }
          &:last-child {
            margin-bottom: 0;
          }
        }
      }

      .notice {
        display: flex;
        align-items: center;
        margin-left: 49px;
        a {
          display: flex;
          align-items: center;
        }
      }

      .login {
        display: inline-block;
        cursor: pointer;
        span {
          margin-left: 49px;
          padding: 16px 35px;
          font-size: 12px;
          color: #fff;
          border: 1px solid #fff;
          border-radius: 4px;
        }
      }
      .shutdown {
        display: flex;
        align-items: center;
        cursor: pointer;
      }

      .logOut {
        cursor: pointer;
        vertical-align: middle;
      }
    }
  }
  .inner {
    width: 100%;
    line-height: 60px;

    .inner-container {
      margin: 0 auto;
      width: 1176px;
      /*height:60px;*/
      a {
        display: inline-block;
        margin-right: 59px;
        font-size: 14px;
        color: #fff;
        opacity: 0.4;

        img {
          vertical-align: sub;
        }
        span {
          /*margin-left:6px;*/
        }
      }
      .is-active {
        display: inline-block;
        opacity: 1;
        font-weight: 500;
        border-bottom: 4px solid #00c6bc;
      }
    }
  }
}
.isAbsolute {
  position: absolute;
}
.isBGColor {
  background-color: #2e2c37;
}
.isBorder {
  border-top: 1px solid rgba(255, 255, 255, 0.3);
}

@media only screen and (max-width: 1519px) {
  .navbar {
    .outer {
      .left {
        flex: 1.3;
      }
      .right {
        flex: 1.6;
      }
    }
  }
}
@media only screen and (max-width: 768px) {
  .navbar {
    min-width: 100%;
    .outer {
      padding: 15px 26.6px 15px 24px;

      .left {
        display: flex;
        justify-content: left;
        align-items: center;

        .m_menu {
          display: block;
          margin-right: 16px;
          position: relative;

          img {
            vertical-align: text-bottom;
          }
        }
        a {
          /*display: block;*/
          display: flex;

          .logo {
            width: 100px;
            vertical-align: sub;
          }
        }
      }
      .center {
        display: none;
      }
      .right {
        width: 151px;
        .shutdown {
          display: none;
        }
        .login {
          display: none;
        }

        .notice {
          margin-left: 14px;
          margin-right: -10px;
        }
      }
    }

    /* M 端外层导航 */
    .m_outer_nav {
      display: block;
      box-sizing: border-box;
      position: fixed;
      z-index: 2011;
      top: 0;
      padding: 36px 24px 32px 24px;
      width: 100%;
      min-height: 390px;
      background-color: #fff;

      /* logo */
      .m_active_logo {
        display: flex;
        justify-content: space-between;
        align-items: center;

        margin-bottom: 34px;

        p {
          display: inline-flex;
          justify-content: left;
          align-items: center;

          .black_block {
            margin-right: 6px;
          }
        }

        .close {
        }
      }
      span {
        width: 150px;
        font-size: 14px;
        font-weight: 500;
        color: #2e2b35;

        display: inline-block;
        padding: 15px 0;
        background-color: #00c6bc;
        color: #fff;
        border-radius: 4px;
        text-align: center;
      }
      a {
        display: block;
        margin-bottom: 24px;
        width: 250px;
        font-size: 14px;
        color: #2e2b35;

        &:last-child {
          margin: 0;
        }
      }
      .is-active {
        color: #00c6bc;
        font-weight: 500;
        &:last-child {
          color: #2e2b35;
        }
      }
    }

    .inner {
      overflow: scroll;

      .inner-container {
        box-sizing: border-box;
        padding-left: 24px;
        width: auto;
        min-width: 700px;
        line-height: 30px;

        a {
          display: inline-block;
          margin-right: 24px;
          padding: 5px 0 12px 0;
          opacity: 0.4;
          border-bottom: 4px solid #2e2c37;
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }

  .isBorder {
    border: none;
  }
}
</style>

<template>
    <!-- 顶部导航：由 hasLogin 变量控制显示 主页导航 或 控制面板导航 -->
    <!-- 主页导航：根据 v-if 判断是否展示含有 主导航 的DOM ，-->
    <!-- 控制面板导航：用户登录后展示该导航 -->
    <div class="navbar" :class="{isAbsolute:isAbsolute === true,isBGColor:isBGColor===true}">
        <!--主页导航-->
        <div class="outer" >
            <div class="left">
                <span class="m_menu" ref="leftNav" @click="toggleM_Menu('open')"><img src="../../assets/images/nav/m-menu.svg" alt=""></span>
                <nuxt-link to="/"><img class="logo" src="~/static/logo2.svg" alt=""></nuxt-link>
            </div>
            <div class="center" v-if="!hasLogin">
                <nuxt-link to="/" exact>{{$t('navbar.home')}}</nuxt-link>
                <nuxt-link to="/product">{{$t('navbar.product')}}</nuxt-link>
                <nuxt-link to="/data-center">{{$t('navbar.datacenter')}}</nuxt-link>
                <nuxt-link to="/blog">{{$t('navbar.blog')}}</nuxt-link>
                <nuxt-link to="/about-us">{{$t('navbar.aboutus')}}</nuxt-link>
                <nuxt-link to="/customer-service">{{$t('navbar.service')}}</nuxt-link>
            </div>
            <div class="right" >
                <div class="buttons_lang" ref="dropdown" v-if="!isMobile">
                        <span @click="triggerDropLists" class="outerTrangle">
                            <span class="currentLang" style="cursor: pointer">{{$t('name')}}</span>
                            <span class="innertrangle">&nbsp;&nbsp;</span>
                            <!--<i></i>-->
                        </span>
                    <ul class="buttons_droplist" v-if="dropList">
                        <li v-for="(item,key) in locales" @click="changeLang(key)" class="CircularAirBook">{{item.name}}</li>
                    </ul>
                </div>
                <div class="notice" v-if="hasLogin">
                    <nuxt-link to="/dashboard/message-center" v-if="hasNotice"><img src="../../assets/images/icon-svg/iconbell-active.svg" alt=""></nuxt-link>
                    <nuxt-link to="/dashboard/message-center" v-else><img src="../../assets/images/icon-svg/iconbell-normal.svg" alt=""></nuxt-link>
                </div>
                <div class="login" @click="toDashboard" v-if="!hasLogin">
                    <span v-if="hasCurrentUser">{{$t('navbar.btn.dashboard')}}</span>
                    <span v-else>{{$t('navbar.btn.sulg')}}</span>
                </div>
                <div class="shutdown" @click="toLogOut" v-else><img src="../../assets/images/icon-svg/iconshutdown.svg" alt=""></div>
            </div>
        </div>


        <!-- M 端外层导航 -->
        <div class="m_outer_nav" v-if="isMOuterNavShow" @click="herfTOLink()" ref="m_outerdiv">
            <div class="m_active_logo">
                <p>
                    <img ref="m_lefttop_logo" class="black_block" src="~/static/logo1.svg" alt="">
                </p>
                <img ref="m_close" @click="toggleM_Menu('close')" src="../../assets/images/m_close.svg" alt="">
            </div>
            <nuxt-link to="/" exact>{{$t('navbar.home')}}</nuxt-link>
            <nuxt-link to="/product">{{$t('navbar.product')}}</nuxt-link>
            <nuxt-link to="/data-center">{{$t('navbar.datacenter')}}</nuxt-link>
            <nuxt-link to="/blog">{{$t('navbar.blog')}}</nuxt-link>
            <nuxt-link to="/about-us">{{$t('navbar.aboutus')}}</nuxt-link>
            <nuxt-link to="/customer-service">{{$t('navbar.service')}}</nuxt-link>
            <span @click="toDashboard" >{{$t('navbar.btn.dashboard')}}</span>
            <!--<nuxt-link to="/" v-else>{{$t('navbar.btn.dashboard')}}</nuxt-link>-->
        </div>
        <!-- 控制面板导航 -->
        <div class="inner" :class="{isBorder:isBorder===true}" v-if="hasLogin" v-show="isBlock">
            <div class="inner-container">
                <nuxt-link to="/dashboard/dashboard">
                    <span>{{$t('navbar.dashboard')}}</span>
                </nuxt-link>
                <nuxt-link to="/dashboard/wallet">
                    <span>{{$t('navbar.wallet')}}</span>
                </nuxt-link>
                <nuxt-link to="/dashboard/my-order">
                    <span>{{$t('navbar.myorders')}}</span>
                </nuxt-link>
                <!--<nuxt-link to="/dashboard/message-center">-->
                    <!--<span>Notice</span>-->
                <!--</nuxt-link>-->
                <nuxt-link to="/dashboard/referral">
                    <span>{{$t('navbar.affiliate')}}</span>
                </nuxt-link>
                <nuxt-link to="/dashboard/setting">
                    <span>{{$t('navbar.settings')}}</span>
                </nuxt-link>
                <nuxt-link to="/dashboard/purchasing-power">
                    <span>{{$t('navbar.buyhashpower')}}</span>
                </nuxt-link>
            </div>
        </div>
    </div>

</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
import messages from '../../locales/index.js';
import { ERR_OK } from '../../assets/js/config.js';

export default {
  middleware: 'auth',
  components: {},
  data() {
    return {
      hasLogin: false,
      options: [
        {
          value: 'English',
          label: 'English',
        },
        {
          value: 'Español',
          label: 'Español',
        },
        {
          value: 'Português',
          label: 'Português',
        },
        {
          value: 'Русский',
          label: 'Русский',
        },
        {
          value: '繁体中文',
          label: '繁体中文',
        },
        {
          value: '简体中文',
          label: '简体中文',
        },
        {
          value: '日本語',
          label: '日本語',
        },
        {
          value: '한국어',
          label: '한국어',
        },
      ],
      value: 'English',

      dropList: false,
      isMobile: false,
      locales: [],

      hasNotice: false, // 是否有新的消息
      isBlock: true, // 在消息界面隐藏内层导航

      isAbsolute: false, // 导航是否绝对定位
      isBGColor: false, // 导航是否有背景
      isBorder: false, // 导航是否有底边

      isMOuterNavShow: false, // M 端外层导航是否展示

      hasCurrentUser: false, // 判断页面是否存在CurrentUser
    };
  },
  watch: {
    $route(curVal, oldVal) {
      this.toggleNarStyle(this.$route.path);
      this._hasNoticeCtrl();
      this.setPage(1);
      // console.log(curVal.path,"~TO~",oldVal.path)

      this.hasLoginShow();
    },
  },
  mounted() {
    this.init();
    // console.log(this.currentUser,'当前用户');
    // console.log(this.local,"Has Local?")
  },
  created: function() {
    this.toggleNarStyle(this.$route.path);
    this.getUrlPath();
  },
  computed: {
    ...mapState('auth', ['currentUser']),
    ...mapState('base', ['locale']),
  },
  methods: {
    ...mapMutations('base', ['setPage']),
    init() {
      this._initDropdown();
      this.toggleNarStyle(this.$route.path);
      this._hasNoticeCtrl();
      this.hasLoginShow();
    },

    ...mapMutations('base', ['SET_LANG']),
    //  获取用户登录状态，初始化 hasLogin 变量
    changeLang1() {
      let str = this.value;
      // console.log(str,'gdf')
      // TODO-YY:需要传英文key
      this.SET_LANG(str);
      this.$i18n.locale = str;
    },
    getUserState() {
      // console.log("Nav")
    },

    // 点击  控制面板  按钮跳转逻辑
    toDashboard() {
      // 用户未登录跳转到 login页面 ，用户已登录 跳转到 dashboard
      if (this.currentUser) {
        this.hasLogin = true;
        this.$router.push({ path: '/dashboard/dashboard' });
      } else {
        this.hasLogin = false;
        this.$router.push({ path: '/signup' });
      }
    },

    //  点击  退出图标  跳转逻辑
    ...mapActions('auth', ['logout']),
    toLogOut() {
      // 登出
      this.logout();
      this.hasLogin = false;
      window.location.href = '/';
    },

    //  判断路由地址显示导航
    getUrlPath() {
      if (this.$route.path.indexOf('dashboard') != -1) {
        this.hasLogin = true;
      } else {
        this.hasLogin = false;
      }
      // console.log("VueRouter:",this.hasLogin)
    },

    // 控制消息图表是否点亮 且 在路由切换时调用，可实时监控是否有新消息
    async _hasNoticeCtrl() {
      if (this.$route.path.indexOf('dashboard') !== -1) {
        let noticeUnread = await this.$axios('notice_unread');
        // console.log("noticeUnread",noticeUnread.data.count,typeof noticeUnread.data.count)
        if (noticeUnread.code === ERR_OK) {
          // 判断接口返回的未读信息数为0（字符串类型）或者当前在 消息中心 这个页面上 则将 hasNotice 变量置为 false
          if (noticeUnread.data.count === '0' || this.$route.path === '/dashboard/message-center') {
            this.hasNotice = false;
          } else {
            this.hasNotice = true;
          }
        } else {
          // console.log("noticeUnread Has Some Wrong")
        }
      }
    },

    // 切换导航样式
    toggleNarStyle(path) {
      // console.log("toggleNarStyle~",path)
      if (path === '' || path === '/') {
        this.isAbsolute = true;
        this.isBGColor = false;
        this.hasLogin = false; // 保证在主页的时候外层导航可显示
      } else if (path === '/product' || path === '/product/') {
        this.isAbsolute = true;
        this.isBGColor = false;
      } else if (path === '/dashboard/message-center' || path === '/dashboard/message-center/') {
        this.isBlock = false;
        this.isBGColor = true;
        this.isBorder = true;
      } else {
        this.isAbsolute = false;
        this.isBGColor = true;
        this.isBorder = true;
        this.isBlock = true;
      }
      // console.log("Path:",path,path.indexOf("dashboard"))
      if (path.indexOf('dashboard') == -1) {
        this.isBlock = false;
        // this.hasLogin = true
      } else {
        this.isBlock = true;
      }
    },

    // M端外层导航
    toggleM_Menu(str) {
      if (str === 'open') {
        this.isMOuterNavShow = true;
      } else {
        this.isMOuterNavShow = false;
      }
    },
    herfTOLink() {
      // alert(12)
      // this.$router.push({path:str})
      this.isMOuterNavShow = false;
    },

    // 通过判断用户是否登录展示Login是否展示
    hasLoginShow() {
      // console.log("this.currentUser",this.currentUser)
      if (this.currentUser === null) {
        // console.log("this.currentUser === null")
        this.hasCurrentUser = false;
      } else {
        // console.log("this.currentUser has something ~")
        this.hasCurrentUser = true;
      }
    },

    // 多语言逻辑
    // 多语言下拉
    triggerDropLists() {
      this.dropList = !this.dropList;
    },
    // 初始化多语言下拉
    _initDropdown() {
      const self = this;
      this.locales = messages;
      document.addEventListener('click', function(e) {
        // 多语言 点击其他位置 关闭下拉框的逻辑
        if (!self.$refs.dropdown) {
          self.dropList = false;
          return false;
        }
        if (!!self.$refs.dropdown.contains(e.target)) return;
        self.dropList = false;

        // 移动端左上角导航
        // 如果点击的是 左上角的 icon 或者 Logo 还有 已经打开时的 关闭按钮，则不执行 置为否的动作
        if (self.$refs.leftNav.contains(e.target)) return;
        if (self.$refs.m_close && self.$refs.m_close.contains(e.target)) return;
        if (self.$refs.m_lefttop_logo && self.$refs.m_lefttop_logo.contains(e.target)) return;

        self.isMOuterNavShow = false;
      });
    },
    changeLang(str) {
      this.SET_LANG(str);
      this.$i18n.locale = str;
      this.dropList = false;
      // console.log("Has Change?",str)
    },
  },
};
</script>
