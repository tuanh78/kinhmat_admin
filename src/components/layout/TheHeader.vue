<template>
  <div class="header">
    <div class="header-item header-item-left">
      <span class="header-item-left-title">Kính mắt <span class="text-custom">huy tùng</span></span>
      <i class="fas fa-angle-down"></i>
    </div>
    <div class="header-item header-item-right">
      <div class="header-avatar"></div>
      <div class="user-name">
        <span>
            <router-link to="/">Nguyễn Văn Tùng</router-link>
        </span>
      </div>
      <div class="option-icon">
        <i class="fas fa-bars" @click="isShowLogout = !isShowLogout"></i>
        <div class="sub-popup" v-if="isShowLogout">
          <a href="/login">Đăng xuất</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShowLogout: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/sass/common/_variable.scss";
.header {
  padding: 12px 0 12px 16px;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid white;
  background-color: #2c3e50;

  &-item {
    &-left {

      &-title {
        margin-right: 10px;
        font-size: 14px;
        font-weight: bold;
        color: white;
      }

      i {
        color: white;
      }
    }

    &-right {
      display: flex;
      align-items: center;
    }
  }

  .text-custom {
    text-transform: capitalize;
  }

  &-avatar {
    width: 20px;
    height: 20px;
    background-image: url('../../assets/content/img/avatar.jpg');
    background-size: contain;
    background-repeat: no-repeat;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 16px;
  }
}

.header-top-left {
  &-img {
    width: 20%;
    height: auto;
  }
}

.user-name {
  margin-right: 16px;
  font-size: 14px;
  color: $grey-color;
  span {
    a {
      color: white;
    }
  }
}

.option-icon {
  width: 20px;
  height: 20px;
  margin-right: 16px;
  position: relative;
  i {
    color: white;
  }

  .sub-popup {
    position: absolute;
    top: 40px;
    right: -16px;
    background-color: #e67e22;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 50px;
    a {
      color: white;
    }
  }
}
</style>
