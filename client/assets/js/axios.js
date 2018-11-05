// 入口文件，管理挂载各函数
import axios from 'axios'
import {
    apis
} from './config.js'
const https = require("https")

// 初始配置实例
let instance = null
if (process.browser) {
    instance = axios.create({
        httpsAgent: new https.Agent({
            rejectUnauthorized: false,
        }),
        baseURL: `${location.origin}/api`,
        timeout:15000
    })
    const token = localStorage.getItem('user-token')
    if (token) {
        instance.defaults.headers.common['Authorization'] = `bearer ${token}`
    }
}


export default function $axios(key, params, urlAdd) {
    let result; // 返回结果
    let [url, method] = apis[key]
    if (urlAdd) {
        url = `${url}/${urlAdd}`
    }
    const args = {
        url,
        params,
    }

    switch (method) {
        case 'post':
            result = _post(args)
            break;
        case 'get':
            result = _get(args)
            break;
        case 'put':
            result = _put(args)
            break;
        default:
            result = _get(args)
            break;
    }
    return result
}



function _get({
    url,
    params,
}) {
    return new Promise((resolve, reject) => {
        instance({
                method: 'get',
                url: url,
                params: params,
            })
            .then((data) => {
                data = Object.assign(data, {
                    code: 0
                })
                let pagination = _getPagination(data)
                data = Object.assign(data,pagination)
                resolve(data)
            })
            .catch(function(error) {
                console.error('api:', url);
                let response
                if(error.request && error.request.readyState == 4 && error.request.status == 0){// 超时处理
                    response = {error: "timeout"}
                }else{
                    response =  error.response.data
                }
                resolve(response)
            })
    })
}


function _post({
    url,
    params,
}) {
    return new Promise((resolve, reject) => {
        instance({
                method: 'post',
                url: url,
                data: params,
            })
            .then((data) => {
                data = Object.assign(data, {
                    code: 0
                })

                resolve(data)
            })
            .catch((error) => {
                console.error('api:', url);
                let response
                if(error.request && error.request.readyState == 4 && error.request.status == 0){// chaoshi
                    response = {error: "timeout"}
                }else{
                    response =  error.response.data
                }
                resolve(response)
            })
    })
}

function _put({
    url,
    params,
}) {
    const qs = require('qs');
    return new Promise((resolve, reject) => {
        instance({
                method: 'put',
                url: url,
                data: qs.stringify(params),
            })
            .then((data) => {
                data = Object.assign(data, {
                    code: 0
                })
                resolve(data)
            })
            .catch((error) => {
                console.error('api:', url);
                let response
                if(error.request && error.request.readyState == 4 && error.request.status == 0){// chaoshi
                    response = {error: "timeout"}
                }else{
                    response =  error.response.data
                }
                resolve(response)
            })
    })
}


function _getPagination(data){
    let {
        "x-pagination-count":count,
        "x-pagination-limit":limit,
        "x-pagination-skip":skip,
    } = data.headers
    let total = Math.ceil(count/limit)
    total = total === 0 ? 1 : total
    return {
        pagination_total:total
    }
}
