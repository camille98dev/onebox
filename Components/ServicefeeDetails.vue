<template>
	<view class="serviceFeeDetailsContainer">
		<view class="fileTitleContainer">
			<text class="servicetitle">服务费明细</text>
		</view>
		<view class="baseWageContainer">
			<text class="wageLabel"style="font-weight:400;">基础工价</text>
			<text class="wageAmount"style="font-weight:400;">￥100</text>
		</view>
		<view class="gradeAllowanceContainer">
			<text class="allowanceLabel"style="font-weight:400;">等级补贴</text>
			<text class="allowanceAmount"style="font-weight:400;">￥50</text>
		</view>
		<view class="policySubsidyContainer">
			<text class="policyLabel"style="font-weight:400;">政策补贴</text>
			<text class="policyAmount"style="font-weight:400;">￥50</text>
		</view>
		<view class="totalAmountContainer">
			<text class="totalLabel"style="font-weight:400;">总计</text>
			<text class="totalAmount"style="font-weight:400;">￥200</text>
		</view>
	</view>
</template>
<style scoped>
	.serviceFeeDetailsContainer{
		background: #FFFFFF;
		padding:25rpx;
		border-radius: 30rpx;
	}
	.servicetitle{
		Font-family: Inter;
		font-weight: 400;
		Font-size: 28rpx;
		color:#333333;
	}
	.fileTitleContainer{
		margin-bottom:30rpx;
		
	}
	.allowanceLabel, .policyLabel, .totalLabel{
		color: #333333;
		font-family: 'Inter';
		font-style: normal;
		font-weight: 400;
		font-size: 28rpx;
		color: #333333;
	}
	.gradeAllowanceContainer, .policySubsidyContainer, .baseWageContainer{
		margin-bottom:30rpx;
		font-family: 'Inter';
		font-style: normal;
		font-weight: 400;
		font-size: 30rpx;
		color: #333333;
		display:flex;
		justify-content:space-between;
		align-items:center;
		
	}
	.totalAmountContainer{
		color: #333333;
		margin-top:35rpx;
		margin-left:50rpx;
		font-family: 'Inter';
		font-style: normal;
		font-weight: 400;
		font-size: 30rpx;
		display:flex;
		justify-content:space-between;
		align-items:center;
	}
	.totalAmount{
		color: #6869AC;
		font-family: 'Inter';
		font-style: normal;
		font-weight: 400;
		font-size: 16rpx;
		margin-right:60rpx;
	}
	.wageAmount{
		color:#333333;
		font-family: 'Inter';
		font-style: normal;
		font-weight: 400;
		font-size: 16rpx;
		margin-right:60rpx;
	}
	.allowanceAmount, .policyAmount{
		color: #333333;
		font-family: 'Inter';
		font-style: normal;
		font-weight: 400;
		font-size: 16rpx;
		margin-right: 30rpx;
		
	}
</style>