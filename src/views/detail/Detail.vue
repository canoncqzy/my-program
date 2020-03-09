<!-- Detail -->
<template>
  <div id="detail">
    <main-nav-bar class="detail-navbar"></main-nav-bar>
    <bscroll class="content">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-infor :Information="information"></detail-infor>
      <shop-info :shop="shop"></shop-info>
    </bscroll>
  </div>
</template>

<script>
import MainNavBar from "./childcomps/MainNavBar";
import DetailSwiper from "./childcomps/DetailSwiper";
import DetailInfor from "./childcomps/DetailInfor";
import ShopInfo from "./childcomps/ShopInfo";

import Bscroll from "components/common/scroll/Bscroll";

import { getDetailData, Information, GoodsParam, Shop } from "network/detail";
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      information: {},
      goodsParam: {},
      shop: {}
    };
  },
  components: {
    MainNavBar,
    DetailSwiper,
    DetailInfor,
    ShopInfo,
    Bscroll
  },

  computed: {},

  created() {
    this.iid = this.$route.params.iid;
    getDetailData(this.iid).then(res => {
      // console.log(res);
      const data = res.data.result;
      this.topImages = data.itemInfo.topImages;
      this.information = new Information(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      )
      // this.goodsParam = new GoodsParam(data.itemInfo, data.columns, data.shopInfo.services)
      this.shop = new Shop(data.shopInfo);
    }).catch(err => {
        console.log("获取数据失败")
      });;
  },

  methods: {}
};
</script>
<style lang='css' scoped>
#detail {
  position: relative;
  z-index: 1000;
  background: #fff;
  height: 100vh;
}
.detail-navbar {
  position: relative;
  z-index: 1001;
  background: #fff;
}
.content {
   height: calc(100% - 44px);
   overflow: hidden;
}
</style>
