<template>
	<view class="home-islogin u-f-a" @tap="touserspace">
		<image :src="userInfo.avatarUrl" mode="widthFix" lazy-load></image>
		<view class="home-islogin-info u-f1">
			<view>{{userInfo.nickName}}</view>
			<!-- <view>总访客 {{userInfo.totalnum}} 今日 {{userInfo.todaynum}}</view> -->
		</view>
		<view class="icon iconfont icon-jinru"></view>
	</view>
</template>

<script>
	export default{
		props:{
			userInfo: {
				type: Object
			}
		},
		data(){
			return {
				
			}
		},
		methods:{
			touserspace(){
				uni.navigateTo({
					url:'/pages/edit/edit'
				})
			},
		},
	}
</script>

<style scoped>
.home-islogin{
	padding: 20rpx 40rpx;
}
.home-islogin>image{
	width: 100rpx;
	height: 100rpx;
	border-radius: 100%;
	flex-shrink: 0;
	margin-right: 15rpx;
}
.home-islogin>view:first-of-type>view:nth-child(1){
	font-size: 32rpx;
}
.home-islogin>view:first-of-type>view:nth-child(2){
	color: #929292;
}
.home-islogin>view:last-of-type{
	height: 100%;
}	
</style>
