<template>
	<gui-page :customHeader="true">
		<view slot="gHeader">
		<view class="gui-flex gui-align-items-center gui-space-between gui-text">
			<view class="BackIcon" ><text class="gui-grids-icon gui-icons" style="font-size: 40rpx; color:#333333; font-weight:600;" @click="goBack()">&#xe600;</text></view>
			<text class="pageTitle" style="font: inter; font-size:36rpx; font-weight:600; color:#333333; margin-right:300rpx;"> {{levelRule.title}} </text>
		</view>	
		</view>
		<view slot="gBody" class="userAgreementContainer">
			<view slot="gBody" class="userAgreementContainer">
				<view style="padding: 0 1.5% 0 1.5%;">
				<view v-html="levelRule.content"></view>
				</view>
				
			</view>
		</view>
	</gui-page>
</template>
<script>
	import request from "@/common/request.js"
	export default {
		data() {
			return {
				levelRule:{},
				
			}
		},
	onShow: async function () {
      try {
        const response = await request.levelRule();
        this.levelRule = response.data.data;
		this.levelRule.content=response.data.data.content.replace(/<img/g, "<img style=\"max-width:100%;\"");
		console.log(response.data.data)
      } catch (error) {
        console.log(error);
      }
  },
		methods: {
			goBack() {
			  uni.navigateBack({
			    delta: 1,
			  });
			},
		}
	}
</script>

<style>

</style>
