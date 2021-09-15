<template>
  <div class="im-search__wrapper">
    <div class="im-search">
      <div class="im__search">
        <input
          type="text"
          class="im-search__input"
          placeholder="Введите запрос для поиска"
          v-model="search"
          @input="$emit('input', $event.target.value)"
        />
        <img
          src="@/assets/icons/table/search.svg"
          alt="icon-search"
          class="im-search__icon-search"
          v-if="search.length < 1"
        />
        <img
          src="@/assets/icons/catalog/close.svg"
          alt="icon-clear"
          class="im-search__icon-clear"
          v-if="search !== ''"
          @click="clearSearch"
        />
      </div>
    </div>
    <button
      class="button btn__first-priority im__search-btn"
      v-if="showButtonSearch"
      @click="findInformation"
    >
      <svg
        width="13"
        height="13"
        fill="white"
        viewBox="0 0 13 13"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.173125 11.9889L3.50459 8.65744C2.77611 7.74536 2.33932 6.58884 2.33932 5.3303C2.33932 2.38679 4.72613 0 7.66966 0C10.6132 0 13 2.38679 13 5.3303C13 8.2738 10.6132 10.6606 7.66966 10.6606C6.41111 10.6606 5.25457 10.2238 4.34249 9.49533L1.01103 12.8268C0.895682 12.9423 0.742731 13 0.592149 13C0.440974 13 0.288616 12.9423 0.173125 12.8268C-0.0577078 12.5958 -0.0577078 12.2196 0.173125 11.9889ZM7.66966 9.47608C9.95934 9.47608 11.8155 7.61995 11.8155 5.3303C11.8155 3.04064 9.95934 1.18451 7.66966 1.18451C5.37998 1.18451 3.52384 3.04064 3.52384 5.3303C3.52384 7.61995 5.37998 9.47608 7.66966 9.47608Z"
          fill="white"
        />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: "IM_InputSearcher",
  props: {
    showButtonSearch: Boolean,
  },
  data() {
    return {
      search: "",
    };
  },
  methods: {
    findInformation() {
      this.$emit("findInformation");
    },
    clearSearch() {
      this.search = "";
      this.$emit("clearSearch");
    },
  },
};
</script>

<style lang="scss" scoped>
.im-search {
  width: 100%;
  &__wrapper {
    display: flex;
    align-items: center;
    margin: 20px 20px;
  }
  &__button {
    margin-right: 20px;
  }
  &__icon {
    &-search {
      cursor: pointer;
      position: absolute;
      left: 10px;
      top: 9px;
      width: 14px;
      height: 14px;
    }
    &-clear {
      cursor: pointer;
      position: absolute;
      right: 10px;
      top: 5px;
      width: 20px;
      height: 20px;
    }
  }

  &__btn {
    float: right;
    display: inline-block;
    margin-left: 10px;
  }

  &__input {
    padding: 9px 30px 9px 10px;
    width: calc(100% - 41px);
    font-size: 12px;
    border: none;
    color: #333;
    outline: 1px solid #c1cfd9;
    &:focus {
      outline: 2px solid #81aef0;
    }
  }
}

.im {
  &__search {
    position: relative;
    &-btn {
      margin-left: 10px;
      padding: 9px 24px;
    }
  }
}

.im-search__input::placeholder {
  color: #cdcece;
  font-size: 12px;
  line-height: 14px;
  padding-left: 23px;
}

.im-search__input:focus ~ .im-search__icon-search {
  display: none;
}

.im-search__input:focus::placeholder {
  padding-left: 0;
}
</style>
