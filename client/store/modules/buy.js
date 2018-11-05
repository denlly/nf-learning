import Vue from 'vue';
import axios from 'axios';
import Cookie from 'js-cookie';
import {
    request
} from 'https';
const Mathjs = require('mathjs');


const https = require("https")

let instance;
if (process.browser) {
    instance = axios.create({
        httpsAgent: new https.Agent({
            rejectUnauthorized: false,
        }),
        baseURL: `${location.origin}`,
    })
    const token = localStorage.getItem("user-token")
    if (token) {
        instance.defaults.headers.common["Authorization"] = `bearer ${token}`
    }
}

// initial state
const state = {
    product: {},
    contract: {
        // productAmount: 5,
        // productCode: "MiningS9"
    },
    discount: {},
    pageStatus: {},
    currencies: [],
    currency: {}, //selected currency;
    paymentWays: [],
    charge: {},
    step: 0,
};

// getters
const getters = {
    product: state => state.product,
    contract: state => state.contract,
    pageStatus: state => state.pageStatus,
    discount: state => state.discount,
    paymentWays: state => state.paymentWays,
    currencies: state => state.currencies,
    charge: state => state.charge,
    currency: state => state.currency,
    step: state => state.step,

    getOrderAmount: state => {
        if (!state.product.price || !state.contract.productAmount) {
            0;
        } else {
            return Mathjs.chain(state.product.price).multiply(state.contract.productAmount).done();
        }
    },
    getElectricityFee: state => {
        return parseFloat((state.product.electricityFee * state.contract.productAmount || 0).toFixed(4));
    },
    getPeriodOfValidity: state => `${!state.product.periodOfValidity ? '' : state.product.periodOfValidity} Days`,
    getDiscount: state => `${state.discount.discount * 100}%`,
    getTotalAmountUsd: state => {
        const amount = state.product.price * state.contract.productAmount * (1 - state.discount.discount);
        return `$${amount.toFixed(2)}`;
    },
    getTotalAmountCoin: state => {
        if (!state.currency ||
            JSON.stringify(state.currency) == '{}' ||
            !state.currency.usd) {
            return "";
        }
        return ` ${(
            state.product.price *
            state.contract.productAmount *
            (1 - state.discount.discount) /
            state.currency.usd
        ).toFixed(8)} ${state.currency.unit}`;
    },
};

// actions
const actions = {
    getProductInfo: async ({
        rootGetters,
        dispatch,
        commit,
        state
    }, params) => {
        let result = null;
        try {
            const res = await instance.get('/api/products/detail/' + state.contract.productCode);

            const oldProduct = state.product;
            const newProduct = res.data;
            commit('setProduct', newProduct);
        } catch (error) {
            console.dir(error);
            // const status = error.response.status;
            // const errors = rootGetters['buy/errors']['buy'];
            // result = {
            //     code: status,
            //     message: errors[status]
            // };
        }
        return result;
    },
    getDiscountInfo: async ({
        rootGetters,
        dispatch,
        commit,
        state
    }, params) => {
        axios
            .get('/api/invitation/discount', {
                params,
            })
            .then(result => {
                if (!result.data) {
                    commit('setDiscount', {
                        discount: '0',
                    });
                } else {
                    commit('setDiscount', result.data);
                }
            })
            .catch(error => {
                commit('setDiscount', {
                    discount: '0',
                });
            });
    },
    getCurrenciesInfo: async ({
        rootGetters,
        dispatch,
        commit,
        state
    }) => {
        try {
            instance.get('/api/tickers', {
                headers: {
                    "in-cached": true,
                },
                timeout: 10000,
            }).then(result => {
                commit('setCurrencies', result.data);
                commit('setCurrency', null);

            }).catch(error => {
                // { coin: element, usd: ticker['USD'] }
                const makeCurrencies = ['btcusd', 'bchusd', 'ethusd', 'ltcusd'];
                const result = [];
                makeCurrencies.forEach((item) => {
                    result.push({
                        coin: item,
                        usd: 0
                    })
                })
                commit('setCurrencies', result);
                commit('setCurrency', null);
                console.log("call tickers api was error" + JSON.stringify(error));
            });

        } catch (error) {
            // console.dir(Object.keys(error), Object.keys(error));
            // const status = error.response.status;
            // const errors = rootGetters['buy/errors'];
            // result = {
            //     code: status,
            //     message: errors[status]
            // };
        }
    },
    getPaymentWayInfo: async ({
        rootGetters,
        dispatch,
        commit,
        state
    }) => {
        try {
            const res = await instance.get('/api/payment/ways');
            commit('setPaymentWays', res.data);
        } catch (error) {
            const status = error.response.status;
            const errors = rootGetters['buy/errors']['way'];
            result = {
                code: status,
                message: errors[status],
            };
        }
    },

    payCoin: async ({
        rootGetters,
        dispatch,
        commit,
        state
    }, params) => {
        return instance.post('/api/payment/paycoin', params);
    },
    getPaymentInfo: async ({
        rootGetters,
        dispatch,
        commit,
        state
    }, params) => {
        const axiosReqest = instance.get('/api/payment/info/' + params.flowNumber);
        axiosReqest.then(result => {
            commit('setCharge', result.data);
        });
        return axiosReqest;
        // try {
        //     result = instance.get('/api/payment/info/' + params.flowNumber);
        //     commit('setCharge', result.data);
        // } catch (error) {
        //     return {
        //         code: 404,
        //         message: error,
        //     };
        // }
        // return result;
    },
    computeSettlement: ({
        rootGetters,
        dispatch,
        commit,
        state
    }, params) => {
        const contractProp = {
            amount: state.product.price * state.contract.productAmount * (1 - state.discount.discount),
            discount: state.discount.discount,
        };
        commit('setContract', contractProp);
    },
    getChargeStatusInfo: async ({
        rootGetters,
        dispatch,
        commit,
        state
    }, params) => {
        return instance.get(`/api/payment/status/${params.code}`);
        // let result;
        // try {
        //     const res = await instance.get(`/api/payment/status/${params.code}`);
        //     result = {
        //         data: res.data,
        //         headers: res.headers,
        //     };
        // } catch (error) {
        //     result = {
        //         err: {
        //             code: 404,
        //             message: error,
        //         }
        //     }
        // }
        // return result;
    },
    getCheckUriInfo: async ({
        rootGetters,
        dispatch,
        commit,
        state
    }, params) => {
        return instance.post(`/api/payment/checkuri`, {
            coin: state.charge.payUnit,
            txid: params.txid
        });
    },
};

// mutations
const mutations = {
    setProduct(state, data) {
        state.product = data;
    },
    setContract(state, data) {
        for (const k in data) {
            state.contract[k] = data[k];
        }
    },
    setDiscount(state, data) {
        state.discount = data;
    },
    setCurrencies(state, data) {
        state.currencies = data;
    },
    setPaymentWays(state, data) {
        state.paymentWays = data;
    },
    setCurrency(state, data) {
        if (data) {
            // set data to currency
            state.currency = data;
        } else {
            try {
                // set default currency
                const paymentway = state.paymentWays.filter(item => {
                    return item.default;
                })[0];
                const currency = state.currencies.filter(item => {
                    return item.coin === paymentway.unit.toLowerCase() + 'usd';
                })[0];
                state.currency = Object.assign(currency || {}, paymentway || {});
            } catch (error) {
                console.log("setCurrency" + JSON.stringify(error))
            }
        }
    },
    setCharge(state, data) {
        state.charge = data;
    },
    setStep(state, data) {
        state.step = data;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
