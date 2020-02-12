<!-- RecommendView -->
<template>
  <div class="recommend">
    <div class="recommend-item" v-for="(item,index) in recommends" :key="index">
      <a :href="item.linnk">
        <img :src="item.image" alt />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  data() {
    return {};
  },
  props: {
    recommends: {
      tybe: Array,
      default() {
        return [];
      }
    }
  },

  components: {},

  computed: {},

  methods: {}
};
</script>
<style lang='css' scoped>
.recommend {
    display: flex;
    text-align: center;
    padding: 8px 0 15px 0;
    border-bottom: 10px solid #eee;
    height: 100%; 
}
.recommend-item {
    flex: 1;
    font-size: 13px;
}
.recommend-item img{
    height: 70px;
    width: 70px;
    margin-bottom: 10px; 
}
</style>