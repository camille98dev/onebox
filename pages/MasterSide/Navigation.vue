<template>
  <view>
    <view class="gui-bg-#999999; demo-nav2">
      <gui-switch-navigation
        :items="[
          { id: 0, name: '全部' },
          { id: 1, name: '进行中' },
          { id: 2, name: '待审核' },
          { id: 3, name: '已完成' },
          { id: 4, name: '已拒单' },
        ]"
        @change="handleGetMyOrder"
        textAlign="center"
        :isCenter="true"
        activeDirection="center"
        :size="0"
        activeLineBg="linear-gradient(to right,black , black)"
        activeColor="black"
        :margin="40"
        padding="10rpx"
        activeLineHeight="4rpx"
        lineHeight="72rpx"
        activeLineWidth="100rpx"
        :currentIndex="currentIndex"
      ></gui-switch-navigation>
    </view>
  </view>
</template>
<script>
var graceJS = require("@/GraceUI5/js/grace.js");
export default {
  data() {
    return {
      navItems: [],
    };
  },
  props: ["currentIndex", "handleGetMyOrder"],
  methods: {
    goToStatus() {
      uni.navigateTo({
        url: `/pages/ProductStatus/ProductStatus?status=${id}`,
      });
    },
  },
  onLoad: function () {
  },
};
</script>
<style>
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
