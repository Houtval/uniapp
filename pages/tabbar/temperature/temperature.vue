<template>
	<view class="content">
	<uv-row customStyle="margin-bottom: 10px">
			<uv-col span="6">
				<view class="block">
					<view class="text"><image src="@/static/temperatureIcon.png" style="width: 40px;height: 40px;"></image></view>
					<view class="dynamictext">{{tempature}}°C</view>
				</view>
			</uv-col>
			<uv-col span="6">
				<view class="block">
					<view class="text"><image src="@/static/humidityIcon.png" style="width: 40px;height: 40px;"></image></view>
					<view class="dynamictext">{{humidity}}%RH</view>
				</view>
			</uv-col>
	</uv-row>
	

<uv-row customStyle="margin-bottom: 10px">
			<uv-col span="4" offset="1">
				<text class="textone">蜂鸣器测试</text>
			</uv-col>
			<uv-col span="7">
			<uv-switch @change="buzzerSwitch" v-model="buzzer" size="30"></uv-switch>
			</uv-col>
	</uv-row>
	
	<uv-row customStyle="margin-bottom: 10px">
			<uv-col span="3" offset="1">
				<text class="textone">温度阈值</text>
			</uv-col>
			<uv-col span="8">
				<uv-slider  block-size="28" @change="maxT" v-model="maxTemperature" min="0" max="100" block-color="#1296db" showValue></uv-slider>
			</uv-col>
	</uv-row>
	
	<uv-row customStyle="margin-bottom: 10px">
			<uv-col span="3" offset="1">
				<text class="textone">湿度阈值</text>
			</uv-col>
			<uv-col span="8">
		<uv-slider  block-size="28" @change="maxH" v-model="maxHumidity" min="0" max="100" block-color="#1296db" showValue></uv-slider>
			</uv-col>
	</uv-row>
	
	
	</view>
</template>

<script>
	import {publish} from '../../../mqtt/mqtt.js'
	export default {
		data() {
			return {
				tempature:'1',
				humidity:'1',
				maxTemperature:0,
				maxHumidity:0,
				buzzer:false,
				timer:null,
			};
		},
		methods:{
			
			getT:function(){
			const that=this
				that.timer=setInterval(function(){
					uni.getStorage({
						key:'temperature',
						success:function(res) {
							that.tempature=res.data
						}
					})
					uni.getStorage({
						key:'humidity',
						success:function(res) {
							that.humidity=res.data
						}
					})
					uni.getStorage({
						key:'buzzer',
						success:function(res) {
							that.buzzer=res.data=="true"?true:false
						}
					})
					uni.getStorage({
						key:'maxtemperature',
						success:function(res) {
							that.maxTemperature=res.data
						}
					})
					uni.getStorage({
						key:'maxhumidity',
						success:function(res) {
							that.maxHumidity=res.data
						}
					})
					
				}, 1000)
			},
			
			maxH:function(){
				publish('/stm32',"maxhumidity:"+this.maxHumidity)
			},
			maxT:function(){
				publish('/stm32',"maxtemperature:"+this.maxTemperature)
			},
			buzzerSwitch:function(){
				publish('/stm32',"buzzer:"+this.buzzer)
			}
		},
		onShow() {
			this.getT()
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
		}
	}
</script>

<style scoped>
.block{
	width: 90%;
	height: 100px;
	border: 1px solid #1296db;
	border-radius: 10px;
	margin: 7px;
	justify-content: center;
	display: flex;
	flex-direction: column;
}
.text{
	font-size: 40px;
}
.dynamictext{
	font-size: 30px;
}
.textone{
	font-size: 20px;
}
.content{
	margin-top: 40px;
}
</style>
