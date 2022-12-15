<template>
  <view>
    <view
      class="orderContainer"
      v-for="(item, index) in myorder"
      :key="index"
      @click="toReview(item.id)"
    >
      <view>
        <view class="orderAndStatusContainer">
          <view class="orderNumberContainer">
            <text class="orderText">订单号：</text>
            <text class="orderNumber">{{ item.order_id }}</text>
          </view>
          <view class="orderStatus">
            <text class="status">{{ item.status_title }}</text>
          </view>
        </view>
        <view
          style="display: flex; margin-top: 30rpx"
          v-for="(product, ind) in item.cart_info"
          :key="ind"
        >
          <view style="margin-right: 15rpx">
            <image :src="product.productInfo.image" class="imageSize"></image>
          </view>
          <view class="productInformation" style="width: 100%">
            <view class="productDescriptionContainer">
              <text class="description">{{
                product.productInfo.product_name
              }}</text>
            </view>
            <view class="numberofBoxes" style="align-items: center">
              <view>
                <text class="boxes" v-if="product.productInfo.attrInfo">
                  {{product.productInfo.attrInfo.specname.substr(0,product.productInfo.attrInfo.specname.length-1)}}
                </text>
              </view>
              <view>
                <text class="additional">X{{ product.cart_num }}</text>
              </view>
            </view>
          </view>
        </view>
        <view class="moreDetailsContainer">
          <view class="timeServiceContainer">
            <view class="serviceContainer">
              <text class="serviceTimeText">服务时间：</text>
              <text class="exactDate" v-if="item.apointment_time">{{ item.apointment_time }}</text>
            </view>
            <view class="timeLimitContainer">
              <text class="limitText">规定时间：</text>
              <text class="timelimit">{{ item.service_set_time }}天</text>
            </view>
          </view>

          <view class="customeradress" style="margin: 25rpx 0rpx 25rpx 0rpx">
            <view
              ><text>客户地址：</text>
              <text class="gui-text">{{ item.user_address }}{{item.addr_detail}}</text>
            </view>
            <view>
              <image src="../../static/PinLocation.png" class="pinSize"></image>
            </view>
          </view>
          <view class="baseWage">
            <text
              class="baseWageText"
              style="
                font-family: PingFang-SC-Medium;
                font-size: 24rpx;
                font-weight: normal;
                font-stretch: normal;
                color: #333333;
              "
              >基础工价</text
            >
            <text
              class="baseWageAmount"
              style="
                font-family: Inter;
                font-style: Regular;
                font-size: 28rpx;
				font-weight:400;
                color: #333333;
              " v-if="item.status_title === '已拒单'">¥{{ item.reject_base_wage }}</text>
            <text
              class="baseWageAmount"
              style="
                font-family: Inter;
                font-style: Regular;
                font-size: 28rpx;
				font-weight:400;
                color: #333333;
              " v-else>¥{{ item.base_wage }}</text>
          </view>
          <view class="gradeAllowance">
            <text class="gradeAllowanceText" style="
                font-family: PingFang-SC-Medium;
                font-size: 24rpx;
                font-weight: normal;
                font-stretch: normal;
                color: #333333;
              ">等级补贴</text>
            <text
              class="gradeAllowanceAmount"
              style="
                font-family: Inter;
                font-style: Regular;
                font-size: 28rpx;
                font-weight:400;
                color: #333333;
              "
              v-if="item.status_title === '已拒单'">¥{{ item.reject_level_amount }}</text>
            <text
              class="gradeAllowanceAmount"
              style="
                font-family: Inter;
                font-style: Regular;
                font-size: 28rpx;
                font-weight:400;
                color: #333333;
              "
              v-else>¥{{ item.level_amount }}</text>
          </view>
          <view class="policySubsidy">
            <text class="subsidyText" style="
                font-family: PingFang-SC-Medium;
                font-size: 24rpx;
                font-weight: normal;
                font-stretch: normal;
                color: #333333;
              ">政策补贴</text>
            <text
              class="subsidyAmount"
              style="
                font-family: Inter;
                font-style: Regular;
                font-size: 28rpx;
                font-weight:400;
                color: #333333;
              "
              v-if="item.status_title === '已拒单'">¥{{ item.reject_policy_subsidy }}</text>
            <text
              class="subsidyAmount"
              style="
                font-family: Inter;
                font-style: Regular;
                font-size: 28rpx;
                font-weight:400;
                color: #333333;
              "
               v-else>¥{{ item.policy_subsidy }}</text>
          </view>
          <view
            class="totalContainer"
            style="display: flex; justify-content: space-between"
          >
            <text class="totalText">总计</text>
            <view style="margin-right: rpx">
              <text class="currency">¥</text>
              <text class="totalAmount" v-if="item.status_title === '已拒单'">{{ item.reject_total_service_pay }}</text>
              <text class="totalAmount" v-else>{{ item.total_service_pay }}</text>
<!--              <text class="currency">.00</text>-->
            </view>
          </view>
        </view>
        <view class="optionsButtonContainer" v-if="item.status_title === '进行中'">
          <view>
            <button class="contact" @tap.stop.prevent="contact(item.user_phone)">联系客户</button>
          </view>
          <view>
            <button class="service" @tap.stop.prevent="goCompleteService(item.id)">完成服务</button>
          </view>
        </view>

        <view
          class="productStatusContainer"
          v-if="item.status_title === '待审核'"
          @click="toReview(item.id)"
        >
          <text class="statusUpdate">订单正在审核中，请耐心等候</text>
        </view>
        <view class="productStatusContainer" v-if="item.status_title === '待评价'">
          <text class="statusUpdate">客户暂未评价</text>
        </view>
        <view class="reviewContainer">
          <view v-if="item.status_title === '已完成'">
            <button class="reviews" @tap.stop.prevent="openReview(item)">
              查看评价
            </button>
          </view>
        </view>
      </view>
    </view>

    <gui-popup ref="guipopup" position="bottom">
      <view class="gui-relative gui-box-shadow gui-bg-white demo-lr">
        <text class="gui-block-text demo-close gui-icons gui-color-gray" @tap.stop="close">&#xe610;</text>
        <view style="display: flex;justify-content: center;align-items: center;text-alignment: center;">
          <text class="gui-color-black title">查看评价</text>
        </view>
        <view class="childrenContainer" v-for="(rev, index) in order_review" :key="index">
          <view>
            <text class="reviewCaption">{{ rev.ask}}</text>
          </view>
          <view style="display: flex;">
            <view v-for="star in rev.score" :key="star">
              <image style="height: 18rpx;width: 20rpx; background: #6869ac; padding: 5rpx; border-radius: 10rpx; margin-right: 8rpx;
			  	" src="@/static/MineIcon/Star.png" mode=""></image>
            </view>
            <view v-for="star in 5 - rev.score" :key="star">
              <image style="
			    height: 18rpx;
			    width: 20rpx;
			    background: #f4f4f4;
			    padding: 5rpx;
			    border-radius: 10rpx;
			  " src="@/static/MineIcon/Star.png" mode=""></image>
            </view>
            <view>
              <text style="color: #6869AC; font-weight: 400; font-size: 28rpx; margin-left: 25rpx;">{{rev.score}}.0</text>
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
      order_review:[]
    };
  },
  props: ["myorder","currentIndex"],
  methods: {
    pickerChange: function (e) {
      console.log(e);
      this.adressIndex = e.detail.value;
      this.formData.name4 = this.adress[this.adressIndex];
    },
    close: function () {
      this.$refs.guipopup.close();
    },
    openReview(item) {
      this.order_review = item.order_review;
      this.$refs.guipopup.open();
    },
    toReview(item) {
    var self = this;
      uni.navigateTo({
        url: `/pages/ProductStatus/ProductStatus`,
        success(res) {
          //pass the order item
          res.eventChannel.emit("showDetail", {
            data: item,
            currentIndex:self.currentIndex,
          });
        },
      });
    },
    toRejected() {
      uni.navigateTo({
        url: "/pages/ProductStatus/ProductStatus",
      });
    },
    contact(val) {
      var self = this;
      uni.makePhoneCall({
        // 手机号
        phoneNumber: val,
        // 成功回调
        success: (res) => {
        },
        // 失败回调
        fail: (res) => {
        }
      });
    },
    goCompleteService(id) {
      uni.navigateTo({
        url: `/pages/CompleteService/CompleteService?orderId=${id}`,
      })
    }
	// splitstring(str) {
	// 	console.log(str.split(";"), "dsa")
	// 	if(str) {
	// 		return str.split(";")
	// 	}
	// 	return `${str.split(";")}`
	// }
  },
};
</script>

<style scoped>
.orderContainer {
  background: #ffffff;
  border-radius: 15rpx;
  margin: 15rpx;
}

.orderAndStatusContainer {
  display: flex;
  justify-content: space-between;
  padding: 25rpx;
  border-bottom: 1px solid #eaeaea;
}

.orderNumberContainer {
  color: #333333;
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 30rpx;
}

.orderStatus {
  font-family: PingFang-SC-Bold;
  font-size: 28rpx;
  font-weight: normal;
  color: #6869ac;
}

.imageSize {
  width: 200rpx;
  height: 160rpx;
  margin-left: 25rpx;
}

.productContainer {
  display: flex;
}

.productInformation {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.description {
  color: #333333;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 28rpx;
}

.numberofBoxes {
  display: flex;
  justify-content: space-between;
  padding-bottom: 40rpx;
  margin-right: 25rpx;
}

.boxes {
  color: #666666;
  background: #f7f8fa;
  padding: 10rpx 30rpx 10rpx 30rpx;
  border-radius: 40rpx;
  font-family: PingFang-SC-Medium;
  font-size: 22rpx;
  font-weight: normal;
  font-stretch: normal;
}

.additional {
  color: #999999;
  font-weight: 400;
  font-size: 24rpx;
  font-family: PingFang-SC-Medium;
  font-weight: normal;
  font-stretch: normal;
}

.pinSize {
  width: 22rpx;
  height: 28rpx;
}

.moreDetailsContainer {
  margin: 30rpx;
  font-family: PingFang-SC-Medium;
  font-size: 24rpx;
  font-weight: normal;
  font-stretch: normal;
  color: #333333;
}

.timeServiceContainer {
  display: flex;
  justify-content: space-between;
  font-family: PingFang-SC-Medium;
  font-size: 24rpx;
  font-weight: normal;
  font-stretch: normal;
  color: #333333;
}

.customeradress {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: PingFang-SC-Medium;
  font-size: 24rpx;
  font-weight: normal;
  font-stretch: normal;
  color: #333333;
}

.baseWage,
.gradeAllowance,
.policySubsidy {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30rpx;
  font-family: PingFang-SC-Bold;
  font-size: 28rpx;
  font-weight: normal;
  color: #333333;
}

.totalContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.totalText {
  	font-family: PingFang-SC-Bold;
  	font-size: 32rpx;
  	font-weight: normal;
  	color: #333333;
  margin-left: 20rpx;
}

.totalAmount {
  font-family: PingFang-SC-Bold;
  	font-size: 36rpx;
  	font-weight: normal;
  	color: #6869ac;
}

.optionsButtonContainer {
  border-top: 1px solid #eaeaea;
  display: flex;
  justify-content: flex-end;
  padding: 15rpx;
}

.contact {
  color: #6869ac;
  font-size: 28rpx;
  width: 180rpx;
  height: 60rpx;
  margin-right: 25rpx;
  border-radius: 50rpx;
  border: 1px solid #6869ac;
  display: flex;
  justify-content: center;
  align-items: center;
}

.service {
  background: #6869ac;
  color: #ffffff;
  font-size: 28rpx;
  width: 180rpx;
  height: 60rpx;
  border-radius: 50rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

.productStatusContainer {
  color: #333333;
  display: flex;
  justify-content: center;
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
}

.reviews {
  background: #6869ac;
  color: #ffffff;
  font-size: 28rpx;
  width: 180rpx;
  height: 60rpx;
  border-radius: 50rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15rpx 50rpx 15rpx 50rpx;
}

.statusUpdate {
  color: #333333;
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 28rpx;
  display: flex;
}

.productStatusContainer {
  padding: 25rpx;
  border-top: 1px solid #eaeaea;
}

.reviewContainer {
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #eaeaea;
}

.currency {
  	font-family: PingFang-SC-Bold;
  	font-size: 28rpx;
  	font-weight: normal;
  	font-stretch: normal;
  	color: #6869ac;
}

.gradeAllowanceAmount {
  font-family: Inter;
  font-style: Regular;
  font-size: 24rpx;
  color: #333333;
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
.demo-lr .title {
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
</style>
