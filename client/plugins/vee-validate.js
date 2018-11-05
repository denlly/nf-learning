import Vue from "vue"
import zh_CN from "vee-validate/dist/locale/zh_CN"
import VeeValidate, { Validator } from "vee-validate"

// Add locale helper.
Validator.localize("zh_CN", zh_CN)

// Install the Plugin and set the locale.
Vue.use(VeeValidate, {
    locale: "zh_CN"
})



/**
 * 比特币地址验证器
 */
Validator.extend("bitcoinAddress", {
    getMessage: field => "比特币地址格式不正确",
    validate: value => /^[13][a-km-zA-HJ-NP-Z0-9]{26,33}$/igm.test(value)
})
