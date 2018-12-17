/** Created by John on 2018年12月14日17:19:09 */

import Vue from 'vue'
import App from './App'
// import store from './store'
// import * as util from './utils'
Vue.config.productionTip = false
App.mpType = 'app'
// Vue.prototype.util = util
const app = new Vue(
//     {
//     store,
//     ...App

//   }
  App)

app.$mount()
