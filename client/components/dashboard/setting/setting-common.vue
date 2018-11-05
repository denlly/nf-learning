<style lang="scss" rel="stylesheet/scss" scoped>
    .settingcommon{
        margin-bottom:48px;
        .content{
            padding:48px;
        }

        /* Email 更改 */
        .lineBottom{
            border-bottom: solid 1px #f7f7fa;
        }
        .email_div{
            display: flex;
            justify-content: space-between;
            align-items: center;
            height:70px;
            border-bottom: solid 1px #f7f7fa;

            .email_div_right{
                text-align: right;
            }

            .email_title{
                font-size: 18px;
            }
            .email{
                /*padding-right: 24px;*/
                font-size: 18px;
                color: #383155;
            }
            .resendButton{
                font-size: 18px;
                color: #00c6bc;
                cursor: pointer;
            }
        }
        .spanTitle{
            font-size: 18px;
            line-height: 70px;
        }
        .itemcontent{
            padding-right:24px;
            font-size: 18px;
            line-height: 70px;
            color:#383155;
        }
        .editButton{
            font-size: 18px;
            line-height: 70px;
            color:#00c6bc;
            cursor: pointer;
        }

        /* Newsletter */
        .news{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top:14px;

            .newsTitle{
                display: inline-block;
                font-size: 18px;
                color: #383155;
            }
            .subNewsTitle{
                font-size: 15px;
                color: #9490a5;
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

    /* 弹层 */
    .masklayer1{
        position: fixed;
        top:0;
        left:0;
        z-index: 9;
        width: 100VW;
        height:100VH;
        background-color: rgba(0,0,0,0.4);
    }
    .el-row {
        margin:0;
    }

    @media only screen and (max-width: 768px){
        .settingcommon{
            margin:0 24px 48px 24px;

            .content{
                padding:24px;
                background-color: #fff;
                border-radius: 6px;
                box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
                border: solid 0.5px rgba(0, 0, 0, 0.2);
            }

            /* Email */
            .email_div{
                .email_title{
                    font-size: 16px;
                    color:#2f2c37
                }
                .email{
                    font-size: 16px;
                }
                .resendButton{
                    font-size: 14px;
                }
            }
            .spanTitle{
                font-size: 16px;
                line-height: 70px;
            }
            .itemcontent{
                padding-right:6px;
                font-size: 14px;
            }
            .editButton{
                font-size: 14px;
            }

            /* Newsletter */
            .news{
                .newsTitle{
                    font-size: 16px;
                    line-height: 1.38;
                    color: #2f2c37;

                }
            }

        }
    }
</style>

<template>
    <section class="settingcommon">
        <panel class="width1776 content" v-loading="loading">
            <panel-head slot="head" type="setting" :title="$t('db.st.h1')" ></panel-head>
            <div slot="content">
                <!-- Email -->
                <!--<el-row class="lineBottom">-->
                    <!--<el-col :span="4">-->
                        <!--<span class="spanTitle">{{ $t('cs.h3.5') }}</span>-->
                    <!--</el-col>-->
                    <!--<el-col :span="20" align="right">-->
                        <!--<span class="itemcontent">{{ userInfo.originEmail }}</span> <br>-->
                        <!--<span class="editButton validation" @click="openEmailMash()" v-if="!userInfo.hasValidationEmail">{{ $t('db.st.b2') }}</span>-->
                    <!--</el-col>-->

                <!--</el-row>-->
                <!-- Email 20180721 修改为两行-->
                <div class="email_div">
                    <div>
                        <span class="email_title">{{ $t('cs.h3.5') }}</span>
                    </div>
                    <div class="email_div_right">
                        <span class="email">{{ userInfo.originEmail }}</span> <br>
                        <span class="resendButton" @click="openEmailMash()" v-if="!userInfo.hasValidationEmail">{{ $t('db.st.b2') }}</span>
                    </div>
                </div>

                <!-- News -->
                <div class="news">
                    <div class="news_left">
                        <span class="newsTitle">{{ $t('db.st.h1c1') }}</span><br>
                        <span class="subNewsTitle">{{ $t('db.st.h1c2') }}</span>
                    </div>
                    <div class="right" id="switch_green">
                        <el-switch active-color="#00c6bc" v-model="userInfo.originNewsletter" @change="editButton('newsletter')"></el-switch>
                    </div>
                </div>

            </div>
        </panel>

        <!-- 弹层 -->
        <div class="masklayer" v-if="isMaskShow">
            <!-- 更新Email 20180629 更新：不允许用户更改邮箱 -->
            <!-- 更新Email 20180706 更新：添加Alert提示 -->
            <pop-box type="modal1" @submitEvent="toResendEmail()" @cancelEvent="clickCancel()" :leftButton="'Resend activate email'" :isActive="true" v-if="userInfo.isEmailShow">

                <div class="head1" slot="head1">Do you want to send validation messages?</div>

                <!--<div class="head2" slot="head2">-->
                    <!--<div class="head2-title">Whether open Newsletter？</div>-->
                    <!--<div class="head2-subtitle">Are you sure?</div>-->
                <!--</div>-->

                <div slot="content">
                    <!--<div class="formcontent">-->
                        <!--Turn on the switch will receive the latest news we sent you and suggest opening it-->
                    <!--</div>-->
                </div>

            </pop-box>

            <!-- 开启/关闭 NewsLetter -->
            <pop-box type="modal1" @submitEvent="changeSwitch()" @cancelEvent="clickSwitchCancel()" :isActive="true" v-if="userInfo.isNewsLetterShow" :buttonloading="fa_buttonloading">

                <!--<div class="head1" slot="head1">{{ popupWindow.type1.title }}</div>-->

                <div class="head2" slot="head1">
                    <div class="head2-title">{{ $t('db.st.h1c2') }}</div>
                </div>

                <div slot="content">
                    <div class="formcontent">
                        Turn on the switch will receive the latest news we sent you and suggest opening it
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

    export default {
        components: {
            panelHead,panel,popBox
        },
        data(){
            return {
                loading:true,
                userInfo:{
                    hasValidationEmail:false,//邮箱是否已验证

                    originEmail:"",
                    editEmail:"",
                    confirmEmail:"",
                    isEmailShow:false,

                    originNewsletter:false,
                    editNewsLetter:false,
                    isNewsLetterShow:false
                },

                isMaskShow:false,

                popupWindow:{
                    type1:{
                        title:"Update Email"
                    },
                    type2:{
                        title:"Whether open Newsletter？",
                        sub_title:"theme"
                    }
                },

                fa_buttonloading:false
            }
        },
        mounted() {
            this.init()
        },
        computed:{  },
        methods:{
            //  进入页面首先执行 获取用户配置的方法
            //  当用户点击 Edit 按钮时
            //  1.弹出弹窗，显示对应要编辑的项目()
            //  2.用户输入及校验 input()
            //  3.点击Submit方法提交数据(每个修改项拥有一个自身的方法)
            //  4.点击Cancel方法关闭弹窗(只有一个方法)

            //  统一出口
            init(){
                this.getUserAll()
            },

            // 获取用户配置信息
            async getUserAll(){
                let resultGetUserAll = await this.$axios("getUser")
                // console.log("resultGetUserAll",resultGetUserAll)
                if( resultGetUserAll.code === ERR_OK ){
                    this.userInfo.originEmail = resultGetUserAll.data.email
                    this.userInfo.hasValidationEmail = resultGetUserAll.data.emailVerified
                    this.userInfo.originNewsletter = resultGetUserAll.data.subscribed
                    this.loading = false
                }else{
                    this.userInfo.originEmail = ""
                    this.userInfo.hasValidationEmail = true
                    this.userInfo.originNewsletter = false
                    // console.log("resultGetUserAll","Error")
                }
            },

            // 开启 Email 弹窗
            openEmailMash(){
                // this.isMaskShow = true
                // this.userInfo.isEmailShow = true
                // console.log(11)

                this.toResendEmail()
            },
            // 重发邮件
            async toResendEmail(){
                let params = {
                    email:this.userInfo.originEmail
                }
                let resultGetUserAll = await this.$axios("resendemail",params)
                // console.log("resultGetUserAll",resultGetUserAll,"data" in resultGetUserAll,typeof resultGetUserAll.message)
                if( "data" in resultGetUserAll  ){
                    this.$toast({
                        content: this.$t("errors['/auth/resend_activation_email'][200]"),
                    })

                    this.clickCancel()
                    this.clickCancel()

                }else{
                    // 20180720 需求取消
                    // if( resultGetUserAll.message === 2004 ){
                    //     this.$toast({
                    //         content: this.$t("errors['auth_resend_activation_email'][2004]"),
                    //     })
                    // }
                }


            },


            // 点击弹出弹层：如果传入 email 则显示 Email弹层，如果不是则显示 NewsLetter 弹层
            // 20180713 需求变更：点击NewsLetter不需要弹出任何提示
            editButton(str){
                if(str === "email"){

                }else{
                    this.changeSwitch()
                }
            },


            // 关闭所有弹窗
            clickCancel(){
                // 全部完成后关闭弹窗
                this.isMaskShow = false
                this.userInfo.isEmailShow = false
                this.userInfo.isNewsLetterShow = false
            },


            // NewsLetter弹层点击 确认按钮 执行的方法
            async changeSwitch(){
                let UpdateAccountDto={
                    // newsLetterSwitch:this.userInfo.editNewsLetter,
                    "field": "subscribed",
                    "value": ""
                }
                if( this.userInfo.originNewsletter === false ){
                    UpdateAccountDto.value = "false"
                }else{
                    UpdateAccountDto.value = "true"
                }
                let result = await this.$axios("updatesetting",UpdateAccountDto)
                // console.log(result.subscribed)
                if( result.code === ERR_OK ){
                    // alert("Success")
                    // 全部完成后关闭弹窗
                    // this.clickCancel()
                }else{
                    // console.log("Some Wrong")
                }


            },
            // NewsLetter弹层点击 取消按钮 执行的方法
            clickSwitchCancel(){
                this.userInfo.originNewsletter = !this.userInfo.originNewsletter
                // console.log("editNewsLetter",this.userInfo.originNewsletter)

                // 全部完成后关闭弹窗
                this.clickCancel()
            }

        },

    }
</script>
