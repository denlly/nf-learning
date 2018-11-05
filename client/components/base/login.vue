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
</style>
<template lang="html">
    <section>
        <section  class="sec_input">
            <div class="input_wrap">
                <h4 class="title">{{$t('sl.su.h1c1')}}</h4>
                <input class="input" type="text" name="" v-model.trim="email" @keyup.enter="onLogin($event)" v-focus>
            </div>

            <div class="input_wrap">
                <h4 class="title">{{$t('sl.su.h1c3')}}</h4>
                <input class="input" type="password" name="" v-model="password" @keyup.enter="onLogin($event)">
            </div>
            <p class="reset_password">
                {{$t('sl.lo.h2')}}<span class="href" @click="resetPassword"> {{$t('sl.lo.h3')}}</span>
            </p>

            <hr>
        </section>

        <footer class="foot_wrap clearfix">
              <app-button type="primary" :dark="dark" :loading="loading" class="large" @click="onLogin">{{$t('sl.lo.b2')}}</app-button>
        </footer>

        <app-pops></app-pops>
    </section>
</template>

<script>
import appButton from "./button.vue"
import appPops from "../login/pops.vue"
import { mapState, mapActions, mapGetters, mapMutations } from "vuex"

export default {
    data() {
        return {
            email: "",
            password: "",
            loading: false,
        }
    },
    mounted: function () {
        this.activationEmail()
    },
    computed: {
        dark() {
            let result = this.password && this.email
            if (Object.keys(this.params).length && result) {
                return false
            } else {
                return true
            }
        }
    },
    methods: {
        ...mapActions("auth", ["login"]),
        ...mapMutations("base", ["setPop"]),
        activationEmail() {
            const activationCode = this.$route.query.activationCode
            if (activationCode && activationCode.length > 0) {
                this.$axios("auth_activation", { code: activationCode }).then((res) => {
                    let errors = this.$t("errors")
                    if (res.code === 0) {
                        this.$toast({
                            content: errors["auth/activation"][200],
                        })
                    } else if (res.message == 2001) {
                        this.$toast({
                            content: errors["auth/activation"][2001],
                        })
                    }
                })
            }
        },
        resetPassword() {

            this.setPop("resetPassword")
        },
        async onLogin() {
            this.loading = true

            // 初始验证
            const result = this._verification()
            if (!result) {
                this.loading = false
                return false
            }

            // 登录逻辑
            const self = this
            let params = {
                email: self.email,
                password: self.password,
                google_recaptcha: ""
            }
            params = Object.assign(params, this.params)
            const res = await this.login(params)
            if (res) {
                if (res.message) {
                    this.$toast({
                        content: res.message,
                    })
                }
                if (res.code === 2012) { // 人机校验失败
                    this.resetHumanVerification()
                }
                if (res.code === 2013) { // 人机ip变动
                    alert(2013)
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
            return true
        },

    },
    components: {
        appButton, appPops, appGrecaptcha
    }
}
</script>
