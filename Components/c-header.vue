<template>
	<view class="c-header">
		<view v-if="back" @tap="goback" class="user-name gui-flex gui-align-items-center gui-icons" style="font-size:42rpx;color:#333333;">&#xe600;</view>
		<view v-if="showLoc" class="user-name gui-flex gui-align-items-center">
		<!-- 	<image style="height: 32rpx;width: 26rpx;margin-right: 10rpx;" src="@/static/icons/loc.png" mode="" />
			长沙 -->
		</view>
		<view class="title">
			<text>{{title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "c-header",
		props: {
			title: {
				type: String,
				required: false,
				default: ''
			},
			back: {
				type: Boolean,
				required: false,
				default: false
			},
			showLoc: {
				type: Boolean,
				required: false,
				default: true
			},
		},
		data() {
			return {

			};
		},
		methods:{
			goback(){
				uni.navigateBack({
					delta:1
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.user-name {
		position: absolute;
		left: 20rpx;
		z-index: 99;

	}
	.c-header {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.title {
		height: 88rpx;
		line-height: 88rpx;
		font-size: 34rpx;
		color: #333333;
		opacity: 1;
		padding: 0rpx 20rpx;
	}

</style>
