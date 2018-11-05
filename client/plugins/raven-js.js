import Vue from "vue";
import Raven from "raven-js";
import RavenVue from "raven-js/plugins/vue";

let config = require("../../nuxt.config.js")
console.log("env:", process.env.NODE_ENV)

// 生产环境+浏览器才执行，则启动sentry
if (!config.dev) {
    // sentry
    Raven.config("https://1c48a65342044376ac7a817e33b696c9@sentry.io/1191167")
        .addPlugin(RavenVue, Vue)
        .install()

    // 将logrocket的数据关联到sentry，便于bug清查
    Raven.setDataCallback(function(data) {
        data.extra.sessionURL = LogRocket.sessionURL
        return data
    })
}
