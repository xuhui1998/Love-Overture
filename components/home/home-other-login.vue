<template>
	<view class="other-login u-f-a">
		<block v-for="(item,index) in providerList" :key="index">
			<view class="u-f1 u-f-ajc">
				<view class="icon iconfont u-f-ajc" :class="['icon-'+item.icon]" @tap="tologin(item)"></view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				providerList: [],
				userInfo: {}
			}
		},
		mounted() {
			this.getlogin();
		},
		emits:['login'],
		methods: {
			//获取登录通道
			getlogin() {
				uni.getProvider({
					service: 'oauth',
					success: (result) => {
						this.providerList = result.provider.map((value) => {
							let providerName = '';
							let icon = '';
							switch (value) {
								case 'weixin':
									providerName = '微信登录';
									icon = 'weixin';
									break;
								case 'qq':
									providerName = 'QQ登录';
									icon = 'QQ';
									break;
								case 'sinaweibo':
									providerName = '新浪微博登录';
									icon = 'xinlangweibo';
									break;
							}
							return {
								name: providerName,
								icon: icon,
								id: value
							}
						});
					},
					fail: (error) => {
						//  console.log('获取登录通道失败', error);
					}
				});
			},
			//登录
			tologin(provider) {
				const _this = this
				uni.getUserProfile({
					desc: '用于完善会员资料',
					success: (result) => {
						_this.userInfo = result.userInfo
						_this.wxLogin()
					},
					fail: () => {
						uni.hideLoading();
						uni.showModal({
							content: '获取用户信息失败',
							showCancel: false
						})
					}
				})
			},
			wxLogin() {
				const _this = this
				uni.showLoading({
					title: '加载中'
				});

				uni.login({
					provider: 'weixin',
					success: (res) => { // 获取 code
						if (res.code) {
							uniCloud.callFunction({
								name: 'user',
								data: {
									action: 'code2Session',
									js_code: res.code,
									user_info: _this.userInfo
								},
								success: (res) => {
									console.log('云函数返回的值：：：：', res.result)
									uni.hideLoading();
									if (res.result.result.result._id) {
										uni.setStorageSync('userInfo', JSON.stringify(res.result.result.result))
										// globalData.$UserInfo = res.result.result.result
										this.$emit('login', true)
									}
								},
								fail: () => {
									uni.hideLoading();
									console.log('云函数调用失败')
								}
							})
						}
					}
				})
			}
		}

	}
</script>

<style scoped>
	.other-login {
		padding: 40rpx 80rpx;
	}

	.other-login>view>view {
		width: 100rpx;
		height: 100rpx;
		border-radius: 100%;
		font-size: 55rpx;
		color: #FFFFFF;
	}

	.other-login .icon-weixin {
		background: #2BD19B;
	}

	.other-login .icon-xinlangweibo {
		background: #2CAEFC;
	}

	.other-login .icon-QQ {
		background: #FC7729;
	}
</style>
