import {
    tableParams
} from "./config.js"

import moment from "moment"

function _formatError(e) {
    const [keys, values] = [Object.keys(e), Object.values(e)]
    const obj = {}
    keys.forEach((key, i) => {
        obj[key] = values[i]
    })
    return obj
}


function getScreen() {
    const w = document.body.clientWidth
    if (w < 768) {
        return true
    } else {
        return false
    }

}

function getBrowserLanguage() {
    if (!process.browser) {
        return false
    }
    if (navigator.language) {
        var language = navigator.language
    } else {
        var language = navigator.browserLanguage
    }
    language = language.toLowerCase()
    return language
}

function getUrlParame() {
    var pattern = /(\w+)=([\s\S]+)/ig
    var parames = {}
    var search = location.search
    search && search.replace(pattern, function (a, b, c) {
        parames[b] = c
    })
    return parames
}

function getSiteKey() {
    if (['localhost', 'dev.datafountain.pro'].includes(location.hostname)) {
        return '6LeKNmAUAAAAAK5p5UKt8YnuEVQUFldGXnOTv8L7'
    } else {
        return '6Le_gF8UAAAAADHgGUtR14FfRm1duzV4GfjZIXnw'
    }
}

function getListNum(key) {
    let mobile = getScreen()
    if (key) {
        return tableParams[key]
    } else if (mobile) {
        return tableParams.limit_m
    } else {
        return tableParams.limit_pc
    }
}


function getHash({
    hash,
    unit
}) {
    let unitArr = ["H", "K", "M", "G", "T", "P", "E"]
    let result = {
        hash,
        unit
    }
    while (result.hash >= 1000) {
        result.hash = result.hash / 1000
        let i = unitArr.indexOf(result.unit)
        result.unit = i !== 5 ? unitArr[i + 1] : "E"
    }
    if (result.unit === 'H') {
        result.unit = ''
    }
    return result
}

function dateFormat(row, column) {
    var date = row[column.property]
    if (date == undefined) {
        return "解析失败"
    }
    return moment(date).format("YYYY-MM-DD HH:mm")
}

export {
    getScreen,
    _formatError,
    getBrowserLanguage,
    getUrlParame,
    getListNum,
    getHash,
    dateFormat,
    getSiteKey
}
