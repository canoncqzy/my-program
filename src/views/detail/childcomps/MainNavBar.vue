<!-- MainNavBar -->
<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="Back">
        <img src="~assets/img/common/back.svg" alt/>
      </div>
      <div slot="center" class="tiles">
        <div
          v-for="(item,index) in titles"
          :key="index"
          class="tiles-item"
          :class="{active: currentindex==index}"
          @click="Clickitem(index)"
        >{{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";

  export default {
    name: "MainNavBar",
    data() {
      return {
        titles: ["商品", "参数", "评论", "推荐"],
        currentindex: 0
      };
    },

    components: {
      NavBar
    },

    computed: {},

    methods: {
      Clickitem(index) {
        this.currentindex = index
        this.$emit('titleClick',index)
      },
      Back() {
        this.$router.back()
      }
    }
  };
</script>
<style lang='css' scoped>
  .tiles {
    display: flex;
  }

  .tiles-item {
    flex: 1;
  }

  .active {
    color: var(--color-high-text);
  }

  .back img {
    margin-top: 11px;
  }
</style>
