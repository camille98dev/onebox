<template>
	<view class="c-get-phone">
		<gui-modal ref="guimodal1" title="提示" :canCloseByShade="false" :isCloseBtn="false">
			<view slot="content" class="gui-padding gui-bg-gray">
				<text class="gui-block-text gui-text-center gui-text gui-color-gray"
					style="line-height: 100rpx; padding: 10rpx">请登录您的帐户</text>
			</view>
			<view slot="btns" class="gui-flex gui-rows gui-space-between">
				<view class="modal-btns gui-flex1">
					<button @click="closeLogin()" class="modal-btns gui-color-blue" open-type="getPhoneNumber"
						@getphonenumber="getPhoneNumber">
						点击授权
					</button>
				</view>
			</view>
		</gui-modal>
	</view>
</template>

<script>
	import request from "@/common/request";
	const app_id = 'wxdb36f7d085ea6cec'

	export default {
		name: "c-get-phone",
		props: {},
		data() {
			return {};
		},
		methods: {
			openLogin() {
				this.$refs.guimodal1.open();
			},
			closeLogin() {
				this.$refs.guimodal1.close();
			},
			application_status() {
				let params = {};

				request.masterStatus(params)
					.then((resp) => {

						let data = resp.data;
						if (data.code == 200 || data.code == '200') {

							this.is_master = '' + data.is_master;
							console.log('resp', this.is_master)
							if (this.is_master == '0') {
								uni.navigateTo({
									url: '/pages/bemaster/bemaster'
								})
							}
							if (this.is_master == '1') {

							}

							if (this.is_master == '2') {
								uni.navigateTo({
									url: '/pages/bemaster/bemaster'
								})
							}

							if (this.is_master == '3') {
								uni.navigateTo({
									url: '/pages/bemaster/bemaster'
								})
							}

							if (this.is_master == '4') {
								uni.reLaunch({
									url: '/pages/TakeOrders/TakeOrders'
								})
							}

						} else {
							this.is_master = '0';
							console.log("this.is_master 0", this.is_master);
						}
					})
					.catch((err) => {})
			},
			getPhoneNumber(e) {

				uni.showLoading({
					title: '',
					mask: true
				});

				var detail = e.detail;
				console.log("detail", detail);
				// this.$emit('success', e.detail);
				var self = this
				request.decryptMobile({
						iv: detail.iv,
						encrypted_data: detail.encryptedData,
						app_id: app_id
					})
					.then((resp) => {
						let data = resp.data;
						if (data.error_code == 0) {
							console.log("data.data", data.data);
							uni.setStorageSync('wechat_phone', data.data);
							uni.hideLoading();

							uni.showModal({
								title: '提示',
								content: '请登录您的帐户',
								success: function(res) {
									if (res.confirm) {
										uni.showLoading({
											title: '',
											mask: true
										});
										uni.getUserProfile({
											desc: '请登录您的帐户',
											lang: 'en',
											success: (infoRes) => {
												console.log("success infoRes", infoRes);

												request.decryptUserInfo({
														iv: infoRes.iv,
														encrypted_data: infoRes
															.encryptedData,
														app_id: app_id
													})
													.then((resp) => {
														let data1 = resp.data;
														uni.hideLoading();
														if (data1.error_code == 0) {
															uni.setStorageSync(
																'wechat_user', data1
																.data);

															self.application_status()
														}
													})
													.catch((err) => {
														uni.hideLoading();
													})

												// setTimeout(() => {
												// 	uni.reLaunch({
												// 		url: '/pages/switchPages/index'
												// 	})
												// }, 1000);
											},
											fail: (err) => {
												console.log("fail res", err);
												uni.hideLoading();
											},
											complete: () => {
												console.log("complete");
											},

										})
									} else if (res.cancel) {
										uni.hideLoading();
									}
								}
							})
						}
					})
					.catch((err) => {
						uni.hideLoading();
					})


				// uni.showModal({
				// 	title: '提示',
				// 	content: '请登录您的帐户',
				// 	success: function (res) {
				// 		if (res.confirm) {
				// 			uni.getUserProfile({
				// 				desc: '请登录您的帐户',
				// 				lang: 'en',
				// 				success: (infoRes) => {
				// 					console.log("success infoRes", infoRes);

				// 					request.decryptUserInfo({iv: infoRes.iv, encrypted_data: infoRes.encryptedData, app_id: app_id})
				// 					.then((resp) => {
				// 						let data = resp.data;
				// 						if (data.error_code == 0) {
				// 							uni.setStorageSync('wechat_user', data.data);
				// 						}
				// 					})
				// 					.catch((err) => {})



				// 					// setTimeout(() => {
				// 					// 	uni.reLaunch({
				// 					// 		url: '/pages/switchPages/index'
				// 					// 	})
				// 					// }, 1000);

				// 				},
				// 				fail: (err) => {
				// 					console.log("fail res", err);
				// 				},
				// 				complete: () => {
				// 					console.log("complete");
				// 				},

				// 			})
				// 		} else if (res.cancel) {

				// 		}
				// 	}
				// })
			},
		},
	};
</script>

<style scoped>
	.modal-btns {
		line-height: 88rpx;
		font-size: 26rpx;
		text-align: center;
	}
</style>
