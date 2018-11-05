<style lang="scss">
input{
    line-height: 1;
}
</style>

<template lang="html">
    <div class="">
        <input type="text" :type="type" name="" :value="value" :placeholder="placeholder"  @input="emitInput($event.target.value)">
    </div>
</template>

<script>
export default {
    model: {
			prop: 'value',
			event: 'input'
	},
    props: {
			readonly: {
				type: Boolean,
				default: false
			},
            size:{
                type:String,
                default:'medium'
            },
            type:{type:String,default:'text'},
            value: String,  //父级的v-model传了value值到这
            placeholder:String
	},
    computed:{
        getCls(){
            let clsArr =[]
            if(size){
                clsArr.push('')
            }
            return clsArr.join(' ')
        }
    },
    methods: {
            emitInput(value){
                this.$emit('input', value);
            }
    }
}
</script>
