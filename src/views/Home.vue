<template>
  <div class="home">
      <div class="title">
        <h2>Chào mừng bạn đến với trang Admin</h2>
      </div>
      <router-view></router-view>
  </div>
</template>

<script>
// import TheContent from '../components/layout/TheContent.vue'
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    // TheContent
  }
}
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  align-items: center;
  h2 {
    font-size: 50px;
    text-align: center;
    width: 100%;
    height: 100px;
    background: -webkit-linear-gradient(rgb(179, 48, 48), rgb(42, 125, 173));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
