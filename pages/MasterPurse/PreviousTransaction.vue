<template>
  <view>
    <view
      class="transactionMonitoringContainer" v-for="(transaction, index) in purse" :key="index">
      <view class="transactionLabelContainer">
        <view class="labelContainer">
          <text class="transactionLabel">{{transaction.title}}</text>
        </view>
        <view class="transactionDateContainer">
          <text class="transactionDate">{{transaction.created_at}}</text>
        </view>
      </view>
      <view class="transactionAmountContainer">
        <text class="transactionAmount">{{transaction.number}}</text>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  props:['purse'],
  methods: {},
};
</script>
<style scoped>
.transactionMonitoringContainer {
  padding: 25rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f0f0f0;
}
.labelContainer {
  margin-bottom: 5rpx;
}
.transactionLabel {
  color: #111111;
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 30rpx;
}
.transactionDateContainer {
  color: #b5b5b5;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 28rpx;
}
.transactionAmountContainer {
  color: #111111;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 36rpx;
}
.transactionDate {
  margin-right: 15rpx;
}
</style>
