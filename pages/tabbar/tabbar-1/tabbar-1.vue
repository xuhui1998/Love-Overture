<template>
	<view class="content">
		<view class="" v-if="isLogin">
			已登录
		</view>
		<view class="flex padding justify-center" v-else>
			<button class="cu-btn round bg-red" @click="getUserInfo">立即登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {},
				isLogin: false
			};
		},
		onLoad() {
			this.userIsLogin()
		},
		methods: {
			getUserInfo() {
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
										_this.userIsLogin()
										// globalData.$UserInfo = res.result.result.result
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
			},
			userIsLogin() {
				const _this = this
				uni.getStorage({
					key: "userInfo",
					success() {
						_this.isLogin = true
					},
					fail() {
						_this.isLogin = false
					}
				})
			}
		}
	};
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
		margin-top: 200upx;
	}
</style>
