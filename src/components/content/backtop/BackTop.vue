<!-- BackTop -->
<template>
  <div class="top">
      <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'BackTop',
  data () {
    return {
    };
  },

  components: {},

  computed: {},

  methods: {}
}

</script>
<style lang='css' scoped>
.top {
    position: fixed;
    bottom: 50px;
    right: 15px;
    /* z-index: 999; */
}
.top img {
    height: 43px;
    width: 43px;
}
</style>