<!-- Detail -->
<template>
  <div id="detail">
    <main-nav-bar class="detail-navbar"></main-nav-bar>
    <bscroll class="content" ref="scroll">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-infor :Information="information"></detail-infor>
      <shop-info :shop="shop"></shop-info>
      <detail-image-info :detailInfo = "detailInfo"></detail-image-info>
      <detail-params :detail-params="detailParams"></detail-params>
      <detail-comment-info :commentInfo="commentInfo"/>
      <goods-list :goods="recommends">
        <goods-list></goods-list>
      </goods-list>
    </bscroll>
  </div>
</template>

<script>
import MainNavBar from "./childcomps/MainNavBar";
import DetailSwiper from "./childcomps/DetailSwiper";
import DetailInfor from "./childcomps/DetailInfor";
import ShopInfo from "./childcomps/ShopInfo";
import DetailImageInfo from "./childcomps/DetailImageInfo";
import DetailParams from "./childcomps/DetailParams";
import DetailCommentInfo from "./childcomps/DetailCommentInfo";

import Bscroll from "components/common/scroll/Bscroll";
import GoodsList from "components/content/goods/GoodsList";
import GoodsListItem from "components/content/goods/GoodsListItem";

import { getDetailData, Information, GoodsParam, Shop, getRecommend } from "network/detail";
import {debounce} from "common/utils";
import {itemListenerMixin} from "common/mixin";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      information: {},
      goodsParam: {},
      shop: {},
      detailInfo: {},
      detailParams: {},
      commentInfo: {},
      recommends: [],
    };
  },
  mixins: [itemListenerMixin],
  components: {
    MainNavBar,
    DetailSwiper,
    DetailInfor,
    ShopInfo,
    Bscroll,
    DetailImageInfo,
    DetailParams,
    DetailCommentInfo,
    GoodsList,
    GoodsListItem
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
      // 取出详情页的信息
      this.detailInfo = data.detailInfo
      // 取出参数参数信息
      this.detailParams = data.itemParams
      // 取出评论信息
      if(data.rate.cRate !== 0) {
        this.commentInfo = data.rate
      }
    }).catch(err => {
        console.log("获取数据失败")
      });
    //请求推荐数据
    getRecommend().then(res => {
      const data = res.data.data.list
      this.recommends = data
      // console.log(data);
    }).catch(err => {
      console.log("获取推荐数据错误");
    })
  },
  destroyed() {
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  }
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
