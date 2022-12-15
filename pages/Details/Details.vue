<template>
	<gui-page :customHeader="true">
		<view slot="gHeader">
			<view class="gui-flex gui-align-items-center gui-space-between gui-text">
				<view class="BackIcon"><text class="gui-grids-icon gui-icons"
						style="font-size: 40rpx; color: #333333; font-weight: 600" @click="goBack()">&#xe600;</text>
				</view>
				<text class="pageTitle" style="
		      font: inter;
		      font-size: 36rpx;
		      font-weight: 600;
		      color: #333333;
		    ">消息详情</text>
				<view><text></text></view>
			</view>
		</view>
		<view slot="gBody" :style="{
        'min-height': height + 'px',
        background: '#FFFFFF',
        position: 'relative',
      }">
			<view class="section">
				<view class="title">{{ noticeinfo.title }}</view>
				<view class="info gui-flex">
					<view class="gui-flex1" style="color: #666666; font-size: 24rpx" v-if="noticeinfo && noticeinfo.order_id>0">关联订单号：{{ noticeinfo.order_no }}
					</view>
					<view class="gui-icons" style="color: #999999; font-size: 24rpx">&#xe607; {{ noticeinfo.send_time }}
					</view>
				</view>
				<view class="content" style="white-space: pre-line;">{{noticeinfo.content}}</view>
			</view>

			<view class="footer gui-text-center gui-color-gray gui-fixed-lb gui-flex gui-justify-content-center">
				<button class="gui-flex1 footer-action-right-btn-left gui-flex gui-justify-content-center"
					@click="handleNoticeDelete(noticeinfo.id)">
					<text class="gui-button-text" style="color: #6869ac">删除</text>
				</button>
				<button class="gui-flex1 footer-action-right-btn-right gui-flex gui-justify-content-center" v-if="noticeinfo && noticeinfo.order_id > 0" @click="goOrderInfo(noticeinfo.order_id)">
					<text class="gui-button-text" style="color: #fff">进入关联订单</text>
				</button>
			</view>
		</view>
	</gui-page>
</template>
<script>
	import request from "@/common/request.js";
	export default {
		data() {
			return {
				statusBarHeight: 0,
				height: 0,
				windowWidth: 0,
				noticeinfo: {},
				id: 0,
			};
		},
		onLoad: function(options) {
			this.getStatusBarHeight();
			if (options && options.id) {
				this.id = options.id;
			}
		},
		onShow: async function() {
			try {
				const response = await request.noticeinfo({
					noticeid: this.id
				});
				this.noticeinfo = response.data.data;
				this.noticeinfo.content = response.data.data.content.replace(/\\n/g, "\n")

			} catch (error) {
				console.log(error);
			}
		},
		methods: {
			optionChange(e) {},
			goPage(name) {},
			getStatusBarHeight() {
				var self = this;
				uni.getSystemInfo({
					success: function(resp) {
						self.statusBarHeight = resp.statusBarHeight;
						self.height = resp.safeArea.height - 44;
						self.windowWidth = resp.windowWidth;
					},
				});
			},
			goBack() {
				uni.navigateBack({
					delta: 1,
				});
			},
			goOrderInfo(oid){
				uni.navigateTo({
					url: `/pages/ProductStatus/ProductStatus`,
					success(res) {
						//pass the order item
						res.eventChannel.emit("showDetail", {
							data: oid,
						});
					},
				});
			},
			handleNoticeDelete: async function(id) {
				var self = this;
				uni.showModal({
					title: "Log Out",
					content: `Are you sue you want to Log Out?？`,
					confirmText: "Yes",
					cancelText: "Cancel",
					success: async function(res) {
						if (res.confirm) {
							const response = await request.noticedel({
								orderid: id
							})
							if(response.data.code==200){
								uni.showToast({
									title:'删除成功'
								})
								setTimeout(function(){
									uni.navigateTo({
										url:'/pages/Details/Details'
									})
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
	.content {
		font-size: 28rpx;
		color: #666666;
	}

	.info {
		padding: 0rpx 25rpx;
		margin-bottom: 40rpx;
	}

	.title {
		text-align: center;
		font-size: 32rpx;
		color: #333333;
		margin-bottom: 40rpx;
	}

	.section {
		padding: 30rpx 30rpx 0rpx;
	}

	.footer-action-right-btn-right {
		background-color: #6869ac;
		border-radius: 39rpx;
		height: 78rpx;
		align-content: center;
		align-items: center;
	}

	.footer-action-right-btn-left {
		margin-right: 40rpx;
		border-radius: 39rpx;
		border: solid 1rpx #6869ac;
		height: 78rpx;
		align-content: center;
		align-items: center;
	}

	.footer {
		right: 0;
		left: 0;
		padding: 0rpx 30rpx 50rpx;
	}

	.list-item .info {
		padding-top: 20rpx;
		border-top: solid 1rpx #dbdbdb;
	}

	.list-item .content {
		margin: 20rpx 0rpx 30rpx;
		color: #333333;
		font-size: 32rpx;
		font-weight: bold;
	}

	.list-item .status {
		position: absolute;
		top: 0;
		left: 0;
		width: 81rpx;
		height: 42rpx;
		line-height: 42rpx;
		background-color: #6869ac;
		border-bottom-right-radius: 20rpx;
		color: #fff;
		font-size: 24rpx;
		text-align: center;
	}

	.list-item {
		margin-bottom: 25rpx;
		background: #fff;
		border-radius: 32rpx;
		padding: 42rpx 30rpx 20rpx;
		position: relative;
		overflow: hidden;
	}

	.list {
		padding: 30rpx 30rpx 0rpx;
	}
</style>
