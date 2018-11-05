<style lang="scss">
@import '../assets/css/login.scss';
</style>
<template lang="html">
    <section>
        <section  class="sec_input">
            <div class="input_wrap">
                <h4 class="title"> {{$t('db.st.h4c2')}}</h4>
                <input class="input" type="password" name="" v-model="password" @keyup.enter="resetPassword($event)">
            </div>

            <div class="input_wrap">
                <h4 class="title">{{$t('db.st.h4c3')}}</h4>
                <input class="input" type="password" name="" v-model="confirmPassword" @keyup.enter="resetPassword($event)">
            </div>
            <!--  人机验证-->
            
            <!-- <hr> -->
        </section>

        <footer class="foot_wrap clearfix">
              <app-button type="primary" :dark="dark" :loading="loading" class="large" @click="resetPassword">{{$t('sl.rs.b1')}}</app-button>
        </footer>
    </section>
</template>

<script>
import appButton from "./base/button.vue"
import { mapState, mapActions, mapGetters, mapMutations } from "vuex"
import { ERR_OK } from "../assets/js/config.js"
import {getUrlParame} from "../assets/js/tools"

export default {
    data() {
        return {
            password: "",
            confirmPassword: "",
            loading: false,
        }
    },
    mounted(){
        this.urlParame  = getUrlParame()
    },
    computed:{
            dark(){
                let result = this.password && this.confirmPassword
                if(result){
                    return false
                }else{
                    return true
                }
            },
    },
    methods: {
        resetPassword(){
                this.loading = true
                // 初始验证
                const result = this._verification()
                if (!result) {
                    this.loading = false
                    return false
                }
                // ajax
                const self = this
                let params = {
                  "forgetPasswordToken":self.urlParame.token,
                  "newPassword": self.password
                }
                this.$axios('reset_password',params).then(res=>{
                    let errors = this.$t('errors')
                    if(res.code== ERR_OK){
                        this.$router.push({path:'/login'})
                    }else{
                        if(res.message){
                            this.$toast({
                                content: errors['auth/reset_password'][res.message],
                            })
                        }
                    }
                })
        },
        _verification(){
            if(this.password.length < 6 || this.password.length>20){
                this.$toast({
                    content: this.$t('toast.reset_password.e1'),
                })
                return false
            }
            if(this.password !== this.confirmPassword){
                this.$toast({
                    content:this.$t('toast.reset_password.e2')
                })
                return false
            }
            // 密码不一样等报错
            return true
        },
    },
    components:{
        appButton, appGrecaptcha
    }
}
</script>
