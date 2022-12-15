<template>
	<view class="orderStatusContainer">
		<text class="orderStatus">订单正在审核中，请耐心等候</text>
	</view>
</template>
<style scoped>
.orderStatusContainer{
	background: #FFFFFF;
	display: flex;
	align-items: center;
	text-align: center;
	justify-content: center;
	line-height: 60rpx;
	padding: 30rpx 0;
	/*padding: 35rpx 180rpx;
	position: fixed;
	bottom: 0;*/
}
.orderStatus{
	Font-family: Inter;
	Font-weight:400;
	Font-size: 30rpx;
}

</style>