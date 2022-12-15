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
          >我的钱包</text
        >
        <view><text></text></view>
      </view>
    </view>
    <view slot="gBody" style="position: relative; padding: 15rpx">
     <!-- <image
        src="../../static/MyWallet.png"
        mode="widthFix"
        class="imageStyle"
      ></image>-->

      <view>
        <view class="PurseBalanceContainer" style="position: relative;">
          <image src="/static/MyWallet.png" class="bgimage"></image>
          <PurseBalance :balance="balance" />
        </view>
        <view
          class="transactionsContainer"
          style="margin-top: 25rpx; border-top: 30rpx solid #f7f8fa"
        >
          <Transaction @changeindex="getCurrentIndex()" />
        </view>
        <view class="timePickerContainer">

          <view
            class="pickerStyle"
            style="
              background-color: #f4f4f4;
              padding: 25rpx;
              margin: 15rpx;
              border-radius: 20rpx;
            "
          >
            <gui-datetime-between
              @confirm="changetime()"
              :startValue="startValue1"
              :endValue="endValue1"
              :isTime="false"
              :isMinute="false"
            >
              <view>
                <view v-if="endValue1 === ''">
                  <text style="color: #999999">startValue1</text>
                </view>
                <view
                  v-if="endValue1 !== ''"
                  style="display: flex; gap: 120rpx; align-items: center"
                >
                  <view>
                    <text
                      class="gui-icons"
                      style="margin-right: 40rpx; color: #999999"
                      >&#xe607;</text
                    >
                    <text style="color: #999999">
                      {{ startDate }}
                    </text>
                  </view>
                  <view>
                    <text style="margin-right: 60rpx">至</text>
                    <text style="color: #999999">{{ endDate }}</text>
                  </view>
                </view>
              </view>
            </gui-datetime-between>
          </view>
        </view>
        <view class="previousTransactionContainer">
          <PreviousTransaction :purse="purse.data" />
        </view>
      </view>
    </view>
  </gui-page>
</template>

<script>
import request from "@/common/request.js";
import PurseBalance from "@/pages/MasterPurse/PurseBalance.vue";
import Transaction from "@/pages/MasterPurse/Transaction.vue";
import TimePicker from "@/pages/MasterPurse/TimePicker.vue";
import PreviousTransaction from "@/pages/MasterPurse/PreviousTransaction.vue";
var graceJS = require("@/GraceUI5/js/grace.js");

export default {
  data() {
    return {
      purse: [],
      balance: "",
      options: {},
      currentIndex: 0,
      startDate: "",
      endDate: "",
    };
  },
  onLoad() {
    // var self = this
    // uni.$on('changeTime', (e) => {
    // 	console.log('e', e)
    // 	self.$nextTick(() => {
    // 		self.startDate = e.start_date
    // 		self.endDate = e.endDate
    // 	})
    // })
  },
  onShow: async function (data) {
    console.log(
      "now",
      graceJS.toDate(graceJS.now() - 30 * 3600 * 24 * 1000, "str")
    );
    var start_date = graceJS.toDate(
      graceJS.now() - 30 * 3600 * 24 * 1000,
      "str"
    );
    start_date = start_date.split(" ");
    start_date = start_date[0];
    console.log("start_date", start_date);

    var end_date = graceJS.toDate(graceJS.now(), "str");
    end_date = end_date.split(" ");
    end_date = end_date[0];

    var self = this;
    this.$nextTick(() => {
      self.startDate = start_date;
      self.endDate = end_date;
    });

    if (this.options) {
      try {
        const response = await request.purse({
          type: 0,
          limit: 15,
          datestart: start_date,
          dateend: end_date,
        });
        this.purse = response.data.data;
        this.balance = response.data.balance;
      } catch (error) {
        console.log(error);
      }
    }
  },
  methods: {
    goBack() {
      uni.navigateBack({
        delta: 2,
      });
    },
    getCurrentIndex(index) {
      this.currentIndex = index ? index : 0;
      var self = this;
      const response = request
        .purse({
          type: index,
          limit: 15,
          datestart: this.startDate,
          dateend: this.endDate,
        })
        .then((res) => {
          self.purse = res.data.data;
        })
        .catch((err) => {
          console.lop("err", err);
        });
    },
    changetime(e) {
      console.log("e2", e);
      this.startDate = e[0][0] + "-" + e[0][1] + "-" + e[0][2];
      this.endDate = e[1][0] + "-" + e[1][1] + "-" + e[1][2];
      this.getDate(this.startDate, this.endDate);
    },
    getDate: async function (dateStart, dateEnd) {
      console.log(dateStart, dateEnd);
      this.$nextTick(() => {
        this.startDate = dateStart;
        this.endDate = dateEnd;
      });

      const response = await request.purse({
        type: this.currentIndex,
        limit: 15,
        datestart: dateStart,
        dateend: dateEnd,
      });
      this.purse = response.data.data;
    },
  },
  components: {
    Transaction,
    TimePicker,
    PreviousTransaction,
    PurseBalance,
  },
};
</script>

<style scoped>
  .bgimage {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
  }
  .PurseBalanceContainer{
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin: 0 20rpx;
  }
.gBody {
  display: flex;
  justify-content: center;
  position: relative;
}

.imageStyle {
  width: 95%;
  margin: 15rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
