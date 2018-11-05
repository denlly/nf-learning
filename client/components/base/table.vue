<style lang="scss">
$firstGridpadding:48px;
@media only screen and (min-width: 768px) {
    @mixin base{
        display: flex;
        $columnPadding:  33px;
        >li,>div{
            box-sizing: border-box;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            .text{
                padding-left: $columnPadding;
            }
            text-align: left;
        }

        >div:nth-child(1){
            .text{
                padding-left: 49px;
            }
        }
        >li:nth-child(1) .text{
            padding-left: $firstGridpadding;
        }
        // >li:last-child,>div:last-child{
        //     padding-right: 106px;
        // }
    }
    @mixin tableBoder{
        >div{
            border-bottom:  solid 1px #f7f7fa;
            border-right:  solid 1px #f7f7fa;
        }
        >div:last-child{
            border-right:  none;
        }
    }
    // .flexTable{ // 我的订单
    //     ul.table_content{
    //         li{
    //             display: flex;
    //
    //         }
    //     }
    // }
    .table_head{
        @include base;
        font-size: 20px;
        background-color: rgba(241, 242, 251, 1.0);
        color: #7b7494;
        line-height: 58px;
        li.flexTable_column{
            flex:1;
        }
    }
    .table_content{
        li{
            @include base;
            @include tableBoder;
            font-size: 18px;
            color: #2f2c37;
            line-height: 25px + 23*2;
        }
    }


}

.price_wrap{  // 两种价格的类
    @mixin textBlock{
        display: block;
        line-height: 1;
    }
    .localTotalPrice{
        @include textBlock;
        padding-top: 17px;
    }
    .price{
        @include textBlock;
        font-size: 15px;
        padding-top: 5px;
        color: #9490a5;
    }
}
@media only screen and (max-width: 768px) {
    .table_content{
        li{
            border-top: solid 1px #f7f7fa;
            border-bottom: solid 1px #f7f7fa;
            padding-left: 24px;
            padding-bottom: 25px;
        }
    }
    .price_wrap{  // 两种价格的类
        .localTotalPrice{
            padding-top: 0px;
        }
    }
}
.nodata{
    padding: 48px 0;
    font-size: 18px;
    color: #2c3945;
    padding-left: $firstGridpadding;
}
.table{
    background: #ffffff;
}
</style>

<template lang="html">
    <section class="table">
        <ul class="table_head clearfix hidden-xs-only">
            <li :class="{'flexTable_column': !column.width }" :style="{ width:column.width}"  v-for="column in columns">
                <span class="text">{{column.title}}</span>
            </li>
        </ul>
        <!-- 表内容 -->
        <ul class="table_content clearfix" v-if="tableData.length">
            <li v-for="row in tableData" class="clearfix">
                    <slot :row="row"></slot>
            </li>
        </ul>
        <p v-else class="nodata">
            {{$t('gen.noresult')}}
        </p>

    </section>
</template>

<script>
export default {
    props:{
        columns:Array,
        tableData:Array,
        eventColunms:{
            type:Array,
            default() {
                return []
            }
        }
    },
    methods:{
        // getPercent(val){
        //     var result = parseInt(val * 100) + "%";
        //     return result
        // },
        // onClick(item){
        //     if(this.eventColunms.includes(item.key)){
        //         this.$emit('onClick',item)
        //     }
        // }
    }
}
</script>
