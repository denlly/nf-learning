<style lang="scss" scoped>
#app{
     background-color: rgba(0,0,0, .6);
     color: #ffffff;
 font-size: 14px;
 text-align: center;
}

.content{
    padding: 60px;
    max-width: 1176px;
    min-height: 100vh;
    // background: darkslategray;
    margin: 0 auto;
    position: relative;
    z-index: 5;
}
.view{
    margin-top: 9vh;
    padding-bottom: 100px;
}
.header_layout{
    // background: gray;
    margin-bottom: 20px;
    // padding: 15px 0;
    line-height: 30px;
    .logo{
        float: left;
        img{
            width: 30px;
            height: 30px;
            vertical-align: middle;
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
            background: url(../assets/images/pc_triangle.svg) no-repeat 85px 14px ;

            .currentLang{
                /*display: inline;*/
                padding-right:13px;
                cursor:pointer;
                /*background: url(../assets/images/pc_triangle.svg) no-repeat 35px 9px ;*/
            }
        }
    }
}
ul.buttons_droplist{ // 移动PC公用
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
    background:url('../assets/images/index_bg.jpg') no-repeat center fixed;
    background-size: cover;
    @include allScreen;
}
.bg.isMobile{
    width: 100%;
    height: 100%;
    background:url('../assets/images/bg_m.jpg') no-repeat center fixed;
    background-size: cover;
    @include allScreen;
}
.bg.bgOpacity{
        background-color: rgba(0,0,0, 1);
    }
.img_wrap{
       @include allScreen;
       width: 100%;
       z-index: 2;
       img{
           position: absolute;
           left: 50%;
           max-width: initial;
           top:50%;
           transform: translate(-50%,-50%);
       }
   }

@media screen and (max-width: 768px) {
    .wrap{
        padding: 0 38px;
    }
    .view{
        margin-top: 12px;
        padding-bottom: 100px;

        .footerCopyRightText{
            position: absolute;
            z-index: 9;
            left:0;
            right:0;
            width: 100%;
            font-size: 11px;
            text-align: center;
        }
        .footerCopyRight{
            bottom:54px;
        }
        .footerCopyRight2{
            bottom:17px;
        }
    }
    .header_mobile{
        padding: 32px 24px;
        line-height: 30px;
        margin-bottom: 0px;
        .buttons_lang{
            position: relative;
            text-align: right;
            flex:1;
            /*background: url(../assets/images/pc_triangle.svg) no-repeat 84px 9px ;*/

            .currentLangDIV{
                padding-right:13px;
                /*background: url(../assets/images/pc_triangle.svg) no-repeat 63px 9px ;*/
                background-image:url(../assets/images/pc_triangle.svg);
                background-repeat:no-repeat;
                background-position: center right;
            }
            .currentLang{
                /*display: inline;*/
                /*padding-right:13px;*/
                cursor: pointer;
                /*background: url(../assets/images/pc_triangle.svg) no-repeat 63px 9px ;*/
            }
        }
        .logo{
            display: flex;
            float: left;
            img{
                margin-right: 10px;
                width: 24px;
                height: 24px;
                vertical-align: middle;
            }
            .logo_font{
                width: 110px;
            }
        }
    }
    .header_mobile.active{
        background: #ffffff;
    }
    .content{
        padding: 0;
    }
    .content_mobile{
        .dropdown{
            padding:32px 0 ;
            padding-top: 0px;
            z-index: 9;
            position: absolute;
            /* top: -10px; */
            margin-top:-1px;
            background-color: #ffffff;
            width: 100%;

            li{
                margin-bottom:16px;
                width: 100%;
                text-align: left;
                padding-left: 25px;
                height: 14px;
                line-height: 14px;
                font-size: 14px;
                color: #2e2b35;
                cursor: pointer;
                &:hover{
                    color: #00c6bc;
                }
                &:last-child{
                    margin-bottom:0
                }
            }
        }
    }

}

.footerCopyRightText{
    position: absolute;
    z-index: 9;
    left:0;
    right:0;
    width: 100%;
    font-size: 11px;
    text-align: center;
    color: rgba(255,255,255,0.7);
}
.footerCopyRight{
    bottom:33px;
}
.footerCopyRight2{
    bottom:17px;
}




</style>

<template>
    <div id="app">
        <!-- 背景 -->
        <div class="bg" :class="{'isMobile':loading}">

        </div>
        <!-- <div class="img_wrap">
           <img v-if="!isMobile" ref="img" src="../assets/images/index_bg.jpg" @load="imageLoaded" alt="">
           <img v-else ref="img" src="../assets/images/bg_m.jpg" @load="imageLoaded" alt="">
       </div> -->

        <article class="content" :class="{'content_mobile':isMobile}" @click="cancelDropList($event)">
            <!-- PC Header -->
            <header  class="clearfix header_layout  hidden-xs-only" >
                <div class="logo">
                    <img src="../assets/images/pc_icon.svg" alt="">
                </div>
                <div class="buttons clearfix">
                    <!-- <a class="buttons_signup" href="/signup">SIGNUP</a> -->
                    <!-- <a class="buttons_signup" href="/signup">SIGNUP</a> -->
                    <span class="buttons_signup"></span>
                    <div class="buttons_lang" ref="dropdown" v-if="!isMobile">
                        <span @click="triggerDropLists">
                            <span class="currentLang" style="cursor: pointer">{{$t('name')}}</span>
                            <!--<i></i>-->
                        </span>
                        <ul class="buttons_droplist" v-if="dropList">
                            <li v-for="(item,key) in locales" @click="changeLang(key)" class="CircularAirBook">{{item.name}}</li>
                        </ul>
                    </div>
                </div>
            </header>
            <!-- M Header -->
            <header class="clearfix header_mobile hidden-sm-and-up" :class="{'active':dropList}">
            <!-- <header class="clearfix header_mobile active" v-else> -->
                <div class="logo">
                    <img v-if="!dropList" src="../assets/images/pc_icon.svg" alt="">
                    <img v-else alt=""  src="../assets/images/m_blackicon.svg">
                    <img  v-if="dropList" class="logo_font" src="../assets/images/m_colorfull_logo.svg" alt="">
                </div>
                <!-- 右侧切换 -->
                <div class="buttons clearfix" v-if="!dropList">
                    <!-- <a class="buttons_signup" href="/signup">SIGNUP</a> -->
                    <!-- <a class="buttons_signup" href="/signup">SIGNUP</a> -->
                    <span class="buttons_signup"></span>
                    <div class="buttons_lang" ref="dropdown" v-if="isMobile">
                        <span @click="triggerDropLists" class="currentLangDIV">
                            <span class="currentLang">{{$t('name')}}</span>
                        </span>
                    </div>
                </div>
                <div  v-else @click="triggerDropLists" class="fr">
                    <img src="../assets/images/m_close.svg" alt="">
                </div>
            </header>
            <ul class="dropdown" v-if="dropList && isMobile">
                <li v-for="(item,key) in locales" @click="changeLang(key)" class="CircularAirBook">{{item.name}}</li>
            </ul>

            <!-- Page Contents -->
            <div class="view">
                <nuxt></nuxt>
            </div>
            <p class="footerCopyRightText footerCopyRight circularAirLight">{{$t('general.interpretation')}}</p>
            <p class="footerCopyRightText footerCopyRight2 circularAirLight">{{$t('general.copyRight')}}</p>
        </article>
    </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import Cookie from 'js-cookie'
import messages from '../locales/index.js'
import {getScreen, getBrowserLanguage} from '../assets/js/tools.js'
export default {
    // metaInfo: {
    //     // if no subcomponents specify a metaInfo.title, this title will be used
    //     title: this.title,
    //     // all titles will be injected into this template
    //     titleTemplate: "%s | 袋鼠矿业-比特币云算力、云挖矿"
    // },
    head(){
        return{
            title:this.title,
            titleTemplate: "%s | Global Cloud Bitcoin Mining Provider"
        }
    },
    data(){
        return {
            loading:false,
            timer:null,
            dropList:false,
            isMobile:false,
            locales:[],
        }
    },
    mounted(){
        this.init()
    },
    computed:{
            ...mapState('auth',['currentUser']),
            ...mapState('base',['locale']),
    },
    watch:{
        locale(val,old){
            let  browser_language= getBrowserLanguage()
            let  page = location.pathname
        }
    },
    methods:{
        ...mapMutations('base',['SET_LANG']),
        init(){
            this.isMobile = getScreen()
            this._initDropdown()
            // this._initBgLoading()
            const self = this
             window.onresize = function(){
                self.isMobile = getScreen()
            }
        },
        cancelDropList(e){
            const self = this
            if(!self.$refs.dropdown){
                self.dropList = false
                return false
            }
            if(!!self.$refs.dropdown.contains(e.target)) return;
            self.dropList = false
        },
        _initBgLoading(){
            const self = this;
            window.onresize = function(){
                self.isMobile = getScreen()
                if(self.timer){
                     clearTimeout(this.timer)
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
        _initDropdown(){
            const self = this
            this.locales = messages
            document.addEventListener('click',function(e){
               if(!self.$refs.dropdown){
                   self.dropList = false
                   return false
               }
               if(!!self.$refs.dropdown.contains(e.target)) return;
               self.dropList = false
           })
        },
        triggerDropLists(){
            this.dropList = !this.dropList
        },
        changeLang(str){
            this.SET_LANG(str)
            this.$i18n.locale = str
            this.dropList = false
        },
       imageLoaded(){
           this.loading = false
           this.setImg()
       },
       setImg(){
           const height = document.documentElement.clientHeight
           const width = document.documentElement.clientWidth
           if(width<450){
               this.$refs.img.style.height =`${667*1.5}px`
               this.$refs.img.style.width =`${365*1.5}px`
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
       }
   },
}
</script>
