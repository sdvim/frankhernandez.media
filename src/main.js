import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(VueAnalytics, {
  id: 'UA-75003409-7'
})

new Vue({
  render: h => h(App),
}).$mount('#app')
