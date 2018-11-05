<style lang="scss" rel="stylesheet/scss" scoped>
    .myorder{
        .m_text{
            display: none;
        }
        .pc-show{
            display: block;
        }
        .m-show{
            display: none;
        }
        &_banner{
            padding:136px 0 ;
            width:100%;
            background: url("../../assets/images/index_bg.jpg") no-repeat center;
            background-size: cover;
            color:#fff;

            &Content{
                margin:0 auto;
                max-width: 1176px;
                background-color: #fff;
            }
        }
    }

    @media only screen and (max-width: 768px){
        .myorder{
            .m_text{
                display: inline-block;
                margin-bottom:16px;
                font-size: 16px;
                line-height: 16px;
            }
            .pc-show{
                display: none;
            }
            .m-show{
                display: block;
            }
            &_banner{
                padding:54px 32px 37px 32px;

                .subtitle{
                    margin:16px 0 46px 0 ;
                }
            }
        }
    }
</style>

<template>
    <div class="myorder">
        <section class="myorder_banner">
            <!--<span class="m_text">{{ numberOfPeople }} {{$t('hdr.t1')}}</span>-->
            <banner slot="narrow">
                <div slot="bannertitle" class="title fontPFsemibold">{{$t('hdr.h1')}}</div>
                <p slot="bannerdescribe" class="detail fontPFsemibold fontSpecialFamily pc-show" v-html="$t('db.mo.h1')"></p>
                <p slot="bannerdescribe" class="detail fontPFsemibold fontSpecialFamily m-show subtitle" v-html="$t('hdr.t2')"></p>
                <span slot="bannerbutton" class="toDashboard fontPFsemibold" @click="$router.push({path:'/dashboard/purchasing-power'})">{{$t('hdr.btn')}}</span>
            </banner>
        </section>

        <!-- My Order List -->
        <orderTable></orderTable>
    </div>
</template>

<script>
    import banner from "../../components/base/banner"
    import orderTable from "../../components/dashboard/myOrder/oroder-table"
    import {ERR_OK} from "../../assets/js/config.js"


    export default {
        head() {
            return {
                title: this.$t("navbar.myorders"),
            }
        },

        components: { banner,orderTable },
        data(){
            return {
                title:"my-order",
                numberOfPeople: 40000,
            }
        },
        mounted() {
            this.getMiningUserCount()
        },
        computed:{  },
        methods:{
            // 获取挖矿人数
            async getMiningUserCount(){
                let resultMiningUserCount = await this.$axios("miningnumber")
                // console.log("!resultMiningUserCount",resultMiningUserCount)
                if( resultMiningUserCount.code === ERR_OK){
                    // console.log("~",resultMiningUserCount.data)
                    this.numberOfPeople = resultMiningUserCount.data.miningCount
                }else{
                    // console.log("getMiningUserCount has something wrong")
                }

            }

        },

    }
</script>
