<style lang="scss" rel="stylesheet/scss" scoped>
footer {
    color: #fff;
    background-color: #2f2c37;
    min-width: 1176px;
}
.footercontainer {
    margin: 0 auto;
    padding: 42px 0 41px 0;
    width: 1176px;

    &-main {
        display: flex;
        justify-content: space-between;
        clear: both;
        &-logo {
            display: block;
            flex: 1;

            .copyright {
                margin-top:7px;
                font-size: 12px;
                opacity: 0.54;
            }
            .longtext{
                margin:24px 0 32px 0;
                font-size: 12px;
                opacity: 0.4;
            }
            .icon_group{
                margin-top:10px;
                a{
                    display: inline-block;
                }
                span{
                    display: inline-block;
                    margin-right:8px;
                    width:20px;
                    height:20px;
                    cursor: pointer;
                }
                .icon01{background:url("../../assets/images/footer/icon-1Dark.svg");}
                .icon02{background:url("../../assets/images/footer/icon-2Dark.svg");}
                .icon03{background:url("../../assets/images/footer/icon-3Dark.svg");}
                .icon04{background:url("../../assets/images/footer/icon-4Dark.svg");}

                .icon01:hover{background:url("../../assets/images/footer/icon-1White.svg");}
                .icon02:hover{background:url("../../assets/images/footer/icon-2White.svg");}
                .icon03:hover{background:url("../../assets/images/footer/icon-3White.svg");}
                .icon04:hover{background:url("../../assets/images/footer/icon-4White.svg");}

            }
        }
        &-links {
            display: flex;
            justify-content: space-between;
            flex:1;

            ul {
                display: inline-block;
                /*margin-right: 60px;*/
                padding-right:98px;

                li {
                    margin-bottom: 8px;
                    opacity: 0.54;

                    a {
                        font-size: 12px;
                        line-height: 15px;
                        font-weight: normal;
                        color: #fff;
                        img {
                            margin-right: 4px;
                            vertical-align: sub;
                        }
                    }
                }
                li:last-child {
                    margin: 0;
                }
                .liTitle {
                    margin-bottom:14px;
                    font-size: 14px;
                    line-height: 14px;
                    font-weight: bold;
                    opacity: 1;
                    cursor: default;
                }
            }
        }
    }

    hr {
        margin: 33px 0 21px 0;
        opacity: 0.4;
        background-color: #fff;
    }
    &-footertips {
        /*font-family: CircularAirLight;*/
        font-family: "CircularAirLight", "PingFang SC", "Microsoft YaHei" !important;
        width:100%;
        font-size: 12px;
        font-weight: lighter;
        opacity: 0.4;
    }
}

/* 媒体查询控制 */
@media only screen and (min-width: 768px){
    .footer_mobile{display: none;}
}
@media only screen and (max-width: 768px) {
    footer{
        min-width: 100%;
    }
    .footercontainer{display: none}
    .footer_mobile{
        padding:32px 24px 76px 24px;
        background-color: #2f2c37;

        .itemlist{
            margin-bottom:44px;

            .listdiv{
                border-bottom: 1px solid rgba(255,255,255,0.4);
                .liTitle{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 14px;
                    line-height: 52px;

                    .triangle{
                        display: inline-block;
                        padding-right:2px;
                        width:0;
                        height:0;
                        line-height: 16px;
                        border-width: 6px 0 6px 6px;
                        border-style:solid;
                        border-color: transparent transparent transparent #fff;/*透明 透明 透明 灰*/

                        position:relative;
                    }

                }
                ul{
                    display: none;
                    li{
                        margin-bottom:8px;
                        padding-left:8px;
                        font-size: 12px;
                        color:#fff;
                        opacity: 0.54;

                        &:last-child{
                            margin-bottom:24px;
                        }
                        a{
                            color:#fff;
                        }
                    }

                }


                .active{
                    .triangle{
                        display: inline-block;
                        width:0;
                        height:0;
                        border-width: 6px 6px 1px 6px ;
                        border-style:solid;
                        border-color:#fff transparent transparent transparent ;/*透明 透明 透明 灰*/
                        position:relative;
                    }
                    ul{
                        display: block;
                    }
                }
                .ulblock{display: block;}

            }
        }
    }

}
</style>

<template>
    <footer>
        <!-- PC -->
        <div class="footercontainer">
            <div class="footercontainer-main">
                <div class="footercontainer-main-logo">
                    <img src="~/static/logo2.svg" alt="" width="151px" heihgt="25px">
                    <p class="copyright fontSpecialFamily">{{$t('ftr.copyright')}}</p>
                    <div class="icon_group">
                    </div>
                </div>
                <div class="footercontainer-main-links">
                    <!-- 产品 -->
                    <ul>
                        <li class="liTitle">{{$t('ftr.h1.t1')}}</li>
                        <li>
                            <a @click="gtaFooter('/product')" >{{$t('ftr.h1.t2')}}</a>
                        </li>
                        <li>
                            <a @click="gtaFooter('/data-center')" >{{$t('ftr.h1.t3')}}</a>
                        </li>
                    </ul>

                    <!-- 信息 -->
                    <ul>
                        <li class="liTitle">{{$t('ftr.h2.t1')}}</li>
                        <li>
                            <a @click="gtaFooter('/about-us','A')" >{{$t('ftr.h2.t2')}}</a>
                        </li>
                        <li>
                            <a @click="gtaFooter('/about-us','B')" >{{$t('ftr.h2.t3')}}</a>
                        </li>
                    </ul>

                    <!-- 客户支持 -->
                    <ul>
                        <li class="liTitle">{{$t('ftr.h3.t1')}}</li>
                        <li>
                            <a @click="gtaFooter('/customer-service')" >{{$t('ftr.h3.t2')}}</a>
                        </li>
                        <li>
                            <a @click="gtaFooter('/privacyPolicy.pdf')" target="_blank">{{$t('ftr.h3.t3')}}</a>
                        </li>
                        <li>
                            <a @click="gtaFooter('/termsOfUse.pdf')" target="_blank">{{$t('ftr.h3.t4')}}</a>
                        </li>
                    </ul>
                </div>
            </div>
            <hr>
            <p class="footercontainer-footertips">{{$t('ftr.announce')}}</p>
        </div>
        <!-- M -->
        <div class="footer_mobile">
            <div class="itemlist">
                <!-- 产品 -->
                <div class="listdiv">
                    <p class="liTitle " :class="{active:isActive === 'str1'}" @click="mClickTitle('str1')">
                        <span>{{$t('ftr.h1.t1')}}</span>
                        <span class="triangle"></span>
                    </p>
                    <ul :class="{ulblock:isActive === 'str1'}">
                        <li>
                            <a @click="gtaFooter('/product')" >{{$t('ftr.h1.t2')}}</a>
                        </li>
                        <li>
                            <a @click="gtaFooter('/data-center')" >{{$t('ftr.h1.t3')}}</a>
                        </li>
                    </ul>
                </div>

                <!-- 信息 -->
                <div class="listdiv">
                    <p class="liTitle" :class="{active:isActive === 'str2'}" @click="mClickTitle('str2')">
                        <span>{{$t('ftr.h2.t1')}}</span>
                        <span class="triangle"></span>
                    </p>
                    <ul :class="{ulblock:isActive === 'str2'}">
                        <li>
                            <a @click="gtaFooter('/about-us')" >{{$t('ftr.h2.t2')}}</a>
                        </li>
                        <li>
                            <a @click="gtaFooter('/about-us')" >{{$t('ftr.h2.t3')}}</a>
                        </li>
                    </ul>
                </div>

                <!-- 客户支持 -->
                <div class="listdiv">
                    <p class="liTitle" :class="{active:isActive === 'str3'}" @click="mClickTitle('str3')">
                        <span>{{$t('ftr.h3.t1')}}</span>
                        <span class="triangle"></span>
                    </p>
                    <ul :class="{ulblock:isActive === 'str3'}">
                        <li>
                            <a @click="gtaFooter('/customer-service')" >{{$t('ftr.h3.t2')}}</a>
                        </li>
                        <li>
                            <a @click="gtaFooter('/privacyPolicy.pdf')" target="_blank">{{$t('ftr.h3.t3')}}</a>
                        </li>
                        <li>
                            <a @click="gtaFooter('/termsOfUse.pdf')" target="_blank">{{$t('ftr.h3.t4')}}</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="footercontainer-main-logo">
                <img src="~/assets/images/footer/logo.svg" alt="">
                <p class="copyright fontSpecialFamily">{{$t('ftr.copyright')}}</p>
                <p class="longtext">{{$t('ftr.announce')}}</p>
                <div class="icon_group">
                   
                </div>
            </div>
        </div>
    </footer>
</template>

<script>


export default {
    components: {},
    data() {
        return {
            title: "",
            isActive:""
        }
    },
    mounted() { },
    computed: {},
    methods: {
        // M 端折叠面板
        mClickTitle(str){
            if( this.isActive === str){
                this.isActive = ""
            }else{
                this.isActive = str
            }
        },
    },

}
</script>
