<template>
  <div class="status" :style="styles">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    styles: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
.status {
  width: 200px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 13px;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9999;
  border-radius: 5px;
}
</style>
