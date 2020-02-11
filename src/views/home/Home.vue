<!-- Home -->
<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control :titles="['流行','精选','新款']" @tabClick="tabClick"></tab-control>
    <goods-list :goods='showGoods'></goods-list>
    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabcontrol/TabControl";
import GoodsList from "components/content/goods/GoodsList"

import HomeSwiper from "./childcomps/HomeSwiper";
import RecommendView from "./childcomps/RecommendView";
import FeatureView from "./childcomps/FeatureView";

import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: 'pop'
    };
  },

  components: {
    NavBar,
    TabControl,
    GoodsList,
    HomeSwiper,
    RecommendView,
    FeatureView
  },

  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },

  methods: {
    tabClick(index) {
      // console.log(index)
      switch(index) {
        case 0:
          this.currentType = "pop"
          break
        case 1:
          this.currentType = "new"
          break;
        case 2:
          this.currentType = "sell"
          break
      }
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
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        // console.log(res.data.data.list);
        this.goods[type].list.push(...res.data.data.list)
      });
      this.goods[type].page = page
    }
  },

  created() {
    this.getHomeMultidata(),
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  }
};
</script>
<style scoped>
#home {
  padding-top: 44px;
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

</style>