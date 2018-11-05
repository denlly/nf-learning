<style lang="scss">
$green:#00c6bc;
.slider_wrap{
	width: 100%;
	height: 272px;
	padding: 54px 48px;
	background-color: #f6f6f6;
	.slider_title{
		margin-bottom: (39.7px-32/2);
		.title{
			font-size: 20px;
			line-height: 1.5;
			text-align: left;
			color: #2f2c37;
		}
		.remaining{
			position: relative;
    		top: 10px;
			opacity: 0.54;
			font-size: 15px;
			text-align: left;
			color: #000000;
		}
	}
}
.slider_wrap ul{
	position: relative;
	width: 100%;
	margin-top: 35px-16;
	$top:3px;
	li{
		font-size: 14px;
		text-align: left;
		color: #000000;
	}
	.line{
		position: absolute;
		height: 10px;
		width: 2px;
		top:$top;
		background-color: #dbdbdb;
		transform: translateX(-50%);
		span{
			display: none;
		}
	}
	.light.line{
		top:0px;
		background-color: $green;
		height: 16.2px;
		span{
			display: block;
			width: 100px;
			position: absolute;
			top:30px;
			left:0;
		}
	}
}





// 置element样式
.el-slider__bar{
	height: 9.5px;
	border-radius: 100px;
	background-color: $green;
}
.el-slider__button-wrapper{
	top:-14px;
	.el-slider__button{
		width: 28px;
	    height: 28px;
		border: none;
		box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
		border: solid 0.5px rgba(0, 0, 0, 0.2);
	}
}
.el-slider__runway{
	background-color: #ffffff;
}

@media only screen and (max-width: 768px) {
	.slider_wrap{
		padding: 24px;
		// height: 215px;
		height: 180px;
	}
	.slider_wrap .slider_title .remaining{
		top: 6px;
	}
	.slider_wrap ul .light.line span{
		font-size: 10px;
	}
}

.productSlider.gray{ //置灰不可卖产品
    .slider_title span{
        color: #bcbcbc !important;
    }
	.fontwight300, .totalPrice, .num,.unit,.text{
		color: #bcbcbc !important;
	}
}
</style>

<template lang="html">
    <section class="slider_wrap">
		<div class="slider_title">
			<span class="title fontwight_blod">{{$t('pricing.h1')}}</span>
			<span class="remaining fr">{{productData.product.inventory}} {{productData.product.unit==='H' ? '' :productData.product.unit}}H/s {{$t('pricing.t1',{stockremaining:''})}}</span>
		</div>
      <!-- <el-slider v-model="sliderVal" @change="onChange" :disabled="disabled" :format-tooltip="formatTooltip" show-stops :step="1" :max="max" :show-tooltip="true"></el-slider> -->
      <el-slider v-model="sliderVal" @change="onChange" :disabled="disabled"  show-stops :step="1" :max="max" :show-tooltip="false"></el-slider>
	  <!-- 刻度条 -->
	  <ul class="clearfix">
	  	<li v-for="(item,i) in lines" class="line"  :class="item.cls" :style="{left: item.left}">
			<span class="fontwight300" v-if="!isHash">{{`${item.hash} ${item.unit}H/s`}}</span>
	  	</li>
	  </ul>
    </section>
</template>

<script>
import {getHash,getScreen} from "../../assets/js/tools"
export default {
	props:['breakpoint','stepArr','inventory','productType','initVal','productData'],
    data(){
        return{
            max:0,
            sliderVal: 0,
			disabled:false,
			isHash:false
			// breakpoint:[10,50,200,500,1500], // 断点数字
			// stepArr:[2,10,15,60,100] //增量
        }
    },
	created(){
			this.init()
	},
	mounted(){
		this.isHash = getScreen()
	},
	watch:{
		productType(){
			this.sliderVal = 0
			this.init()
		},
		sliderVal(val){
			let res = this.lines[val]
			this.$emit('onChange',res)
		}
	},
	computed:{
			ctrlMax(){ // 计算最大刻度数
					let res
					for(let line of this.lines){
						if(line.hashTotal>this.inventory){
							res = line.position - 1;
							break;
						}else if(line.hashTotal == this.inventory){
							res = line.position;
							break;
						}else{
							res = this.pointPositonArr[this.pointPositonArr.length-1]
							res--
						}
					}
					return res
			},
			lines(){
				let result = []
				new Array(this.max+1).fill('0').forEach((item,i)=>{
					i = i+1
					let obj = {}
					let unit = this.productData.product.unit || 'T'
					obj['cls'] = this.getCls(i)
					obj['left'] =this.toPercent((i-1)/this.max)
					obj['position'] = i - 1
					obj['hashTotal'] = this._getSumHash(i - 1)

					let temp = getHash({unit,hash:obj['hashTotal']})
					obj = Object.assign(obj,temp)
					result.push(obj)
				})
				return result
			},
	},
	methods:{
		 drag(){
                let self = this
				if(this.productData.product.inventory<this.lines[1].hashTotal){
					return false
				}
                setTimeout(()=>{
                    self.sliderVal = 1
                })
            },
		init(){
			this.sliderVal = this.initVal;
			this.stepSum =[] // 每个增量的刻度数
			this.max = this._getMax()

			let sum = 1; // 间隔点初始位置，调节此，控制间隔点的位置
			this.pointPositonArr = this.stepSum.map(item=>{ // 有刻度的点的位置
				return sum +=item
			})
			this.drag()
		},
		toPercent(point){
		    var str=Number(point*100).toFixed(2);
		    str+="%";
		    return str;
		},
		getCls(n){
			let cls = ''
			if(this.pointPositonArr.includes(n) || n===1){
				cls += ' light'
			}
			return cls
		},
		getBreakpointNum(n){ // 计算断点对应的刻度数
			let result = 0;
			if(this.pointPositonArr.includes(n)){
				let i = this.pointPositonArr.indexOf(n)
				result = this.breakpoint[i]
			}
			return result
		},
		getPointPositon(num){
			let result = null;
			if(this.breakpoint.includes(num)){
				let i = this.breakpoint.indexOf(num)
				result = this.pointPositonArr[i]
			}
			if(num === 0){
				result = 1
			}
			return result
		},
		_getMax(){
			let sum = 2; // 末端留格子数
			this.stepSum = this.breakpoint.map((item, i)=>{
				const temp = i ? item-this.breakpoint[i-1] : item
				return  temp/this.stepArr[i]
			})
			this.stepSum.forEach(num=>{
				sum += parseInt(num)
			})
			return sum;
		},
		formatTooltip(val){
			return val
		},
		_getSumHash(val){
			if(val ===0 ){
				return 0
			}

			val = val + 1
			let sum = this.breakpoint[this.breakpoint.length-1] // 超出最大刻度的值
			if(val === this.pointPositonArr[this.pointPositonArr.length -1]){
				sum = this.breakpoint[this.breakpoint.length-1]
				return sum
			}

			for(let item of this.pointPositonArr){
				if(val === 1){
					return false
				}
				// 1.计算所在区间
				if(val<item){
					// 2.计算该点前后数字
					let i = this.pointPositonArr.findIndex(num=>item === num)
					let temp = this.pointPositonArr[i-1]
					let num1 = this.getBreakpointNum(temp)
					let num2 = this.getBreakpointNum(item)
					// console.log(num1,num2,'前后');

					if(this.pointPositonArr.includes(val)){ // 该点在间隔上
						sum  = num1
					}else{
						let addNum = this.stepArr[i] // 3.当前位置的增量
						let num1Position = this.getPointPositon(num1)
						sum = num1 + addNum * (val-num1Position)
					}
					break;
				}
			}
			return sum
		},
		onChange(val){
			let res = this._getSumHash(val)
			if(val>this.ctrlMax){
				this.disabled = true
				this.sliderVal = this.ctrlMax
				this.disabled = false
			}
			if(val===0){
				this.disabled = true
				this.sliderVal = 1
				this.disabled = false
			}
		}
	}
}
</script>
