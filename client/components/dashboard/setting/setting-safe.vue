<style lang="scss" rel="stylesheet/scss" scoped>
    .settingsafe{
        margin-bottom:30px;

        .content{
            padding:48px;
        }

        /* 密码 */
        .lineBottom{
            border-bottom: solid 1px #f7f7fa;
        }
        .password_div{
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 70px;
            border-bottom: solid 1px #f7f7fa;
        }
        .spanTitle{
            font-size: 18px;
            line-height: 70px;
        }
        .subSpanTitle{
            font-size: 12px;
            color:#979797;
        }
        .editButton{
            font-size: 18px;
            line-height: 70px;
            color:#00c6bc;
            cursor: pointer;
        }

        /* 两部验证 */
        .twofactor{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top:24px;

            &_title{
                font-size: 18px;
                line-height: 22px;
                color:#2f2c37;
            }

            .right{

                .is-checked{

                    .el-switch.is-checked .el-switch__core {
                        border-color: #00c6bc !important;
                        background-color: #00c6bc !important;
                    }
                    .el-switch__core {
                        border-color: #00c6bc !important;
                        background-color: #00c6bc !important;
                    }
                }

            }
        }

    }
    .el-row {
        margin:0;
    }
    @media only screen and (max-width: 768px){
        .settingsafe{
            margin:0 24px 48px 24px;

            .content{
                padding:24px;
                background-color: #fff;
                border-radius: 6px;
                box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
                border: solid 0.5px rgba(0, 0, 0, 0.2);
            }

            /* 密码 */
            .lineBottom{
                border-bottom: solid 1px #f7f7fa;
                padding:24px 0 ;
            }
            .spanTitle{
                font-size: 16px;
                line-height: 1.38;
                color: #2f2c37;
            }
            .subSpanTitle{
                font-size: 12px;
                line-height: 1;
                color:#979797;
            }
            .editButton{
                font-size: 14px;
                line-height: 1;
                color:#00c6bc;
                cursor: pointer;
            }

            /* 两部验证 */
            .twofactor{
                display: none;

                &_title{
                    font-size: 16px;
                }

                .right{

                    .is-checked{

                        .el-switch.is-checked .el-switch__core {
                            border-color: #00c6bc !important;
                            background-color: #00c6bc !important;
                        }
                        .el-switch__core {
                            border-color: #00c6bc !important;
                            background-color: #00c6bc !important;
                        }
                    }

                }
            }
        }
    }
</style>

<template>
    <section class="settingsafe">
        <panel class="width1776 content" v-loading="loading">
            <panel-head slot="head" type="setting" :title="$t('db.st.h2')" ></panel-head>
            <div slot="content">
                <!-- Password -->
                <!--<el-row class="lineBottom">-->
                    <!--<el-col :span="4">-->
                        <!--<span class="spanTitle">{{ $t('db.st.h4') }}</span>-->
                    <!--</el-col>-->
                    <!--<el-col :span="20" align="right">-->
                        <!--<span class="editButton" @click="toShowMaskLayer('password')">{{ $t('db.st.h1b1') }}</span>-->
                    <!--</el-col>-->
                <!--</el-row>-->

                <div class="password_div">
                    <div>
                        <span class="spanTitle">{{ $t('db.st.h4') }}</span>
                    </div>
                    <div>
                        <span class="editButton" @click="toShowMaskLayer('password')">{{ $t('db.st.h1b1') }}</span>
                    </div>
                </div>

                <!-- Twofactor -->
                <div class="twofactor">
                    <div class="">
                        <span class="twofactor_title">{{ $t('db.st.h7') }}</span>
                    </div>
                    <div class="right">
                        <el-switch active-color="#00c6bc" v-model="userSecurity.editToTwoStepState" @change="toShowMaskLayer('state')"></el-switch>
                    </div>
                </div>
            </div>
        </panel>

        <!-- 弹层 -->
        <div class="masklayer" v-show="isMaskShow">
            <!-- 当开启两部验证的时候开启该section -->
            <pop-box type="modal1" :buttonloading="fa_buttonloading" @submitEvent="validationCloseTwoStepStateOrEdit()" @cancelEvent="toCloseTwoStepStateOrEdit()" :isActive="true" v-if="userSecurity.hasCloseTwoStepStateOrEdit">

                <div class="head1" slot="head1">{{ $t('db.st.h7') }}</div>

                <div slot="content">
                    <p class="formtitle">{{ $t('db.st.h7c3') }}</p>
                    <p class="forminput">
                        <input  v-model="userSecurity.twoStepcode">
                    </p>
                </div>

            </pop-box>


            <!-- 更改密码 -->
            <pop-box type="modal1" :buttonloading="fa_buttonloading" @submitEvent="toSubmitPassword()" @cancelEvent="toCancelPassword()" :isActive="true" v-if="userSecurity.isPassworldShow">

                <div class="head1" slot="head1">{{ $t('db.st.h4') }}</div>

                <div slot="content">
                    <p class="formtitle">{{ $t('db.st.h4c1') }}</p>
                    <p class="forminput">
                        <input type="password" v-model="userSecurity.oldPassword">
                    </p>
                    <p class="formtitle">{{ $t('db.st.h4c2') }}</p>
                    <p class="forminput">
                        <input type="password" v-model="userSecurity.editedPassword">
                    </p>
                    <p class="formtitle">{{ $t('db.st.h4c3') }}</p>
                    <p class="forminput">
                        <input type="password" v-model="userSecurity.confirmPassword">
                    </p>
                </div>

            </pop-box>

            <!-- 开启/关闭 两部验证 -->
            <pop-box type="modal1" :buttonloading="fa_buttonloading" @submitEvent="toSubmitTwoStepState()" @cancelEvent="toCancelTwoStepState()" :isActive="true" v-show="userSecurity.isTwoStepStateShow">

                <div class="head1" slot="head1">
                    <div class="head2-title">{{ $t('db.st.h7c1') }}</div>
                </div>

                <div slot="content">
                    <div class="formcontent">
                        <ul class="instructions" >
                            <li v-html="$t('db.st.h7c2')"></li>
                        </ul>
                        <div class="codezone">
                            <div class="codeinput">
                                <p class="codeinput_title">{{ $t('db.st.h7c3') }}</p>
                                <input class="codeinput_input" type="text" v-model="userSecurity.twoStepcode">
                            </div>
                            <div class="qrcodeimg">
                                <canvas id="qrccode-canvas"></canvas>
                            </div>
                        </div>

                    </div>
                </div>

            </pop-box>
        </div>
    </section>
</template>

<script>
    import panelHead from "../../base/panel-head"
    import panel from "../../base/panel"
    import popBox from "../../base/pop-box"
    import {ERR_OK} from "../../../assets/js/config.js"
    import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'

    // 埋点
    import { gta } from "../../../lib/gta.js"

    // 二维码需求变量
    var QRCode = require('qrcode')
    var canvas = ''

    export default {
        components: {
            panelHead,panel,popBox
        },
        data(){
            return {
                bannerUrl: "",
                loading:true,
                isMaskShow:false,

                userSecurity:{
                    // 密码相关变量
                    oldPassword:"",
                    editedPassword:"",
                    confirmPassword:"",
                    isPassworldShow:false,

                    // 两部验证相关变量
                    originToStepState:false,// 接口获取的原始值
                    hasCloseTwoStepStateOrEdit:false,// 当 两部验证 开启时，需要的弹出的弹层
                    isTwoStepStateShow:false,// 控制 两部验证 开启时显示的弹层
                    editToTwoStepState:false,
                    twoStepcode:"",
                },
                tmpSwitch:"",
                fa_buttonloading:false

            }
        },
        mounted() {
            this.init()
            this.$nextTick(function () {
                // DOM操作
                canvas = document.getElementById('qrccode-canvas')
            })
            // console.log("this.userSecurity",this.userSecurity)
        },
        computed:{
            // 获取用户信息
            ...mapState('auth',['currentUser']),
            ...mapState('base',['locale']),
        },
        methods:{
            /* 两部验证 弹层逻辑
            *  - mounted时获取用户信息，确认两部验证是否开启,赋值给 originToStepState 作为原始值
            *  - 如开启，需先弹出两部验证的弹层，验证通过后开启需要更改的弹层
            *  - 如未开启，则使用现有流程，需求改什么就改什么
            *  - 在设置完成后需要重新调用一次 init() 方法，重新获取数据
            */

            // 统一出口
            init(){
                // this.getUserAll()
                // this.getUserSecurityState()
                this.getUserAll_safe()
            },

            // 获取用户配置信息
            async getUserAll(){
                this.userSecurity.originToStepState = this.currentUser.enabledGoogle2step
                this.userSecurity.editToTwoStepState = this.currentUser.enabledGoogle2step
                this.loading = false
            },
            async getUserAll_safe(){
                let resultGetUserAll = await this.$axios("getUser")
                // console.log("resultGetUserAll",resultGetUserAll)
                if( resultGetUserAll.code === ERR_OK ){
                    // console.log("this.resultGetUserAll.data.enabledGoogle2step",resultGetUserAll.data.enabledGoogle2step)
                    this.userSecurity.originToStepState = resultGetUserAll.data.enabledGoogle2step
                    this.userSecurity.editToTwoStepState = resultGetUserAll.data.enabledGoogle2step
                    this.loading = false
                }else{
                    // console.log("getUserAll_safe Wrong")
                }

            },

            // 点击弹出弹层
            toShowMaskLayer(str){
                this.isMaskShow = true

                // 判断原始的两部验证是否开启
                if( this.userSecurity.originToStepState === true ){
                    this.userSecurity.hasCloseTwoStepStateOrEdit = true
                    this.tmpSwitch = str
                }else{
                    // 如果是首次开启验证，则去获取接口的数据并生成二维码
                    this._createQrc()

                    // 判断传入的字符串是否是 密码
                    if( str === "password" ){
                        this.userSecurity.isPassworldShow = true
                    }else{
                        this.userSecurity.isTwoStepStateShow = true
                    }
                }



            },
            // 两步验证 获取地址并生成二维码
            async _createQrc(){

                let resultGetUrl = await this.$axios("geturl")
                // console.log("resultGetUrl",resultGetUrl)
                this.bannerUrl = resultGetUrl.data

                QRCode.toCanvas(canvas, this.bannerUrl, (error) => {
                    if (error) {
                        // console.log(error,"error")
                    } else {
                        // console.log('success')
                    }
                })
            },

            // 统一关闭弹层
            toCloseMaskLayer(){
                this.isMaskShow = false
                this.userSecurity.isPassworldShow = false
                this.userSecurity.isTwoStepStateShow = false

                // 关闭时清空输入框信息 及两部验证输入框信息
                this.userSecurity.oldPassword = ""
                this.userSecurity.editedPassword = ""
                this.userSecurity.confirmPassword = ""
                this.userSecurity.twoStepcode = ""
            },

            // Password 弹层：提交更改密码方法
            ...mapActions('auth',['logout']),
            async toSubmitPassword(){
                let _self = this
                this.fa_buttonloading = true
                // 验证输入
                if( this._validationInput() === true){
                    // console.log("_validationInput Passed")
                }else{
                    this.fa_buttonloading = false
                    return false
                }

                // 发送请求
                let params = {
                    originalPwd:this.userSecurity.oldPassword,
                    newPwd:this.userSecurity.editedPassword
                }
                // console.log("params:",params)
                let resultUpdatePassword = await this.$axios("updatepassword",params)
                // console.log("resultUpdatePassword",resultUpdatePassword)
                if( resultUpdatePassword.code === ERR_OK){
                    // console.log("resultUpdatePassword",resultUpdatePassword)

                    // 修改成功提示
                    if( resultUpdatePassword.data === true ){
                        this.$toast({
                            content: this.$t("errors['/user/password/reset']['200']"),
                        })

                        this.logout()
                        window.location.href = "/login"
                        // 1.5s后刷新页面
                        setTimeout(() => {
                            window.location.reload()
                        }, 1500)

                    }else{  // 原始密码错误
                        // console.log("resultUpdatePassword.data",resultUpdatePassword.data)
                        if( resultUpdatePassword.data.message.message === 2022 ){
                            this.$toast({
                                content: this.$t("errors['/user/password/reset']['2010']"),
                            })
                            _self.fa_buttonloading = false
                            return false
                        }else{
                            // this.$toast({
                            //     content: "Unknown Error",
                            // })
                            _self.fa_buttonloading = false
                            return false
                        }

                    }
                }else {
                    _self.fa_buttonloading = false
                    return false
                }

                // 成功后 调用关闭所有弹层方法
                this.toCloseMaskLayer()
            },
            // 修改密码验证
            _validationInput(){
                // 非空验证
                if( this.userSecurity.oldPassword === ""){
                    this.$toast({
                        content: this.$t("toast['reset_password']['e3']"),
                    })
                    return false
                }
                if( this.userSecurity.editedPassword === ""){
                    this.$toast({
                        content: this.$t("toast['reset_password']['e3']"),
                    })
                    return false
                }
                if( this.userSecurity.confirmPassword === ""){
                    this.$toast({
                        content: this.$t("toast['reset_password']['e3']"),
                    })
                    return false
                }

                // 位数验证 暂定为6
                if( this.userSecurity.oldPassword.length < 6 || this.userSecurity.oldPassword.length > 20){
                    this.$toast({
                        content: this.$t("toast['reset_password']['e1']"),
                    })
                    return false
                }
                if( this.userSecurity.editedPassword.length < 6 || this.userSecurity.editedPassword.length > 20){
                    this.$toast({
                        content: this.$t("toast['reset_password']['e1']"),
                    })

                    return false
                }
                if( this.userSecurity.confirmPassword.length < 6 || this.userSecurity.confirmPassword.length >20){
                    this.$toast({
                        content: this.$t("toast['reset_password']['e1']"),
                    })
                    return false
                }

                // 验证两次输入是否一致
                if( this.userSecurity.editedPassword !== this.userSecurity.confirmPassword){
                    this.$toast({
                        content: this.$t("toast['reset_password']['e4']"),
                    })

                    return false
                }

                return true
            },

            // Password 弹层：取消方法
            toCancelPassword(){

                // 调用关闭所有弹层方法
                this.toCloseMaskLayer()
            },


            // TwoStepState 弹窗：确认方法
            async toSubmitTwoStepState(){
                // console.log("this.valiCodeNumber()",this.valiCodeNumber())
                if( this.valiCodeNumber() == "valiCodeNumber"){
                    this.openGGCode()
                }
            },

            // TwoStepState 弹层：取消方法
            toCancelTwoStepState(){
                // console.log("TwoStepState:Cancel")
                this.userSecurity.editToTwoStepState = !this.userSecurity.editToTwoStepState

                // 调用关闭所有弹层方法
                this.toCloseMaskLayer()
            },

            // 当 TwoStepState 开启时弹出的弹层
            async validationCloseTwoStepStateOrEdit(){
                this.fa_buttonloading = true
                // console.log("this.tmpSwitch",this.tmpSwitch)
                let _self = this

                if( this.valiCodeNumber() === "valiCodeNumber" ){

                    // 验证通过后 判断临时变量的值
                    if( this.tmpSwitch === "password" ){

                        // 当开启二次验证 并 需要验证二次验证码的时候
                        let params={
                            code:parseInt(_self.userSecurity.twoStepcode)
                        }
                        let result00 = await this.$axios("validatacode",params)
                        // console.log("resultValiGGCode",result00)
                        // 当验证通过时开启 修改密码弹窗
                        if( result00.data === true ){
                            this.userSecurity.hasCloseTwoStepStateOrEdit = false
                            this.userSecurity.isPassworldShow = true
                            this.fa_buttonloading = false
                        }else{
                            this.$toast({
                                content: this.$t("errors['/google2step/validate']['3024']"),
                            })
                            this.fa_buttonloading = false
                        }
                        this.fa_buttonloading = false

                    }else{
                        this.closeGGcode()
                        // window.location.reload()
                        _self.fa_buttonloading = false
                    }

                }else{
                    this.fa_buttonloading = false
                    return false
                }

            },
            // 当 TwoStepState 开启，且点击 Cancel 的时候
            toCloseTwoStepStateOrEdit(){
                // 当 编辑开关的点击状态 与 原始状态不同时 ，重置为原始状态
                if( this.userSecurity.editToTwoStepState !== this.userSecurity.originToStepState ){
                    this.userSecurity.editToTwoStepState = this.userSecurity.originToStepState
                }

                this.toCloseMaskLayer()
            },


            // 两部验证：验证数字位数
            valiCodeNumber(){
                // 验证 输入的验证码时否为空或者是否为6位
                if( this.userSecurity.twoStepcode === "" ){
                    this.$toast({
                        content: this.$t("errors['/google2step/validate']['3024']"),
                    })
                    return false
                }
                if( this.userSecurity.twoStepcode.length !== 6 ){
                    this.$toast({
                        content: this.$t("errors['/google2step/validate']['3024']"),
                    })
                    return false
                }
                return "valiCodeNumber"
            },
            // 两部验证：验证数字是否正确
            async valiGGCode(){
                let params={
                    code:parseInt(this.userSecurity.twoStepcode)
                }
                let resultValiGGCode = await this.$axios("validatacode",params)
                // console.log("resultValiGGCode",resultValiGGCode)
                if( resultValiGGCode.code === ERR_OK ){
                    // console.log("resultValiGGCode has Close")
                    return "valiGGCode"
                }else{
                    // console.log("resultValiGGCode has Error")
                    this.$toast({
                        content: this.$t("errors['/google2step/validate']['3024']"),
                    })
                }
            },
            // 两部验证：开启两部验证
            async openGGCode(){
                this.fa_buttonloading = true
                let params={
                    code:parseInt(this.userSecurity.twoStepcode)
                }
                let resultOpenGGcode = await this.$axios("opengg2setp",params)
                // console.log("resultOpenGGcode",resultOpenGGcode)
                if( resultOpenGGcode.code === ERR_OK ){
                    this.$toast({
                        content: this.$t("errors['/google2step/active']['201']"),
                    })
                    this.fa_buttonloading = false
                    window.location.reload()
                }else{
                    // console.log("resultOpenGGcode has Error")
                    this.$toast({
                        content: this.$t("errors['/google2step/validate']['3024']"),
                    })
                    this.fa_buttonloading = false
                }
            },
            // 两部验证：关闭两部验证
            async closeGGcode(){
                let params={
                    code:parseInt(this.userSecurity.twoStepcode)
                }
                let resultCloseGGcode = await this.$axios("closegg2setp",params)
                // console.log("resultCloseGGcode",resultCloseGGcode)
                if( resultCloseGGcode.code === ERR_OK ){
                    this.$toast({
                        content: this.$t("errors['/google2step/cancel']['201']"),
                    })
                    window.location.reload()
                }else{
                    // console.log("resultCloseGGcode has Error")
                    this.$toast({
                        content: this.$t("errors['/google2step/validate']['3024']"),
                    })
                    return false
                }

            }


        },

    }
</script>
