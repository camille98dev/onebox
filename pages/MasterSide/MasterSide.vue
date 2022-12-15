<template>
	<gui-page :customHeader="true" :customFooter="true">
		<view slot="gHeader">
			<view style="display: flex; justify-content: center; align-items: center">
				<text
						class="pageTitle"
						style="
            font: inter;
            font-size: 36rpx;
            font-weight: 600;
            color: #333333;
          "
				>我的订单</text
				>
			</view>
		</view>
		<!--<view slot="gHeader">
			<view class="gui-flex gui-align-items-center gui-space-between gui-text">
				<view class="BackIcon"><text class="gui-grids-icon gui-icons"
						style="font-size: 40rpx; color: #333333; font-weight: 600" @click="goBack()">&#xe600;</text>
				</view>
				<text class="pageTitle" style="
            font: inter;
            font-size: 36rpx;
            font-weight: 600;
            color: #333333;
          ">我的订单</text>
				<view>
					<text></text>
				</view>
			</view>
		</view>-->
		<view slot="gBody" class="masterSideMotherContainer">
			<view class="searchAndNavigationContainer">
				<view class="gui-flex gui-justify-content-center gui-align-items-center"
					style="background-color: #ffffff">
					<gui-search placeholder="搜索订单" style="
					background-color: #f7f8fa;
					width: 650rpx;
					padding: 8rpx;
					letter-spacing: 5rpx;
					border-radius: 60rpx;"
					@confirm="confirm"
					@clear="clearSearch">
					</gui-search>
				</view>
				<!-- <Navigation :currentIndex="currentIndex" :handleGetMyOrder="handleGetMyOrder" /> -->
				<view class="gui-bg-#999999; demo-nav2">
					<gui-switch-navigation :items="[
              { id: 0, name: '全部' },
              { id: 1, name: '进行中' },
              { id: 2, name: '待审核' },
              { id: 3, name: '已完成' },
              { id: 4, name: '已拒单' },
            ]" @change="handleGetMyOrder" textAlign="center" :isCenter="true" activeDirection="center" :size="0"
						activeLineBg="linear-gradient(to right,black , black)" activeColor="black" :margin="40"
						padding="10rpx" activeLineHeight="4rpx" lineHeight="72rpx" activeLineWidth="100rpx"
						:currentIndex="currentIndex"></gui-switch-navigation>
				</view>
			</view>
			<view class="OrderContainer">
				<c-empty v-if="myorder.length <= 0" style="background:#F4F4F4;"></c-empty>

				<Order1 :myorder="myorder" :currentIndex="currentIndex" v-else/>
			</view>
		</view>
		<view slot="gFooter">
			<c-tabbar :activeTab="0"></c-tabbar>
		</view>
	</gui-page>
</template>
<script>
	import request from "@/common/request.js";
	import Navigation from "@/pages/MasterSide/Navigation.vue";
	import Order1 from "@/pages/MasterSide/Order1.vue";
	export default {
		data() {
			return {
				statusBarHeight: 0,
				currentIndex: 0,
				myorder: [],
				keyword: "",
				current_page: 1,
				next_page_url: "",
				currentTab: 0,
				isReload: true,
			};
		},
		onLoad: function(option) {
			this.currentIndex = option.menu;
			this.getStatusBarHeight();
		},
		watch: {
			currentTab: function(newValue, oldValue) {
				console.log(newValue, oldValue, "watched");
			},
		},
		onShow: async function() {
			try {
				this.myorder = [];
				if (this.currentIndex) {
					const response = await request.myorder({
						type: this.currentIndex,
						limit: 15,
						page: this.current_page,
						keyword: this.keyword,
					});
					this.myorder = response.data.data.list.data;
					this.next_page_url = response.data.data.list.next_page_url;
					this.$forceUpdate();
					console.log("onshow", this.myorder);
				}
			} catch (error) {
				console.log(error);
			}
		},
		onReachBottom: function() {
			console.log(1111111);
			console.log("inside", this.next_page_url);
			if (this.next_page_url !== null) {
				this.current_page = this.current_page + 1;
				var self = this;
				request.myorder({
						type: this.currentIndex,
						limit: 15,
						page: this.current_page,
						keyword: this.keyword,
					})
					.then((res) => {
						var tmp = res.data.data.list.data;
						for (var i = 0; i < tmp.length; i++) {
							self.myorder.push(tmp[i]);
						}
						self.next_page_url = res.data.data.list.next_page_url;
					});
			}
		},
		methods: {
			clearSearch() {
				this.keyword = "";
				this.confirm('');
			},
			goBack() {
				uni.navigateBack({
					delta: 2,
				});
			},
			handleGetMyOrder(currentTabIndex) {
				console.log(currentTabIndex);
				this.currentTab = currentTabIndex;
				this.currentIndex = currentTabIndex;
				var self = this;

				const myOrderResponse = request.myorder({
						type: currentTabIndex,
						limit: 15,
						page: 1,
						keyword: self.keyword,
					})
					.then((res) => {
						self.isReload = false;
						self.$nextTick(() => {
							self.myorder = res.data.data.list.data;
							self.next_page_url = res.data.data.list.next_page_url;
							self.isReload = true;
						});
					})
					.catch((err) => {
						console.log("err", err);
					});
			},
			confirm: async function(keyword) {
				var self = this;
				this.keyword = keyword;
				const response = await request.myorder({
					type: this.currentIndex,
					limit: 15,
					page: 1,
					keyword: this.keyword,
				});
				self.isReload = false;
				self.$nextTick(() => {
					self.myorder = response.data.data.list.data;
					self.next_page_url = response.data.data.list.next_page_url;
					self.isReload = true;
				});

				console.log(response.data.data.list.data);
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
		components: {
			Navigation,
			Order1,
		},
	};
</script>
<style scoped>
	.masterSideMotherContainer {
		background: #f5f5f5;
	}

	.searchAndNavigationContainer {
		background: #ffffff;
		position: relative;
	}

	.OrderContainer {
		margin-top: 25rpx;
	}

	.mt60 {
		margin-top: 50rpx;
	}

	.demo-nav {
		width: 750rpx;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
	}

	.demo-nav2 {
		width: 750rpx;
		padding: 15rpx 30rpx;
		box-sizing: border-box;
		padding-bottom: 0;
	}
</style>
