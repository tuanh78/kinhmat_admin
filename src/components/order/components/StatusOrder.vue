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
  width: 100px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 13px;
  border-radius: 5px;
}
</style>
