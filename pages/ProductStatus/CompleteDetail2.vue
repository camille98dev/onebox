<template>
  <view class="detail2Container">
    <view class="orderStatusContainer">
      <button class="orderStatus" @tap="open">查看评价</button>
    </view>
    <gui-popup ref="guipopup" position="bottom">
      <view class="gui-relative gui-box-shadow gui-bg-white demo-lr">
        <text
          class="gui-block-text demo-close gui-icons gui-color-gray"
          @tap.stop="close"
          >&#xe610;</text
        >
        <view
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            text-alignment: center;
          "
        >
          <text class="gui-color-black title">查看评价</text>
        </view>
        <view
          class="childrenContainer"
          v-for="(item, index) in orderInfo.order_review"
          :key="index"
        >
		<view>
		 <text class="reviewCaption">{{ item.ask}}</text>
		</view>
		  <view style="display: flex;">
			  <view v-for="star in item.score" :key="star">
			  	<image style="height: 18rpx;width: 20rpx; background: #6869ac; padding: 5rpx; border-radius: 10rpx; margin-right: 8rpx;
			  	" src="../../static/MineIcon/Star.png" mode=""></image>
			  </view>
			  <view v-for="star in 5 - item.score" :key="star">
			  	<image style="
			    height: 18rpx;
			    width: 20rpx;
			    background: #f4f4f4;
			    padding: 5rpx;
			    border-radius: 10rpx;
			  " src="../../static/MineIcon/Star.png" mode=""></image>
			  					</view>
			  <view>
			  	<text style="color: #6869AC; font-weight: 400; font-size: 28rpx; margin-left: 25rpx;">{{item.score}}.0</text>
			  </view>
		  </view>
        </view>
        <view class="buttonContainer" @click="close">
          <button class="sureButtonContainer">确定</button>
        </view>
      </view>
    </gui-popup>
  </view>
</template>
<script>
export default {
  data() {
    return {
      
    };
  },
  props: ["orderInfo"],
  methods: {
    close: function () {
      this.$refs.guipopup.close();
    },
    open: function () {
      this.$refs.guipopup.open();
    },
    change: function () {
      this.$refs.change1.change();
    },
  },
};
</script>
<style scoped>
.detail2Container {
  background: #ffffff;
  display: flex;
  justify-content: end;
  padding: 25rpx 300rpx 25rpx 0rpx;
  position: fixed;
  bottom: 0;
}
.demo-close {
  font-size: 28rpx;
  position: absolute;
  z-index: 1000;
  right: 42rpx;
  top: 50rpx;
}
.demo-lr {
  flex: 1;
  padding: 40rpx;
  border-top-left-radius: 30rpx;
  border-top-right-radius: 30rpx;
  position: relative;
}
.title {
  font-weight: 600;
  font-size: 32rpx;
}
.childrenContainer {
  margin-top: 70rpx;
  display: flex;
  justify-content: space-between;
}
.reviewCaption {
  color: #111111;
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 28rpx;
}
.sureButtonContainer {
  background: #6869ac;
  color: #ffffff;
  border-radius: 50rpx;
  margin-top: 100rpx;
  font-family: "Inter";
  font-style: normal;
  font-weight: 300;
  font-size: 30rpx;
  letter-spacing: 5rpx;
}
.orderStatusContainer {
  display: flex;
}
.orderStatus {
  background: #6869ac;
  color: #ffffff;
  width: 220rpx;
  border-radius: 50rpx;
  height: 70rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1rpx solid #6869ac;
  font-size: 28rpx;
  margin: 0rpx 25rpx 0rpx 475rpx;
  font-weight: 400;
}
</style>
