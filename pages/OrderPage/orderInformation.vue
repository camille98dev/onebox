<template>
	<view class="orderInformationContainer">
		<view class="informationTitle">
			<text class="title">订单信息</text>
		</view>
		<view class="orderNoContainer">
			<text class="orderNoText">订单编号</text>
			<text class="orderNo">{{orderNumber}}</text>
		</view>
		<view class="dispatchContainer">
			<view class="textContainer">
				<text class="dispatchText">派单时间</text>
			</view>
			<view class="dispatchDateContainer">
				<text class="date">{{dispatchTime}}</text>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		props: ['orderNumber', 'dispatchTime'],
		methods: {}
	}
</script>
<style scoped>
	.orderInformationContainer {
		background-color: #ffffff;
		color: #333333;
		margin: 30rpx 0rpx 50rpx 0rpx;
		padding: 20rpx;
		font-family: "Inter";
		font-style: normal;
		font-weight: 500;
		font-size: 28rpx;
		border-radius: 30rpx;
	}

	.informationTitle {
		margin: 25rpx 0rpx 25rpx 0rpx;
	}

	.orderNoContainer,
	.dispatchContainer {
		display: flex;
		justify-content: space-between;
		margin: 25rpx 0rpx 25rpx 0rpx;
	}

	.date {
		/*margin-right: 25rpx;*/
	}
</style>
