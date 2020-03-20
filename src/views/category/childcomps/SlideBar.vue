<template>
  <div class="slide-bar">
    <Bscroll class="content">
      <div v-for="(item, index) in slideList"
           :key="index"
           class="slide-bar-item"
           :class="{active: isActive == index}"
           @click="shiftActive(item, index)"
      >
        {{item.title}}
      </div>
    </Bscroll>
  </div>
</template>

<script>
  import Bscroll from "components/common/scroll/Bscroll";

  export default {
    name: "SlideBar",
    data() {
      return {
        isActive: 0
      }
    },
    props: {
      slideList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      Bscroll
    },
    methods: {
      shiftActive(item, index) {
        const obj = {
          maitKey: item.maitKey,
          index
        }
        this.isActive = index
        this.$emit('slideBarItemClick', obj)
      }
    }
  }
</script>

<style scoped>
  .slide-bar {
    width: 100px;
    height: 100%;
    background-color: #f6f6f6
  }

  .content {
    height: 100%;
  }

  .slide-bar-item {
    font-size: 14px;
    line-height: 45px;
    width: 100px;
    height: 45px;
    user-select: none;
    text-align: center;
    color: #666666;
    border: 0;
  }

  .active {
    font-weight: 700;
    color: #ff5777;
    border-left: 3px solid #ff5777;
    background-color: #ffffff;
  }
</style>
