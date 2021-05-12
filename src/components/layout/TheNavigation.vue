<template>
  <div class="navigation">
    <div class="page-description">
      <span>Hiển thị {{ (currentPage - 1) * 5 + 1  }}-{{ currentPage == Math.ceil(total / 5) ? total  :  currentPage * 5}} / {{ total }} {{ title }}</span>
    </div>
    <div class="pagination">
      <div class="pagination-icon pagination-icon-left">
        <i @click="onClickFirstPage" class="fas fa-angle-double-left"></i>
        <i @click="onClickPreviousPage" class="fas fa-angle-left"></i>
      </div>
      <div class="pagination-number-page">
        <span
          v-for="page in pages"
          :key="page.name"
          :class="{ 'page-active': page.isDisabled }"
          @click="onClickPage(page.name)"
          class="page"
          >{{ page.name }}</span
        >
      </div>
      <div class="pagination-icon pagination-icon-right">
        <i @click="onClickNextPage" class="fas fa-angle-right"></i>
        <i @click="onClickLastPage" class="fas fa-angle-double-right"></i>
      </div>
    </div>
    <div class="page-description">
      <span>5 {{ title }}/Trang</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    maxVisibleButtons: {
      type: Number,
      // required: false,
      default: 5
    },
    totalPages: {
      type: Number
      // required: true
    },
    total: {
      type: Number
      // required: true
    },
    currentPage: {
      type: Number
      // required: true
    },
    title: {
      type: String
    }
  },
  computed: {
    startPage () {
      if (this.currentPage === 1) {
        return 1
      }

      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.maxVisibleButtons + 1
      }

      return this.currentPage - 1
    },
    endPage () {
      return Math.min(
        this.startPage + this.maxVisibleButtons - 1,
        this.totalPages
      )
    },
    pages () {
      const range = []

      for (let i = this.startPage; i <= this.endPage; i += 1) {
        if (i > 0) {
          range.push({
            name: i,
            isDisabled: i === this.currentPage
          })
        }
      }

      return range
    },
    isInFirstPage () {
      return this.currentPage === 1
    },
    isInLastPage () {
      return this.currentPage === this.totalPages
    }
  },
  methods: {
    onClickFirstPage () {
      this.$emit('pagechanged', 1)
    },
    onClickPreviousPage () {
      this.$emit(
        'pagechanged',
        this.currentPage > 1 ? this.currentPage - 1 : this.currentPage
      )
    },
    onClickPage (page) {
      this.$emit('pagechanged', page)
    },
    onClickNextPage () {
      this.$emit(
        'pagechanged',
        this.currentPage < this.totalPages
          ? this.currentPage + 1
          : this.currentPage
      )
    },
    onClickLastPage () {
      this.$emit('pagechanged', this.totalPages)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/sass/common/_variable.scss";
.page-active {
    background-color: $navigation-icon-hover-color !important;
  }
.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  padding: 10px 20px;

  .page-description {
    font-size: 14px;
  }

  .pagination {
    display: flex;
    align-items: center;

    &-icon {
      font-size: 20px;
      color: $navigation-icon-color;

      &-left {
        margin-right: 20px;
      }

      &-right {
        margin-left: 20px;
      }

      &-left,
      &-right {
        i:first-child {
          margin-right: 20px;
        }
      }

      i {
        cursor: pointer;
      }

      i:hover {
        color: $navigation-icon-hover-color;
      }
    }

    &-number-page {
      span {
        display: inline-block;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 5px;
        background-color: $number-page-btn-bg-color;
        color: $white-color;
        margin-right: 15px;
        cursor: pointer;
        outline: none;
      }

      span:last-child {
        margin-right: 0;
      }

      span:hover,
      span:focus {
        background-color: $number-page-btn-bg-hover-color;
      }
    }
  }
}
</style>
