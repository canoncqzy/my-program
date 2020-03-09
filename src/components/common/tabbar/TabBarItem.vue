<!-- TabBarItem -->
<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if = "!isactive">
      <slot name="img"></slot>
    </div>
    <div v-else>
      <slot name="imgactive"></slot>
    </div>
    <div :style="itemColor">
      <slot name="text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItrm",
  data() {
    return {
      // isactive: true
    };
  },

  props: {
    path: String,
    activeColor: {
      type: String,
      default: "#ff5777"
    }
  },

  components: {},

  computed: {
    isactive() {
      return this.$route.path.indexOf(this.path) !== -1
    },
    itemColor() {
      return this.isactive ? {color: this.activeColor} : {}
    }
  },

  methods: {
    itemClick() {
      // console.log(this.$route.path);
      if(this.$route.path.indexOf(this.path)){
        this.$router.replace(this.path)
      }
    }
  }
};
</script>
<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  font-size: 14px;
}

.tab-bar-item img {
  height: 24px;
  width: 24px;
  margin: 3px 0 2px 0;
}

/* .active {
  color: var(--color-high-text);
} */
</style>
