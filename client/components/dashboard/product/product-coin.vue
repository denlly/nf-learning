<style lang="scss" rel="stylesheet/scss" scoped>
    .Product_Coin{
        margin:0 auto;
        padding:80px 0;
        max-width: 1176px;

        .title{
            /*color:red;*/
            /*font-size: 20px;*/
            /*font-weight: 500;*/
        }
    }
</style>

<template>
    <section class="Product_Coin">
        <!--<div class="">-->
            <el-tabs v-model="coinStyle" type="card" @tab-click="handleClick">
                <el-tab-pane name="first">
                    <span slot="label" class="title">Bitcoin</span>
                    <coin-detail></coin-detail>
                </el-tab-pane>
                <el-tab-pane name="sec">
                    <span slot="label" class="title">Bitcoin2</span>
                    <coin-detail></coin-detail>
                </el-tab-pane>
                <el-tab-pane name="trd">
                    <span slot="label" class="title">Bitcoin3</span>
                    <coin-detail></coin-detail>
                </el-tab-pane>
            </el-tabs>
        <!--</div>-->
    </section>
</template>

<script>
    import coinDetail from "../product/coin-detail"

    export default {
        components: {
            coinDetail,
        },
        data(){
            return {
                title:" ",
                coinStyle: 'first'
            }
        },
        mounted() {  },
        computed:{  },
        methods:{
            handleClick(tab, event) {
                console.log(tab, event);
            }
        },

    }
</script>
