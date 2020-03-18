<!-- Detail -->
<template>
  <div id="detail">
    <main-nav-bar class="detail-navbar" @titleClick="titleClick" ref="navBar"/>
    <bscroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-infor :Information="information"></detail-infor>
      <shop-info :shop="shop"></shop-info>
      <detail-image-info :detailInfo="detailInfo" @detailImageLoad="detailImageLoad"></detail-image-info>
      <detail-params :detail-params="detailParams" ref="params"/>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"/>
      <goods-list :goods="recommends" ref="recommend"/>
    </bscroll>
    <transition name="backTop">
      <back-top v-show="isShow" @click.native="backTop"/>
    </transition>
    <detail-bottom-bar class="bottom-bar" @addCart="addToCart"/>
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
  import DetailBottomBar from "./childcomps/DetailBottomBar"

  import Bscroll from "components/common/scroll/Bscroll";
  import GoodsList from "components/content/goods/GoodsList";
  import GoodsListItem from "components/content/goods/GoodsListItem";
  import BackTop from "components/content/backtop/BackTop";

  import { Toast } from 'vant';
  import {getDetailData, Information, GoodsParam, Shop, getRecommend} from "network/detail";
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
        tagTopYs: [],
        getTagTopY: null,
        currentIndex: 0,
        isShow: false
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
      GoodsListItem,
      BackTop,
      DetailBottomBar
    },
    methods: {
      detailImageLoad() {
        this.newRefresh()
        this.getTagTopY()
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.tagTopYs[index])
      },
      contentScroll(position) {
        // console.log(-position.y);
        const positionY = -position.y
        for (let i = 0; i < this.tagTopYs.length; i++) {
          if (this.currentIndex != i &&
            ((i < this.tagTopYs.length - 1 && positionY > this.tagTopYs[i] && positionY < this.tagTopYs[i + 1]) ||
              (i === this.tagTopYs.length - 1 && positionY >= this.tagTopYs[i]))) {
            this.currentIndex = i
            this.$refs.navBar.currentindex = this.currentIndex
          }
        }
        //返回顶部设置
        this.isShow = positionY >= 1500
      },
      backTop() {
        this.$refs.scroll.scrollTo(0,0)
      },
      addToCart() {
        // 1.获取商品信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.information.title
        product.desc = this.information.desc
        product.price = this.information.realPrice
        product.iid = this.iid
        //  2.将数据传入Vuex/toast弹窗
      //   this.$store.commit("addCart", product)
        this.$store.dispatch('addCart',product).then(res => {
          Toast.success(res);
        }).catch(err => {
          Toast.success(err);
        })
      }
    },
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
        if (data.rate.cRate !== 0) {
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
      // 获取标签位置
      this.getTagTopY = debounce(() => {
        this.tagTopYs = []
        this.tagTopYs.push(0)
        this.tagTopYs.push(this.$refs.params.$el.offsetTop)
        this.tagTopYs.push(this.$refs.comment.$el.offsetTop)
        this.tagTopYs.push(this.$refs.recommend.$el.offsetTop)
      }, 100)
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
    /*padding-top: 44px;*/
  }

  .detail-navbar {
    position: relative;
    z-index: 1001;
    background: #fff;
    top: 0;
    right: 0;
    left: 0;
  }

  .content {
    height: calc(100% - 50px - 49px);
    overflow: hidden;
    position: relative;
  }

  .backTop-enter,
  .backTop-leave-to {
    opacity: 0;
  }

  .backTop-enter-to,
  .backTop-leave {
    opacity: 1;
  }

  .backTop-enter-active,
  .backTop-leave-active {
    transition: all .1s;
  }

</style>
