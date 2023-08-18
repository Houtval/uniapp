<template>
	<view class="head">
	<view class="h1">智能家居管理系统</view>
	<view class="h2">登录</view>
	</view>
	<view class="content">
		<uv-form labelPosition="left" labelWidth="50px" :model="form" :rules="rules" ref="uvFormRef" class="form">
			<uv-form-item label="用户名" prop="userInfo.username" borderBottom ref="item1">
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
				<uv-button type="primary" text="提交" customStyle="margin-top: 10px" @click="submit()"></uv-button>
				<uv-button type="primary" text="注册" customStyle="margin-top: 10px" @click="register()"></uv-button>
				<uv-button type="error" text="重置" customStyle="margin-top: 10px" @click="reset()"></uv-button>
		</uv-form>
	</view>
</template>
<script>
	import {
		init,
		publish,
		reception
	} from "../.././../mqtt/mqtt.js"
	import {apiUrl} from '../../../api/index.js'
	export default {
		data() {
			return {
				showPassword: true,
				passwordIcon: 'lock',
				form: {
					userInfo: {
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
				radio: '',
				switchVal: false
			}
		},
		methods: {
			submit() {
				let that=this
				this.$refs.uvFormRef.validate().then(res => {
					uni.request({
						header: {
							'Content-Type': 'application/json'
						},
						url: apiUrl+"/user/login",
						method: 'POST',
						data: {
							"username":this.form.userInfo.username,
							"password":this.form.userInfo.password
						},
						dataType: 'json',
						success: (res) => {
							if (res.data.code == "2000") {
								uni.showToast({
									icon: 'success',
									title: '登录成功'
								})
								uni.setStorage({
									key:"username",
									data:that.form.userInfo.username
								})
								uni.setStorage({
									key:"userid",
									data:res.data.result[0].id
								})
								init()
								publish('/stm32', "订阅成功")
								reception()
								setTimeout(function(){
									uni.reLaunch({
										url: '/pages/tabbar/home/home'
									})
								},1000)
							} else {
								uni.showToast({
									icon: 'success',
									title: res.data.message
								})
							}

						}
					});



					// 			if (this.form.userInfo.username == "admin" && this.form.userInfo.password == "admin") {
					// 				uni.showToast({
					// 					icon: 'success',
					// 					title: '登录成功'
					// 				})
					// 				init()
					// 				publish('/stm32',"订阅成功")
					// 				reception()
					// 				uni.switchTab({
					// 					url: '/pages/tabbar/home/home'
					// 				})

					// 			} else {
					// 				uni.showToast({
					// 					icon: 'error',
					// 					title: '用户名密码错误'
					// 				})
					// 			}



				})
			},
			// 重置
			reset() {
				this.$refs.uvFormRef.resetFields();
				this.$refs.uvFormRef.clearValidate();
			},
			
			register(){
				uni.navigateTo({
					url:'/pages/user/register/register'
				})
				this.$refs.uvFormRef.clearValidate()
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
	.content {
		width: 90%;
		margin: 0px auto;

	}
	.h1{
		font-size: 30px;
		text-align: center;
	}
	.h2{
		font-size: 20px;
		text-align: center;
	}
	.head{
		width: 100%;
		height: 100px;
		padding-top: 50px;
		background-color: #ecf5ff;
	}
</style>