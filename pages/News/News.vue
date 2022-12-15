<template>
  <gui-page :customHeader="true" customFooter="true">
    <view slot="gHeader">
      <view style="display: flex; justify-content: center; align-items: center">
        <text
          class="pageTitle"
          style="
            font: inter;
            font-size: 36rpx;
            font-weight: 600;
            color: #333333;
          "
          >资讯</text
        >
      </view>
    </view>
    <view slot="gBody" class="newsContainer">
      <view
        class="gui-flex gui-justify-content-center gui-align-items-center"
        style="background-color: #f0f0f0;"
      >
        <gui-search  @tap="goTosearchArticle(keyword)"
          placeholder="请输入关键词搜索"
          style="
            background-color: #ffffff;
            width: 650rpx;
            padding: 8rpx;
            margin: 30rpx;
            letter-spacing: 5rpx;
            border-radius: 10rpx;
          "
        >
        </gui-search>
      </view>
      <view>
        <view class="section banner">
          <swiper @change="changeSwiper" class="swiper" :current="currentSwiper" :autoplay="bannerAutoPlay"
                  :indicator-dots="false" :interval="5000" :duration="500">
            <swiper-item v-for="(item, key) in bannerList" :key="key">
              <!-- image -->
              <view @tap="imageClick(item)" style="height:100%;" v-if="item.type == 1">
                <view class="banner-img" style="height:100%;">
                  <!-- <image style="height: 629rpx;width: 488rpx;" src="@/static/pages/homeart-border.png" mode="" /> -->
                  <image class="img-art" style="height: 100%;width: 100%;" :src="item.image"
                         mode="scaleToFill" />
                </view>
              </view>

              <view style="height:100%;" v-if="item.type == 2">
                <view class="banner-img" style="height: 100%;width: 100%;">
                  <image v-if="!item.isPlayed" @tap="imageVideoClick(item, key)" class="img-art"
                         style="height: 100%;width: 100%;" :src="item.image" mode="scaleToFill" />
                  <video v-else :object-fit="'fill'" :id="'video'+key" class="video-item"
                         :src="item.file" :autoplay="true"
                         :controls="true" :show-fullscreen-btn="false">
                  </video>
                </view>
              </view>
            </swiper-item>
          </swiper>
        </view>
       <!-- <view>
          <view
            class="gui-flex gui-justify-content-center"
            style="position: relative; margin-bottom: -22rpx; "
          >
            <image
              :src="recommend.image"
              class="imageSize"
              mode=""
              @click="showNewsList()"
            ></image>
            <view style="position: absolute; left: 50rpx; top: 300rpx">
              <text
                style="font-size: 12rpx; font-weight: 400; color: #ffffff;font-weight: bold;"
                ></text>
            </view>
          </view>
        </view>-->
        <view v-for="(item, index) in news" :key="index">
          <view class="faqContainer" style="margin-top: 25rpx;">
            <text class="FAQText">{{ item.title }}</text>
            <text class="seeMoreText" @click="goToArticleList(item.id)"
              >查看更多</text
            >
          </view>
          <view
            class="problem1Container"
            v-for="(list, ind) in item.list"
            :key="ind"
          >
            <Problem1 :data="list" />
          </view>
        </view>
      </view>
    </view>
	<view slot="gFooter">
		<c-tabbar :activeTab="1"></c-tabbar>
	</view>
  </gui-page>
</template>

<script>
import request from "@/common/request.js";
import Problem1 from "@/pages/News/Problem1.vue";
import CompanyPolicy from "@/pages/News/CompanyPolicy.vue";
import News2 from "@/pages/News/News2.vue";
export default {
  data() {
    return {
      news: [],
      bannerList: [],
      recommend: {},
      currentSwiper: 0,
      bannerAutoPlay: true,
    };
  },

  onShow: async function () {
    try {
      const response = await request.news({});
      this.news = response.data.data.list;
      this.recommend = response.data.data.recommend;
      this.bannerList = response.data.data.bannerlist;
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  },
  props: ["data"],
  methods: {
    changeSwiper(e) {
      var self = this
      this.bannerAutoPlay = true;
      if (this.bannerList[this.currentSwiper].type == 2) {
        self.bannerList[self.currentSwiper].isPlayed = false;
      }
      //this.currentSwiper = e.detail.current;
      let {current, source} = e.detail
      //只有页面自动切换，手动切换时才轮播，其他不允许
      if(source === 'autoplay' || source === 'touch'){
        this.currentSwiper = current;
      }
    },
    showNewsList: async function () {
      console.log("clicked");
    },
    goToArticleList(id) {
      uni.navigateTo({
        url: `/pages/ArticleList/ArticleList?id=${id}`,
      });
    },
	goTosearchArticle(keyword) {
		console.log(keyword)
	  uni.navigateTo({
	    url: `/pages/ArticleListTwo/ArticleListTwo?keyword=${keyword}`,
	  });
	},
  },
  components: {
    Problem1,
    CompanyPolicy,
    News2,
  },
};
</script>

<style scoped>
  .swiper {
    height: 900rpx;
  }

  .imageSize {
  width: 100%;
  height: 900rpx;
}

.faqContainer {
  padding: 25rpx;
  display: flex;
  justify-content: space-between;
  text-align: center;
  align-items: center;
}

.FAQText {
  	font-family: PingFang-SC-Bold;
  	font-size: 42rpx;
  	font-weight: normal;
  	font-stretch: normal;
  	letter-spacing: 0px;
  	color: #333333;
}

.seeMoreText {
  color: #999999;
  font-family: Inter;
  font-style: Regular;
  font-size: 28rpx;
}

.newsContainer {
  background-color: #f0f0f0;
}

.companyPolicyContainer,
.news2Container {
  background-color: #ffffff;
}

.faqContainer,
.problem1Container {
  background-color: #ffffff;
}
</style>
