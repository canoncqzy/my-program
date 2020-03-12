<!-- Home -->
<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行','精选','新款']"
      @tabClick="tabClick"
      ref="tabControll1"
      class="tab-control"
      v-show="isTabControl"
    ></tab-control>
    <bscroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImgLoad="imgLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','精选','新款']" @tabClick="tabClick" ref="tabControll2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </bscroll>
    <back-top @click.native="Backtop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import Bscroll from "components/common/scroll/Bscroll";
  import TabControl from "components/content/tabcontrol/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import BackTop from "components/content/backtop/BackTop";

  import HomeSwiper from "./childcomps/HomeSwiper";
  import RecommendView from "./childcomps/RecommendView";
  import FeatureView from "./childcomps/FeatureView";

  import {getHomeMultidata, getHomeGoods} from "network/home";
  import {debounce} from "common/utils";
  import {itemListenerMixin} from "common/mixin";

  export default {
    name: "Home",
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          pop: {page: 0, list: []},
          new: {page: 0, list: []},
          sell: {page: 0, list: []}
        },
        currentType: "pop",
        isShowBackTop: false,
        taboffsetTop: 608,
        isTabControl: false,
        saveY: 0,
      };
    },
    mixins: [itemListenerMixin],

    components: {
      NavBar,
      Bscroll,
      TabControl,
      GoodsList,
      BackTop,
      HomeSwiper,
      RecommendView,
      FeatureView
    },

    computed: {
      showGoods() {
        return this.goods[this.currentType].list;
      }
    },

    methods: {
      tabClick(index) {
        // console.log(index)
        switch (index) {
          case 0:
            this.currentType = "pop";
            break;
          case 1:
            this.currentType = "new";
            break;
          case 2:
            this.currentType = "sell";
            break;
        }
        this.$refs.tabControll2.isActive = index
        this.$refs.tabControll1.isActive = index
      },
      Backtop() {
        this.$refs.scroll.scrollTo(0, 0);
      },
      contentScroll(position) {
        // console.log(position)
        //判断topback
        this.isShowBackTop = -position.y > 1000;
        //控制tabcontrol
        this.isTabControl = -position.y > this.taboffsetTop;
      },
      loadMore() {
        this.getHomeGoods(this.currentType);
        this.$refs.scroll.finishPullUp();
        // this.$refs.scroll.scroll.refresh()
      },
      imgLoad() {
        // console.log(this.$refs.tabControll2.$el.offsetTop)
        this.taboffsetTop = this.$refs.tabControll2.$el.offsetTop;
      },

      /**
       * 进行网络请求
       **/

      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
          // console.log(res.data.banner.list)
        });
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          // console.log(res.data.data.list);
          this.goods[type].list.push(...res.data.data.list);
        });
        this.goods[type].page = page;
        // this.$refs.scroll.finishPullUp()
      }
    },

    created() {
      this.getHomeMultidata();
      this.getHomeGoods("pop");
      this.getHomeGoods("new");
      this.getHomeGoods("sell");
    },
    mounted() {
      // const refresh = debounce(this.$refs.scroll.refresh, 100);
      // //对监听的事件进行保存
      // this.itemImgListener = () => {
      //   refresh();
      // }
      // this.$bus.$on("ItemImgLoad", this.itemImgListener);
    },
    activated() {
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0, this.saveY, 0)

    },
    deactivated() {
      //保留Y值
      this.saveY = this.$refs.scroll.scroll.y
      console.log(this.saveY);
      // 取消全局事件监听
      this.$bus.$off('ItemImgLoad', this.itemImgListener)
    },
  };
</script>
<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background: var(--color-tint);
    color: white;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 999;
  }

  .content {
    height: calc(100% - 44px);
    overflow: hidden;
  }

  .tab-control {
    position: relative;
    z-index: 9;
    background: white;
  }
</style>
