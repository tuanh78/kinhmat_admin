<template>
  <div>
    <div class="reload" v-if="isShowReload"></div>
    <the-content>
      <div class="content-top">
        <h2 class="title">Danh sách sản phẩm</h2>
        <button-option
          bgColor="#019160"
          hoverBgColor="#2FBE8E"
          color="#fff"
          hoverColor="#fff"
          style="padding: 10px"
          @click.native="isShowPopoverAdd = true"
        >
          <i class="fas fa-user-plus" style="margin-right: 5px"></i>
          Thêm sản phẩm
        </button-option>
      </div>
      <div class="tools">
        <div class="search">
          <i class="fas fa-search"></i>
          <input
            v-model="request.q"
            type="text"
            placeholder="Tìm kiếm theo Mã, Tên SP"
          />
          <i
            class="fas fa-times-circle search-remove"
            v-if="search"
            @click="search = ''"
          ></i>
        </div>

        <div class="btn-refresh" @click="ReloadPage">
          <a>
            <i class="fas fa-sync-alt"></i>
          </a>
        </div>
      </div>

      <div class="user-list scrollbar">
        <table class="user-list-table">
          <thead>
            <tr>
              <th>Chọn</th>
              <th>Mã sản phẩm</th>
              <th>Tên sản phẩm</th>
              <th>Danh mục</th>
              <th>Giá</th>
              <th>NCC</th>
              <th>Số lượng</th>
              <th>Tùy chọn</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td>
                <input type="checkbox" />
              </td>
              <td>{{ product.code }}</td>
              <td>{{ product.name }}</td>
              <td>{{ product.categoryName }}</td>
              <td>{{ product.price }}</td>
              <td>{{ product.supplyName }}</td>
              <td>{{ product.amount }}</td>
              <!-- <td>
                <status styles="background-color: yellow; color: gray">
                  <span>Chưa duyệt</span>
                </status>
              </td> -->
              <td style="display: flex">
                <button-option
                  color="gray"
                  hoverColor="#fff"
                  bgColor="#ebebeb"
                  hoverBgColor="#2280ac"
                  style="margin-right: 10px"
                  @click.native="
                    isShowPopoverEdit = true;
                  "
                >
                  <div :id="product.id" style="padding: 10px; line-height: 100%"
                  @click="GetProductEdit"
                  >Sửa</div>
                </button-option>
                <button-option
                  color="#fff"
                  hoverColor="#fff"
                  bgColor="#F65454"
                  hoverBgColor="red"
                >
                  <div :id="product.id" style="padding: 10px; line-height: 100%"
                  @click="ShowDeleteMessage">Xóa</div>
                </button-option>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <popover-edit
        :isShow="isShowPopoverEdit"
        :onHidden="HiddenPopoverEdit"
        :product="productEdit"
      ></popover-edit>
      <popover-add
        :isShow="isShowPopoverAdd"
        :onHidden="HiddenPopoverAdd"
      ></popover-add>
      <popup-warning
        title="Xóa khách hàng"
        detail="Bạn chắc chắn muốn xóa khách hàng này chứ ?"
        classIcon="fas fa-exclamation-circle warning-color"
        :isShow="isShowDeleteMessage"
        :onHidden="HiddenPopupDeleteMessage"
      >
        <button-option
          bgColor="#da221c"
          hoverBgColor="#FF4747"
          color="#fff"
          hoverColor="#fff"
        >
          <div style="padding: 10px" @click="DeleteProduct">Xóa</div>
        </button-option>
        <button-option
          style="margin-right: 10px"
          bgColor="#ebebeb"
          hoverBgColor="gray"
          hoverColor="#fff"
        >
          <div style="padding: 10px" @click="HiddenPopupDeleteMessage">Hủy</div>
        </button-option>
      </popup-warning>
    </the-content>
    <the-navigation
      :total="totalRecord"
      :totalPages="total"
      :currentPage="request.pageIndex"
      :maxVisibleButtons="3"
      title="sản phẩm"
      @pagechanged="onPageChange"
    ></the-navigation>
  </div>
</template>

<script>
import TheContent from '../components/layout/TheContent.vue'
import TheNavigation from '../components/layout/TheNavigation.vue'
import ButtonOption from '../components/common/Button'
// import Status from '../components/common/Status'
import PopoverEdit from '../components/product/components/EditProduct'
import PopupWarning from '../components/common/PopupWarning'
import PopoverAdd from '../components/product/components/AddProduct.vue'
export default {
  data () {
    return {
      search: '',
      products: [],
      productEdit: null,
      productDeleteId: null,
      isShowPopoverEdit: false,
      isShowPopoverAdd: false,
      isShowDeleteMessage: false,
      isShowReload: false,
      request: {
        q: '',
        pageIndex: 1,
        pageSize: 5
      },
      totalRecord: 0
    }
  },
  components: {
    TheContent,
    TheNavigation,
    ButtonOption,
    // Status,
    PopoverEdit,
    PopupWarning,
    PopoverAdd
  },
  created () {
    this.axios
      .get(`/Products/paging?Filter=${this.request.q}&PageIndex=${this.request.pageIndex}&PageSize=${this.request.pageSize}`)
      .then((res) => {
        this.products = res.data
      })
      .catch((e) => console.log(e))
    this.axios
      .get('/Products/total')
      .then((res) => {
        this.totalRecord = res.data
      })
      .catch((e) => console.log(e))
  },
  methods: {
    HiddenPopoverEdit () {
      this.isShowPopoverEdit = false
    },
    HiddenPopoverAdd () {
      this.isShowPopoverAdd = false
    },
    HiddenPopupDeleteMessage () {
      this.isShowDeleteMessage = false
    },
    DeleteProduct () {
      this.isShowDeleteMessage = false
      this.axios
        .delete('/Products/' + this.productDeleteId)
        .then((res) => {
          this.$notify({
            group: 'foo',
            title: 'Xóa sản phẩm thành công !',
            type: 'warn'
          })
          this.products = this.products.filter(
            (product) => product.id !== this.productDeleteId
          )
        })
        .catch((e) => console.log(e))
    },
    onPageChange (page) {
      this.request.pageIndex = page
    },
    ShowDeleteMessage (event) {
      this.isShowDeleteMessage = true
      const id = event.target.getAttribute('id')
      this.productDeleteId = id
      console.log(this.productDeleteId)
    },
    GetProductEdit (event) {
      const id = event.target.getAttribute('id')
      this.productEdit = this.products.find(product => product.id === id)
    },
    ReloadPage () {
      this.isShowReload = true
      this.axios
        .get(`/Products/paging?Filter=${this.request.q}&PageIndex=${this.request.pageIndex}&PageSize=${this.request.pageSize}`)
        .then((res) => {
          this.products = res.data
          setTimeout(() => { this.isShowReload = false }, 2000)
        })
        .catch((e) => console.log(e))
    }

  },
  computed: {
    total () {
      return Math.ceil(this.totalRecord / this.request.pageSize)
    }
  },
  watch: {
    'request.q' () {
      this.request.pageIndex = 1
      this.axios
        .get(`/Products/total?Filter=${this.request.q}`)
        .then((res) => {
          this.totalRecord = res.data
        })
        .catch((e) => console.log(e))
    },
    request: {
      handler (val) {
        this.axios
          .get(
            `/Products/paging?Filter=${this.request.q}&PageIndex=${this.request.pageIndex}&PageSize=${this.request.pageSize}`
          )
          .then((res) => {
            this.products = res.data
          })
          .catch((e) => console.log(e))
      },
      deep: true
    }
  }
}
</script>

<style>
.lds-roller {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-roller div {
  animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 40px 40px;
}
.lds-roller div:after {
  content: " ";
  display: block;
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: gray;
  margin: -4px 0 0 -4px;
}
.lds-roller div:nth-child(1) {
  animation-delay: -0.036s;
}
.lds-roller div:nth-child(1):after {
  top: 63px;
  left: 63px;
}
.lds-roller div:nth-child(2) {
  animation-delay: -0.072s;
}
.lds-roller div:nth-child(2):after {
  top: 68px;
  left: 56px;
}
.lds-roller div:nth-child(3) {
  animation-delay: -0.108s;
}
.lds-roller div:nth-child(3):after {
  top: 71px;
  left: 48px;
}
.lds-roller div:nth-child(4) {
  animation-delay: -0.144s;
}
.lds-roller div:nth-child(4):after {
  top: 72px;
  left: 40px;
}
.lds-roller div:nth-child(5) {
  animation-delay: -0.18s;
}
.lds-roller div:nth-child(5):after {
  top: 71px;
  left: 32px;
}
.lds-roller div:nth-child(6) {
  animation-delay: -0.216s;
}
.lds-roller div:nth-child(6):after {
  top: 68px;
  left: 24px;
}
.lds-roller div:nth-child(7) {
  animation-delay: -0.252s;
}
.lds-roller div:nth-child(7):after {
  top: 63px;
  left: 17px;
}
.lds-roller div:nth-child(8) {
  animation-delay: -0.288s;
}
.lds-roller div:nth-child(8):after {
  top: 56px;
  left: 12px;
}
@keyframes lds-roller {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.reload {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  transform: translateY(-50%);
  width: 100px;
  height: 100px;
  background-image: url('../assets/images/logo/Spinner-1s-200px.gif');
  background-size: contain;
}
</style>
