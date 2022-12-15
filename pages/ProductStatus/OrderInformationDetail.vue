<template>
	<view class="orderDetailContainer">
		<view class="detailContainer">
			<text class="detailText"style="font-weight: 400;font-size:28rpx;font-weight:bold;">订单信息</text>
		</view>
		<view class="numberContainer">
			<text class="orderLabel" style="font-weight: 400;font-size:28rpx;">订单编号</text>
			<text class="orderNumber"style="font-weight: 400;font-size:28rpx;">{{orderInfo.order_id}}</text>
		</view>
		<view class="dispatchTimeContainer">
			<text class="dateLabel"style="font-weight: 400;font-size:28rpx;">派单时间</text>
			<view class="dateTime">
			<text class="dateNumber"style="font-weight: 400;font-size:28rpx;">{{orderInfo.give_time}}</text>	
			</view>	
		</view>
		<view class="orderTimeContainer" v-if="orderInfo.status_title == '已拒单'">
			<text class="orderLabel"style="font-weight: 400;font-size:28rpx;">据单时间</text>
			<view class="dateTimeOrder">
			<text class="dateOrder"style="font-weight: 400;font-size:28rpx;">{{orderInfo.reject_time}}</text>
			</view>	
		</view>
		<view class="orderTimeContainer" v-else>
			<text class="orderLabel"style="font-weight: 400;font-size:28rpx;">接单时间</text>
			<view class="dateTimeOrder">
			<text class="dateOrder"style="font-weight: 400;font-size:28rpx;">{{orderInfo.arrival_time}}</text>
			</view>
		</view>
		<view class="orderTimeContainer" v-if="orderInfo.review_time">
			<text class="orderLabel"style="font-weight: 400;font-size:28rpx;">审核时间</text>
			<view class="dateTimeOrder">
			<text class="dateOrder"style="font-weight: 400;font-size:28rpx;">{{orderInfo.review_time}}</text>
			</view>
		</view>
		<view class="orderTimeContainer" v-if="orderInfo.service_finished_time">
			<text class="orderLabel"style="font-weight: 400;font-size:28rpx;">完成时间</text>
			<view class="dateTimeOrder">
			<text class="dateOrder"style="font-weight: 400;font-size:28rpx;">{{orderInfo.service_finished_time}}</text>
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
		props: ["orderInfo"],
		methods: {
			
		}
	}
</script>
<style scoped>
.orderDetailContainer{
	border-radius: 30rpx;
	background-color: #FFFFFF;
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
</style>