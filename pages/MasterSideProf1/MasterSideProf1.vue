<template>
	<gui-page :customHeader="true">
		<view slot="gHeader">
			<view class="gui-flex gui-align-items-center gui-space-between gui-text">
				<view class="BackIcon" ><text class="gui-grids-icon gui-icons" style="font-size: 40rpx; color:#333333; font-weight:600;" @click="goBack()">&#xe600;</text></view>
				<text class="pageTitle" style="font: inter; font-size:36rpx; font-weight:600; color:#333333;">个人资料</text>
				<view><text></text></view>
			</view>
		</view>
		<view  slot="gBody" class="profileContainer">
			<view class="profileInformationContainer">
			<view class="nameContainer">
				<text class="nameLabel">姓名</text>
				<text class="yourName" v-if="myInfo.nickname"></text>
			</view>
			<view class="phoneNumberContainer">
				<text class="numberLabel">手机号</text>
				<text class="yourNumber">{{myInfo.mobile}}</text>
			</view>
			<view class="genderContainer">
				<text class="genderLabel">性别</text>
				<text class="yourGender" v-if="myInfo.gender === 0">男</text>
				<text class="yourGender" v-if ="myInfo.gender=== 1">女</text>
			</view>
			<view class="areaContainer">
				<text class="areaLabel">所在地区</text>
				<text class="yourArea">{{myInfo.address}}</text>
			</view>	
			</view>
			<view class="administratorContact">
				<text class="bottomCaption">若要修改个人信息，请联系管理员</text>
				
			</view>
			
		</view>
	</gui-page>
</template>

<script>
	import request from "@/common/request.js"
	export default {
		data() {
			return {
				myInfo:{},
			}
		},
onShow: async function () {
		    try {
		      const response = await request.myInfo();
		      this.myInfo = response.data.data;
				console.log(response.data.data, "I am here")
		    } catch (error) {
		      console.log(error);
		    }
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta:2
				})
			}
		}
	}
</script>

<style scoped>
	.profileContainer{
	background: #F7F8FA;
	height: 100vh;
}
.profileInformationContainer{
	background: #FFFFFF;
	padding: 0rpx 30rpx 0rpx 30rpx ;
	border-top: 1rpx solid #F4F4F4;
	
}
.nameContainer, .phoneNumberContainer, .genderContainer{
	display: flex;
	margin: 40rpx 0rpx 0rpx 0rpx;
	justify-content: space-between;
	border-bottom: 1rpx solid #F4F4F4;
	padding-bottom: 40rpx;
}
.areaContainer{
	display: flex;
	margin: 40rpx 0rpx 0rpx 0rpx;
	justify-content: space-between;
	padding-bottom: 40rpx;
}
.nameLabel, .numberLabel, .genderLabel, .areaLabel{
	color: #666666;
	font-family: 'Inter';
	font-style: normal;
	font-weight: 400;
	font-size: 28rpx;
}
.yourName, .yourNumber, .yourGender, .yourArea{
	color: #333333;
	font-family: 'Inter';
	font-style: normal;
	font-weight: 400;
	font-size: 28rpx;
	
}
.administratorContact{
	margin: 30rpx;
}
.bottomCaption{
color: #999999;
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 26rpx;
}
</style>
