<template>
  <div class="cart-list">
    <div>
      <cart-list-item v-for="(item,index) in goodsList"
                      :key="index"
                      :goodInfo="item"/>
    </div>
  </div>
</template>

<script>
  import CartListItem from "./CartListItem";

  export default {
    name: "CartList",
    data() {
      return {
        goodsList: null
      }
    },
    components: {
      CartListItem
    },
    created() {
      //从vuex中获取信息
      this.goodsList = this.$store.state.cartList

    }
  }
</script>

<style scoped>

</style>
