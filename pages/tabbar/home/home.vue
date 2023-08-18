<template>
	<view class="content">
	首页
	</view>

</template>

<script lang="ts">
	export default {
		data() {
			return {
				
			};
		},
		onShow() {
			uni.getStorage({
				key: "username",
				fail:function()
				{
					console.log("111")
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
	}
</script>

<style>
.content{
	margin-top: 40px;
}
</style>
