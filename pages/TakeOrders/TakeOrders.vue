<template>
  <gui-page :customHeader="true" :customFooter="true">
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
          >接单</text
        >
      </view>
    </view>
    <view slot="gBody" class="takeOrdersContainer" :style="{
        'min-height': height-44 + 'px'
      }">
      <view class="searchBoxContainer">
        <view
          class="gui-flex gui-justify-content-center gui-align-items-center"
          style="background-color: #ffffff"
        >
          <gui-search
            :placeholder="'搜索订单'"
            style="background-color: #F7F8FA; width:650rpx; padding: 8rpx; margin:30rpx; 0rpx 0rpx 0rpx; border-radius:60rpx;"
            @inputting="inputtingSearch"
            @clear="clearSearch">
          </gui-search>
        </view>
      </view>
      <view class="productOrderContainer" v-if="orderlist.length>0">
        <ProductOrder
          :orderlist="orderlist"
          :rejectReasons="rejectReasons"
        />
      </view>
	  <c-empty v-if="orderlist.length <= 0"></c-empty>
    </view>
	<view slot="gFooter">
		<c-tabbar :activeTab="0"></c-tabbar>
	</view>
  </gui-page>
</template>

<script>
import request from "@/common/request.js";
import Search from "@/Components/Search.vue";
import ProductOrder from "@/pages/TakeOrders/ProductOrder.vue";
export default {
  data() {
    return {
      orderlist: [],
      getorderlist: [],
      rejectReasons: [],
      searchText:'',
      timer: undefined,
    };
  },
  provide(){   //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
    return{
      reload:this.reload,
      gotoOrderPage:this.gotoOrderPage,
    }
  },
 onLoad(){
   request.rejectReason({}).then((resp) => {
     this.rejectReasons = resp.data.data;
   });
 },
  onShow(){
    this.getList();
  },
  methods: {
    getList(){
      try {
        let params = {
          'limit':1000
        };
        request.orderlist(params).then((resp) => {
          this.orderlist = resp.data.data.list.data;
          this.getorderlist = resp.data.data.list.data;
        });
      } catch (error) {
        console.log(error);
      }
    },
    reload(){
      this.getList()
    },
    gotoOrderPage(){
      uni.reLaunch({
        //url:'/pages/MasterSide/MasterSide?menu=0'
        url:'/pages/Mine/Mine'
      })
    },
    inputtingSearch(e) {
      console.log('self.orderlist--'+this.orderlist);
      var self = this
      this.searchText = e;
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        console.log("searching");
        var res = self.orderlist.filter((val) => {
          return val.order_id.includes(this.searchText)
        })
        self.orderlist = res;
        console.log("res", res);
      }, 500)
    },
    clearSearch() {
      this.searchText = "";
      clearTimeout(this.timer);
      this.orderlist = this.getorderlist;
    },
	  getStatusBarHeight() {
	    var self = this;
	    uni.getSystemInfo({
	      success: function (resp) {
	        console.log("resp", resp);
	        self.statusBarHeight = resp.statusBarHeight;
	        self.height = (resp.safeArea.height - 44)-(self.getStatusBarHeight * 2);
	        self.windowWidth = resp.windowWidth<375?750:(resp.windowWidth*2);
	      },
	    });
	  },
  },
  components: {
    Search,
    ProductOrder,
  },
};
</script>

<style scoped>
.takeOrdersContainer {
  background-color: #f4f4f4;
  height:100vh;
}

.productOrderContainer {
  margin: 25rpx;
  border-radius: 20rpx;
  padding: 25rpx;
}

.searchBoxContainer {
  background: #ffffff;
}

.productOrderContainer2 {
  background-color: chartreuse;
}
</style>
