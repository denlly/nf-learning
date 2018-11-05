<style lang="scss" rel="stylesheet/scss" scoped>
    .banner{
        margin:0 auto;
        max-width: 1176px;

        .title{
            font-size: 54px;
            line-height: 68px;
            /*color:#fff;*/
        }
        .detail{
            margin:24px 0 41px 0 ;
            font-size: 16px;
            line-height: 1.4;
            opacity: 0.7;
        }
        .toDashboard{
            display: inline-block;
            padding:15px 56px;
            font-size: 14px;
            line-height: 20px;
            cursor:pointer;
            border-radius: 4px;
            background-color: #00c6bc;
        }
    }

    @media only screen and (max-width: 768px){
        .banner{
            .title{
                font-size: 40px;
                line-height: 51px;
            }
            .detail{
                margin:24px 0 48px 0 ;
                line-height: 22px;
            }
            .toDashboard{
                box-sizing: border-box;
                padding:15px 39px;
                width:200px;
                font-size: 16px;
                line-height: 20px;
                text-align: center;
            }
        }
    }
</style>

<template>
    <div class="banner">
        <slot name="bannertitle" class="title">这里是标题</slot>
        <slot name="bannerdescribe" class="detail">这里是含有 换行标签 的一段文字</slot>
        <slot name="bannerbutton" class="toDashboard">跳转按钮</slot>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                title:""
            }
        },
        mounted() {  },
        computed:{  },
        methods:{  },

    }
</script>
