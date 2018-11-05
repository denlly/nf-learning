import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"


import auth from "./modules/auth"
import base from "./modules/base"
import buy from "./modules/buy"

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== "production"

const plugins = []

// 由于使用了nuxt.js，所以，只有在浏览器环境下，才加载需要浏览器特性的插件
if (process.browser) {
    const createPlugin = require("logrocket-vuex")

    const logrocketPlugin = createPlugin(LogRocket)
    plugins.push(logrocketPlugin)
}

var https = require("https")

const createStore = () => {
    return new Vuex.Store({
        modules: {
            auth,
            base,
            buy,
        },
        plugins: plugins,
        strict: false,
        state: {},
        actions: {
            // nuxtServerInit is called by Nuxt.js before server-rendering every page
            // 该方法在server端执行，每次刷新页面时如果express是登陆状态，则从session user恢复vuex state的auth.currentUser状态
            async nuxtServerInit({
                commit
            }, {
                req
            }) {
                const parsed = req.cookies

                let auth = null
                if (parsed.token) { // 持久化用户登录
                    auth = {
                        token: parsed.token
                    }

                    commit("auth/updateAuth", auth)
                    // 忽略SSL加密,初始化currentUser
                    const instance = axios.create({
                        httpsAgent: new https.Agent({
                            rejectUnauthorized: false,
                        }),
                    })
                    const baseUrl = `${req.protocol}://${req.headers.host}`

                    try {
                        let res = await instance({
                            url: `${baseUrl}/api/user`,
                            methods: "get",
                            data: {},
                            headers: {
                                Authorization: `bearer ${auth.token}`,
                            },
                        })

                        commit("auth/setCurrentUser", res.data)
                    } catch (e) {
                        commit("auth/setCurrentUser", null)
                        console.log("!!!!!!!", e)
                        console.log("!!!!!!!", baseUrl)
                    }
                } else {
                    commit("auth/updateAuth", "")
                    commit("auth/setCurrentUser", null)
                }

                console.log("start server rendering:", req.path)
                // console.log("nuxtServerInit req.user", req.user)
            },
        },
    })
}

const getUser = async function ({
    commit,
    parsed
}, {
    req
}) {

}

export default createStore
