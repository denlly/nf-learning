<style lang="scss" rel="stylesheet/scss" scoped>
.coin-card {
    margin: 0 auto;
    max-width: 1176px;
    min-height: 904px;

    &_div {
        display: flex;
        justify-content: space-between;
    }
    &_items {
        box-sizing: border-box;
        margin-bottom: 54px;
        padding: 32px 23px 31px 23px;
        width: 356px;
        /*height:345px;*/
        border-radius: 4px;
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
        background-color: #ffffff;
        border: solid 0.5px rgba(0, 0, 0, 0.2);
    }
    &_item1 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 25px;
        border-bottom: solid 1px #c2c2c2;

        .name {
            display: flex;
            align-items: center;
            font-size: 20px;
            line-height: 40px;

            img {
                width: 40px;
                height: 40px;
                margin-right: 8px;
            }
            .icon {
                display: inline-block;
                width: 40px;
                height: 40px;
                margin-right: 8px;
                /*background: url("../../../assets/images/icon-svg/icon1-colorful.svg");*/
                /*background-size: cover;*/
            }
            .icon1 {
                background: url('../../../assets/images/icon-svg/icon1-colorful.svg');
                background-size: cover;
            }
            .icon2 {
                background: url('../../../assets/images/icon-svg/icon2-colorful.svg');
                background-size: cover;
            }
            .icon3 {
                background: url('../../../assets/images/icon-svg/icon3-colorful.svg');
                background-size: cover;
            }
            .icon4 {
                background: url('../../../assets/images/icon-svg/icon4-colorful.svg');
                background-size: cover;
            }
            .icon5 {
                background: url('../../../assets/images/icon-svg/icon5-colorful.svg');
                background-size: cover;
            }
            .icon6 {
                background: url('../../../assets/images/icon-svg/icon6-colorful.svg');
                background-size: cover;
            }
        }
        .plus {
            width: 24px;
            height: 24px;
            cursor: pointer;
        }
    }
    &_item2 {
        padding: 24px 0;
        border-bottom: 1px solid #c2c2c2;

        .power {
            margin-bottom: 16px;
            font-size: 13px;
            line-height: 16px;
            color: #9490a5;
        }
        /* 数字跳动固定宽度 */
        .hash {
            width: 184px;
            /*background-color: blue;*/
            display: inline-block;
        }
        .number {
            display: inline-block;
            font-size: 30px;
            line-height: 30px;
            color: #383155;
        }
        /* 数字跳动盒子 */
        .skipNumUl {
        }
        .skipNumLi {
            display: inline-block;
        }
        .unit {
            font-size: 15px;
            color: #00c6bc;
        }
    }
    &_item3 {
        padding-top: 30px;
        color: #383155;
        font-size: 13px;
        font-weight: 500;
        line-height: 16px;
    }
}
.marginTop80 {
    margin-top: 80px;
}
.marginBottom16 {
    margin-bottom: 16px;
}

@media only screen and (max-width: 768px) {
    .coin-card {
        margin-top: 50px;
        width: 100%;

        &_div {
            display: flex;
            justify-content: space-between;
            flex-direction: column;
        }
        &_items {
            margin: 0 auto;
            margin-bottom: 50px;
        }
    }
    .marginBottom16{
        margin: 0;
    }
}
</style>

<template>
    <section class="marginTop80 coin-card" v-loading="loading">

        <div class="coin-card_div">
            <div class="coin-card_items" v-for="(coins, key) in coinListData" :key="key" v-if="key<=2">
                <div class="coin-card_item1">
                    <p class="name">
                        <span class="icon" :class="'icon'+(key+1)"></span>
                        <span>{{ coins.coinType.name }}</span>
                    </p>
                    <img class="plus" src="../../../assets/images/icon-svg/iconplus-blue.svg" alt="" @click="toBuyPage(coins)">
                </div>
                <div class="coin-card_item2">
                    <p class="power">{{$t('db.db.h1')}}</p>
                    <p>
                        <span class="number">{{ coins.hashPower }}</span>&nbsp;&nbsp;
                        <span class="unit">{{ formatUnit(coins.unit) }}H/s</span>
                    </p>
                </div>
                <div class="coin-card_item2">
                    <p class="power">{{$t('db.db.h2')}}</p>
                    <p>
                        <span class="number">
                            <!-- 原始值 需要隐藏，如删除数字跳动效果会失效 -->
                            <span style="display: block">{{ coins.expectedRevenue | formatNumber}}</span>
                            <!--&lt;!&ndash; 实际跳动的值 &ndash;&gt;-->
                            <!--<span class="hash">{{ coins.expectedRevenue }}</span>-->

                        </span>&nbsp;&nbsp;
                        <span class="unit">{{ coins.coinType.code }}</span>
                    </p>
                </div>
                <div class="coin-card_item3">
                    <p class="total">{{$t('db.db.h3')}}: {{ __toTotalProfit10Bits(coins.totalProfit) }} {{ coins.coinType.code }}</p>
                </div>
            </div>
        </div>
        <div class="coin-card_div marginBottom16">
            <div class="coin-card_items" v-for="(coins, key) in coinListData" :key="key" v-if="key>2">
                <div class="coin-card_item1">
                    <p class="name">
                        <span class="icon" :class="'icon'+(key+1)"></span>
                        <span>{{ coins.coinType.name }}</span>
                    </p>
                    <img class="plus" src="../../../assets/images/icon-svg/iconplus-blue.svg" alt="" @click="toBuyPage(coins)">
                </div>
                <div class="coin-card_item2">
                    <p class="power">{{$t('db.db.h1')}}</p>
                    <p>
                        <span class="number">{{ coins.hashPower }}</span>&nbsp;&nbsp;
                        <span class="unit">{{ formatUnit(coins.unit) }}H/s</span>
                    </p>
                </div>
                <div class="coin-card_item2">
                    <p class="power">{{$t('db.db.h2')}}</p>
                    <p>
                        <span class="number">
                            <!-- 原始值 需要隐藏，如删除数字跳动效果会失效 -->
                            <span style="display: block">{{ coins.expectedRevenue | formatNumber}}</span>
                            <!--&lt;!&ndash; 实际跳动的值 &ndash;&gt;-->
                            <!--<span class="hash">{{ coins.expectedRevenue }}</span>-->

                        </span>&nbsp;&nbsp;
                        <span class="unit">{{ coins.coinType.code }}</span>
                    </p>
                </div>
                <div class="coin-card_item3">
                    <p class="total">{{$t('db.db.h3')}}: {{ __toTotalProfit10Bits(coins.totalProfit) }} {{ coins.coinType.code }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { ERR_OK } from "../../../assets/js/config.js"
import { gta } from "../../../lib/gta.js"
import { setInterval } from "timers"

export default {
    components: {},
    data() {
        return {
            title: "算力卡片",
            loading: true,
            // 接口对接需求数据
            coinListData: [
                {
                    coinType: {
                        id: 0,
                        dr: 0,
                        createdAt: "2018-06-19T06:34:17.515Z",
                        updatedAt: "2018-06-19T06:34:17.515Z",
                        code: "BTC",
                        name: "BTC",
                        conversion: 100000000
                    },
                    newKeyToShow: "",
                    hashPower: 0,
                    totalProfit: 0,
                    yesterdayProfit: 0
                },
                {
                    coinType: {
                        id: 0,
                        dr: 0,
                        createdAt: "2018-06-19T06:34:17.515Z",
                        updatedAt: "2018-06-19T06:34:17.515Z",
                        code: "ETH",
                        name: "ETH",
                        conversion: 100000000
                    },
                    newKeyToShow: "",
                    hashPower: 0,
                    totalProfit: 0,
                    yesterdayProfit: 0
                },
                {
                    coinType: {
                        id: 0,
                        dr: 0,
                        createdAt: "2018-06-19T06:34:17.515Z",
                        updatedAt: "2018-06-19T06:34:17.515Z",
                        code: "LTC",
                        name: "LTC",
                        conversion: 100000000
                    },
                    newKeyToShow: "",
                    hashPower: 0,
                    totalProfit: 0,
                    yesterdayProfit: 0
                },
                {
                    coinType: {
                        id: 0,
                        dr: 0,
                        createdAt: "2018-06-19T06:34:17.515Z",
                        updatedAt: "2018-06-19T06:34:17.515Z",
                        code: "DASH",
                        name: "DASH",
                        conversion: 100000000
                    },
                    newKeyToShow: "",
                    hashPower: 0,
                    totalProfit: 0,
                    yesterdayProfit: 0
                },
                {
                    coinType: {
                        id: 0,
                        dr: 0,
                        createdAt: "2018-06-19T06:34:17.515Z",
                        updatedAt: "2018-06-19T06:34:17.515Z",
                        code: "XMR",
                        name: "XMR",
                        conversion: 100000000
                    },
                    newKeyToShow: "",
                    hashPower: 0,
                    totalProfit: 0,
                    yesterdayProfit: 0
                },
                {
                    coinType: {
                        id: 0,
                        dr: 0,
                        createdAt: "2018-06-19T06:34:17.515Z",
                        updatedAt: "2018-06-19T06:34:17.515Z",
                        code: "ZEC",
                        name: "ZEC",
                        conversion: 100000000
                    },
                    newKeyToShow: "",
                    hashPower: 0,
                    totalProfit: 0,
                    yesterdayProfit: 0
                },
            ],
            setArr: []
        }
    },
    mounted() {
        this.init()
    },
    computed: {},
    watch: {
        // 路由改变的时候清除所有定时器
        $route(to, from) {
            console.log(to, from)
            let _self = this
            console.log("Watch：路由改变的时候", this.$route.path)

            let timer = 0
            for (timer in this.setArr) {
                console.log("this.setArr", this.setArr)
                console.log("timer", this.setArr[timer])
                clearInterval(_self.setArr[timer])
            }
            // console.log("Watch：循环外this.setArr",this.setArr)

        }
    },
    methods: {
        /*
        *   获取接口数据
        *   1.清洗 预估收益 为10位格式 并可跳动
        *   2.清洗 累计 收益 并展示
        */

        init() {
            this.getUserCoinList()
            // this.toSetTimer()
        },

        //  获取用户币种列表
        async getUserCoinList() {
            let resultGetUserCoinList = await this.$axios("userproductsprofit")
            if (resultGetUserCoinList.code === ERR_OK) {
                this.coinListData = resultGetUserCoinList.data
                // console.log("!! this.coinListData", this.coinListData,
                //     // typeof this.coinListData[0].expectedRevenue,
                //     // typeof this.coinListData[0].yesterdayRevenue
                // )

                // 循环执行跳动数字方法
                this.coinListData.forEach((item) => {
                    this._numberSkip(item)
                })

                this.loading = false
            } else {
                console.log("getUserCoinList Error", resultGetUserCoinList.data)
            }

        },

        // 数字跳动问题
        _numberSkip(obj) {
            if (obj.expectedRevenue === 0 || obj.yesterdayRevenue === "0") {
                return false
            }

            const skip = 5000
            const date = new Date().getTime() / 1000
            const earn = parseInt(obj.yesterdayRevenue) / 3600 / 24 * obj.hashPower
            const revenue = obj.expectedRevenue

            // 每5秒重新计算一次收益
            let set = setInterval(() => {
                const nowDate = new Date().getTime() / 1000
                const nowEarn = earn * (nowDate - date)
                const add = revenue + nowEarn
                const timerAdd = earn * 3 / 50

                // 实现数字快速累加动态效果
                const timer = setInterval(() => {
                    if (obj.expectedRevenue < add) {
                        obj.expectedRevenue = obj.expectedRevenue + timerAdd
                    }
                }, 20)

                setTimeout(() => {
                    clearInterval(timer)
                    obj.expectedRevenue = add
                }, 1000)

            }, skip)

            this.setArr.push(set)
        },

        // 跳转到购买页面 & 埋点
        toBuyPage(obj) {
            console.log("obj: ", obj)
            // gta.track("dashboard:buy_button_clicked", { "product_id": id, "coin": code })

            // 格式化 手续费
            let _fee = this.$math.chain(obj.coinType.fee).divide(100000000).done()

            gta.track("Product Clicked",
                {
                    "product_id": obj.id, // 产品id，对应Product表的id
                    "name": obj.coinType.name, // 产品名字：使用币种英文全名，例如：Bitcoin、Ethereum、Litecoin、DASH等
                    // "contract": "HashBTC01", // 合约名字  无合约名称，字段将删除
                    "currency": "usd", // 定价货币类型  写死为usd
                    "minimum_purchase": obj.product.minAmount+obj.unit+"H/s", // 最小购买单位：1 TH/s、1 MH/s、1 GH/s、1 HH/s
                    "daily_fee": obj.product.electricityFee, // 日维护费
                    // 因接口无该字段 因此取消 ~
                    "contract_time": obj.product.periodOfValidity, // 合约时长，单位：天
                    "current_daily_profit_usd": parseInt(obj.yesterdayRevenue), // 当前日净利润，单位：美元
                    "price": parseInt(obj.product.price), // 美金单价
                    "quantity": obj.product.baseUnit, // 数量
                }
            )

            // 执行完埋点后跳转到产品页面
            this.$router.push({ path: "/dashboard/purchasing-power?code=" + obj.coinType.code })
        },

        // 累计利润清洗为10位格式
        __toTotalProfit10Bits(str) {
            return (str / 1e8).toFixed(8)
        },

        //  格式化单位
        formatUnit(str) {
            if (str === "H") {
                return ""
            } else {
                return str
            }
        },
    },
    beforeDestroy() {
        // console.log("beforeDestroy")
        clearInterval()
    },
    destroyed() {
        // 跳转页面的时候销毁所有定时器！
        // console.log("beforeDestroy")
        let _self = this
        let timer = 0
        for (timer in this.setArr) {
            // console.log("this.setArr", this.setArr)
            // console.log("timer", this.setArr[timer])
            clearInterval(_self.setArr[timer])
        }
        // console.log("destroyed：循环外this.setArr",this.setArr)
    }
}
</script>
