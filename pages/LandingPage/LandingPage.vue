<template>
	<gui-page 
		:isHeaderSized="false"
		:statusBarStyle="'background-color:transparent;color:#ffffff'" 
		:headerSets="{height: 0, zIndex: -1}"
        :customHeader="true">
		<view slot="gHeader"></view>
		<view slot="gBody" :style="{ 'min-height': height+'px',position: 'relative'}">
			<!-- <view style="position: relative"> -->

				<image src="@/static/LandingPage.png" class="backgroundSize"></image>

				<view style="position: fixed; top: 0;bottom: 0;right: 0;left: 0;">
					<view style="height:100%">
						<view style="display: flex; padding:100rpx 0rpx 0rpx 50rpx;">
							<image src="@/static/WhiteLogo.png" class="logoSize"></image>
						</view>
						<view class="welcomeContainer">
							<text class="helloText">Hello</text>
							<view style="margin-top: 50rpx;">
								<text class="welcomeText1">欢迎来到</text>
							</view>
							<view style="margin-top: 15rpx;">
								<text class="welcomeText2">壹盒饰家！</text>
							</view>
						</view>
						<view class="pos-bottom">
							<view class="buttonContainer">
								<view class="logIn">
									<button class="log" @click="wechatLogin()">登录</button>
								</view>
								<view class="cancel" style="margin-top: 25rpx;">
									<button class="cancelBtn">取消</button>
								</view>
							</view>
							<view style="display: flex; align-items:center; justify-content:center; margin-top:25rpx;">
								<gui-radio @change="radioChange">
									<text style="font-size: 28rpx; color: #999999;">登录表示您已同意壹盒饰家</text>
								</gui-radio>
								<text style="color: #6466a1;" @click="goUserAgreement()">《隐私协议》</text>
							</view>
						</view>

					</view>
				</view>


			<!-- </view> -->
			<c-get-phone ref="getphone"></c-get-phone>
		</view>
	</gui-page>


</template>
<script>
	import request from "@/common/request.js"
	export default {
		data() {
			return {
                statusBarHeight: 0,
                height: 0,
                windowWidth: 0,
				userAgreement: '',
				applicationid: '',
				is_master: '',
				agree: false
			}
		},
		// async created() {
		// 	const response = await request.userAgreement({})
		// 	this.userAgreement = response.data.title;
		// 	console.log(response.data)
		// },
		onLoad: function(data) {
			this.getStatusBarHeight();

			const fetchData = async () => {
				const response = await request.userAgreement({})
				this.userAgreement = response.data.data;
			}
			fetchData()
		},
		onShow() {
			if (uni.getStorageSync('api_token')) {
				if (uni.getStorageSync('wechat_phone')) {
					this.application_status()
				}
			}
		},
		methods: {
			radioChange(e) {
				this.agree = e[0]
			},
			//登录
			//获取手机号
			//判断是否通过了审核
			//通过审核了，到首页；否则就到审核部分去
			loginx(loginRes) {
				var self = this
				const app_id = 'wx06dca285f93fa366'
				request.login({
						code: loginRes.code,
						app_id: app_id
					})
					.then((resp) => {
						let data = resp.data;
						console.log("data", data);
						uni.setStorageSync('api_token', data.data.access_token);
						uni.setStorageSync('wechat_user', data.data.wechat_user);

						if (data.error_code == 0 || data.code == '0') {
							if (uni.getStorageSync('api_token')) {
								if (!uni.getStorageSync('wechat_phone')) {
									console.log("open modal");
									setTimeout(() => {
										let {
											getphone
										} = this.$refs
										getphone.openLogin();

									}, 500);
								} else {
									this.application_status()
								}
							}
						}
					})
					.catch((err) => {})
			},
			wechatLogin() {
				// console.log("request", request);
				if (this.agree == false) {
					uni.showToast({
						title: '请先阅读并同意协议',
						icon:'none'
					})
					return;
				}
				var self = this
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						console.log("loginRes.authResult", loginRes);
						//todo use the code to request login api:mini/login
						//todo after login, try to store the api_token
						self.loginx(loginRes)
					}
				})
			},
			goTakeOrders() {
				console.log("clicked")
				uni.switchTab({
					url: '/pages/TakeOrders/TakeOrders'
				})
			},
			goUserAgreement() {
				uni.navigateTo({
					url: '/pages/UserAgreement/UserAgreement'
				});
			},
			application_status() {
				let params = {};

				request.masterStatus(params)
					.then((resp) => {

						let data = resp.data;
						if (data.code == 200 || data.code == '200') {

							this.is_master = data.is_master;
							console.log('this.is_master ', this.is_master)
							if (this.is_master == 0) {
								uni.navigateTo({
									url: '/pages/bemaster/bemaster'
								})
							}
							if (this.is_master == 1) { //已提交
								uni.navigateTo({
									url: '/pages/bemaster/bemaster'
								})
							}

							if (this.is_master == 2) {
								uni.navigateTo({
									url: '/pages/bemaster/bemaster'
								})
							}

							if (this.is_master == 3) {
								console.log('in')
								uni.navigateTo({
									url: '/pages/bemaster/sign'
								})
							}

							if (this.is_master == 4) {
								uni.reLaunch({
									url: '/pages/MasterSide/MasterSide'
								})
							}

						} else {
							this.is_master = '0';
							console.log("this.is_master 0", this.is_master);
						}
					})
					.catch((err) => {})
			},
            getStatusBarHeight() {
                var self = this;
                uni.getSystemInfo({
                    success: function(resp) {
                        self.statusBarHeight = resp.statusBarHeight;
                        self.height = (resp.safeArea.height - 44)
                        self.windowWidth = resp.windowWidth
                    },
                })
            },
		}
	}
</script>
<style scoped>
	.pos-bottom {
		position: absolute;
		bottom: 50rpx;
		left: 0;
		right: 0;
	}
	.backgroundSize {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		height: 100%;
		width: 100%;
	}

	.logoSize {
		height: 100rpx;
		width: 150rpx;
	}

	.welcomeContainer {
		padding: 230rpx 0rpx 0rpx 100rpx;
	}

	.helloText {
		color: #ffffff;
		font-size: 86rpx;
	}

	.welcomeText1,
	.welcomeText2 {
		color: #ffffff;
		font-size: 68rpx;

	}

	.buttonContainer {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		text-align: center;
	}

	.log {
		background-color: #ffffff;
		color: #333333;
		width: 650rpx;
		border-radius: 50rpx;
		font-size: 28rpx;
	}

	.cancelBtn {
		background-color: transparent;
		border: 1rpx solid white;
		color: #ffffff;
		width: 650rpx;
		border-radius: 50rpx;
		font-size: 28rpx;

	}
</style>
