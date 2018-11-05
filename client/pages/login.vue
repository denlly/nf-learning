<style lang="scss">
.signup_button {
    width: 140px;
    line-height:50px;
    font-size: 16px;
    font-weight: bold;
    color: #00c6bc;
    text-align: center;
    border-radius: 4px;
    border: solid 0.5px #00c6bc;
    cursor: pointer;
}
</style>

<template lang="html">
  <article  class="table_layout">
      <panel class="standard">
          <panel-head slot="head" type="setting" :title="$t('sl.lo.h1')">
              <div class="signup_button" @click="goSignup" slot="setting_button">
                  {{$t('sl.lo.b1')}}
              </div>
          </panel-head>
         <app-login slot="content" @success="onLogin"></app-login>
      </panel>
  </article>
</template>

<script>
import appLogin from "../components/base/login.vue"
import panelHead from "../components/base/panel-head"
import panel from "../components/base/panel"
import {getUrlParame} from "../assets/js/tools"

export default {
    head() {
        return {
            title: this.$t("links.login"),
            script: [
              { src: 'https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit',async:true,defer:true},
              { src: '/js/gt.js'},
            ],
        }
    },
    data(){
        return {
            urlParame:{},
        }
    },
    mounted(){
        this.urlParame  = getUrlParame()
    },
    methods:{

        goSignup(){

            location.href = '/signup'
        },
        onLogin(){
            const redirectUrl = decodeURIComponent(this.urlParame.p)
            location.href = this.urlParame.p ? redirectUrl : "/dashboard/dashboard"
        }
    },
    components:{
        panelHead,panel,appLogin
    }
}
</script>
