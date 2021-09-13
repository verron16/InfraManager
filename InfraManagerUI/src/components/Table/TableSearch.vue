<template>
  <div class="search__wrapper">
    <div class="search">
      <div class="table__search">
        <input
          type="text"
          class="search__input"
          placeholder="Введите запрос для поиска"
          v-model="search"
          @input="findRow"
        />
        <img
          src="@/assets/icons/table/search.svg"
          class="search__icon-zoom"
          alt="icon-search"
          v-if="search.length < 1"
        />
      </div>
    </div>
    <button class="button btn__first-priority table__search-btn" v-if="showButtonSearch">Найти</button>
  </div>
</template>

<script>
export default {
  name: "TableSearch",
  props: {
    showButtonSearch: Boolean
  },
  data() {
    return {
      search: "",
    };
  },
  methods: {
    clearSearch() {
      this.search = "";
      this.$emit("searchRow", this.search);
    },
    findRow() {
      this.$emit("searchRow", this.search);
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  width: 100%;
  &__wrapper {
    display: flex;
    align-items: center;
    margin-top: 20px;
  }
  &__button {
    margin-right: 20px;
  }
  &__icon {
    &-zoom {
      cursor: pointer;
      position: absolute;
      left: 10px;
      top: 9px;
      width: 14px;
      height: 14px;
    }
  }

  &__btn {
    float: right;
    display: inline-block;
    margin-left: 10px;
  }

  &__input {
    padding: 9px 10px 9px 10px;
    width: calc(100% - 21px);
    font-size: 12px;
    border: none;
    color: #333;
    outline: 1px solid #c1cfd9;
    &:focus {
      outline: 2px solid #81aef0;
    }
  }
}

.table {
  &__search {
    position: relative;
    &-btn {
      margin-left: 10px;
    }
  }
}

.search__input::placeholder {
  color: #cdcece;
  font-size: 12px;
  line-height: 14px;
  padding-left: 23px;
}

.search__input:focus ~ .search__icon-zoom {
  display: none;
}

.search__input:focus::placeholder {
  padding-left: 0;
}
</style>
