<template lang="html">
    <div class="buttons_lang" ref="dropdown">
        <span @click="triggerDropLists">
            {{$t('name')}}
            <i></i>
        </span>
        <ul class="buttons_droplist" v-if="dropList">
            <li v-for="(item,key) in locales" @click="changeLang(key)">{{item.name}}</li>
        </ul>
    </div>
</template>

<script>
import messages from '../locales/index.js'
export default {
    data(){
        return{
            dropList:false,
            locales:[],
        }
    },
    mounted(){
        this.initDropdown()
    },
    methods:{
        triggerDropLists(){
            this.dropList = !this.dropList
        },
        initDropdown(){
            const self = this
            this.locales = messages
            document.addEventListener('click',function(e){
               if(!self.$refs.dropdown){
                   return false
               }
               if(!!self.$refs.dropdown.contains(e.target)) return;
               self.dropList = false
           })
        },
        changeLang(str){
            this.SET_LANG(str)
            this.$i18n.locale = str
            this.dropList = false
            Cookie.set('locale', str)
        },
    }
}
</script>

<style lang="css">
</style>
