<style scoped>

</style>

<template>
    <div class="">
        <el-menu
            :default-active="$route.path"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            router>
            <el-menu-item index="/">{{ $t('links.home') }}</el-menu-item>
            <el-menu-item index="/login">{{ $t('links.login') }}</el-menu-item>
            <el-menu-item index="/about">{{ $t('links.about') }}</el-menu-item>
            <el-submenu index="">
                <template slot="title">{{ $t('links.changeLang') }}</template>
                <el-menu-item index="" @click="ChangeLanguage('en')">{{ $t('links.english') }}</el-menu-item>
                <el-menu-item index="" @click="ChangeLanguage('zh')">{{ $t('links.chinese') }}</el-menu-item>
                <el-menu-item index="" @click="ChangeLanguage('fr')">{{ $t('links.french') }}</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
    import Cookie from 'js-cookie'

    export default {
        head() {
            return {
                title: "首页",
            }
        },

        components: {  },
        data() {
            return {
                activeIndex: '1',
            }
        },
        mounted() {  },
        computed:{
            ...mapState('base',['locale'])
        },
        methods: {
            handleSelect(key, keyPath) {
                // console.log(key, keyPath)
            },
            // 更换语言
            ...mapMutations('base',['SET_LANG']),
            ChangeLanguage(str){
                this.SET_LANG(str)
                this.$i18n.locale = str
                Cookie.set('locale', str)
                // console.log(this.locale)
            }
        }

    }
</script>
