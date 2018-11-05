<style lang="scss">
.app_input {
        font-family: PingFang SC, 微软雅黑;
        caret-color:#00C6BC;
}
// 置样式input
.el-input.is-active .el-input__inner, .el-input__inner:focus {
    border-color: #979797;
    outline: 0;
}
.el-input__inner:hover {
    border-color: #979797;
}
@mixin font_14{
	font-size: 14px;
	font-weight: 400;
	text-align: center;
	color: #ffffff;
}
input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    font-size: 14px;
	font-weight: 400;
}
input::-moz-placeholder, textarea:-moz-placeholder {
    font-size: 14px;
	font-weight: 400;
}
input::-moz-placeholder, textarea::-moz-placeholder {
    font-size: 14px;
	font-weight: 400;
}
input::-ms-input-placeholder, textarea:-ms-input-placeholder {
    font-size: 14px;
	font-weight: 400;
}

input:focus::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    color: #ffffff;
}
input:focus::-moz-placeholder, textarea:-moz-placeholder {
    color: #ffffff;
}
input:focus::-moz-placeholder, textarea::-moz-placeholder {
    color: #ffffff;
}
input:focus::-ms-input-placeholder, textarea:-ms-input-placeholder {
    color: #ffffff;
}
.el-input.is-disabled .el-input__inner{
    background-color: initial;
    border: solid 0.5px #8f8c97;
    font-weight: 400;
    color: #383155 !important;
    cursor: initial;
}
.input.large{ // model1-登录input样式
    margin-bottom:15px;
    input{
        @include font_14;
        font-family: PingFang SC, 微软雅黑 !important;
        text-align: left;
        font-size: 16px;
        font-weight: 300 ;
        width: 100%;
    	height: 50px;
        border: solid 1px #979797;
        border-radius: 4px;
        background:none;
    }
    input:focus {
        border-color: #FFFFFF;
        outline: 0;
    }
}
.input.black{
    input{
        color: #383155;
    }
}
.input.error{
    input{
        border: solid 1px #FF5A5F !important;
        font-size: 14px;
    }
    input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
        color:#ffffff;
    }
    input::-moz-placeholder, textarea:-moz-placeholder {
        color:#ffffff;
    }
    input::-moz-placeholder, textarea::-moz-placeholder {
        color:#ffffff;
    }
    input::-ms-input-placeholder, textarea:-ms-input-placeholder {
        color:#ffffff;
    }
}

</style>
<template lang="html">
    <el-input class="input app_input fontPFregular" :disabled="disabled" :type="type" @focus="triggerClick($event)" @blur="triggerBlur($event)"   v-model="modelValue" :placeholder="placeholder">
        <slot>

        </slot>
    </el-input>
</template>

<script>
export default {
    props:['placeholder','initValue','type','disabled'],
    data(){
        return{
            modelValue:''
        }
    },
    created(){
            this.modelValue = this.initValue
    },
    model: {
        prop: 'value',
        event: 'input'
    },
    watch:{
        modelValue(val){
            this.$emit('input', val);
        },
        initValue(val){
            this.modelValue = val
        }
    },
    methods:{
        triggerClick(event){
            this.$emit('focus', event.target.value)
        },
        triggerBlur(event){
             this.$emit('blur', event.target.value)
        }
    }
}
</script>

<style lang="css">
</style>
