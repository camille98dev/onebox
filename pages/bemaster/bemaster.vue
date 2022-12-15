<template>
	<gui-page :customHeader="true">
		<view slot="gHeader">
			<!-- <c-header :back="true" :showLoc="false" :title="'成为师傅'"></c-header> -->
		</view>
		<view slot="gBody"
			:style="{ 'min-height': (height - 44)+'px',background: '#FFFFFF', padding: '30rpx 30rpx 180rpx'}">


			<form @submit="submit" v-if="is_master == '0' || is_master == '2'">
				<view class="gui-form-item gui-border-b" style="margin-bottom: 10rpx;">
					<text class="gui-form-label" style="font-size: 32rpx;">姓名</text>
					<view class="gui-form-body">
						<input type="text" class="gui-form-input" v-model="formData.name" name="name"
							style="font-size: 32rpx;text-align: right;" placeholder="请输入姓名" />
					</view>
				</view>

				<view class="gui-form-item gui-border-b" style="margin-bottom: 10rpx;">
					<text class="gui-form-label" style="font-size: 32rpx;">手机</text>
					<view class="gui-form-body">
						<input disabled type="number" class="gui-form-input" v-model="formData.mobile" name="name"
							style="font-size: 32rpx;text-align: right;" placeholder="请输入手机号" />
					</view>
				</view>

				<view class="gui-form-item gui-border-b" style="margin-bottom: 10rpx;">
					<text class="gui-form-label gui-flex1" style="font-size: 32rpx;">所在地区</text>
					<region-picker ref="region" @change="regionChange" :value="address" class="selector-item">
						<view
							class="selector-item gui-flex gui-rows gui-nowrap gui-space-between gui-align-items-center">
							<view style="color: #b5b5b5;font-size:28rpx" v-if="!address">{{'选择省/市/区'}}</view>
							<view style="font-size:26rpx;text-align: right;" v-if="address">{{
                                formData.province+'/'+formData.city+'/'+formData.district
                                }}</view>
							<text class="gui-list-arrow-right gui-icons gui-color-gray">&#xe601;</text>
						</view>
					</region-picker>
				</view>

				<view class="gui-form-item gui-border-b" style="margin-bottom: 10rpx;">
					<text class="gui-form-label" style="font-size: 32rpx;">详细地址</text>
					<view class="gui-form-body">
						<input type="text" class="gui-form-input" v-model="formData.detail" name="name"
							style="font-size: 32rpx;text-align: right;" placeholder="请输入详细地址" />
					</view>
				</view>

				<view class="gui-form-item gui-border-b" style="margin-bottom: 10rpx;">
					<text class="gui-form-label" style="font-size: 32rpx;">身份证</text>
					<view class="gui-form-body">
						<input type="text" class="gui-form-input" v-model="formData.idcard" name="name"
							style="font-size: 32rpx;text-align: right;" placeholder="请输入身份证号" />
					</view>
				</view>

				<view class="gui-form-item " style="margin-bottom: 10rpx;">
					<view>
						<text class="gui-form-label" style="font-size: 32rpx;">身份证正面</text>
					</view>
				</view>

				<gui-upload-images class="gui-border-b" :items="editImgFront" @change="handleChangeIdFront"
					:maxFileNumber="1" :imgMode="'widthFix'" :btnName="' '">
				</gui-upload-images>

				<view class="gui-form-item" style="margin-bottom: 10rpx;">
					<view>
						<text class="gui-form-label" style="font-size: 32rpx;">身份证反面</text>
					</view>
				</view>

				<gui-upload-images class="gui-border-b" :items="editImgBack" @change="handleChangeIdBack"
					:maxFileNumber="1" :imgMode="'widthFix'" :btnName="' '">
				</gui-upload-images>


			</form>

			<view :style="{ 'min-height': (height - 118)+'px'}" v-if="is_master == '1'">
				<view style="text-align:center;padding-top:120rpx;">管理员正在审核你的资料，请耐心等候</view>

			</view>
			<view v-if="is_master == '3'">
				<view style="text-align:center;margin-bottom:20rpx;">{{contract_info.title}}</view>
				<view v-html="contract_info.content"></view>
			</view>
			<view v-if="is_master == '4'">
				<view style="text-align:center;margin-bottom:20rpx;">{{contract_info.title}}</view>
				<view v-html="contract_info.content"></view>
			</view>

			<view class="footer gui-fixed-lb gui-text-center gui-color-gray gui-flex gui-justify-content-center">
				<button v-if="is_master == '0'" @click="master_application()"
					class="gui-flex1 footer-action-right-btn-right gui-flex gui-justify-content-center">
					<text class=" gui-button-text" style="color:#fff">上传审核</text>
				</button>

				<button @click="contactCustomerService()" v-if="is_master == '1'"
					class="gui-flex1 footer-action-right-btn-right gui-flex gui-justify-content-center">
					<text class=" gui-button-text" style="color:#fff">联系客服</text>
				</button>

				<button v-if="is_master == '2'" @click="application_edit()"
					class="gui-flex1 footer-action-right-btn-right gui-flex gui-justify-content-center">
					<text class=" gui-button-text" style="color:#fff">上传审核</text>
				</button>

				<button @click="goSign()" v-if="is_master == '3'"
					class="gui-flex1 footer-action-right-btn-right gui-flex gui-justify-content-center">
					<text class=" gui-button-text" style="color:#fff">签订合同</text>
				</button>

				<button @click="contactCustomerService()" v-if="is_master == '4'" 
					class="gui-flex1 footer-action-right-btn-right gui-flex gui-justify-content-center">
					<text class=" gui-button-text" style="color:#fff">联系客服</text>
				</button>
			</view>

		</view>
	</gui-page>
</template>
<script>
	import request from '@/common/request';
	import regionPicker from "@/Components/region-picker/region-picker.js"

	export default {
		components: {
			regionPicker
		},
		data() {
			return {
				statusBarHeight: 0,
				height: 0,
				windowWidth: 0,
				address: '',
				formData: {
					name: '',
					mobile: '',
					province: '',
					city: '',
					district: '',
					province_code: '',
					city_code: '',
					district_code: '',
					detail: '',
					idcard: '',
					idcard_front: '',
					idcard_reverse: '',
				},
				wechat_user: '',
				idFront: undefined,
				idBack: undefined,
				imgArr: [],
				is_master: '',
				contract_info: undefined,
				applicationid: '',
				editImgFront: [],
				editImgBack: [],
				isImageChanged: false,
				wechat_link: ''
			}
		},
		onLoad(options) {
			this.getStatusBarHeight()
			// if (options && options.is_master) {
			//     this.is_master = options.is_master;
			//     console.log("this.is_master", this.is_master);
			// }
		},
		onShow() {
			if (uni.getStorageSync('wechat_user')) {
				this.wechat_user = uni.getStorageSync('wechat_user');
				console.log("this.wechat_user", this.wechat_user);

				this.wechat_phone = uni.getStorageSync('wechat_phone')
				this.formData.mobile = this.wechat_phone.phoneNumber
			}

			setTimeout(() => {
				this.application_status();
			}, 1000);
		},
		methods: {
			handleChangeIdFront(e) {
				console.log("handleChangeIdFront", e);
				this.idFront = e[0];
				console.log("this.idFront", this.idFront);
				this.isImageChanged = true;
			},
			handleChangeIdBack(e) {
				console.log("handleChangeIdBack", e);
				this.idBack = e[0];
				console.log("this.idBack", this.idBack);
				this.isImageChanged = true;
			},
			uploadImage(image, index) {
				console.log("image", image);
				console.log("index", index);

				var self = this
				var params = {};
				const options = {
					url: 'https://www.app.yhsj-cn.com/api/user/upload_image',
					header: {
						'Content-type': 'multipart/form-data',
						'Authorization': '' + uni.getStorageSync('api_token')
					},
					filePath: image,
					formData: params,
					name: 'file',
					files: [{
						name: 1,
						uri: image
					}],
					success: (res) => {
						var parsedData = JSON.parse(res.data);
						console.log("success parsedData", parsedData);
						if (index == 0) {
							this.formData.idcard_front = parsedData.url;
						} else {
							this.formData.idcard_reverse = parsedData.url;
						}
					},
					fail: (err) => {
						console.log("err", err);
						// uni.showToast({
						//     title: '失败',
						//     icon: "none",
						// });
					},
				};

				uni.uploadFile(options)
			},
			master_application() {
				var self = this;

				if (!this.formData.name) {
					uni.showToast({
						title: '请输入您的姓名',
						icon: "none",
					});
					return
				}

				if (!this.formData.mobile) {
					uni.showToast({
						title: '请输入您的手机号码',
						icon: "none",
					});
					return
				}

				if (!this.formData.province_code) {
					uni.showToast({
						title: '选择省/市/区',
						icon: "none",
					});
					return
				}

				if (!this.formData.detail) {
					uni.showToast({
						title: '请输入详细地址',
						icon: "none",
					});
					return
				}

				if (!this.formData.idcard) {
					uni.showToast({
						title: '请输入身份证号',
						icon: "none",
					});
					return
				}

				if (!this.idFront) {
					uni.showToast({
						title: '身份证图片为空',
						icon: "none",
					});
					return
				}

				if (!this.idBack) {
					uni.showToast({
						title: '身份证图片为空',
						icon: "none",
					});
					return
				}

				this.imgArr.push(this.idFront);
				this.imgArr.push(this.idBack);
				console.log("this.imgArr", this.imgArr);

				uni.showLoading({
					title: '',
					mask: true
				});

				const getPostsSync = async () => {
					await this.imgArr.forEach((val, index) => {
						this.uploadImage(val.url, index)
					})
				};

				getPostsSync();
				var self = this
				setTimeout(() => {
					let params = {
						name: this.formData.name,
						mobile: this.formData.mobile,
						province: this.formData.province_code,
						city: this.formData.city_code,
						district: this.formData.district_code,
						detail: this.formData.detail,
						idcard: this.formData.idcard,
						idcard_front: this.formData.idcard_front,
						idcard_reverse: this.formData.idcard_reverse,
					};

					console.log("params", params);


					request.master_application(params)
						.then((resp) => {
							uni.hideLoading();
							let data = resp.data;
							if (data.code == 200 || data.code == '200') {
								uni.showToast({
									title: '成功',
									icon: "none",
								});
								self.application_status()
							}
						})
						.catch((err) => {
							uni.hideLoading();
						})
				}, 2500);
			},
			application_edit() {
				var self = this;

				if (!this.formData.name) {
					uni.showToast({
						title: '请输入您的姓名',
						icon: "none",
					});
					return
				}

				if (!this.formData.mobile) {
					uni.showToast({
						title: '请输入您的手机号码',
						icon: "none",
					});
					return
				}

				if (!this.formData.province_code) {
					uni.showToast({
						title: '选择省/市/区',
						icon: "none",
					});
					return
				}

				if (!this.formData.detail) {
					uni.showToast({
						title: '请输入详细地址',
						icon: "none",
					});
					return
				}

				if (!this.formData.idcard) {
					uni.showToast({
						title: '请输入身份证号',
						icon: "none",
					});
					return
				}

				if (!this.idFront) {
					uni.showToast({
						title: '身份证图片为空',
						icon: "none",
					});
					return
				}

				if (!this.idBack) {
					uni.showToast({
						title: '身份证图片为空',
						icon: "none",
					});
					return
				}

				this.imgArr.push(this.idFront);
				this.imgArr.push(this.idBack);
				console.log("this.imgArr", this.imgArr);

				uni.showLoading({
					title: '',
					mask: true
				});

				const getPostsSync = async () => {
					await this.imgArr.forEach((val, index) => {
						this.uploadImage(val.url, index)
					})
				};

				getPostsSync();
				var self = this
				setTimeout(() => {
					let params = {
						applicationid: this.applicationid,
						name: this.formData.name,
						mobile: this.formData.mobile,
						province: this.formData.province_code,
						city: this.formData.city_code,
						district: this.formData.district_code,
						detail: this.formData.detail,
						idcard: this.formData.idcard,
						idcard_front: this.formData.idcard_front,
						idcard_reverse: this.formData.idcard_reverse,
					};

					console.log("params", params);

					request.application_edit(params)
						.then((resp) => {
							uni.hideLoading();
							let data = resp.data;
							if (data.code == 200 || data.code == '200') {
								uni.showToast({
									title: '成功',
									icon: "none",
								});
								self.application_status()
							}
						})
						.catch((err) => {
							uni.hideLoading();
						})
				}, 2500);
			},
			// is_master=1: the administrator is under review
			// is_master=2: Administrator audit failed，can be resubmitted
			// is_master=3: The administrator has successfully reviewed and signed the contract
			// is_master=4: The master settled in successfully
			application_status() {
				let params = {};

				request.application_status(params)
					.then((resp) => {
						let data = resp.data;
						if (data.code == 200 || data.code == '200') {
							this.applicationid = data.data.id;
							this.wechat_link = data.data.wechat_link
							console.log("this.applicationid", this.applicationid);

							this.is_master = '' + data.data.is_master;

							// this.is_master = '3'; //temp

							if (this.is_master == '1') {}

							if (this.is_master == '2') {
								this.formData.name = data.data.name;
								this.formData.mobile = data.data.mobile;
								this.formData.province_code = data.data.province;
								this.formData.city_code = data.data.city;
								this.formData.district_code = data.data.district;
								this.formData.detail = data.data.detail;
								this.formData.idcard = data.data.idcard;
								this.formData.idcard_front = data.data.idcard_front;
								this.formData.idcard_reverse = data.data.idcard_reverse;


								this.address = this.formData.province_code + ',' + this.formData.city_code + ',' + this
									.formData.district_code;

								console.log("this.formData", this.formData);
								this.idFront = {};
								this.idFront.url = this.formData.idcard_reverse;
								this.idFront.progress = 0;

								this.idBack = {};
								this.idBack.url = this.formData.idcard_reverse;
								this.idBack.progress = 0;

								this.imgArr = [];
								this.editImgFront = [];
								this.editImgBack = [];

								this.editImgFront.push(this.idBack.url)
								this.editImgBack.push(this.idBack.url)

								setTimeout(() => {
									var {
										region
									} = this.$refs;
									region.value_format();
									region.range_set();
									region.region_change({
										detail: {
											value: region.dataValue
										}
									})
								}, 500);
							}

							if (this.is_master == '3' || this.is_master == '4') {
								this.contractinfo()
							}

						} else {
							this.is_master = '0';
							console.log("this.is_master 0", this.is_master);
						}
					})
					.catch((err) => {})
			},
			contractinfo() {
				let params = {};

				request.contractinfo(params)
					.then((resp) => {
						let data = resp.data;
						if (data.code == 200 || data.code == '200') {
							this.contract_info = data.data;
							console.log("this.contract_info", this.contract_info);
						}
					})
					.catch((err) => {})
			},
			contact() {
				console.log('inside')
			},
			contactCustomerService() {
				console.log('here')
				var self = this
				// #ifdef MP-WEIXIN
				try {
					console.log('联系客服')
					wx.openCustomerServiceChat({
						extInfo: {
							url: self.wechat_link
						},
						corpId: 'ww8891979388c42f49', //企业微信ID
						success(res) {

						}
					})
				} catch (error) {
					uni.showToast({
						title: '请更新至微信最新版本',
						icon: "none",
						duration: 1500,
					});
				}
				// #endif
			},
			regionChange(e) {
				var {
					code,
					value
				} = e.detail;
				console.log("code", code);
				console.log("value", value);

				this.formData.province = value[0];
				this.formData.city = value[1];
				this.formData.district = value[2];

				this.formData.province_code = code[0];
				this.formData.city_code = code[1];
				this.formData.district_code = code[2];

				this.address = this.formData.province_code + ',' + this.formData.city_code + ',' + this.formData
					.district_code;
				console.log("this.address", this.address);

			},
			goSign() {
				uni.navigateTo({
					url:'pages/bemaster/sign'
				});
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
	}
</script>
<style scoped>
	.btn-disabled {
		background-color: rgba(104, 105, 172, 0.5) !important;
	}

	.gui-form-label {
		color: #666666;
		font-size: 28rpx;
		min-width: 200rpx !important;
	}

	.footer-action-right-btn-right {
		background-color: #6869ac;
		border-radius: 39rpx;
		height: 78rpx;
		align-content: center;
		align-items: center;
	}


	.footer {
		background-color: #fff;
		right: 0;
		left: 0;
		padding: 30rpx 30rpx 50rpx;
	}

	image {
		image-rendering: -webkit-optimize-contrast;
	}
</style>
