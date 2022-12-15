<template>
  <view>
    <view
      class="product-footer gui-border-t"
      style="padding: 30rpx; display: flex; background-color: #ffffff"
    >
      <view
        class="serviceContainer"
        style="
          display: flex;
          align-items: center;
          margin-right: 30rpx;
          text-align: center;
        "
      >
        <text class="chargeLabel">服务费：</text>
        <view>
          <text class="symbol">¥</text>
          <text class="chargeAmount">{{ servicePay }}</text>
        </view>
      </view>
      <view class="gui-flex gui-rows gui-space-between gui-align-items-center">
        <view
          class="gui-flex1 gui-footer-large-buttons gui-flex gui-rows gui-nowrap gui-justify-content-end"
        >
          <view
            class="gui-footer-large-button gui-text-center"
            style="
              border-bottom-left-radius: 50rpx;
              border-top-left-radius: 50rpx;
              background: #eeeef4;
              width:188rpx;
              height: 70rpx;
            "
            hover-class="gui-tap"
            @click="open"
          >
            <text
              class="gui-text gui-footer-large-button-text gui-block-text gui-text-center"
              style="color: #6869ac;line-height: 70rpx!important;"
              >拒绝</text
            >
          </view>
          <view
            class="gui-footer-large-button gui-text-center;"
            style="
              border-bottom-right-radius: 50rpx;
              border-top-right-radius: 50rpx;
              background-color: #6869ac;
               width:188rpx;
                height: 70rpx;
            "
            hover-class="gui-tap"
            @click="showConfirmation"
          >
            <text
              class="gui-text gui-color-white gui-footer-large-button-text gui-block-text gui-text-center" style="line-height: 70rpx!important;"
              >接单</text>
          </view>
        </view>
      </view>
      <gui-iphone-bottom></gui-iphone-bottom>
    </view>
    <view style="height: 120rpx"></view>
    <gui-popup ref="guipopup" position="bottom">
      <view class="gui-relative gui-box-shadow gui-bg-white demo-lr">
        <text class="gui-block-text demo-close gui-icons gui-color-gray"
              style="display: flex; justify-content: end" @tap.stop="close">&#xe610;</text>
        <view class="gui-flex gui-align-items-center" style="display: flex; justify-content: center">
          <text class="gui-color-black title">不接此单</text>
        </view>
        <view class="childrenContainer">
          <view class="rejectTitleContainer">
            <text class="reasonTitle">请选择拒绝原因</text>
          </view>
          <view>
            <radio-group @change="radioOnChange">
              <label v-for="(reason, index) in rejectReasons" :key="index"
                     style="display: flex; justify-content: space-between; margin-bottom: 30rpx; padding-left: 20rpx;">
                <view>{{reason}}</view>
                <view>
                  <radio :value="reason" color="#696aac" ref="radioRef"></radio>
                </view>

              </label>
              <label style="display: flex; justify-content: space-between; margin-bottom: 30rpx; padding-left: 20rpx;">
                <view>其它原因</view>
                <view>
                  <radio value="other" color="#696aac" ref="radioRef"></radio>
                </view>
              </label>

            </radio-group>
          </view>
          <view v-show="textArea">
						<textarea placeholder="若有其他原因，请在此输入" class="gui-textarea gui-bg-gray gui-border-box" style="
		            width: 690rpx;
		            height: 300rpx;
		            border-radius: 20rpx;
		            width: 690rpx;
		            height: 300rpx;
		            border-radius: 20rpx;
		            font-size: 28rpx;" @input="handleTextArea" :value="textAreaValue" />
          </view>
        </view>
        <view class="gui-flex gui-rows gui-space-between gui-align-items-center" style="margin-top: 50rpx">
          <view style="display: flex; margin-right: 400rpx">
            <view
                    class="gui-footer-large-button gui-text-center gui-flex gui-text-center gui-align-items-center gui-justify-content-center gui-text;"
                    style="
		            border-bottom-left-radius: 50rpx;
		            border-top-left-radius: 50rpx;
		            background: #eeeef4;
		            width: 350rpx;
		            height: 70rpx;
		            color: #6869ac;
		          " hover-class="gui-tap" @tap.stop="close">
              取消
            </view>
            <view
                    class="gui-footer-large-button gui-text-center gui-flex gui-text-center gui-align-items-center gui-justify-content-center gui-text;"
                    style="
		            border-bottom-right-radius: 50rpx;
		            border-top-right-radius: 50rpx;
		            background-color: #6869ac;
		            width: 350rpx;
		            height: 70rpx;
		            color: #ffffff;
		          " hover-class="gui-tap" @tap="handleSubmitReject()">
              确定
            </view>
          </view>
        </view>
      </view>
    </gui-popup>
  </view>
</template>
<script>
import request from "@/common/request.js";
export default {
  data() {
    return {
      currentRejectReason: "",
      textAreaValue: "",
      textArea: false
    };
  },
  inject:['gotoPage','gotoOrderPage'],//inject注入根组件的reload方法
  methods: {
    goToTakeOrders() {
      uni.navigateBack({
        url: "pages/takeOrders/takeOrders",
      });
    },
    showConfirmation() {
      var self = this;
      this.order_id;
      uni.showModal({
        title: "接单提示",
        content: `确认接单？`,
        confirmText: "确认",
        cancelText: "取消",
        success: async function (res) {
          if (res.confirm) {
            let params = {
              orderid: self.order_id,
            };
            request.acceptOrder(params).then((resp) => {
              let data = resp.data;
              if (data.code == 200 || data.code == '200') {
                uni.showToast({
                  title:'接单成功'
                })
                setTimeout(function(){
                  self.gotoOrderPage();
                },3000)
              }else{
                uni.showToast({
                  title:data.msg,
                  icon:'none'
                })
              }
            }).catch((err) => {})
          }
          if (res.cancel) {
            console.log("cancel");
          }
        },
      });
    },
    open: function() {
      this.$refs.guipopup.open();
    },
    close: function() {
      this.$refs.guipopup.close();
    },
    radioOnChange: function(event) {
      this.currentRejectReason = event.detail.value
      console.log(this.currentRejectReason);
      if(this.currentRejectReason == 'other'){
        this.textArea = true;
      }else{
        this.textArea = false;
      }
    },
    handleSubmitReject(){
      var reason = this.currentRejectReason;
      var _this = this;
      if(this.currentRejectReason == 'other'){
        reason = this.textAreaValue;
      }
      if(!reason){
        uni.showToast({
          title:'请输入拒单理由！',
          icon:'none'
        })
        return
      }
      let params = {
        orderid: this.order_id,
        reason: reason
      };
      request.rejectOrder(params).then((resp) => {
        let data = resp.data;
        _this.close()
        if (data.code == 200 || data.code == '200') {
          uni.showToast({
            title:'拒单成功'
          })
          setTimeout(function(){
            _this.gotoPage();
          },1500)
        }else{
          uni.showToast({
            title:data.msg,
            icon:'none'
          })
        }
      })
      .catch((err) => {})
    },
    handleTextArea: function(event) {
      console.log(event.detail.value)
      this.textAreaValue = event.detail.value
    },
  },
  props: ["servicePay", "order_id","rejectReasons"],
};
</script>
<style scoped>
.product-footer {
  position: fixed;
  z-index: 99;
  left: 0;
  bottom: 0;
  width: 750rpx;
}

.chargeLabel {
  color: #333333;
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 30rpx;
}

.symbol {
  color: #333333;
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 28rpx;
}

.chargeAmount {
  color: #333333;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 36rpx;
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
.rejectTitleContainer {
  padding: 20rpx 0rpx 40rpx 20rpx;
}

.reasonTitle {
  color: #b5b5b5;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 32rpx;
}
</style>
