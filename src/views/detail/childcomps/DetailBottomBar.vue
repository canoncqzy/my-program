<template>
  <div>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" @click="onClickIcon" />
      <van-goods-action-icon icon="cart-o" text="购物车" @click="onClickIcon" />
      <van-goods-action-icon icon="shop-o" text="店铺" info="12" @click="onClickIcon" />
      <van-goods-action-button type="warning" text="加入购物车" @click="addToCart" />
      <van-goods-action-button type="danger" text="立即购买" @click="onClickButton" />
    </van-goods-action>
  </div>
</template>

<script>
  import { Toast } from 'vant';
  export default {
    name: "DetailBottomBar",
    methods: {
      onClickIcon() {
        Toast('点击图标');
      },
      onClickButton() {
        this.$router.replace('/shopcar')
      },
      addToCart() {
        // console.log("添加到购物车 ");
        this.$emit('addCart')
      }
    }
  }
</script>

<style scoped>

</style>
