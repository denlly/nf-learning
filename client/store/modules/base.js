import locales from '../../locales/index.js'

const state = () => ({
    locales: ['zh-cn', 'zh-tw', 'de',
        'en',
        'es',
        'it',
        'ja',
        'ko',
        'pt',
        'ru',
        'fr'
    ],
    locale: 'en',
    popCtrl: '',
    currentPage:1,
})

const mutations = {
    SET_LANG(state, locale) {
        if (state.locales.indexOf(locale) !== -1) {
            state.locale = locale
            localStorage.setItem('locale',locale)
        }
    },
    setPop(state, ctrl) {
        state.popCtrl = ctrl
    },
    setPage(state, page){
        state.currentPage = page
    }
}

const actions = {

}

const getters = {
    errors(state) {
        return locales[state.locale].errors
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
