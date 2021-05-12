<template>
  <div class="btn" :style="styles">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String
    },
    hoverColor: {
      type: String
    },
    bgColor: {
      type: String
    },
    hoverBgColor: {
      type: String
    }
  },
  data () {
    return {
      styles: {
        '--color': this.color,
        '--hoverColor': this.hoverColor,
        '--bgColor': this.bgColor,
        '--hoverBgColor': this.hoverBgColor
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/sass/common/variable";
.btn {
  background-color: var(--bgColor);
  border-radius: 4px;
  display: inline-block;
  color: var(--color);
  font-size: 13px;
  font-weight: normal;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--hoverBgColor);
    color: var(--hoverColor);
    cursor: pointer;
  }
}

</style>
