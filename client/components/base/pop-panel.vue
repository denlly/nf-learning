<style lang="scss" rel="stylesheet/scss" scoped>
.pop_wrap{
    display: flex;
    justify-content: center;
    align-items: center;
    height:100%;
    .pop_box{
        padding:48px;
        width:796px;
        border-radius: 6px;
        background-color: #fff;
        .head1{
            margin-bottom:32px;
            font-size: 30px;
            line-height: 30px;
        }
        .head2{
            &-title{
                margin-bottom:8px;
                font-size: 30px;
                line-height: 30px;
                color:#383155;
            }
            &-subtitle{
                font-size: 16px;
                line-height: 22px;
                color:#9490a5;
            }
        }
        .content{
            min-height: 200px;
        }
        .footer{
            display: flex;
            justify-content: space-between;
            align-items: center;

            img{
                cursor: pointer;
            }
        }
    }
}

@media only screen and (max-width: 768px){
    .pop_wrap{
        box-sizing: border-box;
        padding:89px 24px;
        .pop_box{
            padding:24px;
            width:100%;
        }
    }
}
.cancel_button{
    font-size: 16px;
    padding: 15px 0;
    font-weight: bold;
    color: #7b7494;
    cursor: pointer;
}
</style>

<template>
    <article class="pop_wrap">
        <section class="pop_box">
            <div  class="head2" v-if="type === 'subtitle'">
                <div class="head2-title" name="title">{{title}}</div>
                <div class="head2-subtitle" name="subtitle">{{initData.subtitle}}</div>
            </div>

            <slot class="content" name="content">
                传入内部内容
            </slot>

            <div class="footer" >
                <div >
                    <app-button :dark="dark" type="primary" :loading="loading" class="medium" @click="submitButton">{{initData.submitText}}</app-button>
                </div>
                <div  class="cancel_button" @click="cancelButton">
                    {{initData.cancelText}}
                </div>
            </div>
        </section>
    </article>
</template>

<script>
import {
    mapState,
    mapActions,
    mapGetters,
    mapMutations
} from 'vuex'
import appButton from "./button.vue"
export default {
    props:{
        type:{
            type: String,
            default:'standard'
        },
        title:{
            type: String,
        },
        loading:{
            type:Boolean,
            default:false
        },
        dark:{
            default:false,
        },
        initData:{
            type: Object,
            default(){
                return {
                    href:'',
                    text:'',
                    cancelText:'Cancel',
                    submitText:'Submit'
                }
            }
        }
    },
    created(){
        this.specicalArr = [] // 此数组为需要自动关闭弹窗的，无后续ajax错误处理
    },
    methods:{
        ...mapMutations('base', ['setPop']),
        submitButton(){
            this.$emit("submitEvent")
            if(this.specicalArr.includes(this.type)){
                this.setPop('')
            }
        },
        cancelButton(){
            this.setPop('')
            this.$emit("cancelEvent")
        }

    },
    components:{
        appButton
    }
}
</script>
