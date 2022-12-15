<template>
	<view class="gui-padding">
		<view class="withdrawalInformation">
			<text class="gui-h6">提现金额</text>
		</view>
		<view class="gui-form-item">
			<text class="gui-form-label">¥</text>
			<view class="gui-form-body" @tap="showKeyboard">
				<input type="text" class="gui-form-input" :disabled="true" 
				v-model="numberVal"/>
		
			</view>
		</view>
		<view class="maintainingBalance">
			<text class="maintainingText">当前零钱余额{{balance.data}}元,</text>
			<text style="margin-left: 10rpx; font-size:26rpx; color:#6869AC;" @tap="showBalance">全部提现</text>
		</view>
		
		<gui-number-keyboard ref="guink" 
		@keyboardDone="keyboardDone" 
		@keyboardInput="keyboardInput" 
		@keyboardDelete="keyboardDelete"></gui-number-keyboard>
		
	</view>
</template>
<script>
export default {
	data() {
		return {
			numberVal  : '',
			currentBalance: 2,
	
		}
	},
	onLoad:function(){
		// 模拟默认值来自api请求
		setTimeout(()=>{
			// 将数值字符串化，以便进行后续的键盘操作
			this.numberVal2 = 1000+'';
		}, 1000);
	},
	props: ["balance", "handleSubmitBalance"],
	methods: {
		showKeyboard : function () {
			this.$refs.guink.open();
		},
		keyboardInput : function(e){
			this.numberVal = this.numberVal + '' + e;
		},
		keyboardDelete : function(){
			this.numberVal = this.numberVal.substring(0, this.numberVal.length - 1);
		},
		keyboardDone : function(){
			this.handleSubmitBalance(this.numberVal) 
			this.$refs.guink.close();
			uni.$emit('changeTheMondy',{money:this.numberVal})
		}, 
		showBalance: function() {
			this.numberVal = this.balance.data
		},
		
	}
}
</script>
<style scoped>
	.gui-form-label{
		color: #111111;
		font-family: 'Inter';
		font-style: normal;
		font-weight: 500;
		font-size:90rpx;
		
	}
	.gui-h6{
		color: #111111;
		ont-family: 'Inter';
		font-style: normal;
		font-weight: 500;
		font-size: 30rpx;
		
	}
	.withdrawalInformation{
		padding: 45rpx 0rpx 45rpx 0rpx;
	}
	.maintainingBalance{
		margin-top: 80rpx;
		
	}
	.maintainingText{
		color: #B5B5B5;
		font-family: 'Inter';
		font-style: normal;
		font-weight: 400;
		font-size: 26rpx;
	}
	a{
		color: #6869AC;
		text-decoration: none;
		
	}
	.gui-form-input{
		font-size: 50rpx;
		font-weight: 400;
	}
</style>