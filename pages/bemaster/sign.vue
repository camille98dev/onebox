<template>
	<gui-page :customHeader="true">
		<!-- 	<view slot="gHeader">
			<c-header :back="true" :showLoc="false" :title="'成为师傅'"></c-header>
		</view> -->
		<view slot="gBody"
			:style="{ 'min-height': (height - 44)+'px',background: '#FFFFFF', padding: '30rpx 30rpx 0rpx'}">

			<view style="color: #0e0e0e;text-align:center;margin-top:150rpx;position: relative;">
				<image class="fix-sign" style="height: 211rpx;width: 470rpx;" src="@/static/icons/signature.png"
					mode="" />
				迈入壹盒 你就是涂装艺术家
			</view>

			<view style="color: #333333;text-align:center;margin-top:200rpx;">你的申请已通过，请尽快签署协议~</view>
			<view class="footer gui-text-center gui-fixed-lb gui-color-gray gui-flex gui-justify-content-center"
				style="margin:60rpx 0rpx 0rpx;">
				<button @click="sign_contract()"
					class="gui-flex1 footer-action-right-btn-right gui-flex gui-justify-content-center">
					<text class=" gui-button-text" style="color:#fff">签订合同</text>
				</button>
			</view>

		</view>
	</gui-page>
</template>
<script>
	import request from '@/common/request';

	export default {
		data() {
			return {
				statusBarHeight: 0,
				height: 0,
				windowWidth: 0,
				formData: {
					name: '',
					defaultAddress: false,
				},
				list: [1, 2]
			}
		},
		methods: {
			sign_contract() {
				let params = {};

				uni.showLoading({
					title: '',
					mask: true
				});

				request.sign_contract(params)
					.then((resp) => {
						uni.hideLoading();
						let data = resp.data;
						if (data.code == 200 || data.code == '200') {
							uni.showToast({
								title: '成功',
								icon: "none",
							});
							uni.reLaunch({
								url: '/pages/MasterSide/MasterSide'
							})
						} else {
							uni.showToast({
								title: '失败的',
								icon: "none",
							});
						}
					})
					.catch((err) => {
						uni.hideLoading();
					})
			},
			confirm(e) {
				console.log("e", e);
			},
			openPicker() {
				this.$refs.picker1.show()
			},
			switchChange(e) {

			},
			getStatusBarHeight() {
				var self = this;
				uni.getSystemInfo({
					success: function(resp) {
						console.log("resp", resp);
						self.statusBarHeight = resp.statusBarHeight;
						self.height = (resp.safeArea.height - 44)
						self.windowWidth = resp.windowWidth
					},
				})
			},
		},
		onLoad() {
			this.getStatusBarHeight()
		}
	}
</script>
<style scoped>
	.fix-sign {
		position: absolute;
		top: -80rpx;
	}

	.gui-form-label {
		color: #666666;
		font-size: 28rpx;
	}

	.footer-action-right-btn-right {
		background-color: #6869ac;
		border-radius: 39rpx;
		height: 78rpx;
		align-content: center;
		align-items: center;
		width: 100%;
	}


	.footer {
		right: 0;
		left: 0;
		bottom: 0;
		padding: 0rpx 30rpx 50rpx;
	}

	image {
		image-rendering: -webkit-optimize-contrast;
	}
</style>
