<template>
	<gui-page :customHeader="true">
		<view slot="gHeader">
			<view class="gui-flex gui-align-items-center gui-space-between gui-text">
				<view class="BackIcon"><text class="gui-grids-icon gui-icons"
						style="font-size: 40rpx; color: #333333; font-weight: 600" @click="goBack()">&#xe600;</text>
				</view>
				<text class="pageTitle" style="
            font: inter;
            font-size: 36rpx;
            font-weight: 600;
            color: #333333;
          ">{{ catname }}</text>
				<view><text></text></view>
			</view>
		</view>
		<view slot="gBody">
			<view
			  class="gui-flex gui-justify-content-center gui-align-items-center"
			  style="background-color: #f0f0f0"
			>
			  <gui-search 
			    placeholder="请输入关键词搜索"
			    style="
			      background-color: #ffffff;
			      width: 650rpx;
			      padding: 8rpx;
			      margin: 30rpx;
			      letter-spacing: 5rpx;
			      border-radius: 10rpx;
			    " @confirm="confirm"
			  >
			  </gui-search>
			</view>
			<view class="articleListContainer" v-for="(searches, index) in search" :key="index"
				style="display:flex; justify-content:space-between;" v-if="this.search">
				<view class="articleContainer">
					<view style="
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            ">
						<text class="articleText"
							style="font-size: 30rpx; color: #333333; font-weight: 500">{{ searches.title }}</text>
						<view class="timeAndViewsContainer" style="font-size: 24rpx; color: #999999; font-weight: 400">
							<text class="dateTime" style="margin-right: 25rpx">{{ searches.created_at }}
							</text>
							<text class="views">浏览量：{{ searches.browse }}</text>
						</view>
					</view>
				</view>
				<view class="articleImgContainer">
					<image :src="searches.image" class="imageSize"></image>
				</view>
			</view>
			<view style="background-color:#f0f0f0;">
				<gui-empty v-if="!this.search">
					<view slot="img" style="height: 100vh;text-align: center;">
						<image class="gui-empty-img" src="../../static/empty.png" mode=""></image>
						
						<text slot="text" class="gui-text-small gui-block-text gui-text-center gui-margin-top"
							style="color:#9DABFF;">暂无数据 ......</text>
					</view>
				</gui-empty>
				
			</view>
		</view>
	</gui-page>
</template>

<script>
	import request from "@/common/request.js";
	export default {
		data() {
			return {
				search: [],
				keyword:"",
				// searchText:'',
				// timer:undefined,
				// id: "",
				// catname: "",
				// next_page_url: '1',
				// current_page: 1
			};
		},
		onLoad(options) {
			console.log("options", options);
			if (options && options.keyword) {
				this.keyword = options.keyword;
			}
		},
		onShow: async function() {
			if (this.keyword) {
			try {
				const response = await request.search({ keyword:this.keyword, limit:15
				});
				this.search = response.data.data.data;
				console.log(response.data.data.data)
				// this.catname = response.data.data.catname;
				// this.next_page_url = response.data.data.list.next_page_url
				// console.log('next',this.next_page_url)
			} catch (error) {
				console.log(error);
			}
							
			}
				
		},
		onReachBottom: function() {
			console.log('inside',this.next_page_url )
			if (this.next_page_url !== null) {
				this.current_page = this.current_page + 1
				var self = this
				request.search({
					cid: this.id,
					page: this.current_page
				}).then((res) => {
					var tmp = res.data.data.list.data;
					for (var i = 0; i < tmp.length; i++) {
						self.newslist.push(tmp[i])
					}
					self.next_page_url = res.data.data.list.next_page_url
				});

			}
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 2,
				});
			},
			showArticle(id) {
				console.log('clicked')
				uni.navigateTo({
					url: `/pages/InformationDetails/InformationDetails?id=${id}`,
				});
			},
			confirm: async function(keyword){
				this.keyword = keyword;
				const response = await request.search({
					keyword:this.keyword,
					limit: 15,
				});
				this.keyword= response.data.data.data
				console.log(response.data.data.data, "good day")
				
			},
			// inputting(e){
			// 	var self=this
			// 	this.searchText=e;
			// 	clearTimeout(this.timer)
			// 	this.timer=setTimeout(()=>{
			// 		console.log("searching");
			// 		var res = this.search.filter((val)=>{
			// 			console.log(val, "i am here")
			// 			console.log(this.searchText, "hello")
			// 			return val.title.includes(this.searchText)
						
			// 		})
			// 		this.search=res;
			// 		console.log("res", res);
					
			// 	}, 500)
			// }
			
		},
		
	};
</script>

<style scoped>
	.articleListContainer {
		margin: 30rpx;
		border-bottom: 1rpx solid #ececec;
	}

	.articleContainer {
		display: flex;
		padding-bottom: 50rpx;
	}

	.imageSize {
		height: 220rpx;
		width: 300rpx;
		border-radius: 20rpx;
	}
</style>
