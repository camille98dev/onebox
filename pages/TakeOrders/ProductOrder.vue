<template>
	<view>
		<view>
			<view v-for="(list, index) in orderlist" :key="index" style="margin-bottom: 40rpx;">
				<view class="orderContainer" style="padding: 30rpx;">
					<view class="orderNumberContainer">
						<view class="orderNumber">
							<text class="orderText">订单号：</text>
							<text class="orderNumber">{{list.order_id}}</text>
						</view>
					</view>
					<view style="display: flex; margin-top: 20rpx" @tap="goOrderPage(list.id)" v-for="(info, key) in list.cart_info" :key="key" >
						<view style="margin-right: 15rpx">
							<image :src="info.productInfo.image" class="imageSize"></image>
						</view>
						<view class="productInformation" style="width: 100%;">
							<view class="productDescriptionContainer" style="display: flex; justify-content: space-between; flex-direction: column;">
								<text class="description">{{info.productInfo.product_name}}</text>
								<view class="numberofBoxes" style="align-items: center; margin-top: 30rpx; display: flex; justify-content: space-between;">
									<text class="boxes" v-if="info.productInfo.attrInfo">
										{{info.productInfo.attrInfo.specname.substr(0,info.productInfo.attrInfo.specname.length-1)}}
									</text>
									<text class="additional">
										X{{info.cart_num}}
									</text>
								</view>
							</view>
						</view>
					</view>
					<view class="moreDetailsContainer">
						<view class="serviceContainer">
							<view>
								<text class="serviceTimeText">服务时间：</text>
								<text class="exactDate">{{list.apointment_time}}</text>

							</view>
							<view class="timeLimitContainer">
								<text class="limitText">规定时间：</text>
								<text class="timelimit">{{list.service_set_time}}天</text>
							</view>
						</view>
						<view class="customeradress">
							<view>
								<text class="adressText">客户地址：</text>
								<text class="exactLocation">{{list.user_address}}{{list.addr_detail}}</text>
							</view>
							<image src="../../static/PinLocation.png" class="pinSize"></image>
						</view>
						<view class="serviceChargeContainer">
							<text class="serveText">服务费</text>
							<view>
								<text class="serviceCurrency">¥</text>
								<text class="serviceAmount">{{list.total_service_pay}}</text>
							</view>
						</view>
						<view class="optionsContainer">
							<view style="border-right: 1rpx solid #f4f4f4; padding-right: 150rpx">
								<text class="reject" @tap="open(list.id)">拒绝</text>
							</view>
							<view>
								<text class="order" @click="showConfirmation(list.id)">接单</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<gui-popup ref="guipopup" position="bottom">
			<view class="gui-relative gui-box-shadow gui-bg-white demo-lr">
				<text class="gui-block-text demo-close gui-icons gui-color-gray"
					style="display: flex; justify-content: end" @tap.stop="close">&#xe610;</text>
				<view class="gui-flex gui-align-items-center" style="display: flex; justify-content: center">
					<text class="gui-color-black title">不接此单</text>
				</view>
				<view class="childrenContainer">
					<view class="rejectTitleContainer">
						<text class="reasonTitle">请选择拒绝原因</text>
					</view>
					<view>
						<radio-group @change="radioOnChange">
							<label v-for="(reason, index) in rejectReasons" :key="index"
								style="display: flex; justify-content: space-between; margin-bottom: 30rpx; padding-left: 20rpx;">
								<view>{{reason}}</view>
								<view>
									<radio :value="reason" color="#696aac" ref="radioRef"></radio>
								</view>

							</label>
							<label style="display: flex; justify-content: space-between; margin-bottom: 30rpx; padding-left: 20rpx;">
								<view>其它原因</view>
								<view>
									<radio value="other" color="#696aac" ref="radioRef"></radio>
								</view>
							</label>

						</radio-group>
					</view>
					<view v-show="textArea">
						<textarea placeholder="若有其他原因，请在此输入" class="gui-textarea gui-bg-gray gui-border-box" style="
		            width: 690rpx;
		            height: 300rpx;
		            border-radius: 20rpx;
		            width: 690rpx;
		            height: 300rpx;
		            border-radius: 20rpx;
		            font-size: 28rpx;" @input="handleTextArea" :value="textAreaValue" />
					</view>
				</view>
				<view class="gui-flex gui-rows gui-space-between gui-align-items-center" style="margin-top: 50rpx">
					<view style="display: flex; margin-right: 400rpx">
						<view
							class="gui-footer-large-button gui-text-center gui-flex gui-text-center gui-align-items-center gui-justify-content-center gui-text;"
							style="
		            border-bottom-left-radius: 50rpx;
		            border-top-left-radius: 50rpx;
		            background: #eeeef4;
		            width: 350rpx;
		            height: 70rpx;
		            color: #6869ac;
		          " hover-class="gui-tap" @tap.stop="close">
							取消
						</view>
						<view
							class="gui-footer-large-button gui-text-center gui-flex gui-text-center gui-align-items-center gui-justify-content-center gui-text;"
							style="
		            border-bottom-right-radius: 50rpx;
		            border-top-right-radius: 50rpx;
		            background-color: #6869ac;
		            width: 350rpx;
		            height: 70rpx;
		            color: #ffffff;
		          " hover-class="gui-tap" @tap="handleSubmitReject()">
							确定
						</view>
					</view>
				</view>
			</view>
		</gui-popup>
	</view>
</template>

<script>
	import request from "@/common/request.js";
	export default {
		data() {
			return {
				currentRejectReason: "",
				selectedOrderId: undefined,
				textAreaValue: "",
				textArea: false
			};
		},
		props: ["orderlist", "rejectReasons", ],
		inject:['reload','gotoOrderPage'],//inject注入根组件的reload方法
		methods: {
			close: function() {
				this.$refs.guipopup.close();
			},
			open: function(id) {
				this.selectedOrderId = id
				this.$refs.guipopup.open();
			},
			goOrderPage(id) {
				uni.navigateTo({
					url: `/pages/OrderPage/OrderPage?id=${id}`,
				});
			},
			radioOnChange: function(event) {
				this.currentRejectReason = event.detail.value
				if(this.currentRejectReason == 'other'){
					this.textArea = true;
				}else{
					this.textArea = false;
				}
			},
			handleSubmitReject: async function() {
				var reason = this.currentRejectReason;
				var _this = this;
				if(this.currentRejectReason == 'other'){
					reason = this.textAreaValue;
				}
				if(!reason){
					uni.showToast({
						title:'请输入拒单理由！',
						icon:'none'
					})
					return
				}
				let params = {
					orderid: this.selectedOrderId,
					reason: reason
				};
				request.rejectOrder(params).then((resp) => {
					let data = resp.data;
					_this.close()
					if (data.code == 200 || data.code == '200') {
						uni.showToast({
							title:'拒单成功'
						})
						setTimeout(function() {
							_this.reload();
						}, 1500)
					}else{
						uni.showToast({
							title:data.msg,
							icon:'none'
						})
					}
				})
				.catch((err) => {})

			},
			handleTextArea: function(event) {
				console.log(event.detail.value)
				this.textAreaValue = event.detail.value
			},
			async showConfirmation(id) {
				var self = this;

				uni.showModal({
					title: "接单提示",
					content: `确认接单？`,
					confirmText: "确认",
					cancelText: "取消",
					success: async function(res) {
						if (res.confirm) {
							const response = await request.acceptOrder({
								orderid: id
							})
							if(response.data.code==200){
								uni.showToast({
									title:'接单成功'
								})
								setTimeout(function(){
									self.gotoOrderPage();
								},3000)
							}
						}
					}
				})
			}

		},
	};
</script>

<style scoped>
	.orderContainer {
		background: #ffffff;
		border-radius: 20rpx;
	}

	.orderAndStatusContainer {
		display: flex;
		justify-content: space-between;
		padding: 15rpx 25rpx 15rpx 25rpx;
	}

	.orderNumberContainer {
		color: #333333;
		font-family: "Inter";
		font-style: normal;
		font-weight: 500;
		font-size: 28rpx;
		border-bottom: 1px solid #eaeaea;
		padding-bottom: 25rpx;
	}

	.orderStatus {
		color: #6869ac;
		font-family: "Inter";
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
	}

	.description {
		color: #333333;
		font-family: "Inter";
		font-style: normal;
		font-weight: 400;
		font-size: 28rpx;
	}
	.boxes {
		color: #666666;
		background: #f7f8fa;
		padding: 10rpx 30rpx 10rpx 30rpx;
		border-radius: 40rpx;
		font-family: "Inter";
		font-style: normal;
		font-weight: 400;
		font-size: 22rpx;
	}

	.additional {
		color: #333333;
		font-family: "Inter";
		font-style: normal;
		font-weight: 400;
		font-size: 24rpx;
	}

	.moreDetailsContainer {
		display: flex;
		flex-direction: column;
		font-family: "Inter";
		font-style: normal;
		font-weight: 400;
		font-size: 28rpx;
		color: #333333;
		padding-top: 25rpx;
	}

	.timeServiceContainer {
		display: flex;
		justify-content: space-between;
	}

	.customeradress {
		display: flex;
		align-items: center;
		justify-content: space-between;

	}

	.timeLimitContainer,
	.customeradress {
		display: flex;
		margin-bottom: 20rpx;
	}

	.serviceTimeText,
	.limitText {
		/*margin-right: 20rpx;*/
	}

	.serviceContainer {
		display: flex;
		justify-content: space-between;
	}

	.gui-icons {
		color: gray;
		font-weight: 500;
	}

	.pinSize {
		width: 22rpx;
		height: 28rpx;
	}

	.serviceChargeContainer {
		margin-top: 20rpx;
		display: flex;
		justify-content: space-between;
	}

	.serveText {
		color: #333333;
		font-family: "Inter";
		font-style: normal;
		font-size: 32rpx;
		font-weight: 600;
	}

	.serviceCurrency {
		color: #6869ac;
		font-family: "Inter";
		font-style: normal;
		font-size: 28rpx;
	}

	.serviceAmount {
		color: #6869ac;
		font-family: "Inter";
		font-style: normal;
		font-weight: 600;
		font-size: 32rpx;
	}

	.centavo {
		color: #6869ac;
		font-family: "Inter";
		font-style: normal;
		font-weight: 500;
		font-size: 24rpx;
	}

	.optionsContainer {
		padding-top: 25rpx;
		margin-top: 50rpx;
		display: flex;
		justify-content: space-around;
		border-top: 1rpx solid #f4f4f4;
	}

	.reject {
		color: #999999;
		font-family: "Inter";
		font-style: normal;
		font-size: 32rpx;
	}

	.order {
		color: #333333;
		font-family: "Inter";
		font-style: normal;
		font-weight: 600;
		font-size: 32rpx;
	}

	.demo-close {
		font-size: 28rpx;
		position: absolute;
		z-index: 1000;
		right: 42rpx;
		top: 50rpx;
	}

	.demo-lr {
		flex: 1;
		padding: 40rpx;
		border-top-left-radius: 30rpx;
		border-top-right-radius: 30rpx;
		position: relative;
	}

	.title {
		font-weight: 600;
		font-size: 32rpx;
	}

	.rejectTitleContainer {
		padding: 20rpx 0rpx 40rpx 20rpx;
	}

	.reasonTitle {
		color: #b5b5b5;
		font-family: "Inter";
		font-style: normal;
		font-weight: 400;
		font-size: 32rpx;
	}

	.reasonContainer {
		color: #111111;
		margin-bottom: 40rpx;
		font-family: "Inter";
		font-style: normal;
		font-weight: 500;
		font-size: 32rpx;
	}

	.exactLocation .serviceTimeText,
	.exactDate {
		font-family: PingFang-SC-Medium;
		font-size: 24rpx;
		font-weight: normal;
		font-stretch: normal;
		color: #333333;
	}
</style>
