<style lang="scss">
@import '../../assets/css/login.scss';
@import '../../assets/css/checkbox.css';
.radio .el-checkbox__inner {
    border-radius: 10px;
    width: 20px;
    height: 20px;
}
.el-checkbox__inner::after {
    height: 11px;
    left: 6px;
    top: 2px;
    width: 5px;
}

.error {
    .is-focus {
        .el-checkbox__inner {
            //background-color: red !important;
            border-color: red !important;
        }
    }
    .el-checkbox__inner {
        //background-color: red !important;
        border-color: red !important;
    }
}
</style>
<template lang="html">
    <section>
        <section  class="sec_input">
            <div class="input_wrap">
                <h4 class="title">{{$t('sl.su.h1c1')}}</h4>
                <input class="input" type="text" name="" v-model.trim="email" @keyup.enter="onSignup($event)" v-focus>
            </div>

            <div class="input_wrap">
                <h4 class="title">{{$t('sl.su.h1c3')}}</h4>
                <input class="input" type="password" name="" v-model="password" @keyup.enter="onSignup($event)">
            </div>

            <div class="input_wrap">
                <h4 class="title">{{$t('sl.su.h1c4')}}</h4>
                <input class="input" type="password" name="" v-model="confirmPassword" @keyup.enter="onSignup($event)">
            </div>
            <!--  人机验证-->


            <hr>
        </section>

        <footer class="foot_wrap clearfix">
              <div class="checkbox_wrap clearfix">
                  <div class="radio_wrap">
                      <el-checkbox @keyup.enter.native="onSignup" class="radio" v-model="checked"></el-checkbox>
                  </div>
                  <div class="text_wrap">
                      <span class="text" v-html="$t('sl.su.h1c5')"></span>
                  </div>
              </div>
              <app-button type="primary" :dark="dark" :loading="loading" class="large" @click="onSignup">{{$t('sl.su.b2')}}</app-button>
        </footer>
    </section>
</template>

<script>
import appButton from "./button.vue"
import { mapState, mapActions, mapGetters, mapMutations } from "vuex"

export default {
    data() {
        return {
            checked: false,
            email: "",
            password: "",
            confirmPassword: "",
            loading: false,
        }
    },
    mounted: function () {
        this._initInvitationCode()
    },
    computed: {
        dark() {
            let result = this.password && this.email && this.confirmPassword && this.checked
            if (Object.keys(this.params).length && result) {
                return false
            } else {
                return true
            }
        }
    },
    methods: {
        ...mapActions("auth", ["signup"]),
        _initInvitationCode() {
            let obj = { invitationCode: localStorage.getItem("invitationCode") }
            let code = obj.invitationCode ? obj.invitationCode : ""
            this.invitationCode = decodeURIComponent(code)
        },
        async onSignup(event) {
            this.loading = true
            // 初始验证
            const result = this._verification()
            if (!result) {
                this.loading = false
                return false
            }
            // 注册逻辑
            const self = this
            let params = {
                email: self.email,
                password: self.password,
                recaptchaCode: "", // 人机验证
                invitationCode: self.invitationCode
            }
            params = Object.assign(params, this.params)
            const res = await this.signup(params)
            if (res) {
                if (res.message) {
                    this.$toast({
                        content: res.message,
                    })
                }
                if (res.code === 2012) { // 人机校验失败
                    this.resetHumanVerification()
                }
            } else {
                this.$emit("success")
            }
            this.loading = false
        },
        _verification() {
            if (this.dark) {
                return false
            }
            let emailTest = /^[\w.\-]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,3}$/
            let tempEmail = this.email.toLowerCase()
            if (!emailTest.test(tempEmail)) {
                this.$toast({
                    content: this.$t("toast.register.e1"),
                })
                return false
            }
            if (this.password.length < 6 || this.password.length > 20) {
                this.$toast({
                    content: this.$t("toast.register.e4"),
                })
                return false
            }
            if (this.password !== this.confirmPassword) {
                this.$toast({
                    content: this.$t("toast.register.e3")
                })
                return false
            }
            return true
        },
    },
    components: {
        appButton, appGrecaptcha
    }
}
</script>
