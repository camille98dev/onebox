<template>
	<view class="news2Container" >
		<view class="Container">
			<text class="news2Text">新闻资讯</text>
			<text class="seeMoreText">查看更多</text>
		</view>
		<view class="gui-flex gui-border-b" style="padding: 30rpx 0rpx 30rpx 0rpx; justify-content: space-between" v-for="item in items" @click="goToInformationDetails()">
			<view style="margin-left:25rpx; width:600rpx display:flex; flex-direction:column; justify-content:space-between">
			<view style="margin-bottom: 70rpx;">
				<text class="policy">{{item.problem}}</text>
			</view>
			<view>
				<text class="views">{{item.view}}</text>
			</view>	
			</view>
			<view>
			<image src="../../static/NewsImage/NewsImage2.png" class="pictureSize" mode=""></image>
			</view>
	
		</view>	
	</view>
</template>
<script>
	export default {
		data() {
			return {
				items:[{
					problem:' 装修问题一：工程每一项都对整体装修的美观',
					view:'58分钟前  查看157895次'
				},
				{
					problem:'装修问题一：工程每一项都对',
					view:'58分钟前  查看157895次'
				}]
				
			}
		},
		methods: {
			goToInformationDetails(){
				uni.navigateTo({
					url:'/pages/InformationDetails/InformationDetails'
				})
			}	
			
		}
		
	}
</script>
<style scoped>
	.Container{
		margin-top: 40rpx;
		padding: 25rpx;
		display: flex;
		justify-content: space-between;
		text-align: center;
		align-items: center;
	}
	.news2Text{
		color: #333333;
		Font-family: Inter;
		Font-style: Regular;
		Font-size: 42rpx;
	}
	.seeMoreText{
		color: #999999;
		Font-family: Inter;
		Font-style: Regular;
		Font-size: 28rpx;		
	}
	.pictureSize{
		width: 250rpx;
		height: 185rpx;
		margin-right: 25rpx;
	}
	
	.views{
		color:#999999 ;
		Font-family: Inter;
		Font-style: Regular;
		Font-size: 24rpx;
		
		
	}
</style>