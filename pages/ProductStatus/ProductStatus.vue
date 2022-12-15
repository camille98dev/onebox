<template>
	<gui-page customHeader="true" :customFooter="orderInfo.status_title !== '已拒单'">
		<view slot="gHeader">
			<view style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        ">
				<view class="BackIcon"><text class="gui-grids-icon gui-icons"
						style="font-size: 40rpx; color: #333333; font-weight: 600" @click="goBack()">&#xe600;</text>
				</view>
				<text class="pageTitle" style="
            font: inter;
            font-size: 36rpx;
            font-weight: 600;
            color: #333333;
          " v-if="orderInfo.status_title === '待审核'">待审核详情</text>
				<text class="pageTitle" style="
            font: inter;
            font-size: 36rpx;
            font-weight: 600;
            color: #333333;
          " v-if="orderInfo.status_title === '进行中' || status === '服务中'">进行中详情</text>
				<text class="pageTitle" style="
            font: inter;
            font-size: 36rpx;
            font-weight: 600;
            color: #333333;
          " v-if="orderInfo.status_title === '已完成'">已完成详情</text>
				<text class="pageTitle" style="
            font: inter;
            font-size: 36rpx;
            font-weight: 600;
            color: #333333;
            margin-right: 200rpx;
          " v-if="orderInfo.status_title === '待评价'">待评价详情</text>
				<text class="pageTitle" style="
            font: inter;
            font-size: 36rpx;
            font-weight: 600;
            color: #333333;
          " v-if="orderInfo.status_title === '已拒单'">已拒单详情</text>
				<view><text></text></view>
			</view>
		</view>
		<view slot="gBody" class="productStatusContainer">
			<view class="productDetailContainer">
				<ProductDetails :orderInfo="orderInfo" />
			</view>
			<view class="serviceFeeDetailsContainer">
				<ServicefeeDetails :orderInfo="orderInfo" />
			</view>
			<view class="orderInformationDetailContainer">
				<OrderInformationDetail :orderInfo="orderInfo" />
			</view>
		</view>
		<view slot="gFooter">
			<view>
				<view class="completeDetail" v-if="orderInfo.status_title === '待评价'">
					<CompleteDetail />
				</view>
			</view>
			<view>
				<view class="completeDetail2" v-if="orderInfo.status_title==='已完成'">
					<CompleteDetail2 :orderInfo="orderInfo"/>
				</view>
			</view>
			<view>
				<view class="progressButton" v-if="orderInfo.status_title === '服务中' || orderInfo.status_title === '进行中'">
					<ProgressButton :orderInfo="orderInfo" />
				</view>
			</view>
			<view>
				<view class="toReview" v-if="orderInfo.status_title === '待审核'">
					<ToReview/>
				</view>
			<!-- <view v-if="orderInfo.status_title === '已拒单'"></view> -->
			</view>
		</view>
	</gui-page>
</template>

<script>
	import request from "@/common/request.js"
	import ProductDetails from "@/pages/ProductStatus/ProductDetails.vue"
	import ServicefeeDetails from "@/pages/ProductStatus/ServicefeeDetails.vue";
	import OrderInformationDetail from "@/pages/ProductStatus/OrderInformationDetail.vue";
	import CompleteDetail from "@/pages/ProductStatus/CompleteDetail.vue";
	import CompleteDetail2 from "@/pages/ProductStatus/CompleteDetail2.vue";
	import ProgressButton from "@/pages/ProductStatus/ProgressButton.vue";
	import ToReview from "@/pages/ProductStatus/ToReview.vue";
	export default {
		data() {
			return {
				id: undefined,
				orderInfo: {},
				currentIndex:0,
			};
		},
		methods: {
			goBack() {
				uni.navigateTo({
					url: "/pages/MasterSide/MasterSide?menu="+this.currentIndex,
				});
			},
		},
		onLoad: function(option) {
			var self=this
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('showDetail', async function(data) {
				console.log(data)
				if(data.currentIndex){
					self.currentIndex=data.currentIndex
				}
				const response = await request.orderInfo({
					orderid: data.data
				})
				console.log(response.data.data)
				self.orderInfo = response.data.data;
			})
		},
		components: {
			ProductDetails,
			ServicefeeDetails,
			OrderInformationDetail,
			CompleteDetail,
			CompleteDetail2,
			ProgressButton,
			ToReview,
		},
	};
</script>

<style scoped>
	.productStatusContainer {
		background: #f4f4f4;
		/*height: 100vh;*/
	}

	.serviceFeeDetailsContainer {
		margin: 15rpx 0rpx 15rpx 0rpx;
	}
</style>
