// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import axios from 'axios'

import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

Vue.use( axios );
Vue.use(ViewUI);
Vue.config.productionTip = false

Vue.prototype.$axios = axios ;


// axios.defaults.headers.token = VueCookies.get('token');
// axios.defaults.withCredentials = true ;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'

// axios.interceptors.request.use( (config)=>{
	// let token = VueCookies.get('token');
	// if( token )
	// {
	// 	config.headers.token = token;
	// }
	// return config;
// }, (err)=>{console.error("拦截器报错" , err);} );




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
