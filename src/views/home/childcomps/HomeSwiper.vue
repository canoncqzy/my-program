<!-- HomeSwiper -->
<template>
  <swiper>
    <swiper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" @load="imgLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "HomeSwiper",
  data() {
    return {
      isTime: true
    };
  },
  props: {
      banners: {
          tybe: Array,
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

  methods: {
    imgLoad() {
      // console.log("---")
      if(this.isTime){
        this.$emit("swiperImgLoad")
        this.isTime = false
      }

      
    }
  }
};
</script>
<style lang='scss' scoped>
</style>