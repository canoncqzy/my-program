<!-- Bscroll -->
<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Bscroll from "better-scroll";
export default {
  name: "Bscroll",
  data() {
    return {
      scroll: null
    };
  },
  props: {
    probeType: {
      type: Number,
      default() {
        return 1;
      }
    },
    pullUpLoad: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  mounted() {
    this.scroll = new Bscroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    });
    this.scroll.on("scroll", position => {
      // console.log(position)
      this.$emit("scroll", position);
    });
    this.scroll.on("pullingUp", () => {
      // console.log("上拉")
      this.$emit("pullingUp");
    });
  },

  components: {},

  computed: {},

  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    //   console.log("aaa")
    },
    refresh() {
        this.scroll.refresh()
        // console.log("-----")
    }
  }
};
</script>
<style lang='scss' scoped>
</style>