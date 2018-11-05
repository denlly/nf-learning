<style lang="scss" rel="stylesheet/scss" >
    .tips_com{
        background-color: #f7f7fa;

        &_content{
            margin:0 auto;
            padding:50px;
            max-width:1176px;

            &_title{
                .theme{
                    display: flex;
                    justify-content: space-between;


                    span{
                        margin-bottom:5px;
                        font-size: 24px;
                        color: #383155;
                    }

                }
                .subTheme{
                    margin-bottom: 24px;
                    font-size: 16px;
                    color: #9490a5;
                }
            }
            &_content{
                font-size: 16px;
                color: #9490a5;
                word-wrap:break-word;

                .p_text{
                    word-wrap:break-word;
                    /*font-weight: 500;*/

                    &>a {color:#00c6bc !important;
                        font-size: 16px;
                        font-weight: normal;}
                    &>a:visited {color:#00c6bc !important;;}
                    &>a:hover {color:#00c6bc !important;;}
                    &>a:active {color:#00c6bc !important;;}
                }
            }
        }

    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity 1s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }

    @media only screen and (max-width: 768px){
        .tips_com{
            &_content{
                padding:32px 24px 48px 24px;

                &_title{
                    .theme{
                        margin-bottom:2px;
                        font-size: 22px;
                        line-height: 28px;
                        span{
                            margin-bottom:2px;
                        }
                    }
                    .subTheme{
                        font-size: 15px;
                        color:#9490a5;
                    }
                }
                &_content{
                    .p_text{
                        font-size: 13px;
                        line-height: 1.54;
                        color: #9490a5;
                    }
                }

            }
        }
    }
</style>

<template>
    <transition name="fade">
        <section class="tips_com" v-if="isShow === true" v-loading="loading">
            <div class="tips_com_content">
                <div class="tips_com_content_title">
                    <p class="theme">
                        <span>{{ firstNews.title }}</span>
                        <img src="../../assets/images/publicIcon/close.svg" alt="" @click="closeTips()">
                    </p>

                    <!-- 如果 fields.published_at 不存在 则使用 sye.updatedAt -->
                    <p class="subTheme" v-if="firstNews.createdAt">{{ firstNews.createdAt | moment("YYYY-MM-DD HH:mm:ss")}}</p>
                    <p class="subTheme" v-else>{{ firstNews.updatedAt | moment("YYYY-MM-DD HH:mm:ss")}}</p>
                </div>
                <div class="tips_com_content_content">
                    <p class="p_text" v-html="firstNews.content"></p>
                </div>
            </div>
        </section>
    </transition>
</template>

<script>
    import {ERR_OK} from "../../assets/js/config.js"

    export default {
        data(){
            return {
                loading:true,
                firstNews:{
                    titile:"",
                    updatedAt:"",
                    createdAt:"",
                    content:"",
                },
                isShow:false,
                local:{
                    number:"0",
                    state:true
                },
                vue_number:null
            }
        },
        mounted() {
            this.init()
        },
        computed:{  },
        methods:{
            /*
            *   首先执行缓存策略
            *   如果缓存不存在，则创建一个缓存，将显示置为false，之后调用接口，如果
            */

            //  统一出口
            init(){
                this.toSaveLocalStorage()
            },

            // 存储localStorage
            async toSaveLocalStorage(){
                // 第一层判断localStorage 是否存在
                if( localStorage.tips_isLocalShow === undefined ){
                    localStorage.setItem("tips_number", 0)
                    localStorage.setItem("tips_isLocalShow", false)

                }else{
                    // 如果存在 先读取默认值，如果是true(字符串)，则将data中的localState 置为true
                    if( localStorage.tips_isLocalShow == "true" ){
                        this.isShow = true
                    }else{
                        this.isShow = false
                    }

                }

                this._getFirstNews()
            },

            //  获取最新新闻的方法
            async _getFirstNews(){
                let newsList = await this.$axios("notice_lastest")
                // console.log("newsList",newsList,typeof newsList.data)
                //  判断返回数据的状态码是否为200，如果不是200则需要处理报错~
                if( newsList.code === ERR_OK){
                    this.firstNews = newsList.data
                    // 如果 未读消息接口数据 不等于 localStorage.tips_number 的值，则将弹窗置为 true
                    if( this.firstNews.createdAt !== localStorage.tips_number ){

                        if( newsList.data === "" ){
                            this.isShow = false
                            localStorage.tips_isLocalShow = false
                            // console.log("newsList.data === ")
                        }else if( this.isShow == false ){
                            // console.log("~!~!~",this.firstNews.createdAt,"+",localStorage.tips_number,"+")
                            setTimeout(()=>{
                                // console.log(1)
                                this.isShow = true
                                // console.log("isShow")
                                localStorage.tips_isLocalShow = true
                            },3000)

                        }

                    }else{
                        // console.log("else")
                    }

                    this.loading = false
                }else{
                    this.isShow = false
                }

            },



            //  点击关闭面板
            closeTips(){
                localStorage.tips_number = this.firstNews.createdAt
                this.isShow = false
                localStorage.tips_isLocalShow = false
            }

        },

    }
</script>
