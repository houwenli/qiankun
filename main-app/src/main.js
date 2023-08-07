import Vue from 'vue'
import App from './App.vue'

import { router } from './router/index'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

import { registerMicroApps, start } from 'qiankun';
// import { registerMicroApps, start } from './micro-fe';

registerMicroApps([
  {
    name: 'vue1', // app name registered
    entry: '//localhost:9001',
    container: '#container',
    activeRule: '/subone',
  },
  {
    name: 'vue2',
    entry: '//localhost:9002',
    container: '#container',
    activeRule: '/subtwo',
  },
]);

start({
  sandbox: {
    // strictStyleIsolation: true
    experimentalStyleIsolation: true
  }
})
