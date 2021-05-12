<template>
  <div id="app">
      <router-view name="the-navbar"></router-view>
    <div class="main">
      <notifications group="foo"/>
      <router-view name="the-header"></router-view>
      <the-content>
        <router-view></router-view>
      </the-content>
    </div>
  </div>
</template>

<script>
import TheContent from './components/layout/TheContent'
// import TheHeader from './components/layout/TheHeader'
// import TheNavbar from './components/layout/TheNavbar'

const loggedIn = localStorage.getItem('user')
export default {
  // data () {
  //   return {
  //     isLogin: false
  //   }
  // },
  computed: {
    isLogin () {
      return loggedIn
    }
  },
  components: {
    TheContent
    // TheNavbar,
    // TheHeader
  }
}
</script>

<style lang="scss">
@import "./assets/sass/common/main";
#app {
  display: flex;
}

.main {
  flex-grow: 1;
}
</style>
