<template>
	<uv-popup ref="popup" mode="center">
		<view style="width: 700rpx;height: 700rpx;display: flex;justify-content: space-evenly;align-items: center;flex-direction: column;">
			<view class="h1">修改密码</view>
		<view style="width: 500rpx;">
		<uv-form labelPosition="left"  labelWidth="50px" :model="form" :rules="rules" ref="uvFormRef" class="form">
			<uv-form-item label="用户名" prop="userInfo.usernmae" borderBottom ref="item1">
				<uv-input v-model="form.userInfo.username" placeholder="请输入用户名">
				</uv-input>
			</uv-form-item>
		<uv-form-item label="密码" prop="userInfo.password" borderBottom ref="item1">
			<uv-input v-model="form.userInfo.password" :password="showPassword" placeholder="请输入密码"
				suffixIconStyle="color: #909399">
				<template v-slot:suffix>
					<uv-icon :name="passwordIcon" color="#black" size="20" @click="showPasswordMethod"></uv-icon>
				</template>
			</uv-input>
		</uv-form-item>
			<uv-form-item>
				<uv-button type="primary" text="提交" customStyle="margin-top: 10px" @click="submit()"></uv-button>
				<uv-button type="error" text="重置" customStyle="margin-top: 10px" @click="reset()"></uv-button>
			</uv-form-item>
		</uv-form>
		</view>
		
		</view>
	</uv-popup>
	<view class="content">

	</view>
	<view class="userIcon">
		<uv-image src="https://cdn.uviewui.com/uview/album/1.jpg" shape="circle" width="100px"
			height="100px"></uv-image>
		<text>用户名:{{form.userInfo.username}}</text>
	</view>
	<view class="button">
	<uv-row>
		<uv-col span="4">
	
		</uv-col>
		<uv-col span="4">
			<uv-button type="primary" text="修改信息" @click="open"></uv-button>
		</uv-col>
		<uv-col span="4">
	
		</uv-col>
	</uv-row>
	<uv-row>
		<uv-col span="4">

		</uv-col>
		<uv-col span="4">
			<uv-button type="error" text="注销" @click="lonoff"></uv-button>
		</uv-col>
		<uv-col span="4">

		</uv-col>
	</uv-row>
	</view>

</template>

<script>
	import {
		client
	} from "../../../mqtt/mqtt.js"
	import {apiUrl} from '../../../api/index.js'
	export default {
		data() {
			return {
				showPassword: true,
				passwordIcon: 'lock',
				form: {
					userInfo: {
						id:'',
						username: '',
						password: '',
					},
				},
				
				rules: {
					'userInfo.username': {
						type: 'string',
						required: true,
						message: '请填写用户名',
						trigger: ['blur', 'change']
					},
					'userInfo.password': {
						type: 'string',
						required: true,
						message: '请填写密码',
						trigger: ['blur', 'change']
					},
				},
			}
		},
		onShow() {
			let that = this
			uni.getStorage({
				key: "username",
				success: function(res) {
					that.form.userInfo.username=res.data
				},
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
				success: function(res) {
					that.form.userInfo.id = res.data.toString()
				},
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
		methods: {
		lonoff: function() {
			
				uni.showToast({
					icon: 'success',
					title: '注销成功'
				})
			setTimeout(function(){
				uni.reLaunch({
					url: "/pages/user/login/login"
				})
			},1000)
				uni.clearStorage()
			},
		 submit() {
					const that=this
					uni.getStorage({
					key:'userid',
					success: function (res) {
						that.form.userInfo.id=res.data
					}
				})
				this.$refs.uvFormRef.validate().then(res => {
					uni.request({
						header: {
							'Content-Type': 'application/json'
						},
						url:apiUrl+"/user/update",
						method: 'POST',
						data: {
							"id":this.form.userInfo.id,
							"username":this.form.userInfo.username,
							"password":this.form.userInfo.password
						},
						dataType: 'json',
						success:function(res) {
							if(res.data.code=="2000")
							{
								uni.showToast({
									icon: 'success',
									title: '修改成功'
								})
								setTimeout(function(){
									that.lonoff()
								},1000)
							}
							else
							{
								uni.showToast({
									icon: 'success',
									title: res.data.message
								})
							}
							
						}
					})
				})
			},
			reset() {
				this.$refs.uvFormRef.resetFields();
				this.$refs.uvFormRef.clearValidate();
			},
			open() {
				this.$refs.popup.open();
			},
			hideKeyboard() {
				uni.hideKeyboard()
			},
			showPasswordMethod() {
				if (this.showPassword == false) {
					this.passwordIcon = "lock"
					this.showPassword = true
				} else {
					this.passwordIcon = "lock-open"
					this.showPassword = false
				}
			}
		}
	}
</script>

<style scoped>
	.userIcon {
		display: flex;
		height: 200px;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		line-height: 50px;
	}

	.content {
		display: flex;
		justify-content: center;
		margin: 10px;
	}
	.button{
		height: 150px;
		display: flex;
		justify-content: space-around;
		flex-direction: column;
	}
	.h1{
		font-size: 20px;
	}
</style>