<template>
  <div class="profile">
    <nav-bar class="nav-bar">
      <div slot="center">蘑菇街</div>
    </nav-bar>
    <bscroll class="scroll-height">
      <login />
      <money />
      <div class="line"></div>
      <profile-list />
    </bscroll>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Login from "./children/Login";
import Money from "./children/Money";
import ProfileList from "./children/profileList";
import Bscroll from "../../components/common/scroll/Bscroll";

export default {
  name: "Profile",
  components: { Bscroll, ProfileList, Money, Login, NavBar }
};
</script>

<style scoped>
.profile {
  width: 100%;
  height: 100%;
}

.nav-bar {
  font-weight: 600;
  color: white;
  background-color: #ff8198;
}

.line {
  width: 100%;
  height: 10px;
  background-color: #eeeeee;
}

.scroll-height {
  position: absolute;
  top: 44px;
  right: 0;
  bottom: 50px;
  left: 0;
  overflow: hidden;
}
</style>
