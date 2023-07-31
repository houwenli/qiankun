import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

// import { registerMicroApps, start } from 'qiankun';
import { registerMicroApps, start } from './micro-fe';

registerMicroApps([
  {
    name: 'vue1', // app name registered
    entry: '//localhost:8081',
    container: '#container',
    activeRule: '/subone',
  },
  {
    name: 'vue2',
    entry: '//localhost:8082',
    container: '#container',
    activeRule: '/subtwo',
  },
]);

start()
