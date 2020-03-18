<!-- TabControl -->
<template>
  <div class="tab-control">
    <div class="tab-control-item" v-for="(item,index) in titles" :key="index" :class="{active: isActive == index}" @click="itemclick(index)">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  data() {
    return {
        isActive: 0
    };
  },
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  },

  components: {},

  computed: {},

  methods: {
      itemclick(index){
          this.isActive = index;
          // console.log(index)
          this.$emit('tabClick',index)
      }
  }
};
</script>
<style lang='css' scoped>
.tab-control {
  display: flex;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.tab-control-item {
  flex: 1;
}
.active {
    color: var(--color-high-text);
}
.active span {
    border-bottom: 2px solid var(--color-high-text);
    padding: 0 5px 3px;
}
</style>
