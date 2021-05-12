<template>
  <div>
    <div class="reload" v-if="isShowReload">
        <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
    <the-content v-else>
      <div class="content-top">
        <h2 class="title">Danh sách nhà cung cấp</h2>
        <button-option
          bgColor="#019160"
          hoverBgColor="#2FBE8E"
          color="#fff"
          hoverColor="#fff"
          @click.native="isShowPopoverAdd = true"
          style="padding: 10px"
        >
          <i class="fas fa-user-plus" style="margin-right: 5px"></i>
          Thêm nhà cung cấp
        </button-option>
      </div>
      <div class="tools">
        <div class="search">
          <i class="fas fa-search"></i>
          <input
            v-model="search"
            type="text"
            placeholder="Tìm kiếm theo Mã, Tên NCC"
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
              <th>Mã nhà cung cấp</th>
              <th>Tên nhà cung cấp</th>
              <th>Địa chỉ</th>
              <th>SĐT</th>
              <th>Email</th>
              <th>Tùy chọn</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="supply in suppliers" :key="supply.id">
              <td>
                <input type="checkbox" />
              </td>
              <td>{{ supply.code }}</td>
              <td>{{ supply.name }}</td>
              <td>{{ supply.address }}</td>
              <td>{{ supply.phoneNumber }}</td>
              <td>{{ supply.email }}</td>
              <td style="display: flex">
                <button-option
                  color="gray"
                  hoverColor="#fff"
                  bgColor="#ebebeb"
                  hoverBgColor="#2280ac"
                  style="margin-right: 10px"
                  @click.native="isShowPopoverEdit = true"
                >
                  <div style="padding: 10px" @click='supplyEdit = supply'>Sửa</div>
                </button-option>
                <button-option
                  color="#fff"
                  hoverColor="#fff"
                  bgColor="#F65454"
                  hoverBgColor="red"
                >
                  <div style="padding: 10px" @click="ShowDeleteMessage(supply)">Xóa</div>
                </button-option>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <popover-edit
        :isShow="isShowPopoverEdit"
        :onHidden="HiddenPopoverEdit"
        :supply="supplyEdit"
      ></popover-edit>
      <popover-add
        :isShow="isShowPopoverAdd"
        :onHidden="HiddenPopoverAdd"
        @AddSuccess="ReloadSuppliers($event)"
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
          <div style="padding: 10px;" @click="DeleteSupplier">Xóa</div>
        </button-option>
        <button-option
          style="margin-right: 10px"
          bgColor="#ebebeb"
          hoverBgColor="gray"
          hoverColor="#fff"
          @click.native="HiddenPopupDeleteMessage"
        >
          <div style="padding: 10px;">Đóng</div>
        </button-option>
      </popup-warning>
    </the-content>
    <the-navigation></the-navigation>
  </div>
</template>

<script>
import TheContent from '../components/layout/TheContent.vue'
import TheNavigation from '../components/layout/TheNavigation.vue'
import ButtonOption from '../components/common/Button'
import PopoverEdit from '../components/supply/components/PopoverEdit'
import PopupWarning from '../components/common/PopupWarning'
import PopoverAdd from '../components/supply/components/AddSupply.vue'
export default {
  data () {
    return {
      search: '',
      suppliers: [],
      supplyEdit: null,
      supplierDeleteId: null,
      isShowPopoverEdit: false,
      isShowPopoverAdd: false,
      isShowDeleteMessage: false,
      isShowReload: false

    }
  },
  components: {
    TheContent,
    TheNavigation,
    ButtonOption,
    PopoverEdit,
    PopupWarning,
    PopoverAdd
  },
  created () {
    this.axios.get('/Suppliers')
      .then(res => {
        this.suppliers = res.data
      })
      .catch(e => console.log(e))
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
    ReloadSuppliers (supply) {
      this.GetSuppliers()
    },
    ShowDeleteMessage (supply) {
      this.isShowDeleteMessage = true
      this.supplierDeleteId = supply.id
    },
    DeleteSupplier () {
      this.axios
        .delete('/suppliers/' + this.supplierDeleteId)
        .then(res => {
          this.isShowDeleteMessage = false
          this.suppliers = this.suppliers.filter(supplier => supplier.id !== this.supplierDeleteId)
          this.$notify({
            group: 'foo',
            title: 'Xóa thành công',
            type: 'warn'
          })
          console.log('xoa thanh cong')
        })
        .catch((e) => console.log(e))
    },
    GetSuppliers () {
      this.axios
        .get('/Suppliers')
        .then((res) => {
          console.log('reload lai')
          this.suppliers = res.data
          console.log(this.suppliers)
        })
        .catch((e) => console.log(e))
    },
    ReloadPage () {
      this.idShowReload = true
      this.axios.get('/Suppliers')
        .then(res => {
          this.isShowReload = true
          this.suppliers = res.data
          setTimeout(() => { this.isShowReload = false }, 2000)
        })
        .catch(e => console.log(e))
    }
  }
}
</script>

<style>
</style>
