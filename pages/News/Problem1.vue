<template>
	<view class="problemContainer" @click="goToInformationDetails(data.id)">
		<view class="gui-flex gui-border-b gui-flex1 " style="padding: 30rpx 0rpx 30rpx 0rpx; display:flex; justify-content: space-between;  " >
			<view style="margin-left:25rpx;margin-right: 25rpx;">
				<view style="margin-bottom: 70rpx;">
					<text class="problem1Text">{{data.title}}</text>
				</view>
				<view>
					<text class="views" style="padding-right: 30rpx">{{data.created_at}}</text>
					<text class="views">	查看{{data.browse}}次</text>
				</view>
			</view>
			<view>
				<image :src="data.image" class="pictureSize" mode=""></image>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {

			}
		},
		props: ['data'],
		methods: {
			goToInformationDetails(id) {
				uni.navigateTo({
					url: `/pages/InformationDetails/InformationDetails?id=${id}`
				})
			}
		}

	}
</script>
<style scoped>
	.pictureSize {
		width: 280rpx;
		height: 185rpx;
		margin-right: 25rpx;
		border-radius: 20rpx;
	}

	.problem1Text {
		color: #333333;
		Font-family: Inter;
		Font-style: Regular;
		Font-size: 32rpx;

	}

	.views {
		color: #999999;
		Font-family: Inter;
		Font-style: Regular;
		Font-size: 24rpx;

	}
</style>
