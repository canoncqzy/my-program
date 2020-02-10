<!-- TabBar组件 -->
<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TabBar',
  data () {
    return {
    };
  },

  components: {},

  computed: {},

  methods: {}
}

</script>
<style scoped>
#tab-bar {
  display: flex;
  height: 49px;
  background: #f4f4f4;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 -1px 1px rgba(100,100,100,.3);
}


</style>