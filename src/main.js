import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VeeValidate from 'vee-validate'
import Notifications from 'vue-notification'

// axios base
import './libs/axios'

// Vuesax Component Framework
import Vuesax from 'vuesax'
import 'material-icons/iconfont/material-icons.css' // Material Icons
import 'vuesax/dist/vuesax.css' // Vuesax

// // PrismJS
// import 'prismjs'
// import 'prismjs/themes/prism-tomorrow.css'

// // Globally Registered Components
// import './globalComponents.js'

// // Styles: SCSS
// import './assets/scss/main.scss'

// // Tailwind
// import '@/assets/css/main.css'

Vue.use(Vuesax)

Vue.config.productionTip = false

// VeeValidate
Vue.use(VeeValidate)
Vue.use(Notifications)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
