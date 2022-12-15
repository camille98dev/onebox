<template>
	<gui-page :customHeader="false">
		<view slot="gHeader">
			<c-header :back="true" :showLoc="false" :title="'留言反馈'"></c-header>
		</view>
		<view slot="gBody" :style="{ 'min-height': height+'px',background: '#fff', position: 'relative'}">
        
			<view class="gui-list" style="margin-bottom:20rpx;border-bottom: 1rpx solid #f4f4f4;">
				<view class="gui-list-items">
					<view class="gui-list-body">
						<view class="gui-list-title">
							<text class="gui-list-title-text" style="color: #333333;">留言类型</text>
						</view>
					</view>
                    <view @tap="openPicker" class="gui-flex gui-align-items-center" style="width:250rpx;justify-content: flex-end;margin-right: 20rpx;">
                        <view @tap="openPicker" style="color: #b5b5b5;font-size:28rpx">{{feedbackObj.type ? feedbackObj.type : '请选择类型'}}</view>
                        <text @tap="openPicker" class="gui-list-arrow-right gui-icons gui-color-gray">&#xe601;</text>
                    </view>
				</view>
			</view>

            <view style="padding: 0rpx 20rpx 20rpx;border-bottom: 1rpx solid #f4f4f4;">
                <view style="margin-bottom:30rpx;">
                    <text class="gui-list-title-text" style="color: #666666;">留言内容</text>
                </view>
                <textarea 
                    auto-height
                    style="min-height:180rpx;width: 100%;background: #fff;"
                    :placeholderStyle="'color:#b5b5b5;'"
                    class="gui-textarea" 
                    maxlength="-1"
                    v-model="feedbackObj.content" 
                    placeholder="请输入留言内容" />

                    <gui-upload-images
						v-if="reloaded"
						:imgMode="'widthFix'"
						@change="handleChange"
						:btnName="' '">
					</gui-upload-images>

            </view>
            
            <view class="footer gui-text-center gui-color-gray gui-fixed-lb gui-flex gui-justify-content-center">
                <button
                    @click="feedback()"
                    class="gui-flex1 footer-action-right-btn-right gui-flex gui-justify-content-center">
                    <text class=" gui-button-text" style="color:#fff">提交反馈</text>
                </button>
            </view>

            <lb-picker ref="picker1" :list="list" @confirm="confirm"></lb-picker>
		</view>
	</gui-page>
</template>
<script>
import request from '@/common/request';

const Authorization = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvb25lYm94Lmdyb3dpbmdzYWxlLmNuXC9hcGlcL3dlY2hhdFwvbWluaVwvbG9naW4iLCJpYXQiOjE2NjA3Mzc4MjUsIm5iZiI6MTY2MDczNzgyNSwianRpIjoiWnBDODVTZHpzdjFEa1BLUCIsInN1YiI6MSwicHJ2IjoiNDI1MTRkODBlZTM4NWRhODRjYTM4YWY0NTgyZThmNTRiYjRjZmIzOSJ9.9BWkmoIx9hWVGAay9G3I4MvLY9KSxX1H1Szs-wU62Jo'
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
				type: '',
				content: '',
				files: []
			},
			imgArr: [],
			finalUploadedImg: []
		}
	},
	onLoad() {
		this.getStatusBarHeight()
	},
	onShow() {
		this.feedbacktype();
	},
	methods: {
		handleChange(e) {
			this.imgArr = e;
			console.log("this.imgArr", this.imgArr);
		},
		uploadImage(image) {
			console.log("image", image);
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
				files: [
					{name:1,uri:image}
				],
				success: (res) => {
					console.log("success", res);
					var parsedData = JSON.parse(res.data);
					console.log("parsedData", parsedData);
					this.finalUploadedImg.push(parsedData.url);
				},
				fail: (err) => {
                    uni.hideLoading();
				},
			};

			uni.uploadFile(options)
		},
		feedback() {

			if (!this.feedbackObj.type) {
				uni.showToast({
					title: '请选择类型',
					icon: "none",
				});
				return
			}

			if (!this.feedbackObj.content) {
				uni.showToast({
					title: '请输入留言内容',
					icon: "none",
				});
				return
			}
			var self = this;
			this.finalUploadedImg = [];
			uni.showLoading({
				title: '',
				mask: true
			});

			if (this.imgArr.length > 0) {
				const getPostsSync = async () => {
					this.imgArr.forEach((val) => {
						this.uploadImage(val.url)
					})
				};
				getPostsSync();

				setTimeout(() => {
					console.log("this.finalUploadedImg", this.finalUploadedImg);
					let params = {
						type: this.feedbackObj.type,
						message: this.feedbackObj.content,
						img: this.finalUploadedImg
					};
					console.log("params", params);


					request.feedback(params)
						.then((resp) => {
							uni.showToast({
								title: '成功',
								icon: "none",
							});
                    		uni.hideLoading();
							let data = resp.data;
							this.reloaded = false;
							setTimeout(() => {
								this.reloaded = true;
							}, 50);


							if (data.code == 200 || data.code == '200') {
								this.finalUploadedImg = [];
								this.feedbackObj.type = '';
								this.feedbackObj.content = '';
								setTimeout(() => {
									uni.navigateBack({
										delta:1
									})
								}, 1000);
							}
						})
						.catch((err) => {
                    		uni.hideLoading();
						})
				}, 1500);
			} else {
				console.log("no images uploaded");
				console.log("this.finalUploadedImg", this.finalUploadedImg);
				let params = {
					type: this.feedbackObj.type,
					message: this.feedbackObj.content,
					img: ""
				};
				console.log("params", params);

				request.feedback(params)
					.then((resp) => {
                        uni.showToast({
                            title: '成功',
                            icon: "none",
                        });
						uni.hideLoading();
						let data = resp.data;
						this.reloaded = false;
						setTimeout(() => {
							this.reloaded = true;
						}, 50);
						if (data.code == 200 || data.code == '200') {
							this.finalUploadedImg = [];
							this.feedbackObj.type = '';
							this.feedbackObj.content = '';

							setTimeout(() => {
								uni.navigateBack({
									delta:1
								})
							}, 1000);
						}
					})
					.catch((err) => {
						uni.hideLoading();
					})
			}
		},
		feedbacktype() {
			var self = this;
			let params = {};

			request.feedbackType(params)
				.then((resp) => {
					let data = resp.data;
					if (data.code == 200 || data.code == '200') {
						this.list = data.data
					}
				})
				.catch((err) => {})
		},
        confirm(e) {
            console.log("e", e);
			this.feedbackObj.type = e.value
        },
        openPicker() {
            this.$refs.picker1.show()
        },
		goPage(name) {

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
