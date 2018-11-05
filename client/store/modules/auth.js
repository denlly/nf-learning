import Vue from "vue"
import axios from "axios"
import Cookie from 'js-cookie'

// // initial state
const state = {
    // 当前登录用户，页面刷新后，通过nuxt.js的nuxtServerInit方法恢复
    currentUser: null,
    auth: ''
}

const https = require("https")
let instance
if (process.browser) {
    instance = axios.create({
        httpsAgent: new https.Agent({
            rejectUnauthorized: false,
        }),
        baseURL: `${location.origin}/api`,
        timeout: 15000
    })

    const token = localStorage.getItem("user-token")
    if (token) {
        instance.defaults.headers.common["Authorization"] = `bearer ${token}`
    }
}

// // getters
const getters = {
    // locale: state => state.base.locale
    currentUser: state => state.currentUser,
}

// // actions
const actions = {
    logout: async ({
            commit,
            state
        }) => {
            Cookie.remove('token');
            localStorage.removeItem('user-token')
            gta.reset()
        },
        login: async ({
                rootGetters,
                dispatch,
                commit,
                state
            }, params) => {
                let result = null
                Cookie.remove('token');
                try {
                    let res = await instance.post('/auth/login', params)
                    const auth = {
                        token: res.data.token
                    }
                    localStorage.setItem('user-token', res.data.token)
                    commit('updateAuth', auth)
                    dispatch('getCurrentUser')
                } catch (e) {
                    if (e.request && e.request.readyState == 4 && e.request.status == 0) { // 超时
                        result = {
                            error: "timeout"
                        }
                        return result
                    }

                    const status = e.response.data.message
                    const errors = rootGetters['base/errors']['auth/login']
                    result = {
                        code: status,
                        message: errors[status]
                    };
                }
                return result
            },
            signup: async ({
                    rootGetters,
                    dispatch,
                    commit,
                    state
                }, params) => {
                    let result = null
                    try {
                        let res = await instance.post('/auth/register', params)
                    } catch (e) {
                        if (e.request && e.request.readyState == 4 && e.request.status == 0) { // 超时
                            result = {
                                error: "timeout"
                            }
                            return result
                        }

                        const status = e.response.data.message
                        const errors = rootGetters['base/errors']['auth/register']
                        result = {
                            code: status,
                            message: errors[status]
                        };
                    }
                    return result
                },
                getCurrentUser: async ({
                    commit,
                    state
                }) => {
                    try {
                        let res = await instance({
                            url: '/user',
                            methods: 'get',
                            data: {},
                            headers: {
                                Authorization: `bearer ${state.auth.token}`
                            }
                        })
                        commit("setCurrentUser", res.data)
                    } catch (e) {
                        console.log('/user', e);
                    }
                }

}

// mutations
const mutations = {
    setCurrentUser(state, payload) {
        state.currentUser = payload
    },
    updateAuth(state, data) {
        state.auth = data
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
