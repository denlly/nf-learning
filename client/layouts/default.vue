<style lang="scss" rel="stylesheet/scss" scoped>
    .default{
        position: relative;
        background:#f7f7fa;
    }
    @media only screen and (max-width: 768px) {
        .default{
            // overflow: hidden;
        }
    }
    /* 淡入淡出 */
    .fade-enter-active, .fade-leave-active {
        transition: opacity 1s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
    /* 向上进入 */
    .slide-fade-enter-active {
        transition: all .5s ease;
    }
    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */ {
        transform: translateY(10px);
        opacity: 0;
    }
</style>

<template>
    <div class="default">
        <app-header></app-header>
            <!--<transition name="fade">-->
                <nuxt></nuxt>
            <!--</transition>-->
        <app-footer></app-footer>
    </div>
</template>

<script>
import appHeader from "../components/base/nav"
import appFooter from "../components/base/footer"
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import {getBrowserLanguage} from '../assets/js/tools.js'

export default {
    head() {
        return {
            title: this.title,
            titleTemplate: "%s | Global Cloud Bitcoin Mining Provider"
        }
    },
    data(){
        return {
            title:"title"
        }
    },
    watch:{
        locale(val,old){
            let  browser_language= getBrowserLanguage()
            let  page = location.pathname
        }
    },
    mounted() {
        // console.log('auth',this.currentUser,this.auth)
    },
    computed:{
        ...mapState('base',['locale']),
        ...mapState('auth',['currentUser','auth']),
    },
    methods:{  },
    components:{
        appHeader,appFooter
    }
}
</script>
