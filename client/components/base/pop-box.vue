<style lang="scss" rel="stylesheet/scss" scoped>
    .pop_box{
        display: flex;
        justify-content: center;
        align-items: center;
        height:100%;

        .modal1{
            padding:48px;
            width:796px;
            /*height: 200px;*/
            background-color: #fff;
            border-radius: 6px;

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

            }
            .footer{
                display: flex;
                justify-content: space-between;
                align-items: center;

                img{
                    cursor: pointer;
                }
                .submit_button{
                    display: block;
                    padding:15px 43px;
                    font-size: 16px;
                    line-height: 20px;
                    color: #fff;
                    cursor: not-allowed;
                    border-radius: 6px;
                    background-color: #c2c2c2;
                }
                .submit_active{
                    cursor: pointer;
                    background-color: #27c6bc;
                }
                .cancel_button{
                    display: block;
                    padding:15px 0;
                    font-size: 16px;
                    line-height: 20px;
                    color: #7b7492;
                    cursor: pointer;
                    border-radius: 6px;
                }
            }
        }
        .modal2{

        }
    }

    @media only screen and (max-width: 768px){
        .pop_box{
            box-sizing: border-box;
            padding:89px 24px;

            .modal1{
                padding:24px;
                width:100%;

                .head1{
                    font-size: 24px;
                    line-height: 30px;
                    font-weight: 500;
                    color: #383155;
                }
            }
        }
    }
</style>

<template>
    <div class="pop_box">
        <div name="modal1" class="modal1" v-if="type === 'modal1'">
            <slot class="head1" name="head1"></slot>
            <slot class="head2" name="head2">
                <slot class="head2-title" name="title"></slot>
                <slot class="head2-subtitle" name="subtitle"></slot>
            </slot>



            <slot class="content" name="content">
                slot内部a
            </slot>

            <div class="footer" >
                <div>
                    <span class="submit_button" :class="{submit_active:isActive}" @click="submitButton()" v-loading="buttonloading">{{ releftButton }}</span>
                </div>
                <div>
                    <span class="cancel_button" @click="cancelButton()" >{{$t('cs.btn2')}}</span>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        props:{
            type:{
                type: String,
            },
            head1:{
                head1: String,
            },
            title:{
                type: String,
            },
            isActive:{
                type:Boolean,
                default:false
            },
            leftButton:{
                type:String,
                default:function () {
                    return this.$t('cs.btn1')
                }
            },
            rightButton:{
                type:String,
                default:"Cancel"
            },
            buttonloading:{
                type:Boolean,
                default:false
            },
            initData:{
                type: Object,
                default(){
                    return {
                        href:'',
                        text:''
                    }
                }
            }
        },
        methods:{
            submitButton(){
                this.$emit("submitEvent")
            },
            cancelButton(){
                this.$emit("cancelEvent")
            }

        },
        computed:{
            releftButton(){
                return this.leftButton
            },
            rerightButton(){
                return this.rightButton
            }
        },

    }
</script>
