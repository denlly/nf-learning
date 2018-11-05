<style lang="scss" rel="stylesheet/scss" scoped>
    .extensionRank{
        padding:80px 0 40px 0;

        &_content{
            margin:0 auto;
            width: 1176px;

            .content_title{
                font-size: 30px;
                line-height: 1;
                color:#383155;
            }
            .content_subTitle{
                margin:16px 0 60px 0;
                font-size: 16px;
                color:#9490a5;
            }

            .rank{
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .m-overflow{
                display: flex;
                justify-content: space-between;
                align-items: center;
                width:100%;
            }
            .rankItem{
                box-sizing: border-box;
                position: relative;
                padding:33px 18px 25px 18px;
                width: 210px;
                text-align: center;
                /*border-radius: 4px;*/
                /*box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);*/
                /*background-color: silver;*/
                /*border: solid 1px #9490a5;*/

                .rankmask{
                    box-sizing: border-box;
                    position: absolute;
                    z-index: 2;
                    bottom:0;
                    left:0;
                    padding:22px 31px;
                    width:100%;
                    /*height:74px;*/
                    background-color: rgba(0,0,0,0.7);
                    font-size: 12px;
                    text-align: center;
                    color:#fff;
                    border-bottom-right-radius:4px;
                    border-bottom-left-radius:4px;
                }
                &_title{
                    position: absolute;
                    top:33px;
                    left:0;
                    right:0;
                    margin:0 auto;
                    padding:5px 18px;
                    width:100px;
                    text-align: center;
                    font-size: 9px;
                    color:#383155;
                    border-radius: 2px;
                    background-color: #f7f7fa;
                }
                &_nextTitle{
                    position: absolute;
                    top:33px;
                    left:0;
                    right:0;
                    margin:0 auto;
                    padding:5px 18px;
                    width:100px;
                    text-align: center;
                    font-size: 9px;
                    color:#9490a5;
                    border-radius: 2px;
                    background-color: #ffffff;
                }
                &_img{
                    margin:60px 0px 18px 0px ;
                    height:42px;
                }
                &_rate{
                    margin-bottom:18px;
                    padding:6px;
                    font-size: 12px;
                    font-weight: 500;
                    border-top:1px solid #dcdcdc;
                    border-bottom:1px solid #dcdcdc;
                }
                /*hr{*/
                    /*margin:16px 0 10px 0 ;*/
                    /*background-color: #979797;*/
                /*}*/
                &_describe1{
                    margin-bottom:13px;
                    font-size: 12px;
                    line-height: 1.5;
                    font-weight: 300;
                }
                &_describe2{
                    font-size: 10px;
                    line-height: 13px;
                    color:#9490a5;
                }

                /* 高度 */
                .rank_item_height{
                    height:123px;
                }

                /* 20180724 新增花费的样式 */
                .spend{
                    font-size: 12px;
                    font-weight: bold;
                }
            }

            .itembg1{
                background:url("../../../assets/images/rank/rankbg1.svg") no-repeat -6px -3px;
                color:#9490a5;
            }
            .itembg2{
                background:url("../../../assets/images/rank/rankbg2.svg") no-repeat -6px -4px;
                border: 0.5px solid #dbdbdb;
                border-radius: 4px;
                color:#383155;
            }
            .itembg3{
                background:url("../../../assets/images/rank/rankbg3.svg") no-repeat -6px -3px;
                color:#fff;
            }
            .itembg4{
                background:url("../../../assets/images/rank/rankbg4.svg") no-repeat -6px -3px;
                color:#fff;
            }
            .itembg5{
                background:url("../../../assets/images/rank/rankbg5.svg") no-repeat -6px -3px;
                color: #f6e091;
            }

            .rankItem_img1{background:url("../../../assets/images/rank/title1.svg") no-repeat;}
            .rankItem_img2{background:url("../../../assets/images/rank/title2.svg") no-repeat;}
            .rankItem_img3{background:url("../../../assets/images/rank/title3.svg") no-repeat;}
            .rankItem_img4{background:url("../../../assets/images/rank/title4.svg") no-repeat;}
            .rankItem_img5{background:url("../../../assets/images/rank/title5.svg") no-repeat;}

        }
    }

    @media only screen and (max-width: 768px){
        .extensionRank{
            padding:48px 0 32px 0;

            &_content{
                width: 100%;

                .content_title{
                    padding-left:24px;
                    font-size: 24px;
                    line-height: 30px;
                    color:#383155;
                }
                .content_subTitle{
                    font-family: "CircularAirLight", "PingFang SC", "Microsoft YaHei" !important;
                    margin:16px 0 43px 0;
                    padding:0 24px;
                    font-size: 16px;
                    line-height: 24px;
                    color:#9490a5;
                }

                .rank{
                    width:100%;
                    overflow: scroll;
                }
                .m-overflow{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width:1370px;
                }
                .rankItem{
                    margin:0 0 0 31px;
                    &:last-child{margin-right:31px;}
                }

            }

        }
    }
</style>

<template>
    <section class="extensionRank">
        <div class="extensionRank_content" v-loading="loading">
            <h4 class="content_title fontPFsemibold">{{$t('db.aft.h1')}}</h4>
            <p class="content_subTitle fontPFregular">
                <!--Gain free promotion upgrades with each ascending affiliate rank. <br>-->
                <!--Your rank is（ {{ userInfor.current_rank_level }} ）{{ userInfor.current_rank_name }}-->
                <!--and you have accumulated-->
                <!--${{ userInfor.current_consumption }} in sales！Your next rank will unlock-->
                <!--with ${{ userInfor.next_rank_need_consumption }} in succesful referrals.-->

                <span v-if="!isHightLevel" v-html="$t('db.aft.h2',{ranklevel:userInfor.current_rank_name,ranktotal:userInfor.current_consumption,nextranktotal:userInfor.next_rank_need_consumption})"></span>
            </p>

            <div class="rank">
                <div class="m-overflow">
                    <div class="rankItem" :class="'itembg'+(key+1)" v-for="(rank,key,index) in rankList" :key="key">
                        <!--{{ key }} - {{ index }}-->


                        <!-- Content -->
                        <p class="rankItem_title" v-if="rank.level === userInfor.current_rank_level">{{$t('db.aft.h1c1')}}</p>
                        <p class="rankItem_nextTitle" v-if="rank.level === userInfor.next_rank_level">{{$t('db.aft.h1c2')}}</p>
                        <!--<img class="rankItem_img rankItem_img5" :src="rank.rank" alt="">-->
                        <p class="rankItem_img " :class="'rankItem_img'+(key+1)"></p>
                        <div v-show="rank.brokeragePercent > userInfor.current_rank_level || rank.level > userInfor.next_rank_level" class="rank_item_height"></div>

                        <!-- Mask -->
                        <div :class="{rankmask:rank.brokeragePercent > userInfor.current_rank_level || rank.level > userInfor.next_rank_level}"
                             v-if="rank.brokeragePercent > userInfor.current_rank_level || rank.level > userInfor.next_rank_level">
                            {{$t('db.aft.h1c6')}}
                        </div>
                        <!-- 此部分与遮罩层互斥 -->
                        <div v-else class="rank_item_height">
                            <p class="rankItem_rate">
                                {{$t('db.aft.h1c3',{bonus:reRate(rank.brokeragePercent)})}}
                            </p>
                            <p class="rankItem_describe1">
                                {{$t('db.aft.h1c4',{bonus:toMultiplyTo(rank.brokeragePercent)})}}
                            </p>
                            <p v-if="rank.level === 1">This is entry level</p>
                            <p v-else class="spend">{{ $t("db.aft.h1c7",{'0':userInfor.current_consumption,'100':rank.consumption}) }}</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>
</template>

<script>
    import {ERR_OK} from "../../../assets/js/config"

    export default {
        components: {},
        data(){
            return {
                loading:true,
                isHightLevel:false,
                userInfor:{
                    current_consumption: 0,
                    current_rank_level: 0,
                    current_rank_name: "0",
                    next_rank_level: 0,
                    next_rank_name: "0",
                    next_rank_need_consumption: 0,
                },
                rankList:[
                    {
                        brokeragePercent: 0.03,
                        consumption: 100,
                        level: 1,
                        name: "Starter"
                    },{
                        brokeragePercent: 0.035,
                        consumption: 1000,
                        level: 2,
                        name: "Silver"
                    },{
                        brokeragePercent: 0.04,
                        consumption: 1000,
                        level: 3,
                        name: "Gold"
                    },{
                        brokeragePercent: 0.05,
                        consumption: 1000,
                        level: 4,
                        name: "Platinum"
                    },{
                        brokeragePercent: 0.06,
                        consumption: 1000,
                        level: 5,
                        name: "Partner"
                    },
                ]
            }
        },
        mounted() {
            this.init()
        },
        computed:{  },
        methods:{
            // 统一出口
            init(){
                this.getUserRankList()
            },

            // 获取用户推广等级
            async getUserRankList(){
                let resultUserRankList = await this.$axios("invitation_rank")
                // console.log("resultUserRankList",resultUserRankList.data)
                if( resultUserRankList.code === ERR_OK ){
                    // userInfo赋值
                    this.userInfor.current_consumption = resultUserRankList.data.current_consumption
                    this.userInfor.current_rank_level = resultUserRankList.data.current_rank_level
                    this.userInfor.current_rank_name = resultUserRankList.data.current_rank_name
                    this.userInfor.next_rank_level = resultUserRankList.data.next_rank_level
                    this.userInfor.next_rank_name = resultUserRankList.data.next_rank_name
                    // 20180726 需求变更 副标题要使用用户下一等级的总额
                    // this.userInfor.next_rank_need_consumption = resultUserRankList.data.next_rank_need_consumption

                    // Rank 赋值
                    this.rankList = resultUserRankList.data.rank_definition
                    // 判断当前用户等级大于5 时，副标题不显示~ 否则 获取用户下一等级总额数量
                    if( this.userInfor.current_rank_level > 5 ){
                        this.isHightLevel = true
                        this.userInfor.next_rank_level = this.userInfor.current_rank_level

                    }else if( this.userInfor.current_rank_level === 5 ){
                        this.userInfor.next_rank_level = 6
                        this.isHightLevel = true
                    }
                    else{
                        let a = resultUserRankList.data.rank_definition[resultUserRankList.data.next_rank_level-1]
                        this.userInfor.next_rank_need_consumption = a.consumption
                    }

                    // 取消 Loading
                    this.loading = false
                }else{
                    console.log("getUserRankList has something wrong")
                }



            },

            // 费率转换
            reRate(str){
                if(str){
                    let _rate = this.$math.chain( str ).multiply(100).round(1).done().toString()
                    return _rate
                }
            },

            // 描述文字转换
            toMultiplyTo(num){
                // console.log("num is :",num)
                if( num === undefined ){
                    return false
                }
                num = this.$math.chain( num ).multiply(100).round(1).done()
                return num
            }
        },

    }
</script>
