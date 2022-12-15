<template>
	<view>
		<view class="gui-bg-#999999; demo-nav2">
			<gui-switch-navigation
					:width="windowWidth"
					ref="guiswitchnavigation"
					:lastIndex="optionsItem.length - 1"
					:size="(windowWidth/optionsItem.length) - (windowWidth > 750 ? 55 : 40)"
					:fontSize="'28rpx'"
					:activeFontSize="'28rpx'"
					:margin="0"
					padding="20rpx"
					textAlign="center"
					:isCenter="true"
					activeDirection="center"
					activeLineBg="linear-gradient(to right,black , black)" activeColor="black"
					activeLineHeight="4rpx" lineHeight="72rpx" activeLineWidth="100rpx"
					:items="optionsItem"
					@change="navchange">
			</gui-switch-navigation>
		</view>
	</view>
</template>
<script>
	var graceJS = require('@/GraceUI5/js/grace.js');
	export default {
		data() {
			return {
				navItems: [],
				windowWidth: 750,
				optionsItem: [
					{
						id: 0,
						name: '全部'
					},
					{
						id: 1,
						name: '收入'
					},
					{
						id: 2,
						name: '提现'
					}
				],
			}
		},
		methods: {
			navchange: function(index) {
				this.$emit('changeindex', index)
			},
		},
		props: [],
		onLoad: function() {
		}
	}
</script>
<style>
	.mt60 {
		margin-top: 50rpx;
	}

	.demo-nav {
		width: 100%;
		/*padding: 20rpx 30rpx;*/
		box-sizing: border-box;
	}

	.demo-nav2 {
		width: 750rpx;
		/*padding: 15rpx 30rpx;*/
		box-sizing: border-box;
		padding-bottom: 0;
		max-width: 100%;
	}

	.gui-margin-top {
		border-bottom: 1rpx solid #F0F0F0;
		;
		padding-bottom: 20rpx;
	}
</style>
