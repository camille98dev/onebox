<template>
	<view class="c-custom-tabbar gui-flex gui-rows gui-align-items-center">
		<view class="item-tab gui-flex1 gui-flex gui-rows gui-align-items-center gui-justify-content-center"
			v-for="(item, key) in tabs" @tap="clickTab(item)" :key="key">
			<view>
				<view class="gui-flex gui-rows gui-justify-content-center">
					<image v-if="activeTab == key" :style="item.style"
						:src="`/static/TaBarImage/${item.selectedIconPath}`"></image>
					<image v-else :style="item.style" :src="`/static/TaBarImage/${item.iconPath}`"></image>
				</view>
				<text :style="{
                    color: activeTab == key ? '#6869ac' : '#b0b0b0'
                }" style="font-size: 20rpx;color:#b0b0b0">
					{{item.text}}
				</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "c-custom-tabbar",
		props: {
			activeTab: 0,
		},
		data() {
			return {
				tabs: [{
						"name": "index",
						"pagePath": "/pages/MasterSide/MasterSide",
						"iconPath": "ordersBW.png",
						"selectedIconPath": "orders.png",
						"style": "height:30rpx;width: 27rpx;",
						"text": "订单"
					},
					{
						"name": "world",
						"pagePath": "/pages/News/News",
						"iconPath": "newsBW.png",
						"selectedIconPath": "news.png",
						"style": "height:29rpx;width: 36rpx;",
						"text": "资讯"
					},
					{
						"name": "information",
						"pagePath": "/pages/Information/Information",
						"iconPath": "informationBW.png",
						"selectedIconPath": "information.png",
						"style": "height:30rpx;width: 30rpx;",
						"text": "消息"
					},
					{
						"name": "mine",
						"pagePath": "/pages/Mine/Mine",
						"iconPath": "mineBW.png",
						"selectedIconPath": "mine.png",
						"style": "height:30rpx;width: 29rpx;",
						"text": "我的"
					}
				]
			};
		},
		methods: {
			clickTab(e) {
				//   this.$emit('click-tab', e)
				console.log('e', e)
				uni.switchTab({
					url:e.pagePath
				})
				// uni.switchTab({
				// 	url: `./../switchPages/${e.name}`
				// })
			}
		},
		mounted() {

		},
	};
</script>

<style scoped>
	.item-tab {
		height: 100%;
	}

	.c-custom-tabbar {
		height: 100rpx;
	}

	image {
		image-rendering: -webkit-optimize-contrast;
	}
</style>
