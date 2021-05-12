import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Product from '../views/Product.vue'
import Category from '../views/Category.vue'
import Supply from '../views/Supply.vue'
import Order from '../views/Order.vue'
import Login from '../views/Login.vue'
import Login1 from '../views/Login1.vue'
import TheContent from '../components/layout/TheContent.vue'
import TheHeader from '../components/layout/TheHeader.vue'
import TheNavbar from '../components/layout/TheNavbar.vue'
import Index from '../views/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    components: {
      default: Index,
      'the-content': TheContent,
      'the-header': TheHeader,
      'the-navbar': TheNavbar
    },
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path: '/product',
        name: 'Product',
        component: Product
      },
      {
        path: '/category',
        name: 'Category',
        component: Category
      },
      {
        path: '/supply',
        name: 'Supply',
        component: Supply
      },
      {
        path: '/order',
        name: 'Order',
        component: Order
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/login-1',
    name: 'Login1',
    component: Login1
  },

  // otherwise redirect to home
  { path: '*', redirect: '/' }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')

  if (authRequired && !loggedIn) {
    return next('/login')
  }

  next()
})

export default router
