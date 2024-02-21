<template>
	<view class="container">
		<!-- <Back></Back> -->
		<view>
			<button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
				<u-avatar :src="avatarUrl" :size="60"></u-avatar>
			</button>
			<u--form :model="userInfo" ref="uForm">
				<u-form-item label="昵称" borderBottom>
					<input v-model="userInfo.nickName" type="nickname" class="weui-input" placeholder="请输入昵称"/>
				</u-form-item>
			</u--form>
			<view class="btn mt-20 margin-auto" @click="saveUserInfo">保存</view>
		</view>
	</view>
</template>

<script>
	import Back from "../../components/header/back.vue"
	export default {
		components: {
			Back
		},
		data() {
			return {
				avatarUrl: '',
				userInfo: {
					avatarUrl: '',
					nickName: '',
				},
			}
		},
		methods: {
			onChooseAvatar(e) {
				this.avatarUrl = e.detail.avatarUrl;
				const _this = this;
				uniCloud.uploadFile({
					filePath: e.detail.avatarUrl,
					cloudPath: new Date().getTime() + '.jpeg',
					success(res) {
						// console.log('上传成功：', res);
						_this.userInfo.avatarUrl = res.fileID;
					},
					fail() {
						uni.showToast({
							title: '上传失败'
						})
					},
					complete() {}
				});
			},
			saveUserInfo() {
				uni.showLoading({
					title: '保存中...'
				})
				uni.login({
					provider: 'weixin',
					success: (res) => {
						if (res.code) {
							uniCloud.callFunction({
								name: 'user',
								data: {
									action: 'code2Session',
									js_code: res.code,
									user_info: this.userInfo
								},
								success: (res) => {
									uni.hideLoading()
									uni.navigateBack({
										delta: 1
									});
								},
								fail: () => {
									uni.showToast({
										title: '保存失败'
									})
								}
							})
						}
					}
				})
			},
		},
		mounted() {
			const userInfo = uni.getStorageSync('userInfo');
			this.userInfo = userInfo ? JSON.parse(uni.getStorageSync('userInfo')) : null
		}
	}
</script>

<style scoped lang="scss">
	.container {
		padding: 40rpx 80rpx;
	}
	.avatar-wrapper {
		margin: 0 auto;
		width: 60px;
		height: 60px;
		border-radius: 50%;
		padding: 0;
		margin-bottom: 40rpx;
	}
	.btn {
		width: 80%;
	}
</style>
