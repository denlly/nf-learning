<style lang="scss" rel="stylesheet/scss" scoped>

</style>

<template>
    <wallet-history model="recent" :initData="initData"></wallet-history>
</template>

<script>
import walletHistory from '../../../components/base/wallet-history.vue'
export default {
    data(){
        return{
            
        }
    },
    computed:{
        initData(){
            return {
                text:this.$t('db.wat.h4c1'),
                href:'/dashboard/wallet/history'
            }
        }
    },
    components: {
        walletHistory
    }
}
</script>
