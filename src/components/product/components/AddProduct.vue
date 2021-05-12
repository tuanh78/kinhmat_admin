<template>
  <div v-if="isShow">
    <div class="mask" @click="isShowPopup = true"></div>
    <div class="popover">
      <div class="popover-title">
        <h2>Thêm sản phẩm</h2>
      </div>

      <div class="product-input-top">
        <div class="product-input-top-left">
          <div class="product-input-item">
            <label for="productCode">Mã sản phẩm</label>
            <input
              v-model="product.code"
              type="text"
              id="productCode"
              name="product_code"
            />
            <!-- <popup style="background-color: #FF4747; color: #fff ">
            <span>Mã khách hàng không được để trống</span>
          </popup> -->
          </div>
          <div class="product-input-item">
            <label for="productName">Tên sản phẩm</label>
            <input
              v-model="product.name"
              type="text"
              id="productName"
              name="product_name"
            />
          </div>
          <!-- <div class="product-input-item product-select">
            <label for="productCategory">Danh mục</label>
            <select
              v-model="product.productCategoryId"
              name="product_category_id"
              id="productCategory"
            >
              <option v-for="(category, index) in categories" :key="index" :value="category.categoryID">
                {{ category.categoryName }}
              </option>
            </select>
          </div> -->
          <div class="product-input-item">
            <label for="productPhone">Giá</label>
            <input
              v-model="product.price"
              type="number"
              id="productPhone"
              name="product_phone"
            />
          </div>
        </div>

        <!-- <div class="product-image product-input-item">
          <span>Ảnh sản phẩm</span>
          <img
            src="../../../assets/content/img/avatar-luffy.jpg"
            alt="avatar"
          />
          <div>
            <label for="productUploadImage">Tải ảnh</label>
          </div>
          <input type="file" id="productUploadImage" name="avatar" hidden />
        </div> -->

        <div class="product-image product-input-item">
          <div class="error" v-for="(error, index) in errorsMess" :key="index">
            {{ error }}
          </div>
        </div>
      </div>

      <div class="product-input-bottom">
        <!-- <div class="product-input-item product-select">
          <label for="productGroup">Nhà cung cấp</label>
          <select
            v-model="product.productSupplierId"
            name="product-group"
            id="productGroup"
          >
            <option v-for="(item, index) in suppliers" :key="index" :value="item.supplyId">{{item.supplyName}}</option>
          </select>
        </div> -->
        <div class="product-input-item">
          <label for="productAmount">Số lượng</label>
          <input
            v-model="product.amount"
            type="number"
            id="productAmount"
            name="address"
          />
        </div>
        <!-- <div class="product-input-item">
          <label for="productColor">Màu sắc</label>
          <input
            v-model="product.productColor"
            type="text"
            id="productColor"
            name="address"
          />
        </div> -->
        <!-- <div class="product-input-item">
          <label for="productMeterial">Chất liệu</label>
          <input
            v-model="product.productMeterial"
            type="text"
            id="productMeterial"
            name="address"
          />
        </div> -->
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

    <!-- <status :styles="{backgroundColor: '#2ecc71', color: '#fff'}" v-if="isShowStatus">
      Thêm sản phẩm thành công !
    </status> -->

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
        @click.native="HiddenPopupWarning"
      >
        <span>Giữ lại</span>
      </button-option>
    </popup-warning>
  </div>
</template>

<script>
import ButtonOption from '../../common/Button.vue'
import PopupWarning from '../../common/PopupWarning.vue'
// import Status from '../../common/Status.vue'
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
      isShowStatus: false,
      errorsMess: {
        code: '',
        name: '',
        price: '',
        amount: ''
      },
      product: {
        code: '',
        name: '',
        // categoryId: null,
        price: '',
        // supplierId: null,
        amount: ''
        // color: '',
        // meeterial: ''
      },
      categories: [],
      suppliers: []
    }
  },
  components: {
    PopupWarning,
    ButtonOption
    // Status
    // Popup
  },
  methods: {
    HiddenPopup () {
      this.isShowPopup = false
      this.product = {
        code: '',
        name: '',
        price: '',
        amount: ''
      }
    },
    HiddenPopupWarning () {
      this.isShowPopup = false
    },
    SaveProduct () {
      if (this.checkForm()) {
        this.axios
          .post('/Products', this.product)
          .then((res) => {
            this.onHidden()
            this.$notify({
              group: 'foo',
              title: 'Thêm sản phẩm thành công',
              type: 'success'
            })
            this.product = {
              code: '',
              name: '',
              price: '',
              amount: ''
            }
          })
          .catch((e) => console.log(e))
      }
    },
    checkForm: function (e) {
      if (this.product.code === '') {
        this.errorsMess.code = 'Mã sản phẩm không được để trống !'
        return false
      } else {
        this.errorsMess.code = ''
      }

      if (this.product.name === '') {
        this.errorsMess.name = 'Tên sản phẩm không được để trống !'
        return false
      } else {
        this.errorsMess.name = ''
      }

      if (this.product.price === '') {
        this.errorsMess.price = 'Giá sản phẩm không được để trống !'
        return false
      } else if (isNaN(Number(this.product.price))) {
        this.errorsMess.price = 'Giá sản phẩm phải là một số !'
      } else {
        this.errorsMess.price = ''
      }

      if (this.product.amount === '') {
        this.errorsMess.amount = 'Số lượng sản phẩm không được để trống !'
        return false
      } else if (isNaN(Number(this.product.amount))) {
        this.errorsMess.amount = 'Số lượng sản phẩm phải là một số !'
      } else {
        this.errorsMess.amount = ''
      }
      return true
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

.product-select {
  select {
    height: 39px;
    border-radius: 5px;
    border: 1px solid $border-color;
    outline: none;
    font-size: 14px;
  }
}

.product-input {
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
      width: 70%;
      padding-right: 20px;
    }

    .product-image {
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
    .product-input-item {
      width: 50%;
    }

    .product-input-item:nth-child(odd) {
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

.error {
  color: #e74c3c;
  font-size: 13px;
  margin-bottom: 10px;
}
</style>
