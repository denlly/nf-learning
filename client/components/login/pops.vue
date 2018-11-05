<style lang="scss" scoped>
@mixin inputBase {
    h4.title {
        font-size: 18px;
        color: #7b7494;
        padding-bottom: 16px;
    }
    input.input {
        width: 100%;
        height: 50px;
        font-size: 14px;
        box-sizing: border-box;
        line-height: 1;
        border-radius: 4px;
        padding-left: 16.5px;
        caret-color: #00c6bc;
        background-color: #ffffff;
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
        border: solid 0.5px rgba(0, 0, 0, 0.2);
    }
    input::-webkit-input-placeholder,
    textarea::-webkit-input-placeholder {
        font-size: 14px;
        font-weight: 500;
        color: #c2c2c2;
    }
    input::-moz-placeholder,
    textarea:-moz-placeholder {
        font-size: 14px;
        font-weight: 500;
        color: #c2c2c2;
    }
    input::-ms-input-placeholder,
    textarea:-ms-input-placeholder {
        font-size: 14px;
        font-weight: 500;
        color: #c2c2c2;
    }
}

.input_wrap {
    @include inputBase;
    margin: 32px 0 48px;
    margin-bottom: 0px;
}
.pops {
    .resetPassword {
        margin: 0 auto;
    }
    .recaptcha_wrap {
        margin: 48px 0;
    }
}
</style>
<template lang="html">
  <section v-if="popCtrl" class="pops masklayer">
      <pop-panel :dark="dark" class="resetPassword" :loading="loading" :title="$t('sl.rs.h2')" :initData="initData" type="subtitle" @submitEvent="resetPassword()" @cancelEvent="cancel()" v-if="popCtrl === 'resetPassword'">
          <section slot="content">
              <div class="input_wrap">
                  <h4 class="title">{{$t('sl.su.h1c1')}}</h4>
                  <input class="input" type="text" name="" v-model.trim="email" v-focus @keyup.enter="resetPassword()">
              </div>

          </section>
      </pop-panel>
  </section>
</template>

<script>
import axios from "axios"
import {
    mapState,
    mapActions,
    mapGetters,
    mapMutations
} from "vuex"
import popPanel from "../base/pop-panel"

import { ERR_OK } from "../../assets/js/config.js"

export default {
    data() {
        return {
            email: "",
            loading: false,
            // initData: {
            //     subtitle: this.$t('sl.rs.h1'),
            //     submitText: this.$t('sl.rs.b1'),
            //     cancelText: this.$t('gen.btn.cancel')
            // },
        }
    },
    mounted() {

    },
    computed: {
        ...mapState("base", ["popCtrl"]),
        dark() {
            let result = this.email
            if (Object.keys(this.params).length && result) {
                return false
            } else {
                return true
            }
        },
        initData() {
            return {
                subtitle: this.$t("sl.rs.h1"),
                submitText: this.$t("sl.rs.b1"),
                cancelText: this.$t("sl.btn.cancel")
            }
        }
    },
    methods: {
        ...mapMutations("base", ["setPop"]),
        resetPassword() {
            const result = this._verification()
            if (!result) {
                return false
            }
            // 发送数据
            this.loading = true

            const self = this
            let params = { email: self.email }
            params = Object.assign(params, this.params)
            this.$axios("forget_password", params).then(res => {
                if (res.code === ERR_OK) {
                    this.setPop("")
                    let errors = this.$t("errors")
                    this.$toast({
                        content: errors["auth/forget_password"]["200"],
                    })
                } else {
                    if (res.message) {
                        let errors = this.$t("errors")
                        this.$toast({
                            content: errors["auth/forget_password"][res.message],
                        })
                    }
                    if (res.message === 2012) { // 人机校验失败
                        this.resetHumanVerification()
                    }
                }
            })
                .finally(() => {
                    this.loading = false
                })
        },
        cancel() {
            this.email = ""
            this.params = {}
        },
        _verification() {
            if (this.dark) {
                return false
            }
            let emailTest = /^[\w.\-]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,3}$/
            let tempEmail = this.email.toLowerCase()
            if (!emailTest.test(tempEmail)) {
                this.$toast({
                    content: this.$t("toast.forget_password.e1"),
                })
                return false
            }
            return true
        },
    },
    components: {
        popPanel, appGrecaptcha
    }
}
</script>
