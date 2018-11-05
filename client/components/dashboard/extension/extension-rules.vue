<style lang="scss" rel="stylesheet/scss" scoped>
    .extensionrules{
        padding-bottom:80px;

        &_content{
            margin:0 auto;
            max-width:1176px;
        }

        .tips{
            margin-bottom:42px;
            padding:0 48px;
            font-size: 14px;
            color: #9490a5;
        }

        .question{
            /*margin-bottom:49px;*/
            padding:24px 0 24px 46px;
            border-top:1px solid #f7f7fa;

            .questiontheme{
                font-size: 0;
                cursor: pointer;

                span{
                    display: inline-block;
                    margin-left:6px;
                    font-size: 16px;
                    line-height: 22px;
                    color:#383155;
                }

                .triangle{
                    display: inline-block;
                    width:0;
                    height:0;
                    line-height: 16px;
                    border-width: 6px 0 6px 6px;
                    border-style:solid;
                    border-color: transparent transparent transparent #9490a5;/*透明 透明 透明 灰*/

                    position:relative;
                }
            }
            .active{
                .triangle{
                    transform: rotate(90deg);
                }
            }
            .questioncontent{
                /*font-family: "CircularAirLight", "PingFang SC", "Microsoft YaHei" !important;*/
                margin-top:12px;
                padding-left:19px;
                padding-right:75px;
                font-size: 14px;
                line-height: 18px;
                color:#9490a5;
            }
        }

        .folding{
            .el-collapse-item{
                padding-left:48px;

                .el-collapse-item__header{
                    padding-left:48px !important;
                }
            }

        }

    }

    @media only screen and (max-width: 768px){
        .extensionrules{
            padding:8px 0 48px 0 ;
            background-color: #fff;

            &_content{
                width:100%;
            }

            .tips{
                margin-bottom:40px;
                padding:0 24px;
                font-size: 16px;
                line-height: 24px;
            }

            .question{
                padding:24px 0 24px 24px;

                &:last-child{
                    padding-bottom: 0;
                }

                .questiontheme{
                    position: relative;

                    .triangle{
                        position: absolute;
                        top: 6px;
                        left: -10px;
                    }
                    span{
                        box-sizing: border-box;
                        margin-left:12px;
                        margin-right:20px;
                    }


                }
                .active{
                    /*<!--.triangle{-->*/
                        /*<!--top: 9px;-->*/
                        /*<!--left: -13px;-->*/
                    /*<!--}-->*/
                }
                .questioncontent{
                    padding-right: 40px;
                }
            }
            .bordernone{
                padding-top:0 ;
                border-top:0px solid #f7f7fa;
            }
        }
    }
</style>

<template>
    <section class="extensionrules">
        <div class="extensionrules_content">
            <panel class="">
                <panel-head slot="head" type="rank" :title="retitle" ></panel-head>
                <div slot="content">
                    <div class="tips">{{$t('db.aft.h9')}}</div>

                    <div class="question" v-for="(elLeft,key) in redataText" :key="key" :class="{bordernone:key===0}">
                        <p class="questiontheme " :class="{active:elLeft.keys === activekeys}" @click="toggleQuestion(elLeft.keys)" >
                            <span class="triangle"></span>
                            <span>{{ elLeft.title }}</span>
                        </p>
                        <p class="questioncontent fontSpecialFamily" v-if="elLeft.keys == activekeys" v-html="elLeft.content"></p>
                    </div>
                </div>
            </panel>
        </div>
    </section>
</template>

<script>
    import panel from "../../base/panel"
    import panelHead from "../../base/panel-head"

    export default {
        components: {
            panel,panelHead
        },
        data(){
            return {
                title:"Tuiguangguize",
                activekeys: "",
                dataText:[
                    {keys:"1",title:"How do I use my affiliate code?",content:"How do I use my affiliate code?"},
                    {keys:"2",title:"How does the affiliate code work?",content:"It’s simple - anytime your referral uses your affiliate code, they’ll get a 3% discount on their purchase, and you’ll get a hashpower upgrade. The upgrade corresponds to your current affiliate rank - the higher your rank, the bigger the rewards! You’ll be notified by your registered email anytime someone uses your affiliate code."},
                    {keys:"3",title:"How big are the rewards?",content:"How big are the rewards?"},
                    {keys:"4",title:"What do you mean by a ‘ranking’ system?",content:"What do you mean by a ‘ranking’ system?"},
                    {keys:"5",title:"How do I ‘rank up’? Can I move down in rank?",content:"How do I ‘rank up’? Can I move down in rank?"},
                    {keys:"6",title:"What are Affiliate ID URL’s? How can I use them? What’s the difference between a URL and a ‘promo code’?",content:"What are Affiliate ID URL’s? How can I use them? What’s the difference between a URL and a ‘promo code’?"},
                    {keys:"7",title:"Why do some sales remain in the ‘pending’ state?",content:"Why do some sales remain in the ‘pending’ state?"},
                ]
            }
        },
        mounted() {  },
        computed:{
            retitle(){
                return this.$t("db.aft.h8")
            },
            redataText(){
                let redataText = [
                    {keys:"1",title:this.$t("Help.ARP.q1"),content:this.$t("Help.ARP.a1")},
                    {keys:"2",title:this.$t("Help.ARP.q2"),content:this.$t("Help.ARP.a2")},
                    {keys:"3",title:this.$t("Help.ARP.q3"),content:this.$t("Help.ARP.a3")},
                    {keys:"4",title:this.$t("Help.ARP.q4"),content:this.$t("Help.ARP.a4")},
                    {keys:"5",title:this.$t("Help.ARP.q5"),content:this.$t("Help.ARP.a5")},
                    {keys:"6",title:this.$t("Help.ARP.q6"),content:this.$t("Help.ARP.a6")},
                    {keys:"7",title:this.$t("Help.ARP.q7"),content:this.$t("Help.ARP.a7")},
                ]
                return redataText
            }
        },
        methods:{
            toggleQuestion(str){
                if( this.activekeys === str){
                    this.activekeys = ""
                }else{
                    this.activekeys = str
                }
            },
        },

    }
</script>
