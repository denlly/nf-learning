<style lang="scss" rel="stylesheet/scss" scoped>
    .product_price{
        background-image: linear-gradient(314deg, #4e4273, #454057);
        /*border: solid 1px #979797;*/
        min-width: 1176px;
        &-contaniner{
            margin:0 auto;
            padding:133px 0 97px 0;
            width:1176px;

            &-title{
                margin-bottom:80px;
                font-size: 36px;
            }
            &-item{
                position: relative;
                margin-bottom:120px;
                width:356px;
                height:512px;
                border-radius: 4px;
                box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
                background-color: #ffffff;
                /*border: solid 0.5px rgba(0, 0, 0, 0.2);*/

                .soldout{
                    position: absolute;
                    z-index:4;
                    top:0;
                    right:0;
                    width: 119px;
                    height: 119px;
                    overflow: hidden;

                    .soldout_text{
                        margin-top: 35px;
                        margin-left: -18px;
                        padding: 2px;
                        width: 150%;
                        font-size: 14px;
                        font-weight: bold;
                        line-height: 26px;
                        color: #383153;
                        text-align: center;
                        background-color: #f7f7fa;
                        transform: rotate(45deg);
                    }
                }

                .title{
                    position: relative;
                    padding-top:38px;
                    text-align: center;
                    font-size: 20px;

                    img{
                        position: absolute;
                        top:-30px;
                        left:0;
                        right:0;
                        margin:auto;
                        width:60px;
                        height:60px;
                        background-color: #fff;
                        border-radius: 50%;
                    }
                    .icon{
                        position: absolute;
                        top:-30px;
                        left:0;
                        right:0;
                        margin:auto;
                        width:60px;
                        height:60px;
                        background-color: #fff;
                        border-radius: 50%;
                        background-color: #000;
                    }
                    .iconbg{
                        position: absolute;
                        top:-30px;
                        left:0;
                        right:0;
                        margin:auto;
                        width:60px;
                        height:60px;
                        background-color: #fff;
                        border-radius: 50%;
                        background-color: #fff;
                    }
                    .iconBTC{background: url("../../assets/images/icon-svg/icon1-colorful.svg") no-repeat;background-size: cover;z-index: 4}
                    .iconETH{background: url("../../assets/images/icon-svg/icon2-colorful.svg") no-repeat;background-size: cover;z-index: 4}
                    .iconLTC{background: url("../../assets/images/icon-svg/icon3-colorful.svg") no-repeat;background-size: cover;z-index: 4}
                    .iconDASH{background: url("../../assets/images/icon-svg/icon4-colorful.svg") no-repeat;background-size: cover;z-index: 4}
                    .iconXMR{background: url("../../assets/images/icon-svg/icon5-colorful.svg") no-repeat;background-size: cover;z-index: 4}
                    .iconZEC{background: url("../../assets/images/icon-svg/icon6-colorful.svg") no-repeat;background-size: cover;z-index: 4}
                }
                .contaniner{
                    margin-top: 42px;
                    position: relative;
                    /* 价格 */
                    .price{
                        text-align: center;
                        p{
                            span{
                                font-size: 36px;
                            }
                            span:last-child{
                                font-size: 58px;
                            }
                        }
                        .p2{
                            font-family: "CircularAirLight", "PingFang SC", "Microsoft YaHei" !important;
                            text-align: center;
                            font-size: 18px;
                            color:#00c6bc;
                        }
                        .isSolded1{color:#c2c2c2;}
                    }

                    /* 描述 */
                    .line{border-bottom: 1px solid #c2c2c2}
                    .describe{
                        position: relative;
                        padding:36px 32px 31px 32px;

                        .describeItem{
                            margin-bottom:6px;
                            line-height: 22px;
                            clear: both;
                            .text{
                                font-family: "CircularAirLight", "PingFang SC", "Microsoft YaHei" !important;;
                                font-size: 13px;
                                color:#9490a5;
                            }
                            .number{
                                /*font-family: "CircularAirLight", "PingFang SC", "Microsoft YaHei" !important;;*/
                                font-size: 16px;
                                color:#7b7494;
                            }
                            .icon{
                                display: inline-block;
                                /*float: right;*/
                                margin: 4px 0 0 8.2px;
                                width:12px;
                                height:12px;
                                font-size: 13px;
                                line-height: 16px;
                                text-align: center;
                                color:#fff;
                                /*background-color: #9490a5;*/
                                border-radius: 50%;
                                cursor: pointer;
                            }
                            .describeItem_text{
                                display: none;
                                position: absolute;
                                top: -74px;
                                right: 19px;
                                width:209px;
                                /*height:165px;*/
                                padding:16px;
                                font-size: 13px;
                                line-height: 1.46;
                                color:#9490a5;
                                box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
                                background-color: #f7f7fa;
                                border: solid 0.5px rgba(0, 0, 0, 0.2);
                                border-radius: 6px;
                            }
                            .icon:hover+.describeItem_text{
                                display: block;
                            }
                            .isSolded1{color:#c2c2c2;}
                            .isSolded2{color:#bcbcbc;}
                        }
                        .marginTop18px{
                            margin-top:18px;
                            margin-bottom: 0;
                        }
                    }

                    /* 是否可以购买 */
                    .notice{
                        position: relative;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding:26px 24px 24px 24px;
                        line-height: 22px;

                        .left{
                            line-height: 1.46;
                            .left_title{
                                font-family: "CircularAirLight", "PingFang SC", "Microsoft YaHei" !important;;
                                font-size: 13px;
                                color: #9490a5;
                            }
                            .number{
                                font-weight: bold;
                                font-size: 13px;
                                color: #2f2c37;
                            }
                            .left_icon{
                                display: inline-block;
                                margin-left:8.2px;
                                width:12px;
                                height:16px;
                                font-size: 12px;
                                line-height: 18px;
                                text-align: center;
                                color:#fff;
                                /*background-color: #9490a5;*/
                                border-radius: 50%;
                                cursor: pointer;

                                img{
                                    display: block;
                                    margin-top: 5px;
                                }
                            }
                            .notice_text{
                                display: none;
                                position: absolute;
                                top: -82px;
                                right: 3px;
                                padding:16px 0 16px 16px;
                                width:224px;
                                /*height:89px;*/
                                font-size: 13px;
                                line-height: 1.46;
                                color: #9490a5;
                                border-radius: 6px;
                                box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
                                background-color: #f7f7fa;
                                border: solid 0.5px rgba(0, 0, 0, 0.2);

                            }

                            .left_icon:hover+.notice_text{
                                display: block;
                            }



                        }
                        .right{
                            span{
                                display: block;
                                padding:14px 25px;
                                /*width:70px;*/
                                font-size: 16px;
                                color:#fff;
                                border-radius: 4px;
                                background-color: #00c6bc;
                                cursor: pointer;
                            }
                        }

                    }
                    .cantbuy{
                        position: absolute;
                        z-index: 4;
                        display: block;
                        margin:0 auto;
                        margin-top:58px;
                        padding:15px 0 ;
                        width:100%;
                        text-align: center;
                        color: #fff;
                        background-color: #6ad6d1;
                        border-bottom-right-radius: 4px;
                        border-bottom-left-radius: 4px;
                        cursor: pointer;
                    }

                }
            }
            .item_line{
                width:1176px;
                display: flex;
                justify-content: space-between
            }
            .secondItem{
                .product_price-contaniner-item{
                    margin:0;
                }
            }
        }
    }
    .home_card{
        background: transparent !important;
        overflow: initial !important;
        border:none !important;
        box-shadow: none !important;
    }
    .isSolded1{color:#c2c2c2;}
    .isSolded2{color:#bcbcbc;}
    @media only screen and (max-width: 768px){
        .product_price{
            min-width: 100%;

            &-contaniner{
                width:100%;
                padding: 50px 0;

                &-item{
                    margin-bottom:80px;
                }


                .item_line{
                    width:100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-direction: column;
                }
                .secondItem{
                    .product_price-contaniner-item{
                        margin-bottom: 80px;

                        &:last-child{
                            margin:0;
                        }
                    }
                }
            }
        }

    }
</style>

<template>
    <div class="product_price">
        <div class="product_price-contaniner">
            <panel class="home_card" >
                <div slot="content" class="" v-loading="loading">
                    <div class="item_line" style="">
                        <div class="product_price-contaniner-item" v-for="(item,key) in productData" :key="key" v-if="key<=2">
                            <!-- 是否售罄 -->
                            <!--<img v-if="item.purchasable == false" class="soldout" src="../../assets/images/icon-svg/soleout.svg" alt="">-->
                            <div v-if="item.purchasable == false" class="soldout">
                                <p class="soldout_text">{{$t('home.3.h6')}}</p>
                            </div>

                            <!-- 标题 && Logo -->
                            <div class="title">
                                <!--<img :src=item.src alt="">-->
                                <span class="iconbg"></span>
                                <span class="icon" :class="'icon'+item.coin_code"></span>
                                <p :class="{isSolded1:item.purchasable == false}" class="CircularAirMedium">{{ item.coin_type }}</p>
                            </div>
                            <div class="contaniner">
                                <!-- 价格 -->
                                <div class="price">
                                    <p><span :class="{isSolded1:item.purchasable == false}">$</span><span :class="{isSolded1:item.purchasable == false}">{{ item.unit_price*item.min_amount }}</span></p>
                                    <p class="p2" :class="{isSolded1:item.purchasable == false}">{{$t('home.3.h1',{minpurchase:item.min_amount})}} {{ formatUnit(item.product_unit) }}H/s</p>
                                </div>
                                <!-- 合约 -->
                                <div class="describe" :class="{line:item.purchasable === true}">
                                    <div class="describeItem">
                                        <span class="text" :class="{isSolded2:item.purchasable == false}">{{$t('home.3.h2')}} </span><br>
                                        <span class="number" :class="{isSolded2:item.purchasable == false}">{{ item.min_amount }} {{ formatUnit(item.product_unit) }}H/s</span>
                                    </div>
                                    <div class="describeItem">
                                        <span class="text" :class="{isSolded2:item.purchasable == false}">{{$t('home.3.h3')}}</span><br>
                                        <span class="number" :class="{isSolded2:item.purchasable == false}">${{ item.electric_cost }} {{$t('home.3.h1',{minpurchase:item.product_base_unit})}} {{ formatUnit(item.product_unit) }}H/s</span>
                                        <span class="icon"><img src="../../assets/images/home/product-i.svg" alt=""></span>
                                        <div class="describeItem_text" v-html="$t('home.3.h3c1')">
                                            <!--{{$t('home.3.h3c1')}}-->
                                        </div>
                                    </div>
                                    <div class="describeItem marginTop18px">
                                        <span class="number" :class="{isSolded1:item.purchasable == false}">{{ item.contract_period_year }} {{$t('home.3.h4')}}</span>
                                    </div>

                                </div>
                                <!-- 购买 -->
                                <!-- 购买 -->
                                <div class="notice" v-if="item.purchasable == true">
                                    <div class="left">
                                        <span class="left_title">{{$t('home.3.h5')}}</span>
                                        <span class="left_icon"><img src="../../assets/images/home/product-i.svg" alt=""></span>
                                        <div class="notice_text" v-html="$t('home.3.h5c1',{coinname:item.coin_code})">{{}}</div>
                                        <br><span class="number">{{ formatProfit(item.profit_coin,item.min_amount) }} {{ item.coin_code }} ≈ ${{ formatProfit(item.profit_usd,item.min_amount) }}</span>
                                    </div>
                                    <p class="right">
                                        <span @click="linkToBuy(item)"> {{$t('home.3.b1')}} </span>
                                    </p>
                                </div>
                                <div class="cantbuy" v-else v-loading="item.loading" @click="remindUser(item)">
                                    <p class="" >{{$t('home.3.b2')}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="item_line secondItem" style="display: flex;justify-content: space-between">
                        <div class="product_price-contaniner-item" v-for="(item,key) in productData" :key="key" v-if="key>2">
                            <!-- 是否售罄 -->
                            <!--<img v-if="item.purchasable == false" class="soldout" src="../../assets/images/icon-svg/soleout.svg" alt="">-->
                            <div v-if="item.purchasable == false" class="soldout">
                                <p class="soldout_text">{{$t('home.3.h6')}}</p>
                            </div>

                            <!-- 标题 && Logo -->
                            <div class="title">
                                <!--<img :src=item.src alt="">-->
                                <span class="iconbg"></span>
                                <span class="icon" :class="'icon'+item.coin_code"></span>
                                <p :class="{isSolded1:item.purchasable == false}" class="CircularAirMedium">{{ item.coin_type }}</p>
                            </div>
                            <div class="contaniner">
                                <!-- 价格 -->
                                <div class="price">
                                    <p><span :class="{isSolded1:item.purchasable == false}">$</span><span :class="{isSolded1:item.purchasable == false}">{{ item.unit_price*item.min_amount }}</span></p>
                                    <p class="p2" :class="{isSolded1:item.purchasable == false}">{{$t('home.3.h1',{minpurchase:item.min_amount})}} {{ formatUnit(item.product_unit) }}H/s</p>
                                </div>
                                <!-- 合约 -->
                                <div class="describe" :class="{line:item.purchasable === true}">
                                    <div class="describeItem">
                                        <span class="text" :class="{isSolded2:item.purchasable == false}">{{$t('home.3.h2')}} </span><br>
                                        <span class="number" :class="{isSolded2:item.purchasable == false}">{{ item.min_amount }} {{ formatUnit(item.product_unit) }}H/s</span>
                                    </div>
                                    <div class="describeItem">
                                        <span class="text" :class="{isSolded2:item.purchasable == false}">{{$t('home.3.h3')}}</span><br>
                                        <span class="number" :class="{isSolded2:item.purchasable == false}">${{ item.electric_cost }} {{$t('home.3.h1',{minpurchase:item.product_base_unit})}} {{ formatUnit(item.product_unit) }}H/s</span>
                                        <span class="icon"><img src="../../assets/images/home/product-i.svg" alt=""></span>
                                        <div class="describeItem_text" v-html="$t('home.3.h3c1')">
                                            <!--{{$t('home.3.h3c1')}}-->
                                        </div>
                                    </div>
                                    <div class="describeItem marginTop18px">
                                        <span class="number" :class="{isSolded1:item.purchasable == false}">{{ item.contract_period_year }} {{$t('home.3.h4')}}</span>
                                    </div>

                                </div>
                                <!-- 购买 -->
                                <!-- 购买 -->
                                <div class="notice" v-if="item.purchasable == true">
                                    <div class="left">
                                        <span class="left_title">{{$t('home.3.h5')}}</span>
                                        <span class="left_icon"><img src="../../assets/images/home/product-i.svg" alt=""></span>
                                        <div class="notice_text" v-html="$t('home.3.h5c1',{coinname:item.coin_code})">{{}}</div>
                                        <br><span class="number">{{ formatProfit(item.profit_coin,item.min_amount) }} {{ item.coin_code }} ≈ ${{ formatProfit(item.profit_usd,item.min_amount) }}</span>
                                    </div>
                                    <p class="right">
                                        <span @click="linkToBuy(item)"> {{$t('home.3.b1')}} </span>
                                    </p>
                                </div>
                                <div class="cantbuy" v-else v-loading="item.loading" @click="remindUser(item)">
                                    <p class="" >{{$t('home.3.b2')}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </panel>
        </div>
    </div>
</template>

<script>
    import panel from "../../components/base/panel"
    import panelHead from "../base/panel-head"
    import {ERR_OK} from "../../assets/js/config.js"
    import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        components: {
            panelHead,panel
        },
        data(){
            return {
                loading:true,
                title:"Just For You",
                subtitle:"Highest Yield Cloud Computing Platform",
                productData:[
                    {
                        coin_code: "BTC",
                        coin_type: "BTC",
                        contract_period: 15,
                        contract_period_year: null,
                        electric_cost: "0.28",
                        min_amount: null,
                        number: 100,
                        product_base_unit: 1,
                        product_code: "BTC-MiningS9",
                        product_id: 7,
                        product_unit: "T",
                        profit_coin: 0.00000307,
                        profit_usd: 0.02,
                        purchasable: true,
                        revenue_coin: 0.00004571,
                        revenue_usd: 0.3,
                        unit_price: "100"
                    },
                    {
                        coin_code: "ETH",
                        coin_type: "ETH",
                        contract_period: 15,
                        contract_period_year: null,
                        electric_cost: "0.28",
                        min_amount: null,
                        number: 100,
                        product_base_unit: 1,
                        product_code: "BTC-MiningS9",
                        product_id: 7,
                        product_unit: "T",
                        profit_coin: 0.00000307,
                        profit_usd: 0.02,
                        purchasable: true,
                        revenue_coin: 0.00004571,
                        revenue_usd: 0.3,
                        unit_price: "100"
                    },
                    {
                        coin_code: "LTC",
                        coin_type: "LTC",
                        contract_period: 15,
                        contract_period_year: null,
                        electric_cost: "0.28",
                        min_amount: null,
                        number: 100,
                        product_base_unit: 1,
                        product_code: "BTC-MiningS9",
                        product_id: 7,
                        product_unit: "T",
                        profit_coin: 0.00000307,
                        profit_usd: 0.02,
                        purchasable: true,
                        revenue_coin: 0.00004571,
                        revenue_usd: 0.3,
                        unit_price: "100"
                    },
                    {
                        coin_code: "DASH",
                        coin_type: "DASH",
                        contract_period: 15,
                        contract_period_year: null,
                        electric_cost: "0.28",
                        min_amount: null,
                        number: 100,
                        product_base_unit: 1,
                        product_code: "BTC-MiningS9",
                        product_id: 7,
                        product_unit: "T",
                        profit_coin: 0.00000307,
                        profit_usd: 0.02,
                        purchasable: true,
                        revenue_coin: 0.00004571,
                        revenue_usd: 0.3,
                        unit_price: "100"
                    },
                    {
                        coin_code: "XMR",
                        coin_type: "XMR",
                        contract_period: 15,
                        contract_period_year: null,
                        electric_cost: "0.28",
                        min_amount: null,
                        number: 100,
                        product_base_unit: 1,
                        product_code: "BTC-MiningS9",
                        product_id: 7,
                        product_unit: "T",
                        profit_coin: 0.00000307,
                        profit_usd: 0.02,
                        purchasable: true,
                        revenue_coin: 0.00004571,
                        revenue_usd: 0.3,
                        unit_price: "100"
                    },
                    {
                        coin_code: "ZEC",
                        coin_type: "ZEC",
                        contract_period: 15,
                        contract_period_year: null,
                        electric_cost: "0.28",
                        min_amount: null,
                        number: 100,
                        product_base_unit: 1,
                        product_code: "BTC-MiningS9",
                        product_id: 7,
                        product_unit: "T",
                        profit_coin: 0.00000307,
                        profit_usd: 0.02,
                        purchasable: true,
                        revenue_coin: 0.00004571,
                        revenue_usd: 0.3,
                        unit_price: "100"
                    }
                ],
                days:{
                    "2-YEARS":730,
                }
            }
        },
        mounted() {
            this.init()
        },
        computed:{
            ...mapState("auth",["currentUser"]),
        },
        methods:{
            // 统一出口
            init(){
                this.getProductCard()
            },

            //  获取产品卡片数据
            async getProductCard(){
                let resultgetProductCard = await this.$axios("products_list")
                // console.log("resultgetProductCard",resultgetProductCard.data)
                if( resultgetProductCard.code === ERR_OK ){
                    for(let i = 0;i < resultgetProductCard.data.length;i++){
                        resultgetProductCard.data[i].loading = false
                        // console.log("resultgetProductCard.data[i]",resultgetProductCard.data[i])
                    }
                    // console.log("resultgetProductCard Later~",resultgetProductCard.data)

                    this.productData = resultgetProductCard.data
                    this.loading = false
                }else{
                    // console.log("getProductCard has something wrong")
                }

            },

            //  点击立即购买跳转到具体的页面
            linkToBuy(obj){

                // 执行完埋点后跳转到产品页面
                location.href = "/product?code="+obj.coin_code
            },

            //  点击到货通知发出提醒
            async remindUser(obj){
                // 判断用户是否登录了？
                if( this.currentUser === null ){
                    this.$router.push({path:"/login"})
                    return false
                }else{
                    // console.log(this.currentUser.email+" "+obj.coin_code+" "+obj.product_id)
                }
                // 发送请求
                let params = {
                    "productCode": obj.product_code, //需要使用产品的 code 字段
                    // "email": this.currentUser.email  //需求添加Email字段
                }
                // console.log("obj.loading",obj.loading)
                obj.loading = true
                // console.log("obj.loading",obj.loading)
                let resultRemindUser = await this.$axios("product_card",params)
                // console.log("resultRemindUser",resultRemindUser,typeof resultRemindUser.data)
                let coin_style
                if( resultRemindUser.code === ERR_OK && resultRemindUser.data === true){

                    let _self = obj
                    coin_style = setTimeout(()=>{
                        _self.loading = false
                        // console.log("coin_style",coin_style)

                        this.$toast({
                            content: this.$t("errors['cart/wait']['200']"),
                        })

                    },1000)
                    // console.log("coin_style",coin_style)
                    // console.log("Remid User is Success")
                }else{
                    clearTimeout(coin_style)
                    // console.log("remindUser has something wrong ")
                }

            },

            //  格式化单位
            formatUnit(str){
                if (str === "H"){
                    return ""
                }else{
                    return str
                }
            },

            //  格式化Profit
            formatProfit(num1,num2){
                // 排除参数为 0 的情况，否则计算会报错
                if( num1 === 0 ){return 0}
                if( num2 === 0 || num2 === null ){return 0}
                // console.log("formatProfit",num1,num2,typeof num1,typeof num2)

                // 计算并抛出结果
                let temp = this.$math.chain(num1).multiply(num2).round(8).done().toString()
                // console.log("temp",temp)
                return temp
            }

        },

    }
</script>
