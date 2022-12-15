<template>
	<view class="serviceFeeDetailsContainer">
		<view class="fileTitleContainer">
			<text class="servicetitle" style="font-weight:bold;">服务费明细</text>
		</view>
		<view class="baseWageContainer" >
			<text class="wageLabel"style="font-weight:400;">基础工价</text>
			<view>
				<text class="currency">￥</text>
				<text class="wageAmount"style="font-weight:400;" v-if="orderInfo.status_title === '已拒单'">{{orderInfo.base_wage}}</text>
				<text class="wageAmount"style="font-weight:400;" v-else>{{orderInfo.base_wage}}</text>
			</view>
		</view>
		<view class="gradeAllowanceContainer">
			<text class="allowanceLabel"style="font-weight:400;">等级补贴</text>
			<view>
				<text class="currency">￥</text>
				<text class="allowanceAmount"style="font-weight:400;" v-if="orderInfo.status_title === '已拒单'">{{orderInfo.reject_level_amount}}</text>
				<text class="allowanceAmount"style="font-weight:400;" v-else>{{orderInfo.level_amount}}</text>
			</view>
		</view>
		<view class="policySubsidyContainer">
			<text class="policyLabel"style="font-weight:400;">政策补贴</text>
			<view>
				<text class="currency">￥</text>
				<text class="policyAmount"style="font-weight:400;" v-if="orderInfo.status_title === '已拒单'">{{orderInfo.reject_policy_subsidy}}</text>
				<text class="policyAmount"style="font-weight:400;" v-else>{{orderInfo.policy_subsidy}}</text>
			</view>
		</view>
		<view class="totalAmountContainer">
			<text class="totalLabel"style="font-weight:bold;">总计</text>
			<view>
				<text class="fcurrency">￥</text>
				<text class="totalAmount"style="font-weight:400;" v-if="orderInfo.status_title === '已拒单'">{{ orderInfo.reject_total_service_pay}}</text>
				<text class="totalAmount"style="font-weight:400;" v-else>{{ orderInfo.total_service_pay}}</text>
			</view>
		</view>
	</view>
</template>
<script> 
	export default {
		data() {
			return {
			}
		},
		props: ["orderInfo"],
		methods: {
			
		}
	}
</script>
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
		font-family: PingFang-SC-Bold;
			font-size: 36rpx;
			font-weight: normal;
			letter-spacing: 0px;
			color: #6869ac;

	}
	.wageAmount{
			font-family: PingFang-SC-Bold;
			font-size: 28rpx;
			font-weight: normal;
			color: #333333;
	}
	.allowanceAmount, .policyAmount{
			font-family: PingFang-SC-Bold;
			font-size: 28rpx;
			font-weight: normal;
			color: #333333;
		
	}
	.currency{
			font-family: PingFang-SC-Bold;
			font-size: 24rpx;
			font-weight: normal;
			font-stretch: normal;
			color: #333333;
	}
	.fcurrency{
			font-family: PingFang-SC-Bold;
			font-size: 24rpx;
			font-weight: normal;
			font-stretch: normal;
			color: #6869ac;
	}
</style>