// 入口文件，管理挂载各函数
import Vue from 'vue'
import axios from 'axios'

// toast组件挂载
import toast from "../plugins/toast"
Vue.use(toast)

// import {Calc} from '../assets/js/math.js'
import $axios from '../assets/js/axios.js'
import math from 'mathjs';

var https = require("https")

// 测试环境锁页面
if (process.browser) {
    let auth = localStorage.getItem('testAuth')
    let pages = !['/test_auth'].includes(location.pathname) // 例外页面
    let hostName = ['dev.datafountain.cn'].includes(location.host)
    if (hostName && pages && !auth) {
        location.href = '/test_auth'
    }
}

if (process.browser) {
    const instance = axios.create({
        httpsAgent: new https.Agent({
            rejectUnauthorized: false,
        }),
        baseURL: `${location.origin}/api`,
    })
    const token = localStorage.getItem('user-token')
    if (token) {
        instance.defaults.headers.common['Authorization'] = `bearer ${token}`
    }

    Vue.prototype.$http = instance
    Vue.prototype.$axios = $axios
}



// Vue.prototype.$math = Calc
Vue.prototype.$math = math
