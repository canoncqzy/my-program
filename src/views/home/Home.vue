<!-- Home -->
<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import {getHomeMultidata} from "network/home"

export default {
  name: 'Home',
  data () {
    return {
      result: null
    };
  },

  components: {
    NavBar
  },

  computed: {},

  methods: {},

  created() {
    
    getHomeMultidata().then(res => {
      console.log(res.data)
      this.result = res.data
    })
  }
}

</script>
<style scoped>
.home-nav {
  background: var(--color-tint);
  color: white;
}
</style>