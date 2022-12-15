<template>
  <gui-page :customHeader="true">
    <view slot="gHeader">
      <view class="gui-flex gui-align-items-center gui-space-between gui-text">
        <view class="BackIcon"
          ><text
            class="gui-grids-icon gui-icons"
            style="font-size: 40rpx; color: #333333; font-weight: 600"
            @click="goBack()"
            >&#xe600;</text
          >
        </view>
        <text
          class="pageTitle"
          style="
            font: inter;
            font-size: 36rpx;
            font-weight: 600;
            color: #333333;
          "
          >资讯详情</text
        >
        <view><text></text></view>
      </view>
    </view>
    <view slot="gBody" class="gui-flex gui-column gui-border-t">
      <view
        class="gui-flex gui-margin-top gui-align-items-center"
        style="font-size: 40rpx; margin-left: 20rpx"
      >
        <text class="firstArticle">{{ newsInfo.title }}</text>
      </view>
      <view
        style="
          padding: 50rpx 0rpx 20rpx 40rpx;
          color: #999999;
          font-size: 24rpx;
        "
      >
	  <text class="timeAndViews" style="margin-right:20rpx;">{{newsInfo.created_at}}</text>
	  <text class="timeAndViews">查看{{newsInfo.browse}}</text>
        <!-- <text class="timeAndViews" v-if="newsInfo.synopsis"></text> -->
      </view>
      <!-- <view style="margin-left: 25rpx">
		  <image :src="newsInfo.image" class="imageSize" mode=""></image>
      </view> -->
      <view
        class="imageArticleContainer"
        style="margin:25rpx 25rpx 0rpx 25rpx; font-size:30rpx color:#333333; "
      >
        <text class="imageArticleText"></text>
        <view
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
          "
          class="desc"
          v-html="newsInfo.content"
        ></view>
      </view>
      <!-- <view class="gui-margin-top" style="margin-left: 25rpx;" >
				<image src="../../static/InformationImage/Image2.png"  class="imageSize" mode="" @click="showArcticle()"></image>
			</view> -->
    </view>
  </gui-page>
</template>
<script>
import request from "@/common/request.js";
export default {
  data() {
    return {
      newsInfo: {},
      id: "",
    };
  },
  onLoad(options) {
    console.log("options", options);
    if (options && options.id) {
      this.id = options.id;
    }
  },
  onShow: async function (data) {
    if (this.id) {
      try {
        const response = await request.newsInfo({
          id: this.id,
        });
        this.newsInfo = response.data.data;
        // this.newsInfo.content = response.data.data.content.replace(
        //   "/<img/g",
        //   '<img style="width:100%;"'
        // );
        // console.log(
        //   response.data.data.content.replace(
        //     "/<img/g",
        //     '<img style="width:100%;"'
        //   ),
        //   "hi"
        // );
        console.log(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
  },
  methods: {
    goBack() {
      uni.navigateBack({
        delta: 1,
      });
    },
    showArcticle: async function () {
      console.log("clicked");
    },
  },
};
</script>

<style scoped>
.imageSize {
  width: 700rpx;
  height: 350rpx;
}
.firstArticle{
		font-family: PingFang-SC-Bold;
		font-size: 40rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0px;
		color: #333333;
}
</style>
