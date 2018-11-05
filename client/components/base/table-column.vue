
<style lang="scss" scoped="true">
@media only screen and (min-width: 768px) {
    .table_column{
        width: 25%;
    }
    .flexTable_column{
        flex: 1;
        >span{
            display: block;
        }
    }
    // .affiliate.table{
    //     .table_column.link{
    //         position: relative;
    //         padding-right: 30px;
    //         .icon_copy{
    //             position: absolute;
    //             right: 6px;
    //             top: 24px;
    //         }
    //     }
    // }
}

@media only screen and (max-width: 768px) {
    h4.title{
        padding-bottom: 8px;
        text-align: left;
        font-size: 20px;
        font-weight: normal;
        color: #7b7494;
    }
    .text{
        font-size: 18px;
        line-height: 1.22;
    }
    .table_column{
        padding-top: 24px;
    }

}

</style>

<template lang="html">
    <div :class="{ 'table_head': false,'flexTable_column': !width }" :style="{width:mobile ? '100%' :width}" class="table_column">
        <h4 class="title hidden-sm-and-up">{{label}}</h4>
        <span class="text">
            <slot>

            </slot>
        </span>
    </div>
</template>

<script>
export default {
    props:{
        label: {
            type: String,
        },
        width:{
            type: [Number,String]
        }
    },
    computed:{
        mobile(){
            const w = document.body.clientWidth
            if(w<768){
                return true
            }else{
                return false
            }
        }
    }
}
</script>
