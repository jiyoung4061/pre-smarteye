// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// axios
import axios from 'axios'

//moment
import vueMoment from 'vue-moment'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(vueMoment)



/* eslint-disable no-new */
new Vue({
  render: h => h(App)
  ,router 
}).$mount('#app')
