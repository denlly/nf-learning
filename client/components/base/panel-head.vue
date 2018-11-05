<style lang="scss" rel="stylesheet/scss" scoped>
a:link {
  color: #00c6bc;
  text-decoration: none;
}
a:visited {
  color: #00c6bc;
  text-decoration: none;
}
a:hover {
  color: #00c6bc;
  text-decoration: none;
}
a:active {
  color: #00c6bc;
  text-decoration: none;
}
/* Home Section Style */
.home {
  margin-bottom: 100px;

  h4 {
    margin-bottom: 11px;
    font-size: 48px;
    color: #000;
    text-align: center;
  }
  p {
    font-size: 24px;
    color: #9490a5;
    text-align: center;
  }
}

/* About Us Style */
.about_us {
  padding-bottom: 32px;

  .title {
    font-size: 24px;
    line-height: 24px;
    font-weight: inherit;
    color: #383155;
  }
}
/* Dashboard 算力图表 */
.multiple-item {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    .maintheme {
      font-size: 30px;
      line-height: 30px;
      color: #383155;
    }
    .subtheme {
      font-size: 16px;
      line-height: 24px;
      color: #00c6bc;
    }
  }
  .right {
    .totaltheme {
      font-size: 16px;
      line-height: 24px;
      color: #383155;
    }
  }
}

/* M 移动端 钱包 */
.mwallet {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px 24px 24px;
  border-bottom: 1px solid #f7f7fa;

  .left {
    .mwallet_title {
      font-size: 24px;
      line-height: 24px;
      color: #383155;
    }
    .mwallet_total {
      margin-top: 2px;
      font-size: 16px;
      line-height: 24px;
      color: #9490a5;
    }
  }

  .right {
    .linto {
      font-size: 16px;
      line-height: 24px;
      color: #00c6bc;
    }
  }
}
/* Rank 页面 */
.rank {
  padding: 48px 0 32px 48px;
  font-size: 30px;
  line-height: 30px;

  .title {
    font-size: 30px;
    font-weight: 500;
    color: #383155;
  }
}
@media only screen and (max-width: 768px) {
  .rank {
    padding: 0px 0 16px 24px;
    font-size: 24px;
    line-height: 30px;

    .title {
      font-size: 24px;
    }
  }
}
/* 设置页面 */
.setting {
  padding-bottom: 32px;
  font-size: 30px;
  color: #383155;
  border-bottom: solid 1px #dbdbdb;
  .title {
    float: left;
  }
  .setting_button {
    float: right;
  }
}

.table {
  .head_content {
    padding: 48px;
    padding-right: 31px;
  }
  h4,
  .title {
    font-size: 30px;
    font-weight: 500;
    color: #383155;
  }
  .href {
    padding-left: 16px;
    font-size: 16px;
  }
}
.suggestion {
  .title {
    font-size: 30px;
    line-height: 30px;
    color: #383155;
  }
}

@media only screen and (min-width: 768px) {
  .table {
    .head_tabs {
      .tabs {
        float: right;
      }
      .title {
        float: left;
      }
    }
  }
}

@media only screen and (max-width: 768px) {
  .table {
    .head_content {
      padding: 48px 24px 39px 24px;
      .title {
        font-size: 24px;
      }
    }
    .href {
      padding-left: 0px;
      float: right;
      position: relative;
      top: 7px;
    }
    .head_tabs .title {
      padding-bottom: 24px;
    }
  }
  .setting {
    padding-bottom: 24px;
    font-size: 24px;
    line-height: 30px;
    .title {
      float: left;
      font-weight: 500;
      font-size: 24px;
      color: #383155;
    }
  }
}
</style>

<template lang="html">
    <section>
        <div class="head_content" v-if="type === 'headHref'">
            <h4 class="title">{{title}}
                <a class="href" :href="initData.href" @click="trigGta(initData.href)">
                    {{initData.text}}
                </a>
            </h4>

        </div>
        <div class="head_content" v-if="type === 'standard'">
            <h4 class="title is-pulled-left">
                {{title}}
            </h4>
        </div>

        <div class="head_content head_tabs clearfix" v-if="type === 'tabs'">
            <h4 class="title">
                {{title}}
            </h4>
            <div class="tabs">
                <slot name="tabs">

                </slot>
            </div>
        </div>

        <div class="head_content head_tabs clearfix" v-if="type === 'admin'">
            <h4 class="title">
                {{title}}
            </h4>
            <div class="tabs">
                <slot name="tabs">

                </slot>
            </div>
            <div class="describe">
                <slot name="describe">

                </slot>
            </div>
        </div>

        <!-- Home 页面 -->
        <div class="home" v-if="type === 'home'">
            <h4 class="CircularAirMedium" name="title">{{ title }}</h4>
            <p class="CircularAirBook" name="subtitle">{{ initData.subtitle }}</p>
        </div>

        <!-- About Us 页面 -->
        <div class="about_us" v-if="type === 'about_us'">
            <h4 class="title finalFWBBold" name="title">{{ title }}</h4>
        </div>

        <!-- Dashboard 页面 算力图表 -->
        <div  v-if="type === 'base'" class="multiple-item">
            <div class="left">
                <span class="maintheme">
                    <slot name="title">{{ title }}</slot>
                </span>
                <span class="subtheme">
                    <slot name="subtitle">{{ initData.subtitle }}</slot>
                </span>
            </div>
            <div class="right">
                <span class="totaltheme">
                    <slot name="rightitle"></slot>
                </span>
            </div>
        </div>

        <!-- Wallet M 移动端 插槽 -->
        <div v-if="type === 'mwallet'" class="mwallet">
            <div class="left">
                <p class="mwallet_title"><slot name="title">{{ title }}</slot></p>
                <p class="mwallet_total"><slot name="rightitle">{{ initData.subtitle }}</slot></p>
            </div>
            <div class="right">
                <p class="linkto"><slot name="subtitle"></slot></p>
            </div>
        </div>

        <!-- Rank 模块 -->
        <div class="rank" v-if="type === 'rank'">
            <h4 name="title" class="title">{{title}}</h4>
        </div>

        <!-- 设置页面 模块 -->
        <div class="setting clearfix" v-if="type === 'setting'">
            <h4 class="title">{{title}}</h4>
            <div class="setting_button">
                <slot name="setting_button" >

                </slot>
            </div>
        </div>

        <!-- 建议提交成功 -->
        <div class="suggestion" v-if="type === 'suggestionsuccess'">
            <h4 name="title" class="title">{{ title }}</h4>
        </div>




    </section>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'standard',
    },
    title: {
      type: String,
      required: true,
    },
    initData: {
      type: Object,
      default() {
        return {
          href: '',
          text: '',
        };
      },
    },
  },
  methods: {
    trigGta(href) {},
  },
};
</script>
