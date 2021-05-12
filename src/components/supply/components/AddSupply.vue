<template>
  <div v-if="isShow">
    <div class="mask" @click="isShowPopup = true"></div>
    <div class="popover">
      <div class="popover-title">
        <h2>Thêm nhà cung cấp</h2>
      </div>

      <div class="supply-input-top">
        <div class="supply-input-top-left">
          <div class="supply-input-item">
            <label for="supplyCode">Mã NCC</label>
            <input
              v-model="supply.code"
              type="text"
              id="supplyCode"
              name="supply_code"
            />
            <!-- <popup style="background-color: #FF4747; color: #fff ">
            <span>Mã khách hàng không được để trống</span>
          </popup> -->
          </div>
          <div class="supply-input-item">
            <label for="supplyName">Tên NCC</label>
            <input
              v-model="supply.name"
              type="text"
              id="supplyName"
              name="supply_name"
            />
          </div>
          <div class="supply-input-item">
            <label for="supplyPhone">Địa chỉ</label>
            <input
              v-model="supply.address"
              type="text"
              id="supplyPhone"
              name="supply_phone"
            />
          </div>
          <div class="supply-input-item">
          <label for="supplyAmount">SĐT</label>
          <input
            v-model="supply.phoneNumber"
            type="number"
            id="supplyAmount"
            name="address"
          />
        </div>
        <div class="supply-input-item">
          <label for="supplyColor">Email</label>
          <input
            v-model="supply.email"
            type="text"
            id="supplyColor"
            name="address"
          />
        </div>
        </div>
      </div>

      <div class="supply-input-bottom">

      </div>

      <div class="group-btn">
        <a href="#" @click.prevent="Savesupply" class="save-btn btn">Lưu</a>
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
      >
        <div style="padding: 10px" @click="
          onHidden();
          HiddenPopup();
          ResetForm();
        ">Đóng</div>
      </button-option>
      <button-option
        bgColor="#ebebeb"
        hoverBgColor="gray"
        hoverColor="#fff"
        style="margin-right: 10px"
        @click.native="HiddenPopup"
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
  created () {
    this.axios
      .get('/Suppliers')
      .then((res) => {
        this.suppliers = res.data
      })
      .catch((e) => console.log(e))
      .then(() => {
        this.axios
          .get(
            '/Categorys'
          )
          .then((res) => {
            this.categories = res.data
          })
          .catch((e) => console.log(e))
      })
  },
  data () {
    return {
      isShowPopup: false,
      supply: {
        code: '',
        name: '',
        address: '',
        phoneNumber: '',
        email: ''
      },
      categories: [],
      suppliers: []
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
    Savesupply () {
      this.supply.phoneNumber = parseInt(this.supply.phoneNumber)
      this.axios
        .post('/suppliers', this.supply)
        .then((res) => {
          this.$notify({
            group: 'foo',
            title: 'Thêm nhà cung cấp thành công !',
            type: 'success'
          })
          this.supply = {
            code: '',
            name: '',
            address: '',
            phoneNumber: '',
            email: ''
          }
          this.onHidden()
          console.log('luu thanh cong')
        })
        .then((res) => {
          this.$emit('AddSuccess', this.supply)
        })
        .catch((e) => console.log(e))
    },

    ResetForm () {
      this.supply = {
        code: '',
        name: '',
        address: '',
        phoneNumber: '',
        email: ''
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

.supply-select {
  select {
    height: 39px;
    border-radius: 5px;
    border: 1px solid $border-color;
    outline: none;
    font-size: 14px;
  }
}

.supply-input {
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

    .supply-image {
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
    .supply-input-item {
      width: 50%;
    }

    .supply-input-item:nth-child(odd) {
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
