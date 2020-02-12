<!-- Detail -->
<template>
  <div>
    <main-nav-bar></main-nav-bar>
    <div>{{iid}}</div>
  </div>
</template>

<script>
import MainNavBar from "./childcomps/MainNavBar";

import {getDetailData} from "network/detail"
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: []
    };
  },
  created() {
    this.iid = this.$route.params.iid;
    getDetailData(this.iid).then(res => {
        console.log(res)
        this.topImages = res.data.result.itemInfo.topImages
    })
  },

  components: {
    MainNavBar
  },

  computed: {},

  methods: {}
};
</script>
<style lang='css' scoped>
</style>