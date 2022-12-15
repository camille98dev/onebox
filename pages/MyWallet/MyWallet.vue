<template>
	<gui-page :customHeader="true">
		<view slot="gHeader">
			<view class="gui-flex gui-align-items-center gui-space-between gui-text">
				<view class="BackIcon"><text class="gui-grids-icon gui-icons"
						style="font-size: 40rpx; color:#333333; font-weight:600;" @click="goBack()">&#xe600;</text>
				</view>
				<text class="pageTitle"
					style="font: inter; font-size:36rpx; font-weight:600; color:#333333;">我的钱包</text>
				<view><text></text></view>
			</view>
		</view>
		<view slot="gBody" class="myWalleteMotherContainer">
			<view class="withdrawData">
				<withdraw />
			</view>
			<view class="withdrawalInformation">
				<withdrawalInformation :balance="balance" :handleSubmitBalance="handleSubmitBalance" />
			</view>
			<view class="button" style="background-color: #FFFFFF;padding-top:25rpx;">
				<button
					style="background-color:#6869ac; color: #F4F4F4; width: 700rpx; height:75rpx; display:flex; align-items:center; justify-content:center; border-radius:50rpx;"
					@click="handleWithdraw()">提交</button>

			</view>
		</view>

	</gui-page>
</template>

<script>
	import request from "@/common/request.js"
	import withdraw from "@/pages/MyWallet/withdraw.vue"
	import withdrawalInformation from "@/pages/MyWallet/withdrawalInformation.vue"
	export default {
		data() {
			return {
				balance: '',
				submitBalance: 0
			}
		},
		onLoad() {
			var self = this
			uni.$on('changeTheMondy', (e) => {
				console.log('e', e)
				self.submitBalance = e.money
			});
		},
		onShow: async function() {
			try {
				const response = await request.balance();
				this.balance = response.data;
				console.log(response.data)
			} catch (error) {
				console.log(error);
			}
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			handleSubmitBalance: function(balance) {
				console.log('balance', balance)
				self = this
				this.$nextTick(() => {
					self.submitBalance = balance
				})
			},
			handleWithdraw: async function() {
				console.log(this.submitBalance, "I am here")
				const response = await request.withdraw({
					price: this.submitBalance
				})
				console.log(response, "clicked")
				if (response.data.code == 200) {
					uni.showToast({
						title: '申请成功'
					})
					setTimeout(function() {
						uni.navigateBack({
							delta: 1
						})
					}, 3000)
				}
			}

		},
		components: {
			withdraw,
			withdrawalInformation
		}
	}
</script>

<style scoped>
	.myWalleteMotherContainer {
		background: #F4F4F4;
	}

	.withdrawData {
		padding-bottom: 50rpx;
	}

	.withdrawalInformation {
		background-color: #FFFFFF;
		;
	}
</style>
