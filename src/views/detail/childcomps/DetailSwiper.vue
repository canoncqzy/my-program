<!-- DetailSwiper -->
<template>
  <swiper class="main-swiper">
      <swiper-item v-for= "(item,index) in topImages" :key="index">
          <img :src="item" alt="">
      </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from "components/common/swiper"
export default {
  name: 'DetailSwiper',
  data () {
    return {
    };
  },

  props: {
      topImages:{
          type: Array,
          default() {
              return []
          }
      }
  },

  components: {
      Swiper,
      SwiperItem
  },

  computed: {},

  methods: {}
}

</script>
<style lang='css' scoped>
.main-swiper {
    height: 300px;
    /* overflow: hidden; */
}
</style>