<style lang="scss" rel="stylesheet/scss" scoped>
    .selfcloudcontrast{
        display: block;
        padding:100px 0;
        background-color: #f7f7fa;
        min-width: 1176px;

        &-div{
            margin:0 auto;
            max-width:1176px;
        }

        &_content{
            padding:93px 68px 0 68px;
            font-size: 14px;
            border-radius: 6px;
            box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
            background-color: #ffffff;
            border: solid 0.5px rgba(0, 0, 0, 0.2);

            .el-row{margin:0;}
            .titleContent{
                margin-bottom:40px;
                font-size: 20px;

            }

            .leftDiv{
                padding-right:40px;
                border-radius: 0;
                border-right:1px solid #000;

                .el-row{
                    padding-bottom:60px;
                }
            }
            .rightDiv{
                padding-left: 40px;
                border-radius: 0;
                /*border-left:1px solid red;*/

                .el-row{
                    padding-bottom:60px;
                }
            }
            .lastItem{
                .el-row{
                    padding-bottom:30px;
                }
            }



            /* NEW */
            .left{
                /*padding-right:40px;*/
                border-radius: 0;
                border-right:1px solid #c2c2c2;
                /* 左侧标题 */
                &_Title{
                    margin-bottom:50px;
                    font-size: 36px;
                    height:100px;
                    .left_Title1{
                        color: #383155;
                    }
                    .left_Title2{
                        color: #00c6bc;
                    }
                }
                /* 左侧每项 */
                &_Item{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-right:40px;
                    border-radius: 0;
                    border-bottom:1px solid #c2c2c2;
                    &:last-child{
                        border-bottom:none;
                    }

                    &_w320{
                        display: flex;
                        align-items: center;
                        width:320px;
                        height:210px;
                        font-size: 20px;
                        line-height: 25px;
                        color: #00c6bc;
                    }
                    &_icon{
                        font-family: "PingFang SC";
                    }
                }
            }

            .right{
                /*padding-left:40px;*/
                border-radius: 0;
                /* 右侧标题 */
                &_Title{
                    margin-bottom:50px;
                    padding-left:40px;
                    font-size: 36px;
                    height:100px;
                    .right_Title1{
                        /*font-size: 36px;*/
                        color: #383155;
                    }
                    .right_Title2{
                        /*font-size: 36px;*/
                        color: #383155;
                    }

                }
                /* 右侧每项 */
                &_Item{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-left:40px;
                    border-radius: 0;
                    border-bottom:1px solid #c2c2c2;
                    &:last-child{
                        border-bottom:none;
                    }

                    &_w320{
                        display: flex;
                        align-items: center;
                        width:320px;
                        height:210px;
                        font-size: 20px;
                        line-height: 25px;
                        color: #2f2c37;
                    }
                    &_icon{

                    }
                }
            }
            .alginItemTop{
                align-items: stretch;
            }
            .lineHeight{
                display: flex;
                align-items: center;
            }
        }
    }

    @media only screen and (max-width: 768px){
        .selfcloudcontrast{display: none}
    }
</style>

<template>
    <div class="selfcloudcontrast">
        <div class="selfcloudcontrast-div">
            <panel class="no_border bgf7">
                <panel-head slot="head" type="home" :title="retitle" :initData="{subtitle:resubtitle}"></panel-head>

                <div slot="content">
                    <div class="selfcloudcontrast_content">
                        <el-row type="flex" justify="space-between">
                            <!-- left -->
                            <el-col class="left">
                                    <el-row>
                                        <el-col class="left_Title">
                                            <p class="left_Title1">{{ $t("home.5.h1c1") }}</p>
                                            <p class="left_Title2">{{ $t("home.5.h1c2") }}</p>
                                        </el-col>
                                        <el-col class="left_Item">
                                            <div class="left_Item_w320 lineHeight">{{ $t("home.5.h3c1") }}</div>
                                            <div class="left_Item_icon">
                                                <img src="../../assets/images/home/right.svg" alt="">️
                                            </div>
                                        </el-col>
                                        <el-col class="left_Item">
                                            <div class="left_Item_w320">{{ $t("home.5.h3c2") }}</div>
                                            <div class="left_Item_icon"><img src="../../assets/images/home/right.svg" alt="">️</div>
                                        </el-col>
                                        <el-col class="left_Item">
                                            <div class="left_Item_w320">{{ $t("home.5.h3c3") }}</div>
                                            <div class="left_Item_icon"><img src="../../assets/images/home/right.svg" alt="">️</div>
                                        </el-col>
                                        <el-col class="left_Item">
                                            <div class="left_Item_w320">{{ $t("home.5.h3c4") }}</div>
                                            <div class="left_Item_icon"><img src="../../assets/images/home/right.svg" alt="">️</div>
                                        </el-col>
                                        <el-col class="left_Item">
                                            <div class="left_Item_w320">{{ $t("home.5.h3c5") }}</div>
                                            <div class="left_Item_icon"><img src="../../assets/images/home/right.svg" alt="">️</div>
                                        </el-col>
                                        <el-col class="left_Item">
                                            <div class="left_Item_w320">{{ $t("home.5.h3c6") }}</div>
                                            <div class="left_Item_icon"><img src="../../assets/images/home/right.svg" alt="">️</div>
                                        </el-col>
                                    </el-row>
                            </el-col>

                            <!-- Right -->
                            <el-col class="right">
                                <el-row>
                                    <el-col class="right_Title">
                                        <p class="right_Title1">{{ $t("home.5.h2c1") }}</p>
                                        <p class="right_Title1">{{ $t("home.5.h2c2") }}</p>
                                    </el-col>
                                    <el-col class="right_Item">
                                        <div class="right_Item_w320 alginItemTop lineHeight">{{ $t("home.5.h4c1") }}</div>
                                        <div class="left_Item_icon"><img src="../../assets/images/home/wrong.svg" alt="">️</div>
                                    </el-col>
                                    <el-col class="right_Item">
                                        <div class="right_Item_w320">{{ $t("home.5.h4c2") }}</div>
                                        <div class="left_Item_icon"><img src="../../assets/images/home/wrong.svg" alt="">️</div>
                                    </el-col>
                                    <el-col class="right_Item">
                                        <div class="right_Item_w320">{{ $t("home.5.h4c3") }}</div>
                                        <div class="left_Item_icon"><img src="../../assets/images/home/wrong.svg" alt="">️</div>
                                    </el-col>
                                    <el-col class="right_Item">
                                        <div class="right_Item_w320">{{ $t("home.5.h4c4") }}</div>
                                        <div class="left_Item_icon"><img src="../../assets/images/home/wrong.svg" alt="">️</div>
                                    </el-col>
                                    <el-col class="right_Item">
                                        <div class="right_Item_w320">{{ $t("home.5.h4c5") }}</div>
                                        <div class="left_Item_icon"><img src="../../assets/images/home/wrong.svg" alt="">️</div>
                                    </el-col>
                                    <el-col class="right_Item">
                                        <div class="right_Item_w320">{{ $t("home.5.h4c6") }}</div>
                                        <div class="left_Item_icon"><img src="../../assets/images/home/wrong.svg" alt="">️</div>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>

                    </div>

                </div>
            </panel>
        </div>
    </div>
</template>

<script>
    import panelHead from "../base/panel-head"
    import Panel from "../base/panel"

    export default {
        components:{
            Panel,panelHead
        },
        data(){
            return {
                title:"Mining with Hash.Pro",
                subtitle:"Having Your Own Hardware or Having a Contract",
            }
        },
        mounted() {  },
        computed:{
            retitle(){
                return this.$t("home.5.h1")
            },
            resubtitle(){
                return this.$t("home.5.h2")
            },
        },
        methods:{  },

    }
</script>
