<script>
export default {
	onLaunch: function() {
		console.log('App Launch');

		// setTimeout(() => {
		// 	uni.setTabBarBadge({
		// 		index: 1,
		// 		text: '31'
		// 	});
		// 	uni.showTabBarRedDot({
		// 		index: 3
		// 	});
		// }, 1000);
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
/*每个页面公共css */ 
@import './common/uni.css';
/*引入图标库*/
@import './common/animate.css';
@import './common/icon.css';
@import './common/flexCoomn.css';
@import './common/common.css';
@import "@/uni_modules/uview-ui/index.scss";
</style>
