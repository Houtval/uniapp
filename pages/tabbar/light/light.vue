<template>
	<view class="content">
		<uv-row customStyle="margin-bottom: 10px">
			<uv-col span="3" offset="1">
				<text class="text">开关</text>
			</uv-col>
			<uv-col span="8">
				<uv-switch @change="changeSwitch" v-model="lightSwitch" size="30"></uv-switch>
			</uv-col>
		</uv-row>

		<uv-row customStyle="margin-bottom: 10px">
			<uv-col span="3" offset="1">
				<text class="text">亮度</text>
			</uv-col>
			<uv-col span="8">
				<uv-slider v-model="lightBrightness" @change="changeLightBrightness" block-size="28" min="0" max="100" block-color="#1296db" showValue></uv-slider>
			</uv-col>
		</uv-row>

		<uv-row customStyle="margin-bottom: 10px">
			<uv-col span="3" offset="1">
				<text  class="text">颜色</text>
			</uv-col>
			<uv-col span="4">
				<uv-button type="primary" text="打开颜色选择器" @click="openColor"></uv-button>
				<uv-pick-color ref="pickerColor"  @confirm="confirm"></uv-pick-color>
			</uv-col>
			<uv-col span="3" offset="1">
				{{color}}
			</uv-col>
		</uv-row>
	</view>
</template>

<script>
	import {init,publish,reception} from "../.././../mqtt/mqtt.js"
	export default {
		data() {
			return {
				lightSwitch: false,
				lightBrightness: 0,
				color:'#000000',
				timer:null,
			}
		},
		onShow() {
			this.getStatus()
			uni.getStorage({
				key: "username",
				fail:function()
				{
					uni.showToast({
						icon: 'error',
						title: '未登录，请先登录'
					})
					setTimeout(function(){
						uni.reLaunch({
							url: "/pages/user/login/login"
						})
					},1000)
				}
			})
			uni.getStorage({
				key: "userid",
				fail:function()
				{
					uni.showToast({
						icon: 'error',
						title: '未登录，请先登录'
					})
					setTimeout(function(){
						uni.reLaunch({
							url: "/pages/user/login/login"
						})
					},1000)
				}
			})
		},
		onHide(){
			clearInterval(this.timer)
		},
		methods: {
			openColor: function() {
				this.$refs.pickerColor.open();
			},
			confirm: function(e) {
				this.color=e.hex
				console.log('confirm', e.hex)
				publish('/stm32',"color:"+this.color)
			},
			changeSwitch:function(){
				publish('/stm32',"lightswitch:"+this.lightSwitch)
			},
			changeLightBrightness:function(){
				publish('/stm32',"lightbrightness:"+this.lightBrightness)
			},
			getStatus:function(){
				const that=this
				that.timer=setInterval(function(){
					
					uni.getStorage({
						key:'lightswitch',
						success:function(res) {
							that.lightSwitch=res.data=="true"?true:false
						}
					})
					
					uni.getStorage({
						key:'lightbrightness',
						success:function(res) {
							that.lightBrightness=res.data
						}
					})
					
					uni.getStorage({
						key:'color',
						success:function(res) {
							that.color=res.data
						}
					})
				},1000)
			}
		},	
	}
</script>

<style scoped>
.text{
	font-size: 20px;
}
.content{
	margin-top: 40px;
}
</style>