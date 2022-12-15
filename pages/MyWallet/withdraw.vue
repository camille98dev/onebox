<template>
	<view class="withdrawDetailsContainer">
		<view class="withdrawText">
			<text>提现至</text>
		</view>
		<view class="accountContainer">
			<view class="accountImage">
				<image src="../../static/WeChat.png" class="weChatSize"></image>
				<text class="accountType">微信</text>
			</view>
			<view class="receivingTimeContainer">
				<text class="receivingTime">2小时内到账</text>
			</view>
		</view>
	</view>
</template>
<style scoped>
	.withdrawDetailsContainer {
		display: flex;
		flex-direction: row;
		padding-left: 40rpx;
		padding-top: 50rpx;
		gap: 25px;
	}

	.weChatSize {
		height: 30rpx;
		width: 30rpx;
		margin-right: 15rpx;
	}

	.withdrawText {
		display: flex;
		font-size: 32rpx;
		color: #111111;
		font-weight: 500;

	}

	.accountContainer {
		flex: 3;
		padding-left: 40rpx;
	}
	.accountImage{
		color: #111111;
		display: flex;
		align-items: center;
		margin-bottom: 10rpx;
		margin-top: 4rpx;
	}
	.receivingTime{
		font-family: PingFang-SC-Bold;
		font-size: 28rpx;
			font-weight: normal;
			font-stretch: normal;
			color: #999999;
	}
	.accountType{
			font-family: PingFang-SC-Bold;
			font-size: 28rpx;
			font-weight: normal;
			font-stretch: normal;
			color: #111111;
	}
</style>
