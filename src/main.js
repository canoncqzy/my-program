import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import vant from "vant";
import "vant/lib/index.css";

Vue.use(vant);
//使用懒加载图片
import { Lazyload } from 'vant';
// Vue.use(Lazyload);
Vue.use(Lazyload, {
  loading: require("assets/img/common/placeholder.png")
});

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
