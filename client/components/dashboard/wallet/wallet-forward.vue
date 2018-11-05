<style lang="scss" rel="stylesheet/scss" scoped>
    .walletforward{
        padding:20px 56px 32px 56px;
        font-size: 12px;
        background-color: #f7f7fa;

        .el-row {
            margin:0;
        }
        .el-input{
            margin-bottom:20px;
        }
        .themeTitle{
            margin-bottom:16px;
            font-size: 20px;
            line-height: 25px;
            color: #383155;
        }
        .themeInput{
            box-sizing: border-box;
            margin-bottom:24px;
            padding-left:15px;
            width:100%;
            height:50px;
            font-size: 14px;
            color: #9490a5;
            background-color: #fff;
            border: 1px solid #e4e7ed;
            cursor: not-allowed;
        }
        .margin0{margin:0;}
        /*  */
        .inputdiv{
            position: relative;

            .span_white{
                position: absolute;
                top:1px;
                right:1px;
                padding:15px ;
                font-size: 14px;
                line-height: 18px;
                color:#383155;
                background-color: #fff;
                border-radius: 4px;
            }
        }



        .shadowInput{
            border-radius: 4px;
            box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
            background-color: #ffffff;
            border: solid 0.5px rgba(0, 0, 0, 0.2);
            height:50px;
            caret-color:#00c6bc;
        }
        .tips_getcoin{
            display: flex;
            justify-content: space-between;
            align-items: center;

            .tips{
                width:515px;
                font-size: 16px;
                line-height: 1.75;
                opacity: 0.54;
            }
            .mtips{
                display: none;
            }
            .getCoin{
                padding:15px 75px;
                font-size: 14px;
                line-height: 20px;
                color:#fff;
                border-radius: 4px;
                background-color: #00c6bc;
                cursor: pointer;
            }
        }

        .contentdiv{
            margin-bottom: 10px;
            font-size: 16px;
            line-height: 24px;
            color: #9490a5;
        }

        .isMobileShow{
            display: none;
        }
    }
    .noAddress{
        padding:0;
    }
    @media only screen and (max-width: 768px){
        .walletforward{
            padding:0;

            .none_elcol{display: none;}
            .tips_getcoin{
                display: block;
                padding:48px 0 0 0;

                .tips{
                    display: none;
                }
                .buttondiv{
                    .getCoin{
                        display: block;
                        padding:0;
                        font-size: 14px;
                        line-height: 50px;
                        text-align: center;
                    }
                }
                .mtips{
                    display: block;
                    margin-top:48px;
                    padding-bottom:32px;
                    font-size: 16px;
                    line-height: 28px;
                    color: #717172;
                }

            }


            .isMobileShow{
                display: block;
            }
            .isMobileShow{
                margin-bottom: 20px;
                padding:0;
            }
        }
    }
</style>

<template>
    <div class="walletforward" :class="{noAddress:isNoAddress == false}">
        <div v-if="isNoAddress">
            <!-- 地址 -->
            <p class="themeTitle">{{$t('db.wat.h1c7')}}</p>
            <input class="themeInput" v-model="data.address" disabled/>

            <!-- 提币数量 -->
            <p class="themeTitle">{{$t('db.wat.h1c10')}}</p>
            <div class="inputdiv">
                <input class="el-input__inner themeInput shadowInput"
                       v-model="coinNumber"
                       @keyup="_receiveCoin"
                       type="number"
                       placeholder="0"
                        style="cursor:text;">
                <span class="span_white">{{ data.coin.code }}</span>
            </div>

            <!-- 手续费 & 到账数量 -->
            <el-row>
                <!-- 手续费 -->
                <el-col :span="11" :xs="24">
                    <p class="themeTitle">{{$t('db.wat.h1c8')}}</p>
                    <div class="inputdiv">
                        <input class="themeInput" type="text" v-model="fee" disabled/>
                        <span class="span_white">{{ data.coin.code }}</span>
                    </div>

                    <!--<el-input class="themeInput" type="text" v-model="fee" disabled/>-->
                </el-col>
                <el-col :span="2" class="none_elcol"><div class="grid-content"></div></el-col>

                <!-- 到账数量 -->
                <el-col :span="11" :xs="24">
                    <p class="themeTitle">{{$t('db.wat.h1c9')}}</p>
                    <div class="inputdiv">
                        <input class="themeInput " type="text" v-model="receiveCoin" disabled/>
                        <span class="span_white">{{ data.coin.code }}</span>
                    </div>

                    <!--<el-input class="themeInput margin0" type="text" v-model="receiveCoin" disabled/>-->
                </el-col>
            </el-row>

            <!-- 提示 -->
            <div class="tips_getcoin">
                <div class="tips">
                    <ul>
                        <li>{{$t('db.wat.T1')}}</li>
                        <li v-html="$t('db.wat.T2',{coin_minamount:limitAmount})"></li>
                    </ul>
                </div>
                <div class="buttondiv" @click="getCoin(data)">
                    <span class="getCoin">{{$t('db.wat.b1')}}</span>
                </div>
                <div class="mtips">
                    <ul>
                        <li>{{$t('db.wat.T1')}}</li>
                        <li v-html="$t('db.wat.T2',{coin_minamount:limitAmount})"></li>
                    </ul>
                </div>
            </div>
        </div>
        <div v-else class="isMobileShow tips_getcoin">
            <div class="buttondiv" @click="getCoin(data)">
                <span class="getCoin">{{$t('db.wat.b1')}}</span>
            </div>
        </div>
        <!-- 弹窗 -->
        <div class="masklayer" v-if="isMaskShow">
            <!-- 空地址 Alert 提示 -->
            <pop-box type="modal1" @submitEvent="noAddressButton" @cancelEvent="toCloseMask" :leftButton=noAddressLeftButton :isActive="true" v-if="hasAddress">
                <div class="head1" slot="head1">{{ $t("errors['/wallet/withdraw'][6008]") }}</div>

                <div slot="content" class="contentdiv">

                </div>
            </pop-box>

            <!-- 当开启两部验证的时候开启该section -->
            <pop-box type="modal1" :buttonloading="wallet_buttonloading" @submitEvent="isTwoStepCodeRight" @cancelEvent="toCloseMask" :isActive="true" v-if="twoStep.isShow">

                <div class="head1" slot="head1">{{ $t('db.st.h7') }}</div>

                <div slot="content">
                    <p class="formtitle">{{ $t('db.st.h7c3') }}</p>
                    <p class="forminput">
                        <input v-model="twoStep.code">
                    </p>
                </div>

            </pop-box>

            <!-- 提币二次确认 Alert 提示 -->
            <pop-box type="modal1" :buttonloading="wallet_buttonloading" @submitEvent="getUserWallet" @cancelEvent="withDrawCancel" :isActive="true" :leftButton=confirmWithdrawLeftButton v-if="varSecComfirm">
                <div class="head1" slot="head1">{{ $t("toast['walletwithdraw']['title']") }}</div>

                <div slot="content" class="contentdiv" >
                    <div class=""
                         v-html="$t('toast.walletwithdraw.confirm',
                         {time:time,withdraw_amount:coinNumber,fee:fee,withdraw_amount_fee:receiveCoin}
                         )" ></div>

                </div>
            </pop-box>

        </div>

    </div>

</template>

<script>
    import popBox from "../../../components/base/pop-box"
    import {ERR_OK} from "../../../assets/js/config.js"
    import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
    import {gta} from "../../../lib/gta.js"

    export default {
        props:["data"],
        components: { popBox },
        data(){
            return {
                title:"首页",
                isMaskShow:false,// 遮罩层变量
                hasAddress:false,// 空地址变量
                varSecComfirm:false,// 提币二次确认变量

                coinType:"",
                coinNumber:null,// 用户输入的提币数量
                fee:0,
                receiveCoin:0,// 扣除 fee 后显示的数量
                time:"0000",
                minAmout:0,//最小提币限额

                // 空地址变量
                isNoAddress:true,
                // 两部验证变量
                twoStep:{
                    origin:false,
                    isShow:false,
                    code:""
                },

                wallet_buttonloading:false
            }
        },
        mounted() {
            this.init()
        },
        computed:{
            // 获取用户信息
            ...mapState('auth',['currentUser']),
            limitAmount(){
                let _amount = this.$math.chain( this.data.coin.minAmount ).divide(100000000).done()
                return _amount
            },
            // 空地址左侧按钮
            noAddressLeftButton(){
                return this.$t("errors['/wallet/withdraw']['btn1']")
            },
            // 确认提币左侧按钮
            confirmWithdrawLeftButton(){
                return this.$t("wallet['withdraw']['confirmbtn1']")
            }
        },
        methods:{
            init(){
                this.minimum_withdrawal_amount()
                this.hasAddressMethods()
                this.isTwoSetpStateOpen()
            },
            // 最小提币金额赋值
            minimum_withdrawal_amount(){
                // console.log("this.minAmout",this.minAmout)
                // console.log("this.data.coin.minAmount",this.data.coin.minAmount)
                this.minAmout = this.$math.chain( this.data.coin.minAmount ).divide(100000000).done()
                // console.log("this.minAmout",this.minAmout,typeof this.minAmout)

            },

            //  判断是否有地址
            hasAddressMethods(){
                // 赋值费用字段
                this.fee = this.$math.chain( this.data.coin.fee ).divide(100000000).done()
                let _width = document.body.clientWidth
                // 通过设备宽度判断是PC端还是M端，PC端正常弹出空地址提示，M端的不弹
                if( _width > 375 ){
                    // 判断地址是否存在
                    if( this.data.address === "" ){
                        this.isMaskShow = true
                        this.hasAddress = true
                        this.isNoAddress = false
                    }
                }else{
                    // console.log("M端")
                    if( this.data.address === "" ){
                        // this.isMaskShow = true
                        // this.hasAddress = true
                        this.isNoAddress = false
                    }
                }

            },
            //  用户是否开启了二次认证？
            isTwoSetpStateOpen(){
                // 获取用户状态
                let result = this.currentUser.enabledGoogle2step
                this.twoStep.origin = result
            },

            //  点击提币
            getCoin(str){
                /*
                *   str 为 该币种 对象
                *   验证数值大小使用 input 输入框的值乘以100000000，后比较大小
                */
                // console.log("Coin",str.coin.code,this.coinNumber,this.currentUser.email)
                this.coinType = str.coin.code
                // console.log("this.coinType",this.coinType)
                // console.log("GetCoinNumber",this.coinNumber)

                if( str.address === "" ){
                    this.isMaskShow = true
                    this.hasAddress = true
                    return false
                }

                // 此处已经拿到父级传入的数据，故可以直接对比 输入的金额 和 币种余额 的大小
                // 未输入金额 报错
                if( this.coinNumber === "" || this.coinNumber === 0 || this.coinNumber === null ){
                    this.$toast({
                        content: this.$t("toast.withdraw.e1"),
                    })
                    return false
                }

                let _coinNumber = this.$math.chain( this.coinNumber.toString() ).multiply(100000000).round(0).done()

                // 提币金额小于最小金额 提示
                if( _coinNumber < this.data.coin.minAmount){
                    this.$toast({
                        content: this.$t("errors['/wallet/withdraw'][6005]",{withdraw_min_amount:this.minAmout}),
                    })
                    return false
                }else
                // 余额不足 提示
                if( _coinNumber > (this.data.profitBalance - this.data.frozenProfitBalance)){
                    this.$toast({
                        content: this.$t("errors['/wallet/withdraw'][6010]"),
                    })
                    return false
                }
                // console.log(this.coinNumber,this.data.available)

                // 埋点
                gta.track("wallet:withdraw_button_clicked",
                    {
                        "coin": str.coin.code,
                        "amount": this.$math.chain( this.coinNumber.toString() ).multiply(100000000).round(0).done().toString(),
                        "email": this.currentUser.email
                    })

                // 获取两步验证的状态
                if( this.twoStep.origin === true ){
                    this.isMaskShow = true
                    this.twoStep.isShow = true
                }else{
                    // 获取当前时间
                    let currentTime = this._getFormatTime()
                    this.time = currentTime
                    // 打开提币二次确认弹窗
                    this.isMaskShow = true
                    this.varSecComfirm = true
                }


            },

            // 验证 两步验证码是否正确
            async isTwoStepCodeRight(){
                // 弹窗Loading true
                this.wallet_buttonloading = true

                if( this.twoStep.code === "" ){
                    this.$toast({
                        content: this.$t("errors['/google2step/validate']['3024']"),
                    })
                    this.wallet_buttonloading = false
                    return false
                }
                let _self = this
                // 两步验证 接口
                let params={
                    code:parseInt(this.twoStep.code)
                }
                let resultWithdrawValiGGCode = await this.$axios("validatacode",params)
                // console.log("resultWithdrawValiGGCode",resultWithdrawValiGGCode,111)
                if( resultWithdrawValiGGCode.code === ERR_OK && resultWithdrawValiGGCode.data === true ){
                    this.twoStep.isShow = false
                    this.twoStep.code = ""
                    this.varSecComfirm = true

                    // 弹窗Loading false
                    this.wallet_buttonloading = false
                    // 获取当前时间
                    let currentTime = this._getFormatTime()
                    this.time = currentTime
                    // 打开提币二次确认弹窗
                    this.isMaskShow = true
                    this.varSecComfirm = true

                }else{
                    this.$toast({
                        content: this.$t("errors['/google2step/validate']['3024']"),
                    })
                    // 弹窗Loading false
                    this.wallet_buttonloading = false
                    return false
                }

                // if( resultWithdrawValiGGCode.data === false ){
                //     _self.$toast({
                //         content: this.$t("errors['/google2step/validate']['3024']"),
                //     })
                //     // 弹窗Loading false
                //     this.wallet_buttonloading = false
                //     return false
                // }



            },

            // 二次确认 提币 方法
            async getUserWallet(){
                // 弹窗Loading true
                this.wallet_buttonloading = true

                let _amount = this.$math.chain( this.coinNumber.toString() ).multiply(100000000).round(0).done().toString()
                // console.log("getUserWallet",_amount)
                let params = {
                    "coin": this.coinType,
                    "amount": _amount
                }
                // console.log("params",params,this.currentUser.email)

                // 埋点
                gta.track("wallet:confrim_withdraw_button_clicked",
                    {
                        "coin": params.coin,
                        "amount": params.amount,
                        "email": this.currentUser.email
                    })


                let wallet_withdraw = await this.$axios("wallet_withdraw",params)
                // console.log("Wallet - wallet  return value：",wallet_withdraw.data)

                if( wallet_withdraw.code === ERR_OK && wallet_withdraw.data === true){
                    // console.log("Right")
                    this.$toast({
                        content: this.$t("errors['/wallet/withdraw'][200]"),
                    })
                    // 弹窗Loading false
                    this.wallet_buttonloading = false
                    // 提币成功后 1.5S 后刷新页面
                    setTimeout(() => {
                        window.location.reload()
                    }, 1500)


                }else{
                    // console.log("getUserWallet",wallet_withdraw)
                    // 弹窗Loading false
                    this.wallet_buttonloading = false
                    if( wallet_withdraw.statusCode === 400 ){
                        // console.log("getUserWallet",_amount,typeof _amount)
                        // console.log("Wrong~",wallet_withdraw.message,wallet_withdraw)
                    }
                    if( wallet_withdraw.statusCode === 6008 ){
                        this.$toast({
                            content: this.$t("errors['/wallet/withdraw'][6008]"),
                        })
                    }
                }

            },
            // 二次确认 取消
            withDrawCancel(){
                // 测试字段是否正确
                // console.log(this.coinType,this.receiveCoin,this.currentUser.email,this.$math.chain( this.coinNumber.toString() ).multiply(100000000).round(0).done().toString())

                gta.track("wallet:cancel_withdraw_button_clicked",
                    {
                        "coin": this.coinType,
                        "amount": this.$math.chain( this.coinNumber.toString() ).multiply(100000000).round(0).done().toString(),
                        "email": this.currentUser.email,
                    })

                this.toCloseMask()
            },
            // 时间格式化
            _getFormatTime() {
                let d = new Date()
                let tmplate = d.toLocaleString("zh", { hour12: false })
                let result = tmplate.replace("/",".").replace("/",".")
                // console.log(result,typeof result,"最终的时间")
                return result
            },

            //  计算去除手续费的到账数量
            _receiveCoin(){
                // console.log(this.coinNumber , this.fee)
                let temp = this.$math.chain( this.coinNumber ).subtract(this.fee).round(8).done()
                if( temp <= 0 ){
                    this.receiveCoin = 0
                }else{
                    this.receiveCoin = temp
                }

            },


            // 验证：弹窗 取消 按钮方法
            toCloseMask(){
                this.hasAddress = false
                this.isMaskShow = false
                this.twoStep.isShow = false
                this.twoStep.code = ""
            },
            // 验证：空地址 确定 按钮方法
            noAddressButton(){
                this.$router.push({path:"/dashboard/setting"})
            },

        },

    }
</script>
