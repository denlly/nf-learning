<style lang="scss" rel="stylesheet/scss" scoped>
    .wallettypes{
        /*margin-bottom:95px;*/
        background-color: #fff;

        .borderBottom{
            border: none;
            box-shadow:none;

            .titletypes{
                font-size: 30px;
                font-weight: 500;
                color: #383155;
            }
            .subtitle{
                padding-left: 16px;
                font-size: 16px;
                color: #00c6bc;
                cursor:pointer;
            }

            .padding48{
                padding:48px;
            }
            a{
                color:#00c6bc;
            }
        }

        .bottomline{
            width: 1176px;
            border-bottom:1px solid #f7f7fa;
        }
        .content_title{
            /*box-sizing: border-box;*/
            display: flex;
            justify-content: space-between;
            /*padding:0 48px ;*/
            align-items: left;
            font-size: 20px;
            line-height: 25px;
            color: #7b7494;
            background-color: #f1f2fa;

            div{
                /*box-sizing: border-box;*/
                display: flex;
                justify-content: left;
                align-items: center;
                /*padding-left:48px;*/
                width:213px;
                height:58px;
                border-right:1px solid #f7f7fa;

                &:last-child{
                    border-right:0px;
                }
            }


        }
        .theme_title{
            /*display: flex;*/
            /*justify-content: left;*/
            /*align-items: center;*/
            padding:0 48px;
            color: #7b7494;
            background-color: #f1f2fa;
            clear: both;
            overflow: hidden;

            .theme_title_height{
                display: inline-block;
                float: left;
                /*display: flex;*/
                /*justify-content: left;*/
                /*padding-left:48px;*/
                align-items: center;
                width:202px;
                height:58px;
                line-height: 58px;
                font-size: 20px;
                /*border-right:1px solid #f7f7fa;*/

                &:last-child{
                    span{
                        padding-left:22px;
                    }
                }
            }
            .theme_title_height1{padding-left:0px;}
            .theme_title_height2{padding-left:0px;}
            .theme_title_height3{padding-left:42px;box-sizing: border-box}
            .theme_title_height4{padding-left:82px;box-sizing: border-box}
            .theme_title_height5{padding-left:148px;box-sizing: border-box}
        }
        .content_content{
            clear: both;
            /*&:last-child{border:none;}*/
            .theme{
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom:1px solid #f7f7fa;

                &:last-child{
                    /*border-bottom:0*/
                }
            }
            .themeietm{
                display: flex;
                justify-content: left;
                align-items: center;
                padding-left:48px;
                align-items: center;
                width:213px;
                height:74px;
                border-right:1px solid #f7f7fa;

                &:last-child{
                    border-right:none;
                }
            }

            .el-row{
                border-bottom: 1px solid #efefef;
            }
            .el-col{
                padding:15px 0px 15px 0px;
            }
            .coin{
                display: block;
                text-align: left;
                font-size: 20px;
                line-height: 25px;
                align-items: left;

                .coinicon{
                    display: inline-block;
                    margin-right:20px;
                    width:20px;
                    height:20px;
                }
                .iconBTC{background:url("../../../assets/images/icon-svg/icon1-colorful.svg");background-size: cover;}
                .iconETH{background:url("../../../assets/images/icon-svg/icon2-colorful.svg");background-size: cover;}
                .iconLTC{background:url("../../../assets/images/icon-svg/icon3-colorful.svg");background-size: cover;}
                .iconDASH{background:url("../../../assets/images/icon-svg/icon4-colorful.svg");background-size: cover;}
                .iconXMR{background:url("../../../assets/images/icon-svg/icon5-colorful.svg");background-size: cover;}
                .iconZEC{background:url("../../../assets/images/icon-svg/icon6-colorful.svg");background-size: cover;}
            }
            .coinfresh{
                display: block;
                line-height: 74px;
                box-sizing: border-box;
                padding-left: 48px;
                display: flex;
                align-items: center;
            }
            .number{
                font-size: 18px;
                line-height: 23px;
            }
            /* 按钮样式 */
            .withdraw{
                display: inline-block;
                padding:12px 23px 12px 24px;
                width:72px;
                font-size: 16px;
                line-height: 20px;
                text-align: left;
                color: #00c6bc;
                border-radius: 4px;
                cursor: pointer;
            }
        }
    }
    .mwallet{
        display: none;
    }
    .el-row {
        margin:0;
    }

    @media only screen and (max-width: 768px){
        .bottomline{
            width: 100%;
        }
        .borderBottom{display: none;}
        .mwallet{
            display: block;
            .m_withdrawtitle{
                font-size: 24px;
                font-weight: 500;
                color: #383155;
            }
            .m_withdrawsubtitle{
                font-size: 16px;
                line-height: 1.5;
                color: #9490a5;
            }
        }
        .mwallet_contenet{
            &_item{
                border-bottom:1px solid #f7f7fa;

                .itemtheme{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding:0 24px;

                    &_left{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        font-size: 20px;
                        line-height: 73px;
                        color:#2f2c37;

                        .coinstyle{
                            display: inline-block;
                            margin-right:20px;
                            width:20px;
                            height:20px;
                        }
                        .icon1{background:url("../../../assets/images/icon-svg/icon1-colorful.svg");background-size: cover;}
                        .icon2{background:url("../../../assets/images/icon-svg/icon2-colorful.svg");background-size: cover;}
                        .icon3{background:url("../../../assets/images/icon-svg/icon3-colorful.svg");background-size: cover;}
                        .icon4{background:url("../../../assets/images/icon-svg/icon4-colorful.svg");background-size: cover;}
                        .icon5{background:url("../../../assets/images/icon-svg/icon5-colorful.svg");background-size: cover;}
                        .icon6{background:url("../../../assets/images/icon-svg/icon6-colorful.svg");background-size: cover;}




                        .coinname{
                            display: inline-block;
                        }
                    }
                    &_right{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;

                        .more{
                            font-size: 16px;
                            line-height: 24px;
                            color:#00c6bc;
                        }

                        .triangle{
                            box-sizing: border-box;
                            margin-top:4px;
                            margin-left:8px;
                            position: relative;
                            display: inline-block;
                            width: 0;
                            height: 0;
                            line-height: 24px;
                            border-width: 6px 0 6px 6px;
                            border-style: solid;
                            border-color: transparent transparent transparent #00c6bc;
                        }

                    }

                }

                .itemcontent{
                    padding: 0 24px;
                    background-color: #f7f7fa;

                    .category{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding:24px 0 ;
                        &:last-child{
                            padding-bottom:49px;
                        }

                        span{
                            font-size: 20px;
                            line-height: 20px;
                            color:#7b7494;

                            &:last-child{
                                font-size: 18px;
                                color:#383155;
                            }
                        }

                    }
                }

            }

            /* 激活币种显示的样式 */
            .active_itemcontent{
                background-color: #f7f7fa;

                .itemtheme{
                    &_right{
                        .more{
                            color:#2f2c37;
                        }
                        .triangle{
                            transform: rotate(90deg);
                            border-color: transparent transparent transparent #2f2c37;
                        }
                    }
                }
            }
        }
        .ulnone{
            display: none;
        }
    }
</style>

<template>
    <section class="wallettypes" v-loading="loading">
        <!-- PC样式 -->
        <panel class="borderBottom" v-if="!isMobile">
            <panel-head slot="head" type="base" :title="'base'" class="padding48">
                <span slot="title">
                    <span class="titletypes">{{$t('db.wat.h1')}}</span>
                </span>
                <span slot="subtitle">
                    <span class="subtitle" @click="goTodetails">{{$t('db.wat.h2')}}</span>
                </span>
                <span slot="rightitle">{{$t('db.wat.h3')}} $ <span v-loading="totalUsdt">{{ totalUSDT }}</span></span>
            </panel-head>
            <div slot="content" class="bottomline">
                <div class="content_content">
                    <div class="theme_title">
                        <div class="theme_title_height ">{{$t('db.wat.h1c1')}}</div>
                        <div class="theme_title_height ">{{$t('db.wat.h1c2')}}</div>
                        <div class="theme_title_height theme_title_height3">{{$t('db.wat.h1c3')}}</div>
                        <div class="theme_title_height theme_title_height4">{{$t('db.wat.h1c4')}}</div>
                        <div class="theme_title_height theme_title_height5">{{$t('db.wat.h1c5')}}</div>
                    </div>
                </div>
                <div v-for="(data,key) in walletData" :key="data.id" class="content_content">
                    <div class="theme">
                        <div class="themeietm coin coinfresh"><span class="coinicon" :class="'icon'+data.coin.code"></span> <span>{{ data.coin.code }}</span> </div>
                        <div class="themeietm number"> {{ data.profitBalance | formatNumber}} </div>
                        <div class="themeietm number"> {{ data.profitBalance - data.frozenProfitBalance | formatNumber}} </div>
                        <div class="themeietm number"> {{ data.frozenProfitBalance | formatNumber}} </div>
                        <div class="themeietm ">
                            <span class="withdraw" @click="changeUnit(data.coin.code)">{{$t('db.wat.h1c6')}}</span>
                        </div>
                    </div>
                    <div v-if="activeUnit === data.coin.code">
                        <wallet-forward :data="data"></wallet-forward>
                    </div>
                </div>
            </div>
        </panel>

        <!-- M样式 -->
        <panel class="mwallet" v-if="isMobile">
            <panel-head slot="head" type="mwallet" :title="'base'" class="padding48">
                <span slot="title">
                    <span class="m_withdrawtitle">{{$t('db.wat.h1')}}</span><br>
                    <span class="m_withdrawsubtitle">{{$t('db.wat.h3')}} $ <span v-loading="totalUsdt">{{ totalUSDT }}</span></span>
                </span>
                <span slot="subtitle">
                    <a class="" href="/dashboard/wallet/account-detail">{{$t('db.wat.h2')}}</a></span>
                <!--<span slot="rightitle"></span>-->
            </panel-head>
            <div slot="content" class="mwallet_contenet">
                <div class="mwallet_contenet_item" :class="{active_itemcontent:mdata.coin.code === activeUnit}" v-for="(mdata,key) in walletData" :key="mdata.id">
                    <div class="itemtheme ">
                        <p class="itemtheme_left">
                            <span class="coinstyle" :class="'icon'+(key+1)"></span>
                            <span class="coinname">{{ mdata.coin.code }}</span>
                        </p>
                        <p class="itemtheme_right">
                            <span class="more" @click="changeUnit(mdata.coin.code)">{{$t('db.wat.b2')}}</span>
                            <span class="triangle"></span>
                        </p>
                    </div>
                    <div class="itemcontent" v-if="activeUnit == mdata.coin.code">
                        <ul>
                            <li class="category"><span>{{$t("db.wat.h1c2")}}</span><span>{{ mdata.profitBalance | formatNumber}}</span></li>
                            <li class="category"><span>{{$t("db.wat.h1c4")}}</span><span>{{ mdata.frozenProfitBalance | formatNumber}}</span></li>
                            <li class="category"><span>{{$t("db.wat.h1c3")}}</span><span>{{ mdata.profitBalance - mdata.frozenProfitBalance | formatNumber}}</span></li>
                        </ul>
                        <div>
                            <wallet-forward :data="mdata"></wallet-forward>
                        </div>
                    </div>
                </div>
            </div>
        </panel>
    </section>
</template>

<script>
    import panel from "../../base/panel.vue"
    import panelHead from "../../base/panel-head.vue"
    import walletForward from "./wallet-forward"
    import {ERR_OK} from "../../../assets/js/config.js"
    import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
    import {gta} from "../../../lib/gta.js"

    export default {
        components: {
            panelHead,panel,walletForward
        },
        data(){
            return {
                isMobile:false,
                loading:true,
                totalUsdt:true,
                totalUSDT:0,
                walletData:[],
                activeUnit:""
            }
        },
        mounted() {
            this.init()
        },
        watch:{
            isMobile(val){
                // console.log("钱包~是否为手机端 改变了")
            }
        },
        computed:{
            // 获取用户信息
            ...mapState('auth',['currentUser']),
        },
        methods:{
            // 统一出口
            init(){
                this.getUserTotalUSDT()
                this.getUserWalletList()

                // 当屏幕改变的时候强制隐藏 PC 或 M 的一个DOM 避免出现弹窗出现两次
                let _this = this
                if( document.body.offsetWidth > 750){
                    _this.isMobile = false
                }else{
                    _this.isMobile = true
                }

            },

            // 获取用户所有USDT收入
            async getUserTotalUSDT(){
                let resuletGetUserTotalUSDT = await this.$axios("wallet_balance")
                // console.log("resuletGetUserTotalUSDT",resuletGetUserTotalUSDT)
                if( resuletGetUserTotalUSDT.code === ERR_OK ){
                    this.totalUSDT = resuletGetUserTotalUSDT.data.totalBalance
                    this.totalUsdt = false
                }else{
                    console.log("getUserTotalUSDT Something Wrong",)
                }

            },

            // 获取钱包
            async getUserWalletList(){
                let params = {coin:"BTC"}
                let resuletUserWallets = await this.$axios("wallet_list",params)

                if( resuletUserWallets.code === ERR_OK){
                    this.walletData = resuletUserWallets.data
                    this.loading = false
                    // console.log("~~~getUserWalletList",this.walletData)
                }
            },

            //  改变激活的币种
            changeUnit(str){
                // console.log("%c%s", "color:red",str,"+",this.activeUnit,this.currentUser.email)
                gta.track("wallet:withdraw_action_button_clicked", { "coin": str,"email":this.currentUser.email})

                if( this.activeUnit === str){
                    this.activeUnit = ""
                }else{
                    this.activeUnit = str
                    // console.log("Wallet=》ActiveCoin："+str)
                }
            },

            // 跳转到详情
            goTodetails(){
                this.$router.push({path:"/dashboard/wallet/account-detail"})
                gta.track("wallet:goto_account_detail_button_clicked")
            }
        },

    }
</script>
