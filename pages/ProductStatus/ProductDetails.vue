<template>
	<view>
		<view class="orderContainer" @click="handleClick">
			<view style="display: flex; margin-top:30rpx" v-for="order in orderInfo.cart_info" :key="order.id">
				<view style="margin-right: 15rpx">
					<image :src="order.productInfo.image" class="imageSize"></image>
				</view>
				<view class="productInformation" style="width: 100vh;">
					<view class="productDescriptionContainer">
						<text class="description">{{order.productInfo.product_name}}</text>
					</view>
					<view class="numberofBoxes" style="align-items: center;">
						<view >
							<text class="boxes" v-if="order.productInfo.attrInfo">
								{{order.productInfo.attrInfo.specname.substr(0,order.productInfo.attrInfo.specname.length-1)}}
							</text>
						</view>
					<view>
						<text class="additional">X{{order.cart_num}}</text>
					</view>
				</view>
				</view>
			</view>
			<view class="moreDetailsContainer">
				<view class="serviceContainer">
					<text class="serviceTimeText" style="font-weight: 400;">服务时间</text>
					<view>
						<text v-if="orderInfo.apointment_time!='null'" class="exactDate" style="font-weight: 400;">{{orderInfo.apointment_time}}</text>
						<!-- <text class="exactTime" style="margin-left:25rpx;">14:00 </text> -->
					</view>
				</view>
				<view class="timeLimitContainer">
					<text class="limitText" style="font-weight: 400;">规定时间</text>
					<text class="timelimit" style="font-weight: 400;">{{orderInfo.service_set_time}}天</text>
				</view>

				<view class="customeradress">
					<text class="adressText" style="font-weight: 400;">客户地址</text>
					<text class="exactLocation" style="">
						{{orderInfo.user_address}}{{orderInfo.addr_detail}}
						<text class="gui-icons">&#xe601;</text>
					</text>

				</view>
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
			handleClick: function() {
				console.log(this.orderInfo)
			}


		},
	}
</script>

<style scoped>
	.orderContainer {
		background-color: #FFFFFF;
		border-radius: 20rpx;
		padding: 20rpx;

	}

	.orderAndStatusContainer {
		display: flex;
		justify-content: space-between;
		padding: 50rpx 25rpx 50rpx 25rpx;
		border-bottom: 1px solid #EAEAEA;
	}

	.orderStatus {
		color: #6869AC;
		font-family: 'Inter';
		font-style: normal;
		font-weight: 500;
		font-size: 30rpx;

	}

	.imageSize {
		width: 200rpx;
		height: 160rpx;
	}

	.productContainer {
		display: flex;
	}

	.productInformation {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-left: 10rpx;
	}

	.description {
		color: #333333;
		font-family: 'Inter';
		font-style: normal;
		font-weight: 400;
		font-size: 28rpx;

	}

	.numberofBoxes {
		display: flex;
		justify-content: space-between;
		padding-bottom: 30rpx;
	}

	.boxes {
		color: #666666;
		background: #F7F8FA;
		padding: 10rpx 30rpx 10rpx 30rpx;
		border-radius: 40rpx;
		font-family: 'Inter';
		font-weight: 400;
		font-size: 22rpx;


	}

	.additional {
		color: #333333;
		font-family: 'Inter';
		font-style: normal;
		font-weight: 400;
		font-size: 24rpx;

	}

	.moreDetailsContainer {
		display: flex;
		flex-direction: column;
		font-family: 'Inter';
		font-style: normal;
		font-weight: 400;
		font-size: 28rpx;
		color: #333333;
		border-top: 1rpx solid #F4F4F4;
		margin-top: 40rpx;
		padding-top: 25rpx;

	}

	.timeServiceContainer {
		display: flex;
		justify-content: space-between;
	}

	.customeradress {
		display: flex;
		align-items: center;

	}

	.serviceContainer,
	.timeLimitContainer,
	.customeradress {
		display: flex;
		justify-content: space-between;
		margin-bottom: 40rpx;
	}

	.gui-icons {
		color: gray;
		font-weight: 500;
	}
</style>
