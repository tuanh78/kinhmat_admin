<template>
<div v-if="isShow">
  <div class="mask" @click="onHidden"></div>
  <div class="popup">
    <div class="popup-content">
      <h3 class="popup-title">{{title}}</h3>
      <p class="popup-detail">
        <i :class="classIcon"></i>
        {{ detail }}
      </p>
    </div>
    <div class="popup-btn-group">
      <slot></slot>
    </div>
    <div class="close-btn" @click="onHidden">
      <i class="fas fa-times"></i>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    },
    classIcon: {
      type: String
    },
    detail: {
      type: String
    },
    onHidden: {
      type: Function
    }
  },
  data () {
    return {
    }
  }

}
</script>

<style lang="scss" scoped>
@import "../../assets/sass/common/_variable.scss";
.popup {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 500px;
  height: 200px;
  margin-top: -125px;
  margin-left: -250px;
  z-index: 100;
  background-color: $white-color;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);

  &-title {
    font-size: 15px;
    font-weight: bold;
    padding-bottom: 24px;
  }

  &-detail {
    i {
      margin-right: 10px;
    }
  }

  &-content {
    padding: 24px;
  }

  &-btn-group {
    display: flex;
    flex-direction: row-reverse;
    padding: 10px 10px;
    background-color: $hover-menu-item-bg-color;
  }
}

.close-btn {
    position: absolute;
    top: 10px;
    right: 15px;
    cursor: pointer;

    &:hover {
      color: $close-btn-hover-color;
    }
}

.mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 99;
    background-color: $mask-color;
}

.warning-color {
  color: $warning-icon-color;
}
</style>
