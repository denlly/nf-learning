<style lang="scss" rel="stylesheet/scss" scoped>
    .coinchart{

        &_content{
            margin:0 auto;
            padding:48px;
            max-width:1176px;
            border-radius: 4px;
            box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
            background-color: #ffffff;
            border: solid 0.5px rgba(0, 0, 0, 0.2);

            .ve_line{
                margin:50px -20px 0 -20px;
                min-height: 460px;

                &>div:nth-child(1){
                    /*background-color: red !important;*/
                    /*background: url("../../../assets/images/bg_m.jpg");*/

                    &>div:nth-child(2){
                        width:34% !important;
                        height:10% !important;
                        color:red;
                        /*background: url("../../../assets/images/bg_m.jpg");*/
                    }
                }

                &>div:nth-child(2){
                    width:34% !important;
                    height:10% !important;
                }
            }

            .tips_text{
                display: block;
                margin-top:48px;
                font-size: 12px;
                line-height: 15px;
                text-align: center;
                text-decoration: underline;
                color: #9490a5;
            }
        }
    }

    @media only screen and (max-width: 768px){
        .coinchart{
            display: none;
        }
    }
</style>

<template>
    <div class="coinchart">

        <panel class="coinchart_content" v-loading="loading">
            <panel-head slot="head" type="base" :title="'base'">
                <span slot="title">{{$t('db.db.h4')}}</span>
                <span slot="rightitle">
                    <tablist slot="tabs" type="wallet" @clickMethod="toggleTabs" class="tablelist"
                             :initActive="{key:'BTC'}"></tablist>
                </span>
            </panel-head>
            <div slot="content">
                <div class="ve_line">
                    <ve-line id="chart1" height="460px" :data="chartData" :settings="chartSettings" :colors="colors" :extend="chartExtend"></ve-line>
                </div>
            </div>
            <div slot="foot">
                <a href="/customer-service?profit" target="_blank" class="tips_text">{{$t('db.db.q1')}}</a>
            </div>
        </panel>

    </div>
</template>

<script>
    import panel from "../../base/panel"
    import panelHead from "../../base/panel-head"
    import tablist from "../../base/tablist"
    import {ERR_OK} from "../../../assets/js/config.js"
    import {gta} from "../../../lib/gta.js"

    export default {
        components: {
            panel,panelHead,tablist
        },
        data(){
            return {
                loading:true,
                // 图表设置
                dataList:[],
                chartData : {
                    columns: ["date","profit","cointype" ],
                    rows: [
                        // {profit: 20468,cointype:"BTC", date: "2018-06-19"},
                        // {profit: 10002,cointype:"BTC", date: "2018-06-19"},
                        // {profit: 10002,cointype:"BTC", date: "2018-06-19"},
                        // {profit: 10002,cointype:"BTC", date: "2018-06-19"},
                        // {profit: 10002,cointype:"BTC", date: "2018-06-19"},
                        // {profit: 10002,cointype:"BTC", date: "2018-06-19"},
                        // {profit: 10002,cointype:"BTC", date: "2018-06-19"},
                        // {profit: 10002,cointype:"BTC", date: "2018-06-19"},
                        // {profit: 10002,cointype:"BTC", date: "2018-06-19"},
                        // {profit: 10002,cointype:"BTC", date: "2018-06-19"},
                        // {profit: 10002,cointype:"BTC", date: "2018-06-19"},
                    ],
                },
                colors:["#7383d7"],// 线条颜色
                chartSettings:{
                    area: true,
                    // scale:["true","true"]
                },
                chartExtend:{
                    // 图例
                    legend: {show:false,},
                    // 拐点样式
                    series:{
                        smooth: true,
                        symbolSize: 1,
                        lineStyle:{
                            width:3
                        },
                        areaStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#7383d7' // 0% 处的颜色
                                }, {
                                    offset: 1, color: '#ffffff' // 100% 处的颜色
                                }],
                                globalCoord: false // 缺省为 false
                            },
                            // opacity:1
                        },
                    },
                    xAxis:{
                        axisLabel: {
                            textStyle: {
                                color: '#9490a5',//坐标值得具体的颜色
                            }
                        }
                    },
                    yAxis:{
                        splitLine: {
                            show: true
                        },
                        splitNumber:3,
                        axisLabel: {
                            textStyle: {
                                color: '#9490a5',//坐标值得具体的颜色
                            }
                        }
                    },
                    grid:{
                        x:48,
                        y:10,
                        x2:36,
                        y2:0,
                        borderWidth:1
                    },
                    tooltip : {
                        backgroundColor : 'rgba(255,255,255,1)',
                        borderColor : '#383155',
                        borderWidth: 2,
                        formatter: function(params, ticket, callback) {
                            // console.log("params:",params,typeof params[0].value)
                            if(params[0].value === 0 || params[0].value === "0"){
                                params[0].value = "0.00000000"
                            }

                            var sHtml =
                                '<div style="position:relative;box-sizing:border-box;width: 234px;heihgt:105px;padding:27px 0 26px 24px;background-color: #fff;border:0px solid #df5000" class="tooltip-dom">'+
                                    '<p>'+
                                        '<span style="font-size: 20px;line-height:1;font-weight: 500;color: #383155;">'+params[0].value+' </span>'+
                                        '<span style="font-size: 20px;line-height:1;font-weight: 500;color: #00e7c0;">'+params[1].value+'</span>'+
                                    '</p>' +
                                    '<p style="font-size: 13px;line-height:16px;color:#9490a5">'+params[0].axisValue+'</p>' +
                                // '<p style="position: absolute;top:58px;left: 0;bottom:0;right:0;margin:auto;width:0;height:0;border-width:25px 25px 0;border-style:solid;border-color:#383155 transparent transparent;margin:40px auto;"></p>'+
                                // '<p style="position: absolute;top:55px;left: 0;bottom:0;right:0;margin:auto;width:0;height:0;border-width:25px 25px 0;border-style:solid;border-color:#fff transparent transparent;margin:40px auto;"></p>'+
                                '</div>'
                            // console.log("echart", params)
                            return sHtml
                        }
                    },
                },
            }
        },
        mounted() {
            this.init("BTC")

        },
        computed:{  },
        methods:{
            init(str){
                this.getUserCionChart(str)
            },
            async getUserCionChart(str){
                let pararms={
                    coin:str,
                    days:"14"
                }
                let resultGetUserCionChart = await this.$axios("userdaysproductprofit",pararms)
                // console.log("resultGetUserCionChart",resultGetUserCionChart,resultGetUserCionChart.data.coin.code)
                if( resultGetUserCionChart.code === ERR_OK ){
                    let temp = resultGetUserCionChart.data.profits
                    temp.forEach(item=>{
                        item.cointype = resultGetUserCionChart.data.coin.code
                        item.date = item.date.split("T")[0]
                        // 收益除以 1e8
                        if( item.profit === 0 ){
                            return
                        }else{
                            // console.log("原始item.profit",item.profit)
                            item.profit = this.$math.chain( item.profit ).divide(100000000).done().toFixed(8)
                            // console.log("item.profit",item.profit,typeof item.profit,item.profit.toString())
                        }
                    })
                    this.chartData.rows = temp
                    this.loading = false
                }else{
                    console.log("getUserCoinList Error")
                }
            },


            // Tablist Methods
            toggleTabs(res){
                // console.log("Charts Tabclick",res.key)
                gta.track("dashboard:switch_income_chart_button_clicked", { "coin": res.key,})
                this.loading = true
                this.getUserCionChart(res.key)
            }
        },

    }
</script>
