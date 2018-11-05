<style lang="scss" rel="stylesheet/scss" scoped>
    .tablelist{
        &_ul{
            display: inline-block;
            border-radius: 2px;
            background-color: #f7f7fa;
            li{
                display: inline-block;
                padding:12px 27px 13px 28px;
                font-size: 16px;
                color: #383155;
                cursor: pointer;
                &:last-child{border-right:none;}

                img{
                    width:18px;
                    height:18px;
                }
            }
            .active{
                color:#fff;
                border-radius: 4px;
                background-color: #383155;
            }
        }

        .wallet{
            display: inline-block;
            border-radius: 4px;
            line-height:0px;
            overflow: hidden;
            font-size: 0;

            .walletli{
                display: inline-block;
                padding:12px 18px;
                background-color: #f7f7fa;
                cursor: pointer;

                span{
                    display: block;
                    width:24px;
                    height:24px;
                    line-height: 24px;
                    color:#7b7494;
                }

                .icon1{background:url("../../assets/images/icon-svg/icon1-colorful.svg") no-repeat;}
                .icon2{background:url("../../assets/images/icon-svg/icon2-colorful.svg") no-repeat;}
                .icon3{background:url("../../assets/images/icon-svg/icon3-colorful.svg") no-repeat;}
                .icon4{background:url("../../assets/images/icon-svg/icon4-colorful.svg") no-repeat;}
                .icon5{background:url("../../assets/images/icon-svg/icon5-colorful.svg") no-repeat;}
                .icon6{background:url("../../assets/images/icon-svg/icon6-colorful.svg") no-repeat;}

            }
            .alltab{
                float: left;
                // width:24px;
                // height:24px;
                font-size: 16px;
                color:#7b7494;
                 .product_all{
                    width:100%;
                }
            }
            .active{
                .product_all{
                    color:#ffffff;
                    text-align: center;
                }
                background-color: #f5a623;
                .icon1{background:url("../../assets/images/icon-svg/icon1-grey.svg") no-repeat;}
                .icon2{background:url("../../assets/images/icon-svg/icon2-grey.svg") no-repeat;}
                .icon3{background:url("../../assets/images/icon-svg/icon3-grey.svg") no-repeat;}
                .icon4{background:url("../../assets/images/icon-svg/icon4-grey.svg") no-repeat;}
                .icon5{background:url("../../assets/images/icon-svg/icon5-grey.svg") no-repeat;}
                .icon6{background:url("../../assets/images/icon-svg/icon6-grey.svg") no-repeat;}
            }

        }
    }

@media only screen and (min-width: 768px) {

}

@media only screen and (max-width: 768px) {
    .tablelist .tablelist_ul{
            display: flex;
            li{
                padding: 0;
                padding-bottom: 14px;
                padding-top: 16px;
                text-align: center;
                font-size: 12px;
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
            }
    }
    .wallet_all{
        width: 100%;
        display: flex !important;
        li:not(:first-child){
            flex:1 !important;
            text-align: center;
            padding: 12px 0 !important;
            display: flex !important;
            justify-content: center;
        }
    }
}
</style>

<template>
    <div class="tablelist">
        <ul class="tablelist_ul" v-if="type === 'textModel'">
            <li v-for="tab in tabsData" :key="tab.key" :class="{active:tab.key === active.key}" @click="toggleTabs(tab)">{{tab.text}}</li>
        </ul>

        <ul class="wallet" v-if="type === 'wallet'">
            <!-- <li class="walletli alltab" @click="toggleTabs({key:'all'})">All</li> -->
            <li v-for="tab in productTabs" :key="tab.key" class="walletli" :class="{active:tab.key === active.key}" @click="toggleTabs(tab)">
                <span :class="getClass(tab.key)"></span>
            </li>
        </ul>

        <ul class="wallet wallet_all" v-if="type === 'productIcon'">
            <li class="walletli alltab" @click="toggleTabs({key:'all'})" :class="{active:'all' === active}">
                <span class="product_all">{{$t('db.watd.h1c1')}}</span>
            </li>
            <li v-for="tab in productTabs" :key="tab.key" class="walletli" :class="{active:tab.key === active.key}" @click="toggleTabs(tab)">
                <span :class="getClass(tab.key)"></span>
            </li>
        </ul>

        <ul v-if="type === 'dash'" >
            <li >1</li>
            <li >2</li>
            <li >3</li>
            <li >4</li>
            <li >5</li>
            <li >6</li>
            <li >7</li>
            <li v-for="(item,key,index) in dashList">
                <span>{{ item.text }}</span>
            </li>
        </ul>

    </div>
</template>

<script>
    export default {
        props:{
            type:{
                type: String,
                default: "wallet",
            },
            tabsData:{
                type:Array,
                default(){
                    return [{key:''}]
                }
            },
            initActive:Object // 默认初始选中，仅初始一次
        },
        data(){
            return {
                active:0,
                productTabs:[
                    {key:"BTC"},
                    {key:"ETH"},
                    {key:"LTC"},
                    {key:"DASH"},
                    {key:"XMR"},
                    {key:"ZEC"},
                ],
            }
        },
        mounted() {
            this.active = this.initActive ? this.initActive : this.tabsData[0]
            if(this.type === 'productIcon'){ // productIcon情况特殊处理
                this.active = 'all'
            }
        },
        methods:{
            toggleTabs(tab){
                this.active = tab
                if(tab.key ==='all'){// productIcon情况特殊处理
                    this.active = tab.key
                }
                this.$emit("clickMethod",tab)
            },
            //  Wallet
            getClass(key){
                let obj = {
                    BTC:'icon1',
                    ETH:'icon2',
                    LTC:'icon3',
                    DASH:'icon4',
                    XMR:'icon5',
                    ZEC:'icon6',
                }
                return obj[key]
            },
        },

    }
</script>
