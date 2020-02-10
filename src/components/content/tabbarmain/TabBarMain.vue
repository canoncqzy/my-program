<!-- TabBarmain -->
<template>
  <tab-bar>
      <tab-bar-item path = '/home'>
        <img src="~assets/img/tabbar/home.svg" slot="img"/>
        <img src="~assets/img/tabbar/home_active.svg" slot="imgactive" />
        <div slot="text">首页</div>
      </tab-bar-item>
      <tab-bar-item path = '/category'>
        <img src="~assets/img/tabbar/category.svg" slot="img" />
        <img src="~assets/img/tabbar/category_active.svg" slot="imgactive" />
        <div slot="text">分类</div>
      </tab-bar-item>
      <tab-bar-item path = '/shopcar'>
        <img src="~assets/img/tabbar/shopcart.svg" slot="img" />
        <img src="~assets/img/tabbar/shopcart_active.svg" slot="imgactive" />
        <div slot="text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path = '/profile'>
        <img src="~assets/img/tabbar/profile.svg" slot="img" />
        <img src="~assets/img/tabbar/profile_active.svg" slot="imgactive" />
        <div slot="text">我的</div>
      </tab-bar-item>
    </tab-bar>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";

export default {
  name: 'TabBarmain',
  data () {
    return {
    };
  },

  components: {
    TabBar,
    TabBarItem,
  },

  computed: {},

  methods: {}
}

</script>
<style lang='scss' scoped>
</style>