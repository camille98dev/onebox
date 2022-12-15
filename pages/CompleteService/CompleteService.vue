<template>
	<gui-page :customHeader="false">
		<view slot="gHeader">
			<c-header :back="true" :showLoc="false" :title="'留言反馈'"></c-header>
		</view>
		<view slot="gBody" :style="{
        'min-height': height + 'px',
        background: '#fff',
        position: 'relative',
      }">
			<view style="padding: 0rpx 20rpx 20rpx; border-bottom: 1rpx solid #f4f4f4">
				<view style="margin-bottom: 30rpx">
					<text class="gui-list-title-text" style="color: #666666">施工场地合影</text>
				</view>
				<gui-upload-images v-if="reloaded" :imgMode="'widthFix'" @change="handleChange1" ref="sitePhoto"
					:btnName="' '">
				</gui-upload-images>
			</view>
			<view style="padding: 0rpx 20rpx 20rpx; border-bottom: 1rpx solid #f4f4f4">
				<view style="margin-bottom: 30rpx">
					<text class="gui-list-title-text" style="color: #666666">与客户合影</text>
				</view>
				<gui-upload-images v-if="reloaded" :imgMode="'widthFix'" @change="handleChange2" ref="customer_photo"
					:btnName="' '">
				</gui-upload-images>
			</view>

			<view class="footer gui-text-center gui-color-gray gui-fixed-lb gui-flex gui-justify-content-center">
				<button @click="report()"
					class="gui-flex1 footer-action-right-btn-right gui-flex gui-justify-content-center">
					<text class="gui-button-text" style="color: #fff">上传审核</text>
				</button>
			</view>
		</view>
	</gui-page>
</template>
<script>
	import request from "@/common/request";

	export default {
		components: {},
		data() {
			return {
				reloaded: true,
				statusBarHeight: 0,
				height: 0,
				windowWidth: 0,
				list: [],
				feedbackObj: {
					type: "",
					content: "",
					files: [],
				},
				imgArr: [],
				finalUploadedImg: [],
				orderId: undefined,
				orderInfo: {},
				site_photo: [],
				site_photo_arr: [],
				customer_photo: [],
				customer_photo_arr: [],
				final_photos: []
			};
		},
		async onLoad(data) {
			console.log(data);
			this.orderId = data.orderId;

			this.getStatusBarHeight();
			const response = await request.orderInfo({
				orderid: this.orderId,
			});
			console.log(data);

			// service_info: "[]";

			console.log(
				response.data.data.service_finished.site_photo,
				"response data"
			);
			if (response.data.data.service_finished && response.data.data.service_finished.site_photo) {
				setTimeout(() => {
					this.$refs.sitePhoto.setItems(
						response.data.data.service_finished == [] ? [] : response.data.data.service_finished
						.site_photo
					);
					this.$refs.customer_photo.setItems(
						response.data.data.service_finished == [] ? [] : response.data.data.service_finished
						.customer_photo
					);
				}, 1000);
			}

		},
		onShow() {

		},
		methods: {
			handleChange1(e) {
				this.site_photo = e;
				console.log("this.site_photo", this.site_photo);
			},
			handleChange2(e) {
				this.customer_photo = e;
				console.log("this.customer_photo", this.customer_photo);
			},
			uploadImage(image, type) {
				console.log("image", image);
				console.log("type", type);
				var self = this;
				var params = {};
				const options = {
					url: "https://www.app.yhsj-cn.com/api/user/upload_image",
					header: {
						"Content-type": "multipart/form-data",
						"Authorization": "" + uni.getStorageSync("api_token"),
					},
					filePath: image,
					formData: params,
					timeout: 60000,
					name: "file",
					success: (res) => {
						console.log("success", res);
						var parsedData = JSON.parse(res.data);
						console.log("parsedData", parsedData);
						self.final_photos.push(parsedData.url)
						if (type == 'site') {
							self.site_photo_arr.push(parsedData.url)
						} else {
							self.customer_photo_arr.push(parsedData.url)
						}
					},
					fail: (err) => {
						console.log("err", err);
						uni.showToast({
							title: '图片上传失败',
							icon: "none",
						});

						setTimeout(() => {
							uni.showLoading({
								title: '',
								mask: true
							});
						}, 1000);

					},
				};

				uni.uploadFile(options);
			},
			uploadAll() {
				for (var i = 0; i < this.site_photo.length; i++) {
					this.uploadImage(this.site_photo[i], 'site')
				}
				for (var i = 0; i < this.customer_photo.length; i++) {
					this.uploadImage(this.customer_photo[i], 'customer')
				}
				//toReport()
			},
			finish() {
				uni.showLoading({
					title: '',
					mask: true
				});

				var self = this
				let params = {
					orderId: this.orderId,
					site_photo: this.site_photo_arr,
					customer_photo: this.customer_photo_arr,
				}
				console.log("params", params);

				request.finishservice(params).then((res) => {
					let data = res.data;
					uni.hideLoading()
					if (data.code == 200 || data.code == '200') {
						uni.showToast({
							title: '上报完成'
						})
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1500);
					}else{
						uni.showToast({
							title: response.msg,
							icon: "none",
						});
					}
				}).catch(err => {
					uni.hideLoading()
				})
			},
			report() {
				var self = this
				this.site_photo.map((val) => {
					val.type = 'site'
					return val
				})

				this.customer_photo.map((val) => {
					val.type = 'customer'
					return val
				})

				var mergeImg = [...this.site_photo, ...this.customer_photo];

				console.log("finalImages", mergeImg);

				if (mergeImg.length == 0) {
					uni.showToast({
						title: '没有要上传的图片',
						icon: "none",
					});
					return
				}

				uni.showLoading({
					title: '',
					mask: true
				});

				const getPostsSync = async () => {
					await mergeImg.forEach((val, index) => {
						self.uploadImage(val.url, val.type)
					})

					setTimeout(() => {
						uni.hideLoading()
						console.log("self.final_photos", self.final_photos);
						self.finish()
					}, 3000);
				};
				getPostsSync();
			},
			getStatusBarHeight() {
				var self = this;
				uni.getSystemInfo({
					success: function(resp) {
						console.log("resp", resp);
						self.statusBarHeight = resp.statusBarHeight;
						self.height = resp.safeArea.height - 44;
						self.windowWidth = resp.windowWidth;
					},
				});
			},
		},
	};
</script>
<style scoped>
	.footer-action-right-btn-right {
		background-color: #6869ac;
		border-radius: 39rpx;
		height: 78rpx;
		align-content: center;
		align-items: center;
	}

	.footer {
		right: 0;
		left: 0;
		padding: 0rpx 30rpx 50rpx;
	}

	image {
		image-rendering: -webkit-optimize-contrast;
	}
</style>
