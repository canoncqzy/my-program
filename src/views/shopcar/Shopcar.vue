<!-- Shopcar -->
<template>
  <div id="cart">
    <!--导航-->
    <nav-bar class="nav-bar">
      <div slot="center">购物车（{{cartListLength}}）</div>
    </nav-bar>
    <!--商品列表-->
    <bscroll class="content" ref="scroll">
      <CartList/>
    </bscroll>
    <!--底部汇总-->
    <cart-bottom-bar/>
  </div>
</template>
<script>
  import NavBar from "components/common/navbar/NavBar";
  import Bscroll from "components/common/scroll/Bscroll";

  import CartList from "./childcoomps/CartList";
  import CartBottomBar from "./childcoomps/CartBottomBar";

  export default {
    name: 'Shopcar',
    data() {
      return {};
    },
    components: {
      NavBar,
      CartList,
      Bscroll,
      CartBottomBar
    },
    computed: {
      cartListLength() {
        return this.$store.state.cartList.length
      }
    },
    methods: {},
    activated() {
      this.$refs.scroll.refresh()
    }
  }

</script>
<style scoped>
  #cart {
    height: 100vh;
  }

  .nav-bar {
    background: var(--color-tint);
    color: #fff;
  }

  .content {
    height: calc(100% - 49px - 44px - 50px);
    overflow: hidden;
  }
</style>
