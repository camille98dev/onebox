<template>
	<gui-page :customHeader="true" :customFooter="true">
		<view slot="gHeader">
			<view class="gui-flex gui-align-items-center gui-text">
				<view class="location" style="margin-left: 25rpx">
					<!-- <image src="../../static/PinLocation.png" style="height: 35rpx; width: 30rpx"></image>
					<text style="
              font-size: 36rpx;
              margin-left: 10rpx;
              color: #333333;
              font-weight: 500;
              margin-right: 200rpx;
            ">长沙</text> -->
				</view>
				<view>
					<text class="pageTitle" style="
              font: inter;
              font-size: 36rpx;
              font-weight: 600;
              color: #333333;
            ">消息</text>
				</view>
				<view><text></text></view>
			</view>
		</view>
		<view slot="gBody" :style="{
        'min-height': height + 'px',
        background: '#F4F4F4',
        position: 'relative',
        'padding-bottom': '50rpx',
      }">
			<view class="nav" style="background: #fff">
				<gui-switch-navigation v-if="windowWidth > 0" :width="windowWidth * 2" ref="guiswitchnavigation"
					:size="(windowWidth * 2) / 3 - 40" :color="'#999999'" :fontSize="'28rpx'" :activeFontSize="'28rpx'"
					:margin="0" padding="20rpx" textAlign="center" :isCenter="false" activeDirection="center"
					lineHeight="74rpx" activeLineBg="#000000" activeColor="#333333" @change="optionChange"
					:items="[{id:0,name:`全部  (${totalOptions.total})`},{id:1,name:`已读  (${totalOptions.readtotal})`},{id:2,name:`未读  (${totalOptions.unreadtotal})`}]">
				</gui-switch-navigation>
			</view>
			<view class="section list" v-for="(notice, index) in mynotice" :key="index">
				<view class="list-item" @tap="goPage(notice.id)">
					<view class="status" style="background-color: #999999" v-if="notice.is_read === 1">已读</view>
					<view class="status" style="background-color: #6869ac" v-if="notice.is_read === 0">未读</view>
					<view class="content">{{ notice.title }}</view>
					<view class="info gui-flex">
						<view class="gui-flex1" style="color: #666666; font-size: 24rpx">
							<text v-if="notice.order_no !== '0'">
								关联订单号：{{notice.order_no}}
							</text>
						</view>
						<view class="gui-icons" style="color: #999999; font-size: 24rpx">&#xe607; {{ notice.send_time }}
						</view>
					</view>
				</view>
			</view>

				<c-empty v-if="mynotice.length <= 0"></c-empty>
		</view>
		<view slot="gFooter">
			<c-tabbar :activeTab="2"></c-tabbar>
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
				mynotice: [],
				totalOptions: {},
				next_page_url: '1',
				current_page: 1,
				type: 0
			};
		},
		onShow: async function() {
			const response = await request.mynotice({
				type: 0,
				limit: 15,
				page: 1
			});
			this.mynotice = response.data.data.data;
			this.next_page_url = response.data.data.next_page_url
			this.totalOptions = response.data.total;
		},
		onReachBottom: function() {
			console.log('inside', this.next_page_url)
			if (this.next_page_url !== null) {
				this.current_page = this.current_page + 1
				var self = this
				request.mynotice({
					type: this.type,
					limit: 15,
					page: this.current_page
				}).then((res) => {
					var tmp = res.data.data.data;
					console.log('tmp', tmp)
					for (var i = 0; i < tmp.length; i++) {
						self.mynotice.push(tmp[i])
					}

					console.log('mynotice', self.mynotice)
					self.next_page_url = res.data.data.next_page_url
				});
			}
		},
		methods: {
			async optionChange(event) {
				const response = await request.mynotice({
					type: event,
					limit: 15,
					page: 1,
				});
				this.type = event
				this.mynotice = response.data.data.data;
				this.option = response.data.total;
				this.next_page_url = '1'
				this.current_page = 1
			},
			goPage(id) {
				uni.navigateTo({
					url: `/pages/Details/Details?id=${id}`,
				});
			},
			getStatusBarHeight() {
				const self = this;
				uni.getSystemInfo({
					success: function(resp) {
						console.log("resp", resp);
						self.statusBarHeight = resp.statusBarHeight;
						self.height = resp.safeArea.height - 44 - self.statusBarHeight * 2;
						self.windowWidth = resp.windowWidth;
					},
				});
			},
		},
		onLoad() {
			this.getStatusBarHeight();
		},
	};
</script>
<style scoped>
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
		/* background-color: #6869ac; */
		border-bottom-right-radius: 20rpx;
		color: #fff;
		font-size: 24rpx;
		text-align: center;
	}

	.list-item {
		margin-bottom: 25rpx;
		background: #fff;
		border-radius: 16rpx;
		padding: 42rpx 30rpx 20rpx;
		position: relative;
		overflow: hidden;
	}

	.list {
		padding: 30rpx 30rpx 0rpx;
	}
</style>
