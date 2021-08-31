<template>
  <div class="table-panel">
    <div class="table-panel__wrapper">
      <div class="table-controls">
        <div
          class="table-controls__export"
          :class="{ 'table-controls__item-active': showImport }"
        >
          <div
            class="table-controls__export-img"
            @click="showImportManager"
          ></div>
          <TableImport
            v-if="showImport"
            v-on-clickaway="showImportManager"
            @closeImportManager="showImport = false"
            :gridApi="gridApi"
          ></TableImport>
        </div>
        <div
          class="table-controls__cols"
          :class="{ 'table-controls__item-active': visibleManagerColumns }"
        >
          <div
            class="table-controls__cols-img"
            @click="showManagerColumn"
          ></div>
          <TableManagerColumns
            :gridApiColumns="columnApi"
            v-on-clickaway="showManagerColumn"
            @updateVisibleColumn="updateVisibleColumn"
            @closeManagementWidget="showManagerColumn"
            v-if="visibleManagerColumns"
            @updateOrderColumns="updateOrderColumns"
          ></TableManagerColumns>
        </div>
        <div class="table-controls__loading">
          <span class="table-controls__text">Загружено:</span>
          <div class="table-loading" :class="{ select__active: showSelect }">
            <div class="table-loading__wrapper" @click="showSelectData">
              <span class="table-loading__count" v-if="!serverSide">{{
                getCurrentLoadedData
              }}</span>
              <span class="table-loading__count" v-else>{{
                getCurrentLoadedDataServerSide
              }}</span>
              <svg
                class="table-loading__select"
                width="12"
                height="8"
                viewBox="0 0 12 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1 1L6 6.45455L11 1" stroke="#8394A5" />
              </svg>
            </div>
            <ul class="table-loading__list" v-show="showSelect">
              <li
                class="table-loading__item item__active"
                @click="selectLoadedData()"
                v-if="!serverSide"
              >
                {{ getCurrentLoadedData }}
              </li>
              <li
                class="table-loading__item item__active"
                @click="selectLoadedData()"
                v-else
              >
                {{ getCurrentLoadedDataServerSide }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TableImport from "./TableImport";
import TableManagerColumns from "./TableManagerColumns";
export default {
  name: "TablePanel",
  components: { TableImport, TableManagerColumns },
  props: {
    columnApi: Object,
    gridApi: Object,
    serverSide: Boolean,
  },
  data() {
    return {
      selectedLoadedData: null,
      showSelect: false,
      showImport: false,
      visibleManagerColumns: false,
    };
  },
  computed: {
    getCurrentLoadedData() {
      return this.$store.getters.getCurrentLoadingData;
    },
    getCurrentLoadedDataServerSide() {
      return this.$store.getters.getCurrentLoadingDataServerSide;
    },
    getTableName() {
      return this.$store.getters.getTableName;
    },
  },
  methods: {
    showImportManager() {
      this.showImport = !this.showImport;
    },
    selectLoadedData(data) {
      this.selectedLoadedData = data;
      this.showSelect = false;
    },
    showSelectData() {
      this.showSelect = true;
    },
    showManagerColumn() {
      this.visibleManagerColumns = !this.visibleManagerColumns;
    },
    updateOrderColumns(arr) {
      this.$store.commit("UPDATE_ORDER_COLUMNS", arr);
      this.$store.dispatch("saveStateTable");
    },
    updateVisibleColumn(obj) {
      this.$store.commit("SET_VISIBLE_COLUMN", obj);
      this.$store.dispatch("saveStateTable", this.getTableName);
    },
  },
};
</script>

<style lang="scss" scoped>
.table-panel {
  background: #f3f7f9;
  padding: 0 12px;
  width: calc(100% - 24px);
  display: table;
  position: relative;
  font-family: Arial, sans-serif;
  outline: 1px solid #c1cfd9;
  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 42px;
  }
}
.download__button {
  height: 24px;
  overflow: hidden;
  width: 100%;
}
.table-controls {
  display: flex;
  align-items: center;

  &__export {
    cursor: pointer;
    z-index: 100;
    position: relative;
    padding: 0 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 42px;
    background: transparent;
    opacity: 0.6;
    &:hover {
      opacity: 1;
      background: white;
    }
    &-img {
      background: url("../../assets/icons/table/excel.svg") no-repeat;
      background-size: cover;
      width: 32px;
      height: 32px;
    }
  }
  &__item {
    &-active {
      opacity: 1 !important;
      background: white !important;
    }
  }
  &__cols {
    margin-right: 10px;
    height: 42px;
    padding: 0 5px;
    opacity: 0.6;
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    position: relative;
    &:hover {
      background: white;
      opacity: 1;
      cursor: pointer;
    }
    &-img {
      background: url("../../assets/icons/table/filters.svg") no-repeat;
      background-size: cover;
      width: 32px;
      height: 32px;
    }
  }

  &__loading {
    display: flex;
    align-items: center;
  }
  &__text {
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #070707;
    padding-right: 10px;
  }
}

.table-loading {
  position: relative;
  width: 130px;
  &__wrapper {
    padding: 4px;
    width: 120px;
    background: white;
    border: 1px solid #d3d3d3;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    cursor: pointer;
    position: relative;
  }
  &__count {
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #070707;
    padding-right: 10px;
  }
  &__select {
    height: 12px;
    width: 12px;
    transform: rotate(180deg);
  }
  &__list {
    position: absolute;
    width: 130px;
    z-index: 10;
    left: 0;
    bottom: 0;
    top: 28px;
    background: white;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    outline: 1px solid #ccc;
    min-width: 128px;
    height: 100%;
    padding: 7px 0;
    //min-height: 130px;
    max-height: 500px;
    transition: all 0.2s ease-in-out;
    //overflow-y: auto;
  }
  &__item {
    padding: 3px 7px;
    white-space: normal;
    word-wrap: break-word;
    background-color: white;
    color: #333;
    font-size: 12px;
    line-height: 20px;
    &:hover {
      background-color: #41aaed;
      color: white;
      cursor: pointer;
    }
  }
}

.item__active {
  background-color: #41aaed;
  color: white;
}

.select__active .table-loading__select {
  transform: rotate(0deg);
  & path {
    stroke: #61d6f2;
  }
}

.select__active .table-loading__wrapper {
  border: 2px solid #81aef0;
}
</style>
