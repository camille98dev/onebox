<template>
	<gui-page :customHeader="true">
		<view slot="gHeader">
		<view style="display: flex; justify-content:center; align-items:center;">
			<text class="pageTitle" style="font: inter; font-size:36rpx; font-weight:600; color:#333333;">壹盒饰家</text>
		</view>		
		</view>
		<view slot="gBody" :style="{ 'min-height': (height - 44)+'px',background: '#FFFFFF', padding: '30rpx 30rpx 0rpx'}">

            <view style="color: #0e0e0e;text-align:center;margin-top:150rpx;position: relative;">
                <image class="fix-sign" style="height: 211rpx;width: 470rpx;" src="@/static/signature.png" mode="" />
                迈入壹盒 你就是涂装艺术家
            </view>

            <view style="color: #333333;text-align:center;margin-top:200rpx;">你的申请已通过，请尽快签署协议~</view>
            <view class="footer gui-text-center gui-fixed-lb gui-color-gray gui-flex gui-justify-content-center" style="margin:60rpx 0rpx 0rpx;">
                <button
                    class="gui-flex1 footer-action-right-btn-right gui-flex gui-justify-content-center">
                    <text class=" gui-button-text" style="color:#fff">联系客服</text>
                </button>
            </view>

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
            formData: {
                name: '',
                defaultAddress: false,
            },
		}
	},
	onShow: async function () {
	    try {
	      const orders = await request.masterStatus();
	      this.masterStatus =Response.data;
			console.log(Response.data)
	    } catch (error) {
	      console.log(error);
	    }
	 },
	methods: {
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
