<style lang="scss" scoped>
.extension-plan{
    padding:40px 0 48px 0 ;
}

.icon_copy{
    width: 20px;
    height: 20px;
    display: inline-block;
    transform: translate(5px,4px);
    background: url('../../../assets/images/icon-svg/icon_copy.svg') no-repeat;
    cursor: pointer;
}
@media only screen and (min-width: 768px) {
    .content{
        margin:0 auto;
        width:1176px;
        .foot ul{
            display: flex;
            li{
                float: left;
                box-sizing: border-box;
                overflow: hidden;
                flex:1;
                text-overflow:ellipsis;
                white-space: nowrap;
                line-height: 58px;
                padding-left: 33px;
    	        font-size: 20px;
    	        color: #7b7494;
                background-color: rgba(241, 242, 251, 1.0);
            }
            >li:nth-child(1){
                flex: none;
                width: 426px;
                padding-left: 48px;
            }
        }
    }
}

@media only screen and (max-width: 768px) {
    .extension-plan{
        padding:0 0 40px 0 ;
    }
    .foot ul{
        padding: 0 24px 31px 24px;
        background: #f7f7fa;
        li{
            padding-top: 24px;
            font-size: 18px;
            color: #9490a5;
            .title{
                float: left;
            }
            .num{
                float:right;
            }
        }
        .rowTitle{
            font-size: 20px;
            color: #2f2c37;
        }

    }
}
</style>
<template lang="html">
    <article class="extension-plan">
        <div class="content">
            <app-panel  class="table affiliate" :loading="loading">
                <panel-head :title="$t('db.aft.h3')" slot="head" type="tabs">
                    <tablist slot="tabs" type="textModel" :tabsData="tabsData"  @clickMethod="toggleTabs" class="tablelist"></tablist>
                </panel-head>
                <app-table  :columns="columns" :tableData="tableData" slot="content">
                    <template slot-scope="props">
                        <table-column :label="$t('db.aft.h3c1')" width="426px" :class="{link:props.row.source.length>7}">
                            <span class="link">{{props.row.source}}</span>
                            <span class="icon_copy"  @click="copy(props.row.source)"></span>
                        </table-column>
                        <table-column  :label="$t('db.aft.h3c2')">
                            {{props.row.source.length < 7 ? '-' : props.row.clicks}}
                        </table-column>
                        <table-column  :label="$t('db.aft.h3c3')">
                            {{props.row.registrations}}
                        </table-column>
                        <table-column :label="$t('db.aft.h4c4')">
                            {{props.row.significant}}
                        </table-column>
                    </template>
                </app-table>
                <footer slot="foot" class="foot">
                    <ul class="hidden-xs-only">
                        <li>{{$t('db.wat.h1c2')}}</li>
                        <li v-for="columnTotal in  Object.values(total)">{{columnTotal}}</li>
                    </ul>
                    <ul class="hidden-sm-and-up">
                        <li class="rowTitle">{{$t('db.wat.h1c2')}}</li>
                        <li class="clearfix">
                            <span class="title fontwight500">Hits</span>
                            <span class="num">{{total.clicks}}</span>
                        </li>
                        <li class="clearfix">
                            <span class="title fontwight500">Registered user</span>
                            <span class="num">{{total.registrations}}</span>
                        </li>
                        <li class="clearfix">
                            <span class="title fontwight500">Paid user</span>
                            <span class="num">{{total.significant}}</span>
                        </li>
                    </ul>
                </footer>
            </app-panel>
        </div>
    </article>

</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex"
import appPanel from '../../../components/base/panel.vue'
import panelHead from '../../../components/base/panel-head.vue'
import appTable from '../../../components/base/table.vue'
import pagination from '../../../components/base/pagination.vue'
import tablist from "../../base/tablist"
import tableColumn from '../../base/table-column.vue'
import { gta } from "../../../lib/gta.js"

export default {
    data(){
        return {
            // columns:[{title:'Your affiliate code and links',width:'426px'},{title:'Hits'},{title:'Registered user'},{title:'Paid user'}],
            tableData:[],
            // tabsData:[{key:'today',text:"Today"},{key:'yesterday',text:"Yesterday"},{key:'month',text:"This Month"},{key:'lastMonth',text:"Last Month"}],
            total:[],
            loading:false,
            baseUrl:'https://www.datafountain.cn'

        }
    },
    created(){
        this.total = new Array(3).fill('0') // 避免dom重绘
    },
    mounted(){
        this.getInvitationData('today')
    },
    computed:{
        tabsData(){
            const self =this
            return [{key:'today',text:self.$t('db.aft.h4')},{key:'yesterday',text:self.$t('db.aft.h5')},{key:'month',text:self.$t('db.aft.h6')},{key:'lastMonth',text:self.$t('db.aft.h7')}]
        },
        columns(){
            const self = this
            return [{title:self.$t('db.aft.h3c1'),width:'426px'},{title:self.$t('db.aft.h3c2')},{title:self.$t('db.aft.h3c3')},{title:self.$t('db.aft.h4c4')}]
        }
    },
    methods:{
        copy(message){
            let result = message.replace(`${this.baseUrl}?`,'')
            // let result = message.replace('https://wwww.hash.pro/','')
            result = encodeURIComponent(result)

            let path = `${this.baseUrl}?${result}`
            let str = this.$t('toast.copy.e1',{path})
            const self = this
            this.$copyText(path).then(function (e) {
              self.$toast({
                  content: str,
              })
            }, function (e) {
              // alert('Can not copy')
            })
        },
        getInvitationData(dimension){
            this.loading = true
            this.$axios('invitation_statistics',{},dimension).then(res=>{
                this.tableData = res.data
                this._initUrl(res.data)
                this._getTabelTotal()
            })
            .finally(()=>{
                this.loading = false
            })
        },
        _initUrl(data){
            this.tableData = data.map(item=>{
                if(item.source.length<7){
                    return item
                }else{
                    item['source']  = `${this.baseUrl}?${item.source}`
                    return item
                }
            })
        },
        _getTabelTotal(){
            let temp = {
                clicks:0,
                registrations:0,
                significant:0,
            }
            this.tableData.forEach(item=>{
                Object.keys(temp).forEach(type=>{
                    temp[type] += item[type]
                })
            })
            this.total = temp
        },
        toggleTabs(res){
            let obj = {
                today:'today',
                yesterday:'yesterday',
                month:'this_month',
                lastMonth:'last_month'
            }
            let result = obj[res.key]
            gta.track("affiliate:switch_date_type_button_clicked", {date_type:result})
            this.getInvitationData(res.key)
        }
    },
    components:{
       appPanel,panelHead,appTable,pagination, tablist, tableColumn
   },
}
</script>
