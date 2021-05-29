<template>
  <div :class="['navbar', {'resize-width': !isShow}]">
    <div :class="['logo-toggle', {'logo-toggle-custom': !isShow}]">
      <div class="toggle" @click="isShow = !isShow"></div>
      <div class="logo" v-if="isShow"></div>
    </div>
    <div class="navbar-list">
      <ul>
          <navbar-item
            title="Trang chủ"
            :isShow="isShow"
            classIcon="fas fa-home"
            url="/"
          ></navbar-item>

        <navbar-item
          title="Sản phẩm"
          :isShow="isShow"
          classIcon="fab fa-product-hunt"
          url="product"
        ></navbar-item>
        <navbar-item
          title="Danh mục"
          :isShow="isShow"
          classIcon="fab fa-avianex"
          url="category"
        ></navbar-item>
        <navbar-item
          title="Nhà cung cấp"
          :isShow="isShow"
          classIcon="fas fa-parachute-box"
          url="supply"
        ></navbar-item>
        <navbar-item
          title="Đơn hàng"
          :isShow="isShow"
          classIcon="fas fa-archive"
          url="order"
        ></navbar-item>
      </ul>
    </div>
  </div>

</template>

<script>
import NavbarItem from '../common/NavbarItem.vue'
export default {
  components: { NavbarItem },
  data () {
    return {
      isShow: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/sass/common/variable";
.navbar {
  width: 226px;
  height: 100vh;
  border-right: 2px solid white;
  position: sticky;
  top: 0;
  background-color: #2c3e50;
}
.logo-toggle {
  display: flex;
  justify-content: space-between;
  padding: 12px 32px 12px 16px;

  &-custom {
    padding: 12px 0px 12px 16px;
    .toggle {
      margin-right: 0;
    }
  }

  .toggle {
    width: 24px;
    height: 24px;
    background-image: url("../../assets/content/img/avatar-luffy.jpg");
    background-repeat: no-repeat;
    background-size: contain;
    margin-right: 10px;

  }

  .logo {
    width: calc(100% - 34px);
    height: 24px;
    background-image: url("../../assets/images/logo/favicon.png");
    background-repeat: no-repeat;
    background-size: contain;
  }
}

.resize-width {
  width: auto;
}
</style>
