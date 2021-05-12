<template>
  <div>
    <the-content>
      <div class="content-top">
        <h2 class="title">Danh sách danh mục</h2>
        <button-option
          bgColor="#019160"
          hoverBgColor="#2FBE8E"
          color="#fff"
          hoverColor="#fff"
          @click.native="isShowPopoverAdd = true"
          style="padding: 10px"
        >
          <i class="fas fa-user-plus" style="margin-right: 5px"></i>
          Thêm danh mục
        </button-option>
      </div>
      <div class="tools">
        <div class="search">
          <i class="fas fa-search"></i>
          <input
            v-model="request.q"
            type="text"
            placeholder="Tìm kiếm theo Mã, Tên DM"
          />
          <i
            class="fas fa-times-circle search-remove"
            v-if="search"
            @click="search = ''"
          ></i>
        </div>

        <div class="btn-refresh">
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
              <th>Tên danh mục</th>
              <th>Tùy chọn</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="category in categories" :key="category.id">
              <td>
                <input type="checkbox" />
              </td>
              <td>{{ category.categoryName }}</td>
              <td style="display: flex">
                <button-option
                  color="gray"
                  hoverColor="#fff"
                  bgColor="#ebebeb"
                  hoverBgColor="#2280ac"
                  style="margin-right: 10px"
                  @click.native="
                    isShowPopoverEdit = true;
                    categoryEdit = category;
                  "
                >
                  <div style="padding: 10px">Sửa</div>
                </button-option>
                <button-option
                  color="#fff"
                  hoverColor="#fff"
                  bgColor="#F65454"
                  hoverBgColor="red"
                  @click.native="
                    isShowDeleteMessage = true;
                    categoryDeleteId = category.categoryID;
                  "
                >
                  <div style="padding: 10px">Xóa</div>
                </button-option>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <popover-edit
        :isShow="isShowPopoverEdit"
        :onHidden="HiddenPopoverEdit"
        :category="categoryEdit"
      ></popover-edit>
      <popover-add
        :isShow="isShowPopoverAdd"
        :onHidden="HiddenPopoverAdd"
        @add-status="AddCategory"
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
          @click.native="DeleteCategory"
        >
          <div style="padding: 10px">Xóa</div>
        </button-option>
        <button-option
          style="margin-right: 10px"
          bgColor="#ebebeb"
          hoverBgColor="gray"
          hoverColor="#fff"
          @click.native="HiddenPopupDeleteMessage"
        >
          <div style="padding: 10px">Đóng</div>
        </button-option>
      </popup-warning>
    </the-content>
    <the-navigation :total="categories.count"
      :totalPages="categories.totalPage"
      :currentPage="request.pageIndex"
      title="danh mục"
      @pagechanged="onPageChange"></the-navigation>
  </div>
</template>

<script>
import TheContent from '../components/layout/TheContent.vue'
import TheNavigation from '../components/layout/TheNavigation.vue'
import ButtonOption from '../components/common/Button'
import PopoverEdit from '../components/category/components/PopoverEdit'
import PopupWarning from '../components/common/PopupWarning'
import PopoverAdd from '../components/category/components/AddCategory.vue'
export default {
  data () {
    return {
      search: '',
      categories: [],
      categoryEdit: null,
      categoryDeleteId: null,
      isShowPopoverEdit: false,
      isShowPopoverAdd: false,
      isShowDeleteMessage: false,
      request: {
        q: '',
        pageIndex: 1,
        pageSize: 5
      }
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
    this.axios
      .get('/Categorys')
      .then((res) => {
        this.categories = res.data
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
    DeleteCategory () {
      this.isShowDeleteMessage = false
      this.axios
        .delete('/Categorys/' + this.categoryDeleteId)
        .then((res) => {
          console.log('Xoa thanh cong')
          this.$notify({
            group: 'foo',
            title: 'Xóa danh mục thành công',
            type: 'warn'
          })
          this.categories = this.categories.filter(
            (category) => category.categoryID !== this.categoryDeleteId
          )
        })
        .catch((e) => console.log(e))
    },
    AddCategory (response) {
      if (response.status === 201) {
        this.isShowPopoverAdd = false
        this.axios
          .get('/Categorys')
          .then((res) => {
            this.categories = res.data
          })
          .catch((e) => console.log(e))
      }
    },
    onPageChange (page) {
      this.request.pageIndex = page
    }
  },
  watch: {
    'request.q' () {
      this.request.pageIndex = 1
    },
    request: {
      handler (val) {
        this.axios
          .get(
            `/Categorys?q=${this.request.q}&PageIndex=${this.request.pageIndex}&PageSize=${this.request.pageSize}`
          )
          .then((res) => {
            this.categories = res.data
          })
          .catch((e) => console.log(e))
      },
      deep: true
    }
  }
}
</script>

<style>
</style>
