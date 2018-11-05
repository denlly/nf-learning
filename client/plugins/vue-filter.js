import Vue from "vue"
import moment from "moment"
// import VueFilter from "vue-filter"
//
// Vue.use(VueFilter)

// Vue.filter("toFixed", function (number, fixed) {
//     return number.toFixed(fixed)
// })

Vue.filter("toString", function (number) {
    return number.toString()
})

Vue.filter("encodeURL", function (url) {
    return encodeURIComponent(url)
})

Vue.filter("formatCoinName", function (coin) {
    let names = {
        "btc": "比特币",
        "ltc": "莱特币",
        "eth": "以太坊",
    }

    return names[coin]
})


Vue.filter("formatOrderStatus", function (coin) {
    let names = {
        "unpaid": "未支付",
        "paid": "已支付",
        "successed": "已完成",
        "canceled": "已取消",
        "error": "错误",
    }

    return names[coin]
})


// Vue.filter("formatOrderbookType", function (type) {
//     let types = {
//         "sell": "卖",
//         "buy": "买",
//     }

//     return types[type]
// })

/**
 * [翻译转换订单状态]
 * @param  {[type]} type [后台status数据]
 * @return {[type]}      [前台表格渲染]
 */
Vue.filter("formatStatus", function (type) {
    if(!type){
        return ''
    }
    type = type.toString()
    let types = {
        // 钱包历史返回状态
        "pending":"Pending...",
        // 我的订单接口返回状态
        "unpay":"Pending...",
        "paying":"Pending...",
        "paid":"Pending...",
        "fail":"Pending..."
    }
    let res = types[type] ? types[type] : type.substring(0, 1).toUpperCase() + type.substring(1)
    return res
})

/**
 * [格式化时间戳]
 * @param  {[type]} date [日期时间戳]
 * @return {[type]}      [表格时间栏渲染样式]
 */
Vue.filter("formatDate", function (date) {
    let res = moment(date).add(-8,'hour').format("YYYY.MM.DD HH:mm")
    res =  `${res} GMT`
    return res
})


/**
 * 在字符串左侧指定位置插入指定字符
 *
 * @param {String} param 字符参数
 * @param {Number} index 指定位置
 * @param {String} string 要插入的字符
 * @return {String}
 */
Vue.filter("insertAt", function (param, index, string) {
    param = param.toString()
    return param.substr(0, index) + string + param.substr(index)
})

/**
 * 格式化btc.com矿池返回的收益数字，如果返回0，直接显示-；返回长度小于等于8位，拼接成8位小数点形式；
 * 返回长度大于8位，从右往左数第八位加一个小数点
 *
 * @param {String} param 字符参数
 * @return {String}
 */
Vue.filter("formatNumber", function (param) {
    if(typeof param == "undefined"){
        return "0.00000000"
    }
    param = param.toString()
    if (param === "0") {
        return "0.00000000"
    }

    if( param.indexOf(".") !==-1){
        let index = param.indexOf(".")
        let arr = param.split(".")
        if(index<9){
            return "0." + arr[0].padStart(8, "0")
        }else{
            param = arr[0]
            return param.substr(0 , param.length-8) + "." + param.substr(param.length-8, param.length)
        }
    }

    if (param.length <= 8) {
        return "0." + param.padStart(8, "0")
    }

    if (param.length > 8 ) {
        return param.substr(0 , param.length-8) + "." + param.substr(param.length-8, param.length)
    }
})


/**
 * 在字符串左侧补齐指定长度的字符
 *
 * @param {String} param 字符参数
 * @param {Number} targetLength 字符总长度
 * @param {String} padString 要插入的字符
 * @return {String}
 */
Vue.filter("padStart", function (param, targetLength, padString) {
    return param.toString().padStart(targetLength, padString)
})
