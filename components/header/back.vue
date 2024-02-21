<template>
	<view class="back">
		<image src="../../static/img/back.png" mode="" class="icon" @click="back"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			back(){
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.back {
		.icon{
			width: 20px;
			height: 20px;
		}
	}
</style>
