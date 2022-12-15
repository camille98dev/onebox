<template>
	<view class="orderDetailContainer">
		<view class="detailContainer">
			<text class="detailText"style="font-weight: 400;font-size:28rpx;">订单信息</text>
		</view>
		<view class="numberContainer">
			<text class="orderLabel" style="font-weight: 400;font-size:28rpx;">订单编号</text>
			<text class="orderNumber"style="font-weight: 400;font-size:28rpx;">1234478613546486</text>
		</view>
		<view class="dispatchTimeContainer">
			<text class="dateLabel"style="font-weight: 400;font-size:28rpx;">派单时间</text>
			<view class="dateTime">
			<text class="dateNumber"style="font-weight: 400;font-size:28rpx;">2020-05-10</text>
			<text class="time"style="font-weight: 400; font-size:28rpx;">18:14:32</text>	
			</view>	
		</view>
		<view class="orderTimeContainer">
			<text class="orderLabel"style="font-weight: 400;font-size:28rpx;">接单时间</text>
			<view class="dateTimeOrder">
			<text class="dateOrder"style="font-weight: 400;font-size:28rpx;">2020-05-10</text>
			<text class="timeOrder"style="font-weight: 400; font-size:28rpx;">18:14:32</text>	
			</view>	
		</view>
	</view>
</template>
<style scoped>
.orderDetailContainer{
	border-radius: 30rpx;
	background: #FFFFFF;
	padding: 20rpx;
}
.detailContainer{
	margin-bottom: 25rpx;
}
.numberContainer, .dispatchTimeContainer, .orderTimeContainer{
	margin-bottom: 30rpx;
	display: flex;
	justify-content: space-between;
}
.dateNumber, .dateOrder{
	margin-right: 15rpx;
}
</style>