<style lang="scss" scoped>
@import '../../../assets/css/wallet-history.scss';
.ordertable{
    .content{
        .unpay{
            color: #9490a5;
        }
    }
}
@media only screen and (min-width: 768px) {
    .orderID{
        flex: none;
        width: 270px;
    }
}

</style>
<template lang="html">
    <article class="ordertable">
        <div class="content table_layout">
            <app-panel  class="table" :loading="loading">
                 <panel-head :title="$t('db.mo.h3')" slot="head" >
                     <tablist slot="tabs" type="productIcon" class="tablelist"></tablist>
                 </panel-head>
                <app-table class="flexTable"  :columns="columns" :tableData="tableData" slot="content">
                    <template slot-scope="props">
                            <table-column :label="$t('db.mo.h3c1')">
                                {{props.row.createdAt | moment("YYYY.MM.DD")}}
                            </table-column>
                            <table-column :label="$t('db.mo.h3c2')" class="price_wrap orderID">
                                <span class="localTotalPrice">
                                    {{props.row.product.name}}
                                </span>
                                <span class="price">
                                    {{props.row.flowNumber}}
                                </span>
                            </table-column>
                            <table-column :label="$t('db.mo.h3c3')">
                                {{props.row.contractTime}}
                            </table-column>
                            <table-column :label="$t('db.db.h1')">
                                {{props.row.hashpower_render}}
                            </table-column>
                            <table-column :label="$t('db.wat.h4c4')"  :class="{price_wrap:!!props.row.price}">
                                <span class="localTotalPrice">
                                    ${{props.row.localDealTotalPrice}}
                                </span>
                                <span class="price" v-if="!!props.row.price">
                                    {{props.row.price}} {{props.row.payUnit}}
                                </span>
                            </table-column>
                            <table-column :label="$t('db.wat.h4c5')"  :class="props.row.payStatus">
                                {{$t('status.order')[props.row.status_render]}}
                            </table-column>
                   </template>
                </app-table>
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
            return [{title:self.$t('db.mo.h3c1')},{title:self.$t('db.mo.h3c2'),width:'270px'},{title:self.$t('db.mo.h3c3')},{title:self.$t('db.db.h1')},{title:self.$t('db.wat.h4c4')},{title:self.$t('db.wat.h4c5')}]
        }
    },
    watch:{
        currentPage(){
            this.getOrder()
        },
        locale(){
            this.filterData(this.initData)
        }
    },
    async mounted(){
        this.loading = true
        let urlParame = this.getUrlParame()
        console.log(Object.keys(urlParame),'params');
        let result = Object.keys(urlParame).every((key)=>{
            return ['paymentId','token','PayerID'].includes(key)
        })
        if(result && Object.keys(urlParame).length === 3){
            try{
                let res = await this.$axios('paypal_execute',urlParame)
                if(res.data){
                    this.$toast({
                            content: this.$t("toast.payment.e1"),
                    })
                }else{
                    this.$toast({
                            content: this.$t("toast.payment.e2"),
                    })
                }
            }catch(e){
                console.log('timeout');
            }
        }
        this.getOrder()
    },
    methods:{
        getOrder(){
            this.loading = true
            let limit = getListNum()
            this.$axios('payment_list',{limit,skip:(this.currentPage -1) * limit}).then(res=>{
                if(res.code === ERR_OK){
                    this.initData = res.data
                    this.filterData(res.data)
                    this.total = res.pagination_total
                }
            })
            .finally(()=>{
                this.loading = false
            })
        },
        getUrlParame() {
            var pattern = /(\w+)=([\s\S]+)/ig
            var parames = {}
            let searchs = location.search.split('&')
            searchs.forEach((search)=>{
                search && search.replace(pattern, function (a, b, c) {
                    parames[b] = c
                })
            })
            return parames
        },
        filterData(data){
            // console.log(data,'初始数据');
            this.tableData = data.map(item=>{
                const min = parseInt(item['contract']['profitDays'])
                const max = parseInt(item['validityPeriod'])
                if(item['isSeccessCreateContract']){ // 生成订单处理
                    item.status_render = item['contract']['status']
                }else{
                    item.status_render = 'pending'
                }

                if(max===0){ // 订单期限为0则为永久型产品
                    item.contractTime = this.$t('db.mo.h3c7')
                }else{
                    item.contractTime = this.$t('db.mo.h3c5',{contracttimeLeft:max-min,contracttimeAll:max})
                }

                if(item.status_render==='pending'){
                    item.contractTime = ''
                    item.payStatus = 'pending'
                }

                let result = getHash({hash:item['hashPower'],unit:item['product']['unit']})
                item.hashpower_render = `${result.hash} ${result.unit ==='H' ? '' : result.unit}H/s`
                return item
            })
            // 只显示生成订单的数据
            // let result = []
            // this.tableData.forEach(item=>{
            //     if(item['isSeccessCreateContract']){
            //         result.push(item)
            //     }
            // })
            // this.tableData = result
            // console.log(this.tableData,'洗数据');
        }
    },
    components:{
       appPanel,panelHead,appTable,pagination,tablist,tableColumn
   },
}
</script>
