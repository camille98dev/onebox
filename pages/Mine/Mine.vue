<template>
  <gui-page :customHeader="true" :customFooter="true">
    <view slot="gHeader">
      <view class="gui-flex gui-align-items-center gui-text">
        <view class="location" style="margin-left: 25rpx">
         <!-- <image
            src="../../static/PinLocation.png"
            style="height: 35rpx; width: 30rpx"
          ></image>
          <text
            style="
              font-size: 36rpx;
              margin-left: 10rpx;
              color: #333333;
              font-weight: 500;
              margin-right: 200rpx;
            "
            >长沙</text
          > -->
        </view>
        <view>
          <text
            class="pageTitle"
            style="
              font: inter;
              font-size: 36rpx;
              font-weight: 600;
              color: #333333;
            "
            >我的</text
          >
        </view>
        <view><text></text></view>
      </view>
    </view>
    <view
      slot="gBody"
      :style="{
        'min-height': height + 'px',
        background: '#F4F4F4',
        position: 'relative',
        'padding-bottom': '50rpx',
      }"
    >
      <view class="top-banner">
        <view class="gui-flex top-banner-text" style="margin-top: 25rpx">
          <view class="logo">
            <image
              style="height: 100%; width: 100%; border-radius: 50%"
              :src="userCenter.avatar"
              mode=""
            />
          </view>
          <view
            style="
              color: #333333;
              font-size: 36rpx;
              margin-left: 36rpx;
              font-weight: 500;
            "
            v-if="userCenter.nickname"
            >{{ userCenter.nickname ? userCenter.nickname : "" }}</view
          >
          <view
            style="
              background-color: #6869ac;
              margin-left: 15rpx;
              font-size: 24rpx;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              border-radius: 40rpx;
              padding: 7px 10px;
              height: 16rpx;
              color: #ffffff;
            "
            v-if="userCenter.master_status === 1"
            >空闲</view
          >
          <view
            style="
              background-color: #6869ac;
              margin-left: 15rpx;
              font-size: 24rpx;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              border-radius: 40rpx;
              padding: 7px 10px;
              height: 16rpx;
              color: #ffffff;
            "
            v-if="userCenter.master_status === 2"
            >忙碌的</view
          >
        </view>
        <view
          class="gui-flex top-banner-text"
          style="margin: 100rpx 0rpx 0rpx 140rpx"
        >
          <view v-for="star in userCenter.star" :key="star">
            <image
              style="
                height: 18rpx;
                width: 20rpx;
                background: #6869ac;
                padding: 5rpx;
                border-radius: 6rpx;
                margin-left: 10rpx;
              "
              src="../../static/MineIcon/Star.png"
              mode=""
            ></image>
          </view>
          <view v-for="star in 5 - userCenter.star" :key="star">
            <image
              style="
                height: 18rpx;
                width: 20rpx;
                background: #ffffff;
                padding: 5rpx;
                border-radius: 6rpx;
                margin-left: 10rpx;
              "
              src="../../static/MineIcon/Star.png"
              mode=""
            ></image>
          </view>
          <view
            style="
              color: #6869ac;
              margin-left: 15rpx;
              font-size: 24rpx;
              font-weight: 500;
            "
            >五星师傅</view
          >
        </view>
        <image
          class="top-banner-bg"
          src="@/static/MineIcon/userbanner.jpg"
          mode=""
        />
      </view>

      <view class="gui-list" style="margin-bottom: 20rpx">
        <view class="options gui-flex">
          <view class="gui-flex1">
            <view
              style="
                font-size: 36rpx;
                color: #333333;
                margin-bottom: 10rpx;
                font-weight: 500;
              "
              >{{ userCenter.order_accept }}</view
            >
            <view style="font-weight: 400">接单量</view>
          </view>
          <view class="gui-flex1">
            <view
              style="
                font-size: 36rpx;
                color: #333333;
                margin-bottom: 10rpx;
                font-weight: 500;
              "
              >{{ userCenter.order_reject }}</view
            >
            <view style="font-weight: 400">拒单量</view>
          </view>
        </view>
      </view>

      <view class="gui-list" style="margin-bottom: 20rpx">
        <view class="gui-list-items">
          <view class="gui-list-body">
            <view class="gui-list-title">
              <text class="gui-list-title-text" style="font-weight: 600"
                >我的订单</text
              >
            </view>
          </view>
          <view
            class="gui-list-title-text gui-color-gray"
            @tap="goToMasterSide(0)"
            >全部订单</view
          >
          <text class="gui-list-arrow-right gui-icons gui-color-gray"
            >&#xe601;</text
          >
        </view>
        <view class="options gui-flex">
          <view
            @tap="goToMasterSide(1)"
            class="gui-flex1"
            style="position: relative"
          >
            <image
              style="width: 38rpx; height: 38rpx"
              src="@/static/MineIcon/Processing.png"
              mode=""
            />
            <view style="font-weight: 500">进行中</view>
            <view class="count" v-if="userCenter.order.processing">{{
              userCenter.order.processing
            }}</view>
          </view>
          <view
            @tap="goToMasterSide(2)"
            class="gui-flex1"
            style="position: relative"
          >
            <image
              style="width: 38rpx; height: 36rpx"
              src="@/static/MineIcon/Pending.png"
              mode=""
            />
            <view style="font-weight: 500">待审批</view>
            <view class="count" v-if="userCenter.order.pending">{{
              userCenter.order.pending
            }}</view>
          </view>
          <view
            @tap="goToMasterSide(3)"
            class="gui-flex1"
            style="position: relative"
          >
            <image
              style="width: 45rpx; height: 34rpx"
              src="@/static/MineIcon/Completed.png"
              mode=""
            />
            <view style="font-weight: 500">已完成</view>
            <view class="count" v-if="userCenter.order.completed">{{
              userCenter.order.completed
            }}</view>
          </view>
          <view
            @tap="goToMasterSide(4)"
            class="gui-flex1"
            style="position: relative"
          >
            <image
              style="width: 40rpx; height: 36rpx"
              src="@/static/MineIcon/Rejected.png"
              mode=""
            />
            <view style="font-weight: 500">已拒单</view>
            <view class="count" v-if="userCenter.order.rejected">{{
              userCenter.order.rejected
            }}</view>
          </view>
        </view>
      </view>

      <view class="gui-list" style="margin-bottom: 20rpx">
        <view class="gui-list-items">
          <view class="gui-list-body">
            <view class="gui-list-title">
              <text
                class="gui-list-title-text"
                style="color: #333333; font-weight: 600"
                >我的信息</text
              >
            </view>
          </view>
        </view>
        <view @tap="goMasterPurse()" class="gui-list-items">
          <view class="gui-list-body">
            <view class="gui-list-title">
              <text
                class="gui-list-title-text"
                style="color: #333333; font-size: 26rpx; font-weight: 400"
                >我的钱包</text
              >
            </view>
          </view>
          <text class="gui-list-arrow-right gui-icons gui-color-gray"
            >&#xe601;</text
          >
        </view>
        <view @tap="goProfile()" class="gui-list-items">
          <view class="gui-list-body">
            <view class="gui-list-title">
              <text
                class="gui-list-title-text"
                style="color: #333333; font-size: 26rpx; font-weight: 400"
                >个人资料</text
              >
            </view>
          </view>
          <text class="gui-list-arrow-right gui-icons gui-color-gray"
            >&#xe601;</text
          >
        </view>
        <view @tap="goLevelRule()" class="gui-list-items">
          <view class="gui-list-body">
            <view class="gui-list-title">
              <text
                class="gui-list-title-text"
                style="color: #333333; font-size: 26rpx; font-weight: 400"
                >等级规则</text
              >
            </view>
          </view>
          <text class="gui-list-arrow-right gui-icons gui-color-gray"
            >&#xe601;</text
          >
        </view>
      </view>

      <view class="gui-list">
        <view class="gui-list-items">
          <view class="gui-list-body">
            <view class="gui-list-title">
              <text
                class="gui-list-title-text"
                style="color: #333333; font-weight: 600"
                >我的权益</text
              >
            </view>
          </view>
        </view>
        <view class="gui-list-items" @tap="goCompleteService()">
          <view class="gui-list-body">
            <view class="gui-list-title">
              <text
                class="gui-list-title-text"
                style="color: #333333; font-size: 26rpx; font-weight: 400"
                >留言反馈</text
              >
            </view>
          </view>
          <text class="gui-list-arrow-right gui-icons gui-color-gray"
            >&#xe601;</text
          >
        </view>
        <view class="gui-list-items" @click="contactCustomerService">
          <view class="gui-list-body">
            <view class="gui-list-title">
              <text
                class="gui-list-title-text"
                style="color: #333333; font-size: 26rpx; font-weight: 400"
                >联系客服</text
              >
            </view>
          </view>
          <text class="gui-list-arrow-right gui-icons gui-color-gray"
            >&#xe601;</text
          >
        </view>
        <view @tap="goAboutUs()" class="gui-list-items">
          <view class="gui-list-body">
            <view class="gui-list-title">
              <text
                class="gui-list-title-text"
                style="color: #333333; font-size: 26rpx; font-weight: 400"
                >关于我们</text
              >
            </view>
          </view>
          <text class="gui-list-arrow-right gui-icons gui-color-gray"
            >&#xe601;</text
          >
        </view>
      </view>
    </view>
	<view slot="gFooter">
		<c-tabbar :activeTab="3"></c-tabbar>
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
      userCenter: {},
    };
  },
  onShow: async function () {
    try {
      const response = await request.userCenter({});
      this.userCenter = response.data.data;
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    contactCustomerService() {
      var self = this;
      // #ifdef  MP-WEIXIN
      // wx.openCustomerServiceChat
      try {
        wx.openCustomerServiceChat({
          extInfo: {
            url: this.userCenter.wechat_link,
          },
          corpId: "ww8891979388c42f49", //企业微信ID
          success(res) {},
        });
      } catch (error) {
        uni.showToast({
          title: "请更新至微信最新版本",
          icon: "none",
          duration: 1500,
        });
      }
      // #endif
    },
    goToMasterSide(id) {
      uni.switchTab({
        url: `/pages/MasterSide/MasterSide?menu=${id}`,
      });
    },
    goMasterPurse() {
      uni.navigateTo({
        url: "/pages/MasterPurse/MasterPurse",
      });
    },
    goProfile() {
      uni.navigateTo({
        url: "/pages/MasterSideProf1/MasterSideProf1",
      });
      console.log("cliked");
    },
    goLevelRule() {
      uni.navigateTo({
        url: "/pages/LevelRule/LevelRule",
      });
      console.log("cliked");
    },
    goAboutUs() {
      uni.navigateTo({
        url: "/pages/AboutUs/AboutUs",
      });
      console.log("cliked");
    },
    goCompleteService() {
      uni.navigateTo({
        url: "/pages/feedback/feedback",
      });
      // uni.navigateTo({
      //   url: "/pages/CompleteService/CompleteService",
      // });
      // console.log("cliked");
    },
  },
};
</script>
<style scoped>
.logo {
  width: 116rpx;
  height: 116rpx;
  background-color: #fff;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.top-banner-text {
  position: absolute;
  z-index: 10;
  top: 50rpx;
  left: 40rpx;
}

.boxes {
  position: absolute;
  z-index: 10;
  bottom: 10rpx;
  right: 60rpx;
}

.top-banner-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
}

.top-banner {
  height: 330rpx;
  margin-bottom: 20rpx;
  position: relative;
}

.options > view image {
  margin-bottom: 20rpx;
}

.options > view {
  text-align: center;
  font-size: 24rpx;
  color: #333333;
}

.options {
  padding: 40rpx 0rpx;
}

.banner-txt1 {
  top: 15rpx;
  left: 40rpx;
  color: #000000;
  font-size: 40rpx;
}

.banner-txt2 {
  left: 40rpx;
  bottom: 30rpx;
  border-radius: 32rpx;
  background-image: linear-gradient(0deg, #6869ac 0%, #8b8ccc 100%);
  box-shadow: 0px 5px 5px 0px rgba(104, 105, 172, 0.4);
  border-radius: 16px;
  height: 33rpx;
  font-size: 24rpx;
  color: #fff;
  width: 161rpx;
  padding: 5rpx 10rpx;
  text-align: center;
}

.banner-txt {
  position: absolute;
}

.banner {
  margin: 20rpx 20rpx;
  position: relative;
}

.banner image {
  height: 141rpx;
  width: 100%;
  border-radius: 16rpx;
}

.gui-list {
  background-color: #fff;
  margin: 0rpx 20rpx;
  border-radius: 16rpx;
}

.gui-list > view {
  border-bottom: 2rpx solid #f4f4f4;
  padding-right: 20rpx;
}

image {
  image-rendering: -webkit-optimize-contrast;
}

.count {
  background-color: #6869ac;
  color: #ffffff;
  position: absolute;
  top: -8rpx;
  right: 50rpx;
  padding: 0rpx 12rpx 0rpx 12rpx;
  font-size: 18rpx;
  border-radius: 20rpx;
}
</style>
