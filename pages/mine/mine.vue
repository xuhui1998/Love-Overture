<template>
	<view class="animated fadeIn slow">
		<template v-if="!islogin">
			<!-- 未登录 -->
			<view class="home-nologin-title u-f-ajc">登录王者小月老，体验更多功能</view>
			<!-- 更多登陆 -->
			<homeOtherLogin @login='getLogin'></homeOtherLogin>
			<!-- 账号密码登陆 -->
			<!-- <view class="home-password u-f-ajc" @tap="tologin">账号密码登陆<view class="icon iconfont icon-jinru"></view></view> -->
		</template>
		<!-- 已登陆 -->
		<template v-else>
			<homeInfo :userInfo="userInfo"></homeInfo>
		</template>
		<!-- 数据 -->
		<homeData :homedata="homedata"></homeData>
		<!-- 广告位 -->
		<view class="home-adv u-f-ajc">
			<image src="../../static/img/demo/demo20.jpg" mode="widthFix" lazy-load></image>
		</view>
		<!-- 功能 -->
		<view class="home-list">
			<block v-for="(item,index) in homelist" :key="index">
				<homeList :item="item" :index="index"></homeList>
			</block>
		</view>
	</view>
</template>

<script>
	import homeList from '../../components/home/home-list.vue';
	import homeInfo from '../../components/home/home-info.vue';
	import homeOtherLogin from '../../components/home/home-other-login.vue';
	import homeData from '../../components/home/home-data.vue';
	export default {
		components: {
			homeList,
			homeInfo,
			homeOtherLogin,
			homeData
		},
		data() {
			return {
				islogin: false,
				userInfo: {},
				homelist: [{
						icon: 'liulan',
						name: '浏览历史',
						type: '',
						urls: ''
					},
					{
						icon: 'huiyuanvip',
						name: '糗百认证',
						type: '',
						urls: ''
					},
					{
						icon: 'keyboard',
						name: '审核糗事',
						type: '',
						urls: ''
					}
				],
				homedata: [
					// {name:'糗事',num:0},
					{
						name: '动态',
						num: 0
					},
					{
						name: '评论',
						num: 0
					},
					{
						name: '收藏',
						num: 0
					}
				]
			}
		},
		onNavigationBarButtonTap(e) {
			if (e.index == 0) {
				uni.navigateTo({
					url: '../userset/userset'
				})
			}
		},
		methods: {
			tologin() {
				uni.navigateTo({
					url: '../login/login'
				})
			},
			getStorageUserInfo() {
				const userInfo = uni.getStorageSync('userInfo');
				this.userInfo = userInfo ? JSON.parse(uni.getStorageSync('userInfo')) : null
			},
			getLogin(state) {
				this.islogin = state
				this.getStorageUserInfo()
			},
			getUserInfo() {
				const _this = this;
				uniCloud.callFunction({
					name: 'get',
					data: {
						id: _this.userInfo._id
					},
					success(res) {
						_this.userInfo = res.result.data[0];
						uni.setStorageSync('userInfo', JSON.stringify(res.result.data[0]))
					}
				})
			}
		},
		onShow() {
			this.getStorageUserInfo()
			if (this.userInfo) {
				this.getUserInfo()
			}
			if(!this.islogin){
				this.islogin = this.userInfo ? true : false
			}
		}
	}
</script>

<style>
	.home-nologin-title {
		font-size: 32rpx;
	}

	.home-password {
		font-size: 29rpx;
	}

	.home-password>view {
		color: #D5D5D5;
	}

	.home-adv {
		padding: 20rpx;
	}

	.home-adv>image {
		border-radius: 20rpx;
		height: 150rpx;
	}

	.home-list {
		padding: 20rpx 40rpx;
	}
</style>
