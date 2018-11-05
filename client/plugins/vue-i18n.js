import Vue from 'vue'
// import DatePicker from 'element/lib/date-picker'
// import {DatePicker} from 'element-ui'
import VueI18n from 'vue-i18n'
import messages from '../locales/index.js'
import ElementLocale from 'element-ui/lib/locale'

Vue.use(VueI18n)
// Vue.use(DatePicker)

export default ({ app, store }) => {
    app.i18n = new VueI18n({
        locale: "en",
        fallbackLocale: "en",
        silentTranslationWarn:true, //关闭警告输出
        messages
    })
    let res = getLanguage()
    setTimeout(function(){
        app.i18n.locale = res
        store.state.base.locale =res
    },50)
    app.i18n.path = (link) => {
        if (app.i18n.locale === app.i18n.fallbackLocale) {
            return `/${link}`
        }

        return `/${app.i18n.locale}/${link}`
    }
    // ElementLocale.i18n((key, value) => app.i18n.t(key, value))
}


function getLanguage() {
    if(!process.browser){
        return 'en'
    }
    if (navigator.language) {
        var language = navigator.language;
    }
    else {
        var language = navigator.browserLanguage;
    }
    language = localStorage.locale ? localStorage.locale : language
    language = language.toLowerCase()
    language = Object.keys(messages).includes(language) ? language : 'en'
    // console.log("I18N Language",language)
    return language;
}
