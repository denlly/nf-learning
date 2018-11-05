<style lang="scss" rel="stylesheet/scss" scoped>
@import '../../../assets/css/wallet-history.scss';
    .ex_bonus{
        margin:0 auto;
        padding-bottom:40px;
        max-width: 1176px;
    }
    @media only screen and (max-width: 768px){
        .ex_bonus{
            width:100%;
        }
    }
</style>
<template lang="html">
    <article class="ex_bonus">
        <div class="content">
            <app-panel  class="table" :loading="loading">
                 <panel-head :title="$t('db.aft.h10')" slot="head" >
                     <tablist slot="tabs" type="productIcon" class="tablelist"></tablist>
                 </panel-head>
                <app-table class="flexTable"  :columns="columns" :tableData="tableData" slot="content">
                    <template slot-scope="props">
                            <table-column :label="$t('db.aft.h10c1')">
                                {{props.row.date | moment("YYYY.MM.DD")}}
                            </table-column>
                            <table-column :label="$t('db.aft.h10c2')">
                                <span class="localTotalPrice">
                                    {{props.row.email}}
                                </span>
                            </table-column>
                            <table-column :label="$t('db.aft.h10c3')">
                                ${{props.row.consumption}}
                            </table-column>
                            <table-column :label="$t('db.aft.h10c4')"  :class="{price_wrap:props.row.bonusBTC != '0'}" >
                                <span class="localTotalPrice" v-if="props.row.bonusBTC != '0'">
                                    {{props.row.bonusBTC}} BTC
                                </span>
                                <span class="price">
                                    ${{props.row.bonus}}
                                </span>
                            </table-column>

                            <table-column :label="$t('db.aft.h10c5')"  :class="props.row.status">
                                {{$t('db.aft')[props.row.status]}}
                            </table-column>
                   </template>
                </app-table>
                <!-- <footer slot="foot" v-if="total!==1"> -->
                <footer slot="foot">
                    <pagination :total="total"></pagination>
                </footer>
             </app-panel>
        </div>
    </article>

</template>

<script>
import appPanel from '../../../components/base/panel.vue'
import panelHead from '../../../components/base/panel-head.vue'
import tablist from "../../base/tablist"
import appTable from '../../../components/base/table.vue'
import tableColumn from '../../../components/base/table-column.vue'
import pagination from '../../../components/base/pagination.vue'
import {ERR_OK} from '../../../assets/js/config.js'
import {getListNum, getHash} from '../../../assets/js/tools.js'
import { mapState, mapActions, mapGetters, mapMutations } from "vuex"

export default {
    data(){
        return {
            // columns:[{title:'Date',},{title:'Cloud Mining'},{title:'Contract time'},{title:'Hashpower'},{title:'Amount'},{title:'States'}],
            // tableData:[{'period':'BTC','coin':'BTC','amount':'0.4564565','status':'Completed',icon:'btc'},{'period':'ETH','coin':'BTC','amount':'0.4564565','status':'Completed',icon:'eth'}]
            tableData:[],
            initData:[], // 备份ajax初始数据，便于切换语言洗数据
            total:1,
            loading:true
        }
    },
    computed:{
        ...mapState('base',['currentPage','locale']),
        columns(){
            const self = this
            return [{title:self.$t('db.aft.h10c1')},{title:self.$t('db.aft.h10c2')},{title:self.$t('db.aft.h10c3')},{title:self.$t('db.aft.h10c4')},{title:self.$t('db.aft.h10c5')}]
        }
    },
    watch:{
        currentPage(){
            this.getOrder()
        },
    },
    mounted(){
        this.getOrder()
    },
    methods:{
        getOrder(){
            let limit = getListNum()
            this.loading = true
            this.$axios('profit_brokerages',{limit,skip:(this.currentPage -1) * limit}).then(res=>{
                if(res.code === ERR_OK){
                    this.initData = res.data
                    this.tableData = res.data
                    this.total = res.pagination_total
                }
            })
            .finally(()=>{
                this.loading = false
            })
        },
    },
    components:{
       appPanel,panelHead,appTable,pagination,tablist,tableColumn
   },
}
</script>
