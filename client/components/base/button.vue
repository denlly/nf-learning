<style lang="scss">
.app_button {
        font-family: "hash", "PingFang SC", "Microsoft YaHei" !important;
}
$button-color:#00c6bc;
@mixin font_14{
	font-size: 14px;
	font-weight: 400;
	text-align: center;
	color: #ffffff;
}
.el-button--primary {
    color: #fff;
    background-color: $button-color !important;
    border-color: $button-color !important;
}
.el-button--primary:focus, .el-button--primary:hover {
    background: $button-color !important;
    border-color: $button-color !important;
    color: #fff;
}

$button-color:#c2c2c2;
.dark.el-button--primary {
    color: #fff;
    background-color: $button-color !important;
    border-color: $button-color !important;
    cursor: not-allowed;
}
.dark.el-button--primary:focus, .dark.el-button--primary:hover {
    background: $button-color !important;
    border-color: $button-color !important;
    color: #fff;
}

.app_button.large{ // model1-登录button样式
    @include font_14;
   width: 220px;
   height: 50px;
   border-radius: 4px;
   margin-bottom: 20px;
}
.app_button.medium{ // model1-登录button样式
    @include font_14;
   width: 140px;
   height: 50px;
   border-radius: 4px;
}
@media only screen and (max-width: 768px){
    .app_button.large{ // model1-登录button样式
        width: 298px;
    }
    .productSlider .app_button.large{
        width: 100%;
    }
}
</style>
<template lang="html">
    <el-button :type="type" :loading="loading" :class="{dark:dark}" class="app_button" @click="triggerClick($event)">
        <slot>

        </slot>
    </el-button>
</template>

<script>
export default {
    props:['type','loading','dark'],
    created(){
    },
    methods:{
        triggerClick(event){
            if(this.dark){
                return false
            }
            this.$emit('click', event.target.value)
        }
    }

}
</script>
