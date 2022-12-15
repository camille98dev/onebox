<template>
	<view class="optionsButtonContainer">
		<view>
			<button @click="contact(orderInfo.user_phone)" class="contact">联系客户</button>
		</view>
		<view>
			<button class="service" @click="goCompleteService(orderInfo.id)">完成服务</button>
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
			contact(val) {
				var self = this;
				uni.makePhoneCall({
					// 手机号
					phoneNumber: val,
					// 成功回调
					success: (res) => {
					},
					// 失败回调
					fail: (res) => {
					}
				});
				// #ifdef  MP-WEIXIN
				/*try {
					wx.openCustomerServiceChat({
						extInfo: {
							url: "",
						},
						corpId: "wx6c4f6654f1a4cc9f", //企业微信ID
						success(res) {},
					});
				} catch (error) {
					uni.showToast({
						title: "请更新至微信最新版本",
						icon: "none",
						duration: 1500,
					});
				}*/
				// #endif
			},
			goCompleteService(id) {
				uni.navigateTo({
					url: `/pages/CompleteService/CompleteService?orderId=${id}`,
				})
			}
		}
	}
</script>
<style scoped>
	.optionsButtonContainer {
		background: #FFFFFF;
		display: flex;
		justify-content: end;
		padding: 25rpx 300rpx 25rpx 0rpx;
		position: fixed;
		bottom: 0;

	}

	.contact {
		color: #6869AC;
		width: 220rpx;
		border-radius: 50rpx;
		height: 70rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1rpx solid #6869AC;
		font-size: 28rpx;
		margin: 0rpx 25rpx 0rpx 250rpx;
		font-weight: 400;
	}

	.service {
		color: #FFFFFF;
		background: #6869AC;
		width: 220rpx;
		border-radius: 50rpx;
		height: 70rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		font-weight: 400;

	}
</style>
