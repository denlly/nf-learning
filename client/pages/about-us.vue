<style lang="scss" rel="stylesheet/scss" scoped>
    .about_us{
        background-color: #fff;
        .banner{
            height: 400px;
            background: url("../assets/images/abuout-us/aboutus.jpg") no-repeat center;
            background-size: cover;
        }

        &_content{
            margin:0 auto;
            padding:80px 0 100px 0;
            max-width:1176px;
            background-color: #fff;

            .about_text{
                font-size: 16px;
                line-height: 1.5;
                color: #9490a5;
            }

            .line{
                margin:48px 0 ;
                height:1px;
                background-color: #efefef;
            }

            .officetitle{
                margin-bottom:32px;
                font-size: 24px;
                line-height: 24px;
                color:#383155;
            }
            .office{
                display: flex;
                justify-content: space-between;
                align-items: center;

                .innerdiv{
                    display: flex;
                    justify-content: left;
                    align-items: center;
                    width:1176px;
                }

                &_item{
                    box-sizing: border-box;
                    margin-right:20px;
                    padding:24px 33px 48px 24px;
                    width:226px;
                    height:160px;
                    border-radius: 4px;
                    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
                    border: solid 0.5px rgba(0, 0, 0, 0.2);

                    .title{
                        margin-bottom:16px;
                        font-size: 16px;
                        line-height: 16px;
                        color:#2f2c37;
                    }
                    .text{
                        font-size: 12px;
                        line-height: 19px;
                        color:#9490a5;

                        a{
                            font-size: 12px;
                            color:#9490a5;
                            cursor: pointer;
                        }
                    }

                }
            }

        }
    }

    @media only screen and (max-width: 768px){
        .about_us{
            .banner{
                /* 20170730 需求变更：去掉移动端头图 */
                display: none;
                /*height: 161px;*/
                /*background: url("../assets/images/abuout-us/aboutus.jpg") no-repeat center;*/
                /*background-size: contain;*/
                /*background-color: #2e2c37;*/
            }
            &_content{
                padding:32px 0 48px 0 ;

                .line{
                    display: none;
                }

                .m_padding{
                    padding:0 24px;
                }

                .officetitle{
                    margin:48px 0 32px 0 ;
                }
                .office{
                    padding-right:24px;
                    width:100%;
                    overflow: scroll;

                    .innerdiv{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        width:1176px;
                    }

                    &_item{
                        margin-right:20px;
                        padding:24px 33px 48px 24px;
                        width:220px;
                        border-radius: 4px;
                        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
                        border: solid 0.5px rgba(0, 0, 0, 0.2);

                    }
                }
            }
        }
    }
</style>

<template>
    <div class="about_us">
        <div class="banner"></div>
        <div class="about_us_content">
            <panel class="no_border m_padding">
                <panel-head slot="head" type="about_us" :title="retitle"></panel-head>
                <div slot="content">

                    <p class="about_text fontSpecialFamily">
                        {{$t('au.t1')}}
                    </p>

                    <div class="line"></div>

                    <p class="officetitle finalFWBBold">{{$t('au.h2')}}</p>
                    <div class="office">
                        <div class="innerdiv">
                            <div v-for="(data,key) in relistData" :key="key" class="office_item">
                                <ul>
                                    <li class="title">{{ data.title }}</li>
                                    <li class="text fontSpecialFamily">
                                        <a v-if="key === 3" href="mailto:support@datafountain.cn">{{ data.sub1 }}</a>
                                        <span v-else>{{ data.sub1 }}</span>
                                    </li>
                                    <li class="text fontSpecialFamily">
                                        <!--{{key}}-->
                                        <a v-if="key === 2" href="mailto:sales@datafountain.cn">{{ data.sub2 }}</a>
                                        <span v-else>{{ data.sub2 }}</span>
                                    </li>
                                    <li class="text fontSpecialFamily">{{ data.sub3 }}</li>
                                    <li class="text fontSpecialFamily">{{ data.sub4 }}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </panel>
        </div>
    </div>
</template>

<script>
    import panel from "../components/base/panel"
    import panelHead from "../components/base/panel-head"

    export default {
        // middleware:"auth",
        head() {
            return {
                title: this.$t("au.h1"),
            }
        },

        components: { panel,panelHead },
        data(){
            return {
                title: this.$t("au.h1"),
                subtitle:"1",
                element:"",
                listData:[
                    {title:"Kanga Fintech Ltd.",sub1:"Morgan & Morgan Building",sub2:"Pasea Estate",sub3:"Road Town, Tortola",sub4:"British Virgin Islands"},
                    {title:"Beijing Office",sub1:"1-1006, Zhubang 2000",sub2:"100 Balizhuang Xili",sub3:"Chaoyang, Beijing",sub4:"China"},
                    {title:"Sales Manager",sub1:"For bulk purchase",sub2:"Email: sales@datafountain.cn",sub3:"",sub4:" "},
                    {title:"Customer Service",sub1:"Email: service@datafountain.cn",sub2:"9:00am - 5:00pm GMT+8",sub3:" ",sub4:" "},
                ]
            }
        },
        mounted() {  },
        computed:{
            retitle(){
                return this.title = this.$t("au.h1")
            },
            relistData(){
                let _data = [
                    {title:"Kanga Fintech Ltd.",sub1:"Morgan & Morgan Building",sub2:"Pasea Estate",sub3:"Road Town, Tortola",sub4:"British Virgin Islands"},
                    {title:"Beijing Office",sub1:"1-1006, Zhubang 2000",sub2:"100 Balizhuang Xili",sub3:"Chaoyang, Beijing",sub4:"China"},
                    {title:this.$t("au.h3"),sub1:this.$t("au.h5"),sub2:"Email: sales@datafountain.cn",sub3:"",sub4:" "},
                    {title:this.$t("au.h6"),sub1:"Email: support@datafountain.cn",sub2:"9:00am - 5:00pm GMT+8",sub3:" ",sub4:" "},
                ]
                return _data
            }

        },
        methods:{  },

    }
</script>
