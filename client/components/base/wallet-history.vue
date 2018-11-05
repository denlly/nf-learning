<style lang="scss" scoped>
@import '../../assets/css/wallet-history.scss';
</style>
<template lang="html">
    <app-panel  class="table " :class="{'recentWithdraw':model==='recent','no_border':model==='recent'}" :loading="loading">
         <panel-head :title="tableTitle" slot="head" :initData="initData" :type="model==='recent' ? 'headHref':'standard' "></panel-head>
        <app-table class="historyTabel" :columns="columns" :tableData="tableData" slot="content">
            <template slot-scope="props">
                    <table-column :label="$t('db.wat.h4c2')">
                        {{props.row.createdAt | formatDate }}
                    </table-column>
                    <table-column :label="$t('db.wat.h4c3')">
                        {{props.row.coin && props.row.coin.code}}
                    </table-column>

                    <table-column :label="$t('db.wat.h4c4')" v-if="['withdraw','dailyFee'].includes(props.row.type)" class="negativeNum">
                        -{{(props.row.amount) | formatNumber}}
                    </table-column>
                    <table-column :label="$t('db.wat.h4c4')" v-else class="positiveNum">
                      {{props.row.amount | formatNumber}}
                    </table-column>

                    <table-column :label="$t('db.wat.h4c5')" :class="props.row.status">
                        {{$t('status.wallet')[props.row.status]}}
                        <a class="txid" target="_blank" v-if="props.row.status === 'completed'" :href="'https://btc.com/' + props.row.txid">TXID</a>
                    </table-column>
           </template>

        </app-table>
        <footer slot="foot" v-if="model!=='recent' && total!==1">
            <pagination  :total="total"></pagination>
        </footer>
     </app-panel>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex"
import appPanel from './panel.vue'
import panelHead from './panel-head.vue'
import appTable from './table.vue'
import pagination from './pagination.vue'
import tableColumn from './table-column.vue'
import {ERR_OK} from '../../assets/js/config.js'
import {getListNum} from '../../assets/js/tools.js'
export default {
    head() {
        return {
            title: this.$t("navbar.wallet"),
        }
    },
    props:{
        model:String,
        initData:Object
    },
    data(){
        return {
            // columns:[{title:'Time',key:'time'},{title:'Coin'},{title:'Amount'},{title:'Status'}],
            // tableData:[{'time':'2018.04.07 12:30 GMT','coin':'BTC','amount':'0.4564565','status':'Completed'},{'time':'2018.04.07 12:30 GMT','coin':'BTC','amount':'0.4564565','status':'Completed'}]
            tableData:[],
            total:1,
            loading:true
        }
    },
    computed:{
        ...mapState('base',['currentPage']),
        tableTitle(){
            let res = this.model==='recent' ? this.$t('db.wat.h4'): this.$t('db.wath.h1')
            return res
        },
        columns(){
            const self = this
            let res =  [{title:self.$t('db.wat.h4c2'),key:'time'},{title:self.$t('db.wat.h4c3')},{title:self.$t('db.wat.h4c4')},{title:self.$t('db.wat.h4c5')}];
            return res
        }
    },
    watch:{
        currentPage(){
            this.getWalletHistory()
        }
    },
    mounted(){
        this.getWalletHistory()
    },
    methods:{
        ...mapMutations('base',['setPage']),
        getWalletHistory(){
            let limit = getListNum()
            if(this.model==='recent' &&  document.body.clientWidth>=768){
                limit = getListNum('recentWithdraw')
            }
            this.loading = true
            this.$axios('wallet_histories',{coin:"",skip:(this.currentPage -1) * limit,limit:limit,types:"withdraw"}).then(res=>{
                if(res.code!== ERR_OK){
                    return false
                }
                this.tableData = res.data
                this.total = res.pagination_total
            })
            .finally(()=>{
                this.loading = false
            })
        }
    },
    components:{
       appPanel,panelHead,appTable,pagination,tableColumn
   },
}
</script>
