<style  lang="scss" scoped>
// 移动PC公用
ul.buttons_droplist{
    padding:18px 0;
    position: absolute;
    z-index: 6;
    right: 0;
    top: 0;
    width: 110px;
    border-radius: 5px;
    background-color: #ffffff;
    box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.2);
    border: solid 1px #c8c8c8;
    li{
        margin-bottom:16px;
        width: 100%;
        text-align: left;
        padding-left: 12px;
        color: #2e2b35;
        line-height: 14px;
        height:14px;
        font-size: 14px;
        cursor: pointer;
        &:hover{
            color: #00c6bc;
        }
        &:last-child{
            margin-bottom:0;
        }
    }
}
.content_pc{
    min-width: 1176px;
    height: 100vh;
    // background: darkslategray;
    margin: 0 auto;
    /*overflow: hidden;*/
    background: #ffffff;
    // position: relative;
    // z-index: 5;
    header{
        position: relative;
        z-index: 10;
    }
     header.hidden-xs-only{
         background:url('../assets/images/userInfo_bg.jpg') no-repeat;
         background-size:cover;
     }
    .pc{
        display: flex;
        justify-content:space-between;
        align-items:center;
        position: relative;
        z-index: 9;
        padding: 60px 60px 50px 60px;
        max-width: 1176px;
        margin:  0 auto;
        color:#fff;

        .logo{
            display: flex;
            align-items:center;
            img:first-child{
                margin-right: 16px;
            }
        }
        .buttons{
            display: flex;
            justify-content: space-between;
            width: 240px;
            float: right;
            text-align: center;
            .buttons_signup{
                margin-right: 60px;
                flex:1;
            }
            .buttons_lang{
                position: relative;
                text-align: right;
                flex:1;
                background: url(../assets/images/pc_triangle.svg) no-repeat 84px 9px ;

                .currentLang{
                    padding-right:13px;
                    cursor: pointer;
                    /*background: url(../assets/images/pc_triangle.svg) no-repeat 70px 9px ;*/
                }
            }
        }

    }
    .view_bg{
        position: relative;
        z-index: 5;
        background: #ffffff;
        width: 100%;
        min-height:100vh;
        margin-top: -140px;
        padding-top: 140px;

        .view{
            position: relative;
            z-index: 5;
            max-width: 1176px;
            margin:  0 auto;
            padding: 0 178px;
            background-color:  #ffffff;
        }
        .copyRight{
            position: absolute;
            z-index: 9;
            bottom: 33px;
            width: 100%;
            font-size: 11px;
            color:#9490A5;
            text-align: center;
        }
        .copyRight2{
            position: absolute;
            z-index: 9;
            bottom: 17px;
            width: 100%;
            font-size: 11px;
            color:#9490A5;
            text-align: center;
        }
    }

}

@media only screen and (max-width: 768px) {
    .content_pc{
        min-width: inherit;
        /*overflow: hidden;*/
        header{
            padding:32px 24px 0 24px;
            .logo{
                display: flex;
                align-items:center;
                img:first-child{
                    margin-right: 8px;
                }
            }
        }


        .view_bg{
            margin-top: -56px;
            padding-top: 56px;
            .view{
                padding:32px;
                padding-bottom: 100px;
            }
            .copyRight{
                position: absolute;
                z-index: 9;
                bottom: 33px;
                width: 100%;
                font-size: 11px;
                text-align: center;
            }
            .copyRight2{
                position: absolute;
                z-index: 9;
                bottom: 17px;
                width: 100%;
                font-size: 11px;
                text-align: center;
            }
        }
    }
    .m{
        background-color: #ffffff;
    }

}

@mixin allScreen{
        position: fixed;
        top:0;
        left:0;
        bottom: 0;
        right: 0;
        z-index: 3;
}
.bg{
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0, 0);
    transition: 5s;
    @include allScreen;
}
.bg.bgOpacity{
        background-color: rgba(0,0,0, 1);
    }
// .img_wrap{
//         height:60px;
//        width: 100%;
//        z-index: 2;
//        img{
//            height:60px;
//            width: 100%;
//         //    position: absolute;
//         //    left: 50%;
//         //    max-width: initial;
//         //    top:50%;
//         //    transform: translate(-50%,-50%);
//        }
//    }
</style>

<template lang="html">
    <div id="app">
       <article class="wrap_pc " @click="cancelDropList($event)">
           <!-- 背景 -->
           <!-- <div class="bg" :class="{'bgOpacity':loading}">

           </div> -->
           <!-- <div class="img_wrap">
              <img ref="img" src="../assets/images/index_bg.jpg" @load="imageLoaded" alt="">
           </div> -->

          <div class="content_pc">
              <!-- PC Header -->
              <header class=" hidden-xs-only">
                  <div class="pc">
                        <div class="logo">
                       <img src="../assets/images/pc_icon.svg" alt="" width="30">
                        <img  class="logo_font" src="../assets/images/pc_logo.svg" alt="" width="170">
                        </div>
                        <div class="downlist">

                                <!--<toggle-lang></toggle-lang>-->


                            <div class="buttons clearfix">
                                <!-- <a class="buttons_signup" href="/signup">SIGNUP</a> -->
                                <!-- <a class="buttons_signup" href="/signup">SIGNUP</a> -->
                                <span class="buttons_signup"></span>
                                <div class="buttons_lang" ref="dropdown">
                                        <span @click="triggerDropLists">
                                            <span class="currentLang" style="cursor: pointer">{{$t('name')}}</span>
                                            <!--<i></i>-->
                                        </span>
                                        <ul class="buttons_droplist" v-if="dropList">
                                            <li v-for="(item,key) in locales" @click="changeLang(key)">{{item.name}}</li>
                                        </ul>
                                </div>
                            </div>
                        </div>
                  </div>
              </header>
              <!-- M Header -->
              <header class="m hidden-sm-and-up">
                  <div class="logo">
                      <img src="../assets/images/m_blackicon.svg" alt="">
                      <img  class="logo_font" src="../assets/images/m_colorfull_logo.svg" alt="">
                  </div>
              </header>

              <!-- Page Contents -->
              <div class="view_bg">
                  <section class="view">
                      <nuxt></nuxt>
                  </section>
                  <p class="copyRight circularAirLight">{{$t('general.interpretation')}}</p>
                  <p class="copyRight2 circularAirLight">{{$t('general.copyRight')}}</p>
              </div>

          </div>

       </article>
       <!--  手机上的布局-->
       <!--<article class="wrap_mobile hidden-sm-and-down">-->
           <!--<header>-->
               <!--我是头部,内含那张图片，内容还是直接最外层pading-->
           <!--</header>-->
           <!--<div class="view">-->
               <!--<nuxt></nuxt>-->
           <!--</div>-->
       <!--</article>-->


    </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import Cookie from 'js-cookie'
import messages from '../locales/index.js'
import {getBrowserLanguage} from '../assets/js/tools.js'


export default {
    head(){
        return{
            title:this.title,
            titleTemplate: "%s | Global Cloud Bitcoin Mining Provider"
        }
    },
    data(){
        return {
            loading:true,
            timer:null,
            //  头部下拉选择 变量
            locales:[],
            dropList:false,
        }
    },
    mounted(){
        this.init()
        const self = this
           window.onresize = function(){
               if(self.timer){
                    clearTimeout(self.timer)
                    self.timer = null
               }
                self.timer = setTimeout(function(){
                   self.setImg()
               },500)
           }
        setTimeout(function(){
            self.imageLoaded()
        },500)
    },
    computed:{
         ...mapState('base',['locale']),
    },
    watch:{
        locale(val,old){
            let  browser_language= getBrowserLanguage()
            let  page = location.pathname
        }
    },
    methods:{
        cancelDropList(e){
            const self = this
            if(!self.$refs.dropdown){
                self.dropList = false
                return false
            }
            if(!!self.$refs.dropdown.contains(e.target)) return;
            self.dropList = false
        },
        imageLoaded(){
            this.loading = false
            this.setImg()
        },
        setImg(){
            return false
            const height = document.documentElement.clientHeight
            const width = document.documentElement.clientWidth
             if(width<450){
                this.$refs.img.style.height =`${700*1.3}px`
                this.$refs.img.style.width =`${1176*1.3}px`
               return false
             }
            let y = height/width
            if(y>0.6){
                let tmpWidth = height*(100/59)
                this.$refs.img.style.height =`${height}px`
                this.$refs.img.style.width =`${tmpWidth}px`
            }else{
                let tmpHeight = width*(60/100)
                this.$refs.img.style.height =`${tmpHeight}px`
            }
        },

        //  头部下拉选择 方法
        ...mapMutations('base',['SET_LANG']),
        init(){
            this._initDropdown()
        },
        triggerDropLists(){
            this.dropList = !this.dropList
        },
        _initDropdown(){
            const self = this
            this.locales = messages
            document.addEventListener('click',function(e){
                if(!self.$refs.dropdown){
                    return false
                }
                if(!!self.$refs.dropdown.contains(e.target)) return;
                self.dropList = false
            })
        },
        changeLang(str){
            this.SET_LANG(str)
            this.$i18n.locale = str
            this.dropList = false
            localStorage.setItem('locale',str)
        },

    }
}
</script>
