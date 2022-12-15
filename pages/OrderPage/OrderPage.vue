<template>
	<gui-page :customHeader="true">
		<view slot="gHeader">
			<view class="gui-flex gui-align-items-center gui-space-between gui-text">
				<view class="BackIcon"><text class="gui-grids-icon gui-icons"
						style="font-size: 40rpx; color: #333333; font-weight: 600" @click="goBack()">&#xe600;</text>
				</view>
				<text class="pageTitle" style="
            font: inter;
            font-size: 36rpx;
            font-weight: 600;
            color: #333333;
          ">接单页面</text>
				<view><text></text></view>
			</view>
		</view>
		<view slot="gBody" class="OrderPageContainer">
			<view class="productDetailsContainer">
				<ProductDetails :productInfo="productInfo" />
			</view>
			<view class="orderInformationContainer">
				<OrderInformation :orderNumber="productInfo.order_id" :dispatchTime="productInfo.apointment_time"/>
			</view>
			<view class="serviceChargeContainer">
				<ServiceCharge :servicePay="productInfo.total_service_pay" :order_id="productInfo.id" :rejectReasons="rejectReasons"/>
			</view>
		</view>
	</gui-page>
</template>
<script>
	import ProductDetails from "@/Components/ProductDetails.vue";
	import OrderInformation from "./orderInformation.vue";
	import ServiceCharge from "@/pages/OrderPage/ServiceCharge.vue";
	import request from "@/common/request.js";
	export default {
		data() {
			return {
				rejectReasons: [],
				productInfo: {},
				id: ""
			};
		},
		provide(){   //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
			return{
				gotoPage:this.gotoPage,
				gotoOrderPage:this.gotoOrderPage
			}
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 2,
				});
			},
			gotoPage(){
				uni.reLaunch({
					url:'/pages/TakeOrders/TakeOrders'
				})
			},
			gotoOrderPage(){
				uni.reLaunch({
					//url:'/pages/MasterSide/MasterSide?menu=0'
					url:'/pages/Mine/Mine'
				})
			},
		},
		onLoad: function(data) {
			if (data && data.id) {
				this.id = data.id
			}
		},
		onShow: async function() {
			if (this.id) {
				try {
					const response = await request.orderInfo({
						orderid: this.id
					})
					this.productInfo = response.data.data
					console.log(response.data.data)
				} catch (e) {
					console.log(e)
				}
				const response2 = await request.rejectReason({});
				this.rejectReasons = response2.data.data;
			}

		},
		components: {
			ProductDetails,
			OrderInformation,
			ServiceCharge,
		},
	};
</script>
<style scoped>
	.OrderPageContainer {
		background: #f4f4f4;
		height: 100vh;
	}

	.productDetailsContainer {
		border-top: 1rpx solid #eaeaea;
	}
</style>
