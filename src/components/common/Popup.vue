<template>
  <div class="popup" :style="style">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    style: {
      type: String,
      require: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/sass/common/_variable.scss';
.popup {
  position: absolute;
  bottom: 84%;
  left: 25%;
  padding: 10px;
  font-size: 13px;
  border-radius: 5px;

  &::before {
    content: '';
    width: 0px;
    height: 0px;
    border: 7px solid;
    border-top-color: $error-color;
    border-bottom: transparent;
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
  }
}
</style>
