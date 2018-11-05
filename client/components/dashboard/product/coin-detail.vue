<style lang="scss" rel="stylesheet/scss" scoped>
    .CoinDetail{
        padding: 30px;
        background-color: #D8D8D8;

        .fontSize14{font-size: 14px;}
        .fontSize16{font-size: 16px;}
        .fontSize20{font-size: 20px;}
        .fontSize30{font-size: 30px;}
        .fontSize60{font-size: 60px;}

        .part{
            display: flex;
            justify-content: space-between;
            align-items: center;

            span{
                display: inline-block;
            }

            .toBuy{
                padding:12px 40px;
                color:#fff;
                cursor: pointer;
                background-color: #888888;
            }
        }
        .firHr{margin:30px 0;}
        .secHr{margin:22px 0 20px 0 ;}
    }
</style>

<template>
    <div class="CoinDetail">
        <div class="part">
            <span class="fontSize16 fontPFsemibold">选择数量</span>
            <span class="fontSize14">8000 TH/s Stock Remaining</span>
        </div>
        <div>
            input
        </div>
        <hr class="firHr">
        <div class="part">
            <span class="fontSize30">$119.00 per 1000GH/s ✕ 10 TH/s</span>
            <span class="fontSize60">$1190.00</span>
        </div>
        <hr class="secHr">
        <div class="part">
            <p class="fontSize16">
                每日电费与维护费: $2.6 <br>
                预估每日净收益: 0.00064 BTC ≈ $2.7
            </p>
            <span class="fontSize20 toBuy" @click="toBuyCoin">确认购买</span>
        </div>
    </div>
</template>

<script>
    export default {
        components: {

        },
        data(){
            return {
                title:"首页"
            }
        },
        mounted() {  },
        computed:{  },
        methods:{
            // toBuyCoin Methods
            toBuyCoin(){
                this.$router.push({path:'/buy?code=MiningS9&amount=223dd'});
            }
        },

    }
</script>
