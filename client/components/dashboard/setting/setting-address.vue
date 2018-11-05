<style lang="scss" rel="stylesheet/scss" scoped>
    .setting_address{
        margin-bottom:48px;
        .content{
            padding:48px;
        }
        .titleedit{
            font-size: 18px;
            line-height: 22px;
            color:#00c6bc;
            cursor: pointer;
        }
        .lineBottom{
            border-bottom: solid 1px #f7f7fa;
            &:last-child{
                border-bottom: none;

                .coinDiv{
                    &:last-child{
                        padding-bottom:0;
                    }
                }
            }


        }

        .coinDiv{
            /*padding:24px 0;*/
            display: flex;
            justify-content: space-between;
            align-items: center;

            .coinStyle{
                font-size: 18px;
                line-height: 70px;
                color:#2f2c37;
            }
            .addressStyle{
                font-size: 18px;
                line-height: 70px;
                color:#2f2c37;
                .m_show_br{display: none}
                .edit{
                    padding-left:24px;
                    font-size: 18px;
                    line-height: 70px;
                    color:#00c6bc;
                    cursor: pointer;
                }
            }
            .innerdiv{
                padding:0 16px;
                box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .1);
                background-color: #ffffff;
                border: solid 0.5px rgba(0, 0, 0, .2);
                overflow: hidden;

                input{
                    border:transparent;
                }
            }
        }
        .editInput{
            width:400px;
            font-size: 18px;
            color:#000000;
        }
        .mask_div{
            padding-bottom:32px;
            border-bottom: solid 1px #fff;

            .coinDiv{
                display: block;

                .coinName{

                }
                .qwer{

                }
            }
        }
    }
    .el-row {
        margin:0;
    }

    @media only screen and (max-width: 768px){
        .setting_address{
            margin:0 24px 48px 24px;

            .content{
                padding:24px;
                background-color: #fff;
                border-radius: 6px;
                box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
                border: solid 0.5px rgba(0, 0, 0, 0.2);
            }

            .coinDiv{
                display: block;
                padding:24px 0 ;
                &:last-child{
                    /*padding-bottom:0;*/
                }

                .coinStyle{
                    font-size: 16px;
                    line-height:22px;
                }
                .addressStyle{
                    margin-top:6px;
                    width:211px;
                    word-wrap:break-word;
                    font-size: 15px;
                    line-height: 1;
                    color:#9490a5;
                    .m_show_br{
                        display: block;
                    }
                    .edit{
                        padding-left: 0px;
                        font-size: 14px;
                        line-height:22px;
                        color:#00c6bc;
                        cursor: pointer;
                    }
                }
            }

            .masklayer{

                .coinDiv{
                    padding:0 !important;

                    .coinName{

                        .formtitle{
                            font-size: 16px;
                            font-weight: normal;
                            line-height: 1.38;
                        }
                    }
                }
                .addressStyle{
                    width:100%;
                }
                .editInput{
                    width:100%;
                    font-size: 14px;
                    color:#383155;
                }
            }
        }
    }
</style>

<template>
    <section class="setting_address" >
        <panel class="width1776 content" v-loading="loading">
            <panel-head slot="head" type="setting" :title="$t('db.st.h3')" >
                <span slot="setting_button" class="titleedit"></span>
            </panel-head>
            <div slot="content">
                <!-- Address -->
                <div v-for="(coins,key) in userAddress.origin" class="lineBottom">
                    <div class="coinDiv">
                        <div>
                            <span class="coinStyle">{{ coins.coin.code }}</span>
                        </div>
                        <div class="addressStyle">
                            <!--<span v-if="coins.address === ''" class="edit">Edit</span>-->
                            <span >{{ coins.address }}</span>
                            <div class="m_show_br"><br></div>
                            <span class="edit" @click="toShowMask(key)">{{ $t('db.st.h1b1') }}</span>
                        </div>
                    </div>
                </div>




                <!-- 弹层 -->
                <div class="masklayer" v-if="isMaskShow">
                    <!-- 当开启两部验证的时候开启该section -->
                    <pop-box type="modal1" :buttonloading="address_buttonloading" @submitEvent="toSubmitTwoStepStateInAddress()" @cancelEvent="toCanceTwoStepStateInAddress()" :isActive="true" v-if="twoStep.isTwoStepStateShow">

                        <div class="head1" slot="head1">{{ $t('db.st.h7') }}</div>

                        <div slot="content">
                            <p class="formtitle">{{ $t('db.st.h7c3') }}</p>
                            <p class="forminput">
                                <input v-model="twoStep.twoStepcode">
                            </p>
                        </div>

                    </pop-box>



                    <!-- 更新地址 -->
                    <pop-box type="modal1" :buttonloading="address_buttonloading" @submitEvent="toSubmitAddress()" @cancelEvent="toCancelAddress()" :isActive="true" v-if="isUserAddressShow">

                        <div class="head1" slot="head1">{{ $t('db.st.h6') }}</div>

                        <div slot="content">
                            <div class="lineBottom mask_div " style="padding:0;">
                                <div class="coinDiv">
                                    <div class="coinName">
                                        <p class="formtitle">{{ userAddress.edit.coin.code }}</p>
                                    </div>
                                    <p class="forminput">
                                        <input class="editInput" type="text" v-model="userAddress.edit.address">
                                    </p>
                                </div>
                            </div>
                        </div>

                    </pop-box>

                    <popToast :isShow="toastIsShow"></popToast>
                </div>
            </div>
        </panel>
    </section>
</template>

<script>
    import panelHead from "../../base/panel-head"
    import panel from "../../base/panel"
    import popBox from "../../base/pop-box"
    import {ERR_OK} from "../../../assets/js/config.js"
    import popToast from "../../base/pop-toast"
    import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        components: {
            panelHead,panel,popBox,popToast
        },
        data(){
            return {
                loading:true,
                twoStep:{
                    userTwoStepState:false,// 用户两部验证开关是否开启
                    isTwoStepStateShow:false,// 两部验证弹层是否显示
                    twoStepcode:"",
                },
                hasAddressChange:false,//控制用户在开启两步验证的时候首次输入验证码后同一个页面不再出现第二次

                userAddress:{
                    origin:[
                        {coin:{code:"Bitcoin"},address:""},
                        {coin:{code:"LItecoin"},address:""},
                        {coin:{code:"Ethereum"},address:""},
                        {coin:{code:"Dash"},address:""},
                        {coin:{code:"Monero"},address:""},
                        {coin:{code:"Zcash"},address:""}
                    ],
                    edit:{
                        coin:{code:""},
                        address:""
                    }
                },
                isUserAddressShow:false,
                isMaskShow:false,

                toastIsShow:false,

                address_buttonloading:false, // 弹窗确认按钮Loading
            }
        },
        mounted() {
            this.init()
        },
        computed:{
            // 获取用户信息
            ...mapState('auth',['currentUser'])
        },
        methods:{
            // 统一出口
            init(){
                this.getUserTwoStepState()
                this.getUserAddress()
            },
            // 获取用户两部验证状态
            async getUserTwoStepState(){
                this.twoStep.userTwoStepState = this.currentUser.enabledGoogle2step
                // console.log("this.userTwoStepState",this.twoStep.userTwoStepState)
            },
            // 获取用户币种信息
            async getUserAddress(){
                let resuletgetUserAddress = await this.$axios("wallet_list")
                // console.log("resuletgetUserAddress",resuletgetUserAddress)

                if( resuletgetUserAddress.code === ERR_OK){
                    this.userAddress.origin = resuletgetUserAddress.data
                    this.loading = false
                    // console.log("~~~getUserAddress",resuletgetUserAddress.data)
                }
            },

            // 点击 edit 弹出弹层
            async toShowMask(str){
                if( this.currentUser.emailVerified === false ){
                    // 20180720 添加：如果用户没有验证过邮箱，则不允许修改地址，同时发送一封激活邮件到用户的邮箱
                    this.$toast({
                        content: this.$t("db['st']['verifyemail']"),
                    })

                    let params = {
                        email:this.currentUser.email
                    }
                    let resultGetUserAll = await this.$axios("resendemail",params)

                    return false
                }


                // 判断用户的两步验证是否开启
                if( this.twoStep.userTwoStepState === true && this.hasAddressChange === false){
                    this.twoStep.isTwoStepStateShow = true
                    // this.hasAddressChange = true
                }else{
                    this.isUserAddressShow = true
                }


                // 点击时获取原数组的下标，将下标的对象取出并赋值给edit变量
                this.userAddress.edit.coin.code = this.userAddress.origin[str].coin.code
                this.userAddress.edit.address = this.userAddress.origin[str].address

                this.isMaskShow = true
            },


            // 确认修改地址 动作
            async toSubmitAddress(){
                // 按钮Loading true
                this.address_buttonloading = true

                let params = {
                    walletType:this.userAddress.edit.coin.code,
                    address:this.userAddress.edit.address
                }
                // console.log("Address params",params)
                let updataedAddress = await this.$axios("updateaddress",params)
                console.log("updataedAddress",updataedAddress)

                // 如果错误码 等于 ERR_OK 的值
                if( updataedAddress.code === ERR_OK){
                    // 如果返回的数据正常，即data === true
                    if( updataedAddress.data === true ){
                        // console.log("updataedAddress has Changed")
                        this.$toast({
                            content: this.$t("errors['user/setting']['200']",{cointab:params.walletType}),
                            // content: this.$t("errors['cart/wait']['200']"),
                        })
                        // 按钮Loading false
                        this.address_buttonloading = false
                        // 修改成功后重新获取地址并关闭弹窗
                        this.getUserAddress()
                        this.toCancelAddress()

                    }else{
                        // console.log("updataedAddress has Wrong,The code is:",updataedAddress.data.message.message)
                        if( updataedAddress.data.message.message === 6009 ){
                            this.$toast({
                                content: this.$t("errors['user/setting']['2010']"),
                            })
                            // 按钮Loading false
                            this.address_buttonloading = false
                        }
                    }

                }else{
                    // 超时或报错
                    this.address_buttonloading = false
                }




            },
            // 取消修改地址 动作
            toCancelAddress(){
                // console.log("toCancelAddress:console.log")
                this.isMaskShow = false
                this.isUserAddressShow = false
            },


            // 两步验证 提交按钮
            async toSubmitTwoStepStateInAddress(){
                // 按钮Loading true
                this.address_buttonloading = true
                let params={
                    code:parseInt(this.twoStep.twoStepcode)
                }
                let resultValiGGCode = await this.$axios("validatacode",params)
                // console.log("resultValiGGCode",resultValiGGCode)
                if( resultValiGGCode.code === ERR_OK && resultValiGGCode.data === true){
                    // console.log("resultValiGGCode has Close")
                    // 如正确开启下一个窗口
                    this.twoStep.isTwoStepStateShow = false
                    this.isUserAddressShow = true
                    // 成功一次后将 this.hasAddressChange 置为 true
                    this.hasAddressChange = true
                    // return "valiGGCode"

                    // 按钮Loading false
                    this.address_buttonloading = false
                }else{
                    // console.log("resultValiGGCode has Error")
                    this.$toast({
                        content: this.$t("errors['/google2step/validate']['3024']"),
                    })
                    // 按钮Loading false
                    this.address_buttonloading = false
                    return false
                }


            },
            // 两部验证 取消按钮
            toCanceTwoStepStateInAddress(){
                this.twoStep.twoStepcode = ""
                this.twoStep.isTwoStepStateShow = false
                this.isMaskShow = false
            },
        },

    }
</script>
