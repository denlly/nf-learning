<style lang="scss" rel="stylesheet/scss" scoped>
    .SlotTitle{
        margin-bottom:80px;
        font-size: 36px;
    }
</style>

<template lang="html">
    <div class="SlotTitle">
        <slot name="title" class="title">主页-头部插槽默认文案</slot>
    </div>
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
