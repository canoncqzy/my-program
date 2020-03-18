<template>
  <van-submit-bar
    :price="totalPrice"
    button-text="提交订单"
    @submit="onSubmit"
    class="bottom-bar"
  >
    <van-checkbox v-model="checkedAll"
                  :disabled="this.$store.state.cartList == 0"
    >全选
    </van-checkbox>
  </van-submit-bar>
</template>

<script>
  export default {
    name: "CartBottomBar",
    data() {
      return {
        selectStatus: this.checkedAll
      }
    },
    computed: {
      totalPrice() {
        return this.$store.state.cartList
          .filter(item => {
            return item.checked
          })
          .reduce((preValue, item) => {
            return preValue + (item.price * item.count * 100)
          }, 0)
      },
      //  全选状态
      checkedAll:{
        get() {
          if (this.$store.state.cartList == 0) return false
          return !(this.$store.state.cartList.find(item => !item.checked))
          // return !(this.$store.state.cartList.filter(item => !item.checked).length)
        },
        set(val) {
          // console.log(val);
          this.$store.state.cartList.forEach(item => item.checked = val)
        }
      }
    },
    methods: {
      onSubmit() {

      }
    },

  }
</script>

<style scoped>
  .bottom-bar {
    position: relative;
  }
</style>
