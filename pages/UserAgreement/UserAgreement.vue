<template>
	<gui-page :customHeader="true">
		<view slot="gHeader">
			<view class="gui-flex gui-align-items-center gui-space-between gui-text">
				<view class="BackIcon"><text class="gui-grids-icon gui-icons"
						style="font-size: 40rpx; color:#333333; font-weight:600;" @click="goBack()">&#xe600;</text>
				</view>
				<text class="pageTitle"
					style="font: inter; font-size:36rpx; font-weight:600; color:#333333; margin-right:300rpx;">
					{{title}} </text>
			</view>
		</view>
		<view slot="gBody" class="userAgreementContainer">
			<view>
				<view class="desc" v-html="content"></view>
			</view>

		</view>
	</gui-page>
</template>

<script>
	import request from "@/common/request.js"
	export default {
		data() {
			return {
				title: '',
				content: '',
			}
		},
		async created() {
			const response = await request.userAgreement({})
			this.title = response.data.data.title;
			this.content = response.data.data.content;
			console.log(response.data.data.content)
			console.log(response.data.data.title)
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style>
	.desc {
		width: 96%;
		margin-left: 2%;
	}
</style>
