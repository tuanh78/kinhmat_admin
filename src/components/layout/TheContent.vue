<template>
  <div class="content">
    <!-- <transition enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut" mode="out-in"> -->
      <slot></slot>
    <!-- </transition> -->
  </div>
</template>

<script>
export default
{
  data () {
    return {
    }
  },
  components: {
  },
  methods: {
    HiddenPopoverAdd () {
      this.isShowPopoverAdd = false
    },
    HiddenPopoverEdit () {
      this.isShowPopoverEdit = false
    },
    HiddenPopupDeleteMessage () {
      this.isShowDeleteMessage = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/sass/common/_variable.scss";
.content {
  padding: 12px 10px 0 10px;
  &-top {
    display: flex;
    justify-content: space-between;

    .title {
      font-size: 16px;
      font-weight: bold;
    }

    .btn-add {
      background-color: $default-color;
      border-radius: 4px;
      height: 40px;
      line-height: 20px;
      font-size: 13px;
      color: $white-color;
      font-weight: normal;
      padding: 10px 16px;
      text-decoration: none;

      i {
        margin-right: 5px;
      }
    }
  }

  .tools {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    padding-bottom: 10px;
    .search {
      border: 1px solid $border-color;
      border-radius: 4px;
      width: 230px;
      height: 40px;
      padding: 16px 0 16px 16px;
      display: flex;
      align-items: center;

      &-remove {
        color: $cancel-btn-color;
        cursor: pointer;

        &:hover {
          color: $cancel-btn-hover-color;
        }
      }
      i {
        margin-right: 8px;
        font-size: 16px;
      }
      input {
        padding: 0;
        border: 0px;
        outline: none;
        width: 80%;
        font-size: 12px;
        font-weight: normal;
        font-style: italic;
      }
    }

    .btn-refresh {
      a {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        width: 50px;
        border-radius: 4px;
        border: 1px solid $border-color;
        cursor: pointer;
      }
    }
  }
  .user-list {
    height: 60vh;
    overflow: auto;
    &-table {
      width: 100%;
      text-align: left;
      thead,
      tbody {
        tr {
          border-bottom: 2px solid $table-cell-hover-color;

          th,
          td {
            padding: 10px 10px;
          }
        }
      }

      thead {
        th {
          font-size: 15px;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
