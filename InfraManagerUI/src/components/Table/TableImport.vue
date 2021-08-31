<template>
  <div class="table-controls__export-change">
    <div class="download__button" id="excel">
      <button class="export-change__excel" @click="saveLoadedData">
        Сохранить загруженные данные
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TableImport",
  props: {
    gridApi: Object,
  },
  methods: {
    closeImportManager() {
      this.$emit("closeImportManager");
    },
    saveLoadedData() {
      this.gridApi.exportDataAsCsv();
      this.closeImportManager();
    },
  },
};
</script>

<style lang="scss" scoped>
.table-controls {
  &__export-change {
    position: absolute;
    top: 50px;
    left: 0;
    background: white;
    cursor: pointer;
    padding: 2px;
    outline: 1px solid transparent;
    z-index: 100;
    min-width: 195px;
    width: 100%;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    &::after {
      content: "";
      position: absolute;
      top: -20px;
      left: 10px;
      transform: rotate(180deg);
      border: 10px solid transparent;
      border-top: 10px solid white;
    }
  }
}
.export-change {
  z-index: 10000;
  &__excel {
    font-size: 12px;
    line-height: 20px;
    color: #333;
    cursor: pointer;
    font-weight: 400;
    outline: none;
    border: 1px solid white;
    background: white;
    word-wrap: normal;
    display: flex;
    width: 100%;
    justify-content: flex-start;
    &:hover {
      background-color: #f2fafd;
      outline: 1px solid #bdd0da;
    }
  }
  &__csv {
    width: 100%;
    font-size: 12px;
    background: white;
    line-height: 20px;
    display: flex;
    justify-content: flex-start;
    color: #333;
    cursor: pointer;
    word-wrap: normal;
    font-weight: 400;
    outline: none;
    border: 1px solid white;
    &:hover {
      background-color: #f2fafd;
      border: 1px solid #bdd0da;
    }
  }
}
</style>
