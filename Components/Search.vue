<template>
	<view class="searchBoxContainer">
		<view class="gui-margin-top search-warp gui-border-box">
			<gui-search @inputting="inputting" @confirm="confirm" style="background-color:#F7F8FA;"></gui-search>
		</view>
		
	</view>
</template>
<script>
export default {
	data() {
		return {
			
		}
	},
	methods: {
		// 监听输入
		inputting : function(e){
			console.log(e);
		},
		// 监听提交
		confirm : function (e) {
			console.log(e);
		},
		// 监听点击
		tapme:function(){
			uni.showToast({
				title:"搜索订单"
			});
		}
	}
}
</script>
<style>
.search-warp{width:750rpx; padding:15rpx 50rpx;}

</style>