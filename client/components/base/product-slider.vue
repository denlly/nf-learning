<style lang="scss" scoped>
@mixin boxPadding{
    padding: 0 48px;
}
@mixin bg{
    .iconBTC{background: url("../../assets/images/icon-svg/icon1-colorful.svg") no-repeat;background-size: cover;}
    .iconETH{background: url("../../assets/images/icon-svg/icon2-colorful.svg") no-repeat;background-size: cover;}
    .iconLTC{background: url("../../assets/images/icon-svg/icon3-colorful.svg") no-repeat;background-size: cover;}
    .iconDASH{background: url("../../assets/images/icon-svg/icon4-colorful.svg") no-repeat;background-size: cover;}
    .iconXMR{background: url("../../assets/images/icon-svg/icon5-colorful.svg") no-repeat;background-size: cover;}
    .iconZEC{background: url("../../assets/images/icon-svg/icon6-colorful.svg") no-repeat;background-size: cover;}
}


.productSlider{
    width: 1176px;
    min-width: 581px;
    margin: 0 auto;
    background-color: #ffffff;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
    border: solid 0.5px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    .tabs{
        @include boxPadding;
        li{
            // width: 90px;
            margin-right: 48px;
            padding: 32px 0 ;
            padding-bottom: 30px;
            border-bottom: 4px solid #fff;
            float: left;
            cursor: pointer;
            .text{
                font-size: 20px;
                color: #dbdbdb;
            }
        }

        li.active{
            border-bottom: 4px solid #00c6bc;
            @include bg;
            .text{
                color: #000000 !important;
            }

        }
        .iconBTC{background: url("../../assets/images/icon-svg/icon1_slider_grey.svg") no-repeat;background-size: cover;}
        .iconETH{background: url("../../assets/images/icon-svg/icon2_slider_grey.svg") no-repeat;background-size: cover;}
        .iconLTC{background: url("../../assets/images/icon-svg/icon3_slider_grey.svg") no-repeat;background-size: cover;}
        .iconDASH{background: url("../../assets/images/icon-svg/icon4_slider_grey.png") no-repeat;background-size: cover;}
        .iconXMR{background: url("../../assets/images/icon-svg/icon5_slider_grey.svg") no-repeat;background-size: cover;}
        .iconZEC{background: url("../../assets/images/icon-svg/icon6_slider_grey.svg") no-repeat;background-size: cover;}
    }
    footer{
        @include boxPadding;
        hr {
        	width: 100%;
            // height: 0.5px;
            height: 0px;
        	border: solid 0.5px #c2c2c2;
        }
        li{
            padding:34px  0;
        }
    }
}
.price_wrap{
    .perPrice{
        float: left;
        position: relative;
        &_num{
            .num{
                font-size:36px;
                color: #2f2c37;
            }
            .unit{
                font-size: 20px;
                color: #2f2c37;
            }

            .text{
                font-size: 18px;
                color: #9490a5;
            }
        }
        .perPrice_unit{
            position: absolute;
            left: 150px;
            top: 20px;
        	width: 81px;
        	line-height: 33px;
        	border-radius: 3px;
        	border: solid 1px #00c6bc;
            font-size: 12px;
            color: #00c6bc;
            text-align: center;
        }
    }
    .totalPrice_wrap{
        .totalPrice{
            font-size: 60px;
            color: #000000;
        }
        .unit{
            font-size: 30px;
        }
    }
}

.aboutInfo{
    padding: 51px 0 ;
    .fl{
        font-size: 16px;
        color: #000000;
        opacity: 0.54;
        line-height: 1.75;
    }
    .fr{
        position: relative;
        top: 10px;
    }
}

@media only screen and (min-width: 768px) {
    .productSlider{
        border-radius: 6px;
        min-height: 640px;
        .tabs li{
            padding-left: 30px;
            position: relative;
        }
    }
    .icon_coin{
        width: 24px;
        height: 24px;
        left: 0;
        display: block;
        position: absolute;
    }
}

@media only screen and (max-width: 768px) {
	.productSlider{
		min-width: initial;
		width: 100%;
	}
    .tabs_m{
        padding-bottom: 16px;
        padding-top: 16px;
        padding-left:24px;
        .list{
            position: relative;
            padding: 16px 24px 16px 30px;
            .text{
                font-size: 20px;
                color: #2f2c37;
            }
            @include bg;
            .icon_coin{
                width: 24px;
                height: 24px;
                left: 0;
                top: 17px;
                display: block;
                position: absolute;
            }
            .drop_icon{
                $width:5px;
                display: block;
                position: absolute;
                width: 0;
                height: 0;
                border-left: $width solid transparent;
                border-right: $width solid transparent;
                border-top: 6px solid #00c6bc;
                border-radius: 1px;
                right:  17px;
                top: 25px;
            }
        }
        ul .list:last-child{
            padding-bottom: 32px;
        }
    }
    .price_wrap {
        .perPrice{
            &_num{
                .num{
                    font-size:18px;
                }
                .unit{
                    font-size: 9px;
                }

                .text{
                    font-size: 10px;
                }
            }
            &_unit{
                left: 77 + 16px !important;
                top: 3px !important;
            }
        }
        .totalPrice_wrap{
            .totalPrice{
                font-size: 30px;
            }
            .unit{
                font-size: 15px;
            }
        }
    }
    .productSlider{
        footer{
            padding: 0;
        }
        .price_wrap{
            padding: 36px 24px 32px 24px;
        }
        .aboutInfo{
            padding-left: 24px;
            padding-right: 24px;
            .fl{
                float: none;
            }
            .fr{
                float: none;
            }
            >div:nth-child(2){
                margin-top: 25px;
            }
        }
    }
}

</style>

<template lang="html">
    <section class="productSlider" v-loading="renderLoading" :class="{'gray':!productData.product.inventory}">
        <ul class="tabs clearfix hidden-xs-only">
            <li v-for="item in Object.values(allProdutData)" @click="toggleProduct(item.code)" :class="{'active':productData.code ===item.code}">
                <span :class="item.icon" class="icon_coin"></span>
                <span class="text fontwight500">{{item.name}}</span>
            </li>
        </ul>

        <!-- 移动端进度条下拉 -->
        <div class="tabs_m hidden-sm-and-up">
            <div class="list" @click="dropCtrl = !dropCtrl" >
                <span :class="productData.icon"  class="icon_coin"></span>
                <span class="text fontwight500">{{productData.name}}</span>
                <span class="drop_icon" v-if="dropList.length"></span>
            </div>
            <ul v-if="dropCtrl">
                <li class="list" v-for="item in dropList"  @click="toggleProduct(item.code,true)">
                    <span :class="item.icon" class="icon_coin"></span>
                    <span class="text fontwight500">{{item.name}}</span>
                </li>
            </ul>
        </div>

        <app-slider v-show="!dropCtrl" v-if="!renderLoading"  :inventory="productData.product.inventory" @onChange="setSliderVal" :initVal="sliderVal" :stepArr="productData.stepArr" :productType="productData.code" :productData="productData" :breakpoint="productData.breakpoint"></app-slider>
        <!-- 底部价格渲染 -->
        <footer v-show="!dropCtrl">
            <ul>
                <li class="price_wrap clearfix">
                    <div class="perPrice">
                        <div class="perPrice_num">
                            <div>
                                <span class="unit">$</span>
                                <span class="num">{{productData.product.price}}</span>
                            </div>
                            <div class="text">{{$t('pricing.t2',{minunit:''})}} {{perHashUnit}}H/s</div>
                        </div>
                        <div class="perPrice_unit">
                            x {{hashTotal}}
                        </div>
                    </div>
                    <div class="totalPrice_wrap fr">
                        <span class="unit">$</span>
                        <span class=" totalPrice fontwight500"  v-if="!renderLoading">{{(productData.product.price * this.hash).toFixed(2)}}</span>
                    </div>
                </li>
                <hr>
                <li class="aboutInfo clearfix">
                    <div class="fl" v-if="productData.product.inventory">
                        <div class="">
                            {{$t('pricing.t3')}} <span class="fontwight_blod">${{(productData.product.electric_cost * this.hash).toFixed(2)}}</span>
                        </div>
                        <div class="">
                            {{$t('pricing.t4')}}<span class="fontwight_blod">{{(productData.product.profit_coin * this.hash).toFixed(8)}} {{productData.code}} ≈ ${{(productData.product.profit_usd * this.hash).toFixed(2)}}</span>
                        </div>
                    </div>
                    <div class="fr">
                        <app-button type="primary" :loading="loading" :dark="dark" class="large" @click="onBuy">{{$t('pricing.btn')}}</app-button>
                    </div>
                </li>
            </ul>
        </footer>
    </section>
</template>

<script>
import appSlider from "./slider.vue"
import {productData,ERR_OK} from "../../assets/js/config.js"
import appButton from "./button.vue"
import {getUrlParame} from "../../assets/js/tools"
import { mapState, mapActions, mapGetters, mapMutations } from "vuex"

export default {
    data(){
        return {
            productData:{
                icon:'',
                code:'',//类型
                breakpoint:[],
                stepArr:[],
                product:{unit:'T'}
            },
            initData:{},
            sliderVal:0,
            allProdutData:{BTC:{}}, // 所有数据的字典结构
            hashTotal:'0 TH/s',
            hash:'', //以基础单位的算力
            loading:false,
            renderLoading:true,
            urlParame:{},
            dropCtrl:false
        }
    },
    created(){
    },
    mounted(){
        this.urlParame  = getUrlParame()
        this.getProducts()
    },
    computed:{
        ...mapState('auth',['auth']),
        dropList(){ // 手机端产品下拉
            let result = Object.assign({}, this.allProdutData)
            delete result[this.productData['code']]
            return  Object.values(result)
        },
        dark(){
                let result = this.sliderVal !== 0
                if(result){
                    return false
                }else{
                    return true
                }
        },
        perHashUnit(){
            let unit = this.productData.product.unit
            let num = 1000
            let unitArr = ['H','K','M','G','T','P','E']
            let i = unitArr.indexOf(unit)
            if(i!==0){
                unit = unitArr[i-1]
            }else{
                num = 1
            }
            if(unit=== 'H'){
                unit = ''
            }
            return `${num}${unit}`
        }
    },
    methods:{
            async getProducts(){
                this.renderLoading = true
                let res = await this.$axios('typeWithProducts',{})
                if(res.code== ERR_OK){
                    await  this._initData(res.data) // 初始数据，初始化tabs
                    let temp = this.urlParame.code ? this.urlParame.code :'BTC' // 默认选中
                    await  this.toggleProduct(temp)
                }
                this.renderLoading = false
            },
            _initData(data){
                let result = {}
                let initData = {}
                data.forEach(item=>{
                    initData[item.coin_code] = item
                    // 读取后端有用数据
                    let product = {
                        code:item.product_code,
                        price:item.unit_price,
                        inventory:item.number,
                        unit:item.product_unit,
                        electric_cost:item.electric_cost,
                        profit_usd:item.profit_usd,
                        profit_coin:item.profit_coin
                    }
                    let {coin_code:code,coin_type:name} = item
                    let obj = {code,name,product:product}


                    // 读取后端有用数据（之前接口）
                    // let {code,name,products:product} = item
                    // let obj = {code,name,product:product[0]}

                    //拼接前端渲染数据
                    let frontend = productData[code]
                    obj = Object.assign(obj,frontend)
                    // result[item.code] = obj // 之前接口
                    result[item.coin_code] = obj
                })
                this.allProdutData = result
                this.initData = initData
                // console.log(this.initData,'全部数据');
            },
            setSliderVal(res){ // 返回的值
                this.sliderVal = res.position;
    			// let result = `${res.hashTotal} ${this.productData.product.unit}H/s`
    			let result = `${res.hash} ${res.unit}H/s`
                this.hashTotal = result
                this.hash = res.hashTotal
            },
            toggleProduct(type,dropCtrl){
                if(type === this.productData['code']){
                    return false
                }
                this._productViewedGta({type})

                this.sliderVal = 0 // 切换传入初始值
                this.productData =  this.allProdutData[type]
                if(dropCtrl){
                    this.dropCtrl = false
                }
            },
            _productViewedGta({type,isProceed}){
                let data = this.initData[type]
                let frontend = productData[type]
                data = Object.assign({},data,frontend)

                let {product_id,coin_type:name,electric_cost:daily_fee,contract_period:contract_time,profit_usd:current_daily_profit_usd,unit_price:price,} = data
                let unit = data.product_unit === 'H' ? `${data.product_unit}/s` : `${data.product_unit}H/s`
                let quantity = data.stepArr[0]
                let minimum_purchase = `${quantity} ${unit}` //自己算
                let obj = {
                    product_id, // 产品id，对应Product表的id
                    name, // 产品名字：使用币种英文全名，例如：Bitcoin、Ethereum、Litecoin、DASH等
                    currency:'usd', // 定价货币类型
                    minimum_purchase, // 最小购买单位：1 TH/s、1 MH/s、1 GH/s、1 HH/s
                    daily_fee:parseFloat(daily_fee), // 日维护费
                    contract_time, // 合约时长，单位：天
                    current_daily_profit_usd, // 当前日净利润，单位：美元
                    price:parseFloat(price), // 美金单价
                    quantity, // 数量
                    "value": parseFloat(price)*parseFloat(quantity), // 总价
                }
                // gta逻辑
                if(isProceed){
                    obj.cart_id ='default'
                    obj.quantity = this.hash
                    obj.value = parseFloat(price)*parseFloat(this.hash)
                }else{
                }
            },
            onBuy(){
                if(!this.sliderVal){
                    return
                }
                this._productViewedGta({type:this.productData.code,isProceed:true})
                if(!this.auth){
                    window.location.href=`/product/sign?code=${this.productData.product.code}&amount=${this.hash}`;
                }else{
                    window.location.href = `/dashboard/purchasing-power/buy?code=${this.productData.product.code}&amount=${this.hash}`;
                }
            },
    },
    components: {
        appSlider, appButton
    }
}
</script>
