<template>
	<view class="pickerStyleContainer">
		<view class="pickerStyle" style="background-color:#F4F4F4; padding:25rpx; margin:15rpx; border-radius:20rpx;">
			<gui-datetime-between @confirm="confirm1" :startValue="startValue1" :endValue="endValue1" :isTime="false"
				:isMinute="false">
				<view>
					<view v-if="endValue1 === ''">
						<text style="color:#999999;">startValue1</text>
					</view>
					<view v-if="endValue1 !== ''" style="display: flex; gap: 120rpx; align-items: center">
						<view>
							<text class="gui-icons" style="margin-right: 40rpx; color:#999999;">&#xe607;</text>
							<text style="color:#999999;">
								{{startValue1}}
							</text>
						</view>
						<view>
							<text style="margin-right: 60rpx;">至</text>
							<text style="color:#999999;">{{endValue1}}</text>
						</view>
					</view>
				</view>

			</gui-datetime-between>
		</view>


	</view>
</template>
<script>
	export default {
		data() {
			return {
				startValue1: new Date().toLocaleDateString('zh-Hans-CN').toString(),
				endValue1: new Date().toLocaleDateString('zh-Hans-CN').toString(),
			};
		},
		methods: {
			confirm1: function(res) {
				console.log(res)
				this.getDate(res[0][0] + '-' + res[0][1] + '-' + res[0][2], res[1][0] + '-' + res[1][1] + '-' + res[1][
					2
				])
				this.startValue1 = res[0][0] + '-' + res[0][1] + '-' + res[0][2]
				this.endValue1 = res[1][0] + '-' + res[1][1] + '-' + res[1][2];
				this.$emit('changeTime', {
					start_date: this.startValue1,
					end_date: this.endValue1
				})
			}
		},
		props: {
			startDate: {
				type: String,
				require: true
			},
			endDate: {
				type: String,
				require: true
			}
		}
	}
</script>
<style scoped>
</style>
