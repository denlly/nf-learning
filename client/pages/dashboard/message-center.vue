<style lang="scss" rel="stylesheet/scss">
    .messageCenter{
        padding:80px 0 145px 0 ;
        background-color: #fff;

        .messageCenter-content{
            margin:0 auto;
            padding:48px 0 48px 48px;
            max-width: 1176px;
            border-radius: 4px;
            box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
            background-color: #ffffff;
            border: solid 0.5px rgba(0, 0, 0, 0.2);

            .messageItem{
                margin-bottom:32px;
                padding-bottom:32px;
                border-bottom:1px solid #efefef;

                .title{
                    h4{
                        margin-bottom:5px;
                        font-size: 24px;
                        line-height: 30px;
                        color: #383155;
                    }
                    p{
                        margin-bottom:24px;
                        font-size: 16px;
                        line-height: 24px;
                        color: #9490a5;
                    }

                }
                .content{
                    padding-right:48px;
                    /*width: 940px;*/

                    p{
                        margin-bottom:16px;
                        font-size: 16px;
                        line-height: 1.5;
                        color: #9490a5;

                        &>a {color:#00c6bc !important;
                            font-size: 16px;
                            font-weight: normal;}
                        &>a:visited {color:#00c6bc !important;;}
                        &>a:hover {color:#00c6bc !important;;}
                        &>a:active {color:#00c6bc !important;;}

                    }
                    p:last-child{
                        margin:0;
                    }
                }



                &:last-child{
                    margin-bottom:30px;
                }
            }
            .paginationDiv{
                text-align: right;
            }
        }
    }

    @media only screen and (max-width: 768px){
        .messageCenter{
            padding:24px 0 73px 0 ;

            .messageCenter-content{
                padding:0;
                border:none;
                box-shadow: none;

                .messageItem{
                    margin-bottom:24px;
                    padding:0 24px 24px 24px;

                    .title{
                        h4{
                            margin-bottom:9px;
                            word-wrap:break-word;
                        }
                        p{
                            font-size: 14px;
                        }
                    }
                    .content{
                        padding:0;
                    }
                }
            }
        }
    }
</style>

<template>
    <section class="messageCenter" v-loading="loading">
        <div class="messageCenter-content">
            <div v-if="isError === false">
                <div class="messageItem" v-for="(data,key) in news" :key="key">
                    <div class="title">
                        <h4>{{ data.title }}</h4>

                        <!-- 如果 fields.published_at 不存在 则使用 sye.updatedAt -->
                        <p v-if="data.updatedAt">{{ data.updatedAt | moment("YYYY-MM-DD HH:mm:ss")}}</p>
                        <p v-else>{{ data.updatedAt | moment("YYYY-MM-DD HH:mm:ss")}}</p>

                    </div>
                    <div class="content">
                        <p v-html="data.content"></p>
                    </div>
                </div>
                <div class="paginationDiv">
                    <pagination :total="totalPageNum"></pagination>
                    <!--<el-pagination-->
                        <!--:page-size="4"-->
                        <!--:pager-count="5"-->
                        <!--layout="prev, pager, next"-->
                        <!--:total="10">-->
                    <!--</el-pagination>-->
                </div>
            </div>

            <!-- 数据报错时需要显示的信息 -->
            <div v-else>SomeError</div>

        </div>
    </section>
</template>

<script>
    import { mapState, mapActions, mapGetters, mapMutations } from "vuex"
    import {ERR_OK} from "../../assets/js/config.js"
    import pagination from "../../components/base/pagination"

    export default {
        head() {
            return {
                title: this.$t("message.h1"),
            }
        },

        components: { pagination },
        data(){
            return {
                loading:true,
                news:[],
                isError:false,
                totalPageNum:0
            }
        },
        mounted() {
            this.init(0)
        },
        computed:{
            ...mapState('base',['currentPage'])
        },
        watch:{
            currentPage(){
                this._getNewsList((this.currentPage-1)*10)
            }
        },
        methods:{
            // 统一出口
            init(skip){
                this._getNewsList(skip)
            },

            //  获取消息列表
            async _getNewsList(skip){
                this.loading = true
                let params={
                    "skip": skip,
                    "limit": 10,
                }
                let newsList = await this.$axios("notice_alllist",params)
                // console.log("newsList",newsList)
                if( newsList.code === ERR_OK ){
                    this.totalPageNum = newsList.pagination_total
                    let items = newsList.data
                    this.news = items

                    this.loading = false
                }else{
                    // console.log("API Some Error")
                    this.isError = true
                }

            },


            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`)
            },
            handleCurrentChange(val) {
                // console.log(`当前页: ${val}`)
            }


        },

    }
</script>
