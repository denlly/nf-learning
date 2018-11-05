import Toast from '../components/base/pop-toast'

export default {
    install (Vue, options = {}) {
        const VueToast = Vue.extend(Toast)
        let toast = null

        function $toast (params) {
            return new Promise(resolve => {
                // 如果 toast 存在，if 条件控制不会继续添加组件，故暂时注释条件判断
                // if (!toast) {
                toast = new VueToast()

                toast.$mount()

                document.querySelector(options.container || 'body').appendChild(toast.$el)
                // }
                // console.log('plugin done')
                toast.show(params)
                resolve()
            })
        }

        Vue.prototype.$toast = $toast
    }
}
