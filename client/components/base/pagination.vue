<style lang="scss" scoped>

.pagination{
    display: flex;
    width: 170px;
    line-height: 48px;
    @mixin base{
        font-size: 35px;
        box-sizing: border-box;
    }
    .page_number{
        @include base;
        flex: 1;
        text-align: center;
        font-size: 14px;
    	font-weight: 600;
        line-height: 50px;
    	color: #00c6bc;
    }
    &_button{
        @include base;
    	width: 50px;
        height: 50px;
        color: #00c6bc;
        text-align: center;
    	border-radius: 4px;
    	border: solid 1px #00c6bc;
        cursor: pointer;
    }
    &_button.disabled{
        border: solid 1px #c2c2c2;
        color: #c2c2c2;
        cursor: not-allowed;
    }
}
.iconfont{
    font-size: 18px;
    position: relative;
    top:-6px;
    right: -1px;
}
@media only screen and (min-width: 768px) {
    .pagination{
        float: right;
    }
    .pagination_wrap{ // 处理表格底部分页位置
        padding: 48px;
    }
}

@media only screen and (max-width: 768px) {
    .pagination_wrap{
        padding: 32px 0 48px 0;
    }
    .pagination{
        margin: 0 auto;
    }
}
</style>

<template lang="html">
    <div class="pagination_wrap clearfix" v-if="total!==1">
        <section class="pagination clearfix">
            <div class="page_pre  pagination_button" :class="{disabled:currentPage <= 1}" @click="go(currentPage - 1)">
                <span class="iconfont icon-prev"></span>
            </div>
            <div class="page_number">
                {{`${currentPage}/${total}`}}
            </div>
            <div class="page_next pagination_button" :class="{disabled:currentPage >= total}" @click="go(currentPage + 1)">
               <span class="iconfont icon-arrow"></span>
            </div>
        </section>
    </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex"
export default {
    props:{
        total:[Number,String],
    },
    computed:{
        ...mapState('base',['currentPage'])
    },
    methods:{
        ...mapMutations('base',['setPage']),
        go (page) {
              if(page < 1) {
                  page = 1
              }
              if(page > this.total) {
                  page = this.total
              }
              if(page === this.currentPage) {
                  return
              }
              this.setPage(parseInt(page))
        }
    }
}
</script>
