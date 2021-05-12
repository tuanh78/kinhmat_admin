<template>
  <div v-if="isShow">
    <div class="mask" @click="isShowPopup = true"></div>
    <div class="popover">
      <div class="popover-title">
        <h2>Thêm danh mục</h2>
      </div>

      <div class="category-input-top">
        <div class="category-input-top-left">
          <div class="category-input-item">
            <label for="categoryName">Tên danh mục</label>
            <input
              v-model="category.categoryName"
              type="text"
              id="categoryName"
              name="category_name"
            />
            <h2 v-if="ValidateName.length !== 0" style="color: red; margin-top: 10px;">{{ ValidateName }}</h2>
          </div>
        </div>
      </div>

      <div class="group-btn">
        <a href="#" @click.prevent="SaveProduct" class="save-btn btn">Lưu</a>
        <a href="#" class="cancel-btn btn" @click="isShowPopup = true"
          >Hủy bỏ</a
        >
      </div>

      <div class="close-btn" @click="onHidden">
        <i class="far fa-times-circle"></i>
      </div>
    </div>

    <popup-warning
      title="Đóng Form thêm người dùng"
      detail="Bạn chắc chắn muốn đóng form lại chứ ?"
      classIcon="fas fa-exclamation-circle"
      :isShow="isShowPopup"
      :onHidden="HiddenPopup"
    >
      <button-option
        bgColor="#019160"
        hoverBgColor="#17b94d"
        color="#fff"
        hoverColor="#fff"
        @click.native="
          onHidden();
          HiddenPopup();
        "
      >
        <div style="padding: 10px">Đóng</div>
      </button-option>
      <button-option
        bgColor="#ebebeb"
        hoverBgColor="gray"
        hoverColor="#fff"
        style="margin-right: 10px"
        @click.native="CloseWarning"
      >
        <div style="padding: 10px">Giữ lại</div>
      </button-option>
    </popup-warning>
  </div>
</template>

<script>
import ButtonOption from '../../common/Button.vue'
import PopupWarning from '../../common/PopupWarning.vue'
// import Popup from '../../common/Popup'
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    onHidden: {
      type: Function
    }
  },
  data () {
    return {
      isShowPopup: false,
      category: {
        categoryName: ''
      },
      errorMsg: ''
    }
  },
  components: {
    PopupWarning,
    ButtonOption
    // Popup
  },
  methods: {
    HiddenPopup () {
      this.isShowPopup = false
      this.category.categoryName = ''
    },
    CloseWarning () {
      this.isShowPopup = false
    },
    SaveProduct () {
      this.axios
        .post('/Categorys', this.category)
        .then((res) => {
          this.category = {
            categoryName: ''
          }
          this.$notify({
            group: 'foo',
            title: 'Thêm danh mục thành công',
            type: 'success'
          })
          this.$emit('add-status', res)
          this.errorMsg = ''
        })
        .catch((e) => {
          this.errorMsg = e.response.data.errors.CategoryName
        })
    }
  },
  computed: {
    ValidateName () {
      if (this.category.categoryName === null || this.category.categoryName.length === 0) {
        return 'Tên danh mục không thể để trống!'
      } else {
        return ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../../assets/sass/common/_variable.scss";
.popover {
  position: fixed;
  width: 700px;
  height: 200px;
  top: 50%;
  left: 50%;
  margin-top: -250px; /* Negative half of height. */
  margin-left: -350px; /* Negative half of width. */
  background-color: $white-color;
  padding: 20px;
  border-radius: 10px;
  z-index: 99;

  &-title {
    text-transform: uppercase;
    padding-bottom: 20px;
    font-weight: bold;
  }
}

.category-select {
  select {
    height: 39px;
    border-radius: 5px;
    border: 1px solid $border-color;
    outline: none;
    font-size: 14px;
  }
}

.category-input {
  &-item {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    position: relative;
    label {
      font-size: 13px;
      color: $grey-color;
      margin-bottom: 5px;
    }

    input {
      height: 35px;
      border-radius: 5px;
      border: 1px solid $border-color;
      outline: none;
      font-size: 14px;
    }

    .gender {
      display: flex;

      &-title {
        margin-bottom: 15px;
      }

      &-men {
        display: flex;
        align-items: center;
        margin-right: 10px;
      }

      &-women {
        display: flex;
        align-items: center;
      }

      &-item {
        input {
          height: auto;
        }

        label {
          margin-bottom: 0;
        }
      }
    }
  }

  &-top,
  &-bottom {
    display: flex;
    flex-wrap: wrap;
  }

  &-top {
    &-left {
      width: 100%;
      padding-right: 20px;
    }

    .category-image {
      width: 30%;

      span {
        margin-bottom: 10px;
        font-size: 13px;
        font-weight: normal;
        color: $grey-color;
      }

      img {
        width: 100%;
        height: 150px;
        object-fit: cover;
        display: block;
        border-radius: 20px;
        margin-bottom: 20px;
      }
      div {
        display: flex;
        flex-direction: row-reverse;
        padding-right: 20px;
        label {
          cursor: pointer;
          color: $grey-color;
          display: inline-block;
          width: 60px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          background-color: #ebebeb;
          border-radius: 4px;
        }
      }

      label:hover {
        color: $white-color;
        background-color: $navigation-icon-hover-color;
      }
    }
  }

  &-bottom {
    .category-input-item {
      width: 50%;
    }

    .category-input-item:nth-child(odd) {
      padding-right: 10px;
    }
  }
}

.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2;
  background-color: $mask-color;
}

.group-btn {
  display: flex;
  flex-direction: row-reverse;
  .btn {
    display: inline-block;
    padding: 8px;
    border-radius: 5px;
    color: $grey-color;
    text-decoration: none;
  }

  .save-btn {
    background-color: $save-btn-bg-color;
    color: $white-color;
  }

  .save-btn:hover {
    background-color: $save-btn-bg-hover-color;
  }
  .cancel-btn {
    margin-right: 20px;
    background-color: $cancel-btn-color;
  }

  .cancel-btn:hover {
    background-color: $cancel-btn-hover-color;
    color: $white-color;
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
</style>
