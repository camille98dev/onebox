<template>
	<view style="color:#FFFFFF; display:flex; justify-content:center; flex-direction:column; align-items:center;">
		<view style="padding-top: 50rpx;" >
			<text class="balanceAmount">{{balance ? balance : '0.00'}}</text>
		</view>
		<view style="padding: 40rpx 0rpx 40rpx 0rpx;">
			<text class="walletBalanceText">钱包余额（元）</text>
		</view>
		<view style="padding:20rpx 230rpx 30rpx 230rpx; border-top:1rpx solid #FFFFFF;" @click="goToMyWallet()">
			<text class="withDrawalText" style="margin-right:30rpx;">提现至微信</text>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
	
		}
	},
	props: {
		balance: {
			type: String,
			default: ''
		}
	},
	methods: {
		goToMyWallet(){
			uni.navigateTo({
				url:'/pages/MyWallet/MyWallet'
			})
		}
	}
}
</script>
<style scoped>
.ucenter-line{height:100rpx; color:white; position: relative;}
.balanceAmount{
	font-family: 'Inter';
	font-style: normal;
	font-weight: 500;
	font-size: 70rpx;

}	
.walletBalanceText{
	color: #FFFFFF;
	font-family: 'Inter';
	font-style: normal;
	font-weight: 400;
	font-size: 28rpx;
	
}
.withDrawalText{
	color: #FFFFFF;
	font-family: 'Inter';
	font-style: normal;
	font-weight: 400;
	font-size: 28rpx;
}
	
</style>