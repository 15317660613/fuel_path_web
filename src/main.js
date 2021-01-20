import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ECharts from 'vue-echarts/components/ECharts.vue'

//引入v-chart组件
Vue.component('v-chart', ECharts)
Vue.config.productionTip = false
Vue.use(Element);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
