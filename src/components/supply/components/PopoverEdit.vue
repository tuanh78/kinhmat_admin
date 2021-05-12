<template>
  <div v-if="isShow">
    <div class="mask" @click="isShowPopup = true"></div>
    <div class="popover">
      <div class="popover-title">
        <h2>Sửa nhà cung cấp</h2>
      </div>

      <div class="supplier-input-top">
        <div class="supplier-input-top-left">
          <div class="supplier-input-item">
            <label for="supplierCode">Mã nhà cung cấp</label>
            <input
              type="text"
              id="supplierCode"
              name="supplier_code"
              v-model="supply.code"
            />
            <!-- <popup style="background-color: #FF4747; color: #fff ">
            <span>Mã khách hàng không được để trống</span>
          </popup> -->
          </div>
          <div class="supplier-input-item">
            <label for="supplierName">Tên nhà cung cấp</label>
            <input
              type="text"
              id="supplierName"
              name="supplier_name"
              v-model="supply.name"
            />
          </div>
          <div class="supplier-input-item">
            <label for="supplierPhone">Địa chỉ</label>
            <input
              type="text"
              id="supplierPhone"
              name="supplier_phone"
              v-model="supply.address"
            />
          </div>
          <div class="supplier-input-item">
          <label for="supplierAmount">SĐT</label>
          <input
            type="text"
            id="supplierAmount"
            name="address"
              v-model="supply.phoneNumber"
          />
        </div>
        <div class="supplier-input-item">
          <label for="supplierColor">Email</label>
          <input
            type="text"
            id="supplierColor"
            name="address"
            v-model="supply.email"
          />
        </div>
        </div>
      </div>

      <div class="group-btn">
        <a href="#" @click.prevent="Updatesupplier" class="save-btn btn">Lưu</a>
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
        <span>Đóng</span>
      </button-option>
      <button-option
        bgColor="#ebebeb"
        hoverBgColor="gray"
        hoverColor="#fff"
        style="margin-right: 10px"
        @click.native="HiddenPopup"
      >
        <span>Giữ lại</span>
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
      default: true
    },
    onHidden: {
      type: Function
    },
    supply: {
      type: Object
    }
  },
  data () {
    return {
      isShowPopup: false
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
    },
    Updatesupplier () {
      this.axios
        .put('/suppliers/' + this.supply.id, this.supply)
        .then((res) => {
          this.onHidden()
          console.log('cap nhat thanh cong')
          this.$notify({
            group: 'foo',
            title: 'Cập nhật thành công !',
            type: 'success'
          })
        })
        .catch((e) => console.log(e))
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../../assets/sass/common/_variable.scss";
.popover {
  position: fixed;
  width: 700px;
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

.supplier-select {
  select {
    height: 39px;
    border-radius: 5px;
    border: 1px solid $border-color;
    outline: none;
    font-size: 14px;
  }
}

.supplier-input {
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
      margin-bottom: 20px;
    }

    .supplier-image {
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
    .supplier-input-item {
      width: 50%;
    }

    .supplier-input-item:nth-child(odd) {
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
