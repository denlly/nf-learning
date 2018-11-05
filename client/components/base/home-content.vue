<style lang="scss" rel="stylesheet/scss" scoped>
    .homePage{
        margin:0 auto;
        /*padding:100px 0;*/
        /*max-width: 1176px;*/
    }
    @media screen and (max-width: 1176px){
        .homePage{width:100%;}
    }
    bgGrey{
        background-color: #F9F9F9;
    }
    .paddingTop20{padding-top:20px;}
    .paddingTop40{padding-top:40px;}
</style>

<template lang="html">
    <section class="homePage">
        <header>
            <slot name="title"></slot>
        </header>
        <section class="slotContent">
            <slot name="content">
                放入内容
            </slot>
        </section>
    </section>
</template>

<script>
    export default {
        components: {  },
        data(){
            return {
                title:"homepage-slot"
            }
        },
        mounted() {  },
        computed:{  },
        methods:{  },

    }
</script>
