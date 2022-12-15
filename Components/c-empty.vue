<template>
    <view  :style="{ 'min-height': (height)+'px',background: '#F4F4F4', padding: '30rpx 30rpx 680rpx'}">
        <view class="c-empty">
          <image style="height: 351rpx;width: 351rpx;" src="@/static/empty.png" mode="" />
        </view>
        <text
                slot="text"
                class="gui-text-small gui-block-text gui-text-center gui-margin-top"
                style="color: #9dabff"
        >暂无数据 ......</text>
<!--        <view v-if="isText" style="text-align:center;color:#e3e4e3;font-size:28rpx;"></view>-->
    </view>
  </template>
  
  <script>
  
  export default {
    name: "c-empty",
    props: {
      isText: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {};
    },
    methods: {
		getStatusBarHeight() {
			var self = this;
			uni.getSystemInfo({
				success: function(resp) {
					console.log("resp", resp);
					self.statusBarHeight = resp.statusBarHeight;
					self.height = (resp.safeArea.height)
					self.windowWidth = resp.windowWidth
				},
			})
		},
	},
    mounted() {},
  };
  </script>
  
  <style lang="less">
    .c-empty {
        padding-top: 200rpx;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    image {
        image-rendering: -webkit-optimize-contrast;
    }
  </style>
  