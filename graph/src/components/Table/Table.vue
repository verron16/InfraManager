<template>
  <div style="width: 100%; height: 100%">
    <ag-grid-vue
      :style="{ width: 100 + '%', height: heightTable + 'px' }"
      class="ag-theme-alpine"
      :columnDefs="getColumns"
      :rowData="getRowData"
      :modules="modules"
      :gridOptions="gridOptions"
      :suppressDragLeaveHidesColumns="true"
      :defaultColDef="defaultColDef"
      :suppressRowClickSelection="true"
      :rowSelection="rowSelection"
      :applyColumnDefOrder="true"
      :animateRows="true"
      :rowHeight="42"
      :overlayLoadingTemplate="overlayLoadingTemplate"
      :overlayNoRowsTemplate="overlayNoRowsTemplate"
      @sortChanged="sortRows"
      @rowClicked="onRowClicked"
      :rowBuffer="rowBuffer"
      @modelUpdated="onModelUpdated"
      :debounceVerticalScrollbar="true"
      @grid-ready="onReady"
      @columnResized="saveStateTable"
    >
    </ag-grid-vue>
  </div>
</template>

<script>
import { AgGridVue } from "@ag-grid-community/vue";
import { AllCommunityModules } from "@ag-grid-community/all-modules";

export default {
  name: "Table",
  props: {
    columns: Array,
    list: Array,
    tableName: String,
  },
  data() {
    return {
      modules: AllCommunityModules,
      heightTable: 0,
      rowSelection: null,
      currentRow: {},
      defaultColDef: {},
      columnApi: null,
      gridOptions: null,
      sortedOrderColumns: null,
      api: null,
      overlayLoadingTemplate: null,
      overlayNoRowsTemplate: null,
      rowBuffer: null,
    };
  },
  components: {
    AgGridVue,
  },
  computed: {
    getRowData() {
      return this.$store.getters.getRowData;
    },
    getColumns() {
      return this.$store.getters.getColumns;
    },
    getCurrentLoadedData() {
      return this.$store.getters.getCurrentLoadingData;
    },
    getHeightMenu() {
      return this.$store.getters.getHeightMenu;
    },
    getWidthTask() {
      return this.$store.getters.getWidthTask;
    },
    getColumnApi() {
      return this.$store.getters.getColumnApi;
    },
    getTableName() {
      return this.$store.getters.getTableName;
    },
  },
  methods: {
    // Отправка колонок на сервер
    sortRows() {
      this.saveStateTable();
    },
    onModelUpdated(event) {
      const rowsCount = event.api.getDisplayedRowCount();
      this.$store.commit("SET_COUNT_LOADING_ROWS", rowsCount);
    },
    onReady() {
      this.api = this.gridOptions.api;
      this.columnApi = this.gridOptions.columnApi;
      this.$store.commit("SET_COLUMN_API", this.columnApi);
      this.$store.commit("SET_TABLE_API", this.api);
      this.$store.commit("SET_TABLE_NAME", this.tableName);
      // this.api.sizeColumnsToFit();
    },
    onRowClicked(node) {
      this.$store.commit("SET_CURRENT_ROW", node);
      this.$store.commit("SET_VISIBLE_TABLE_MODAL");
      this.$store.commit("SET_ACTION_CONTEXT_MENU", "change");
    },
    saveStateTable() {
      this.$store.dispatch("saveStateTable", this.getTableName);
    },
  },
  beforeMount() {
    this.gridOptions = {
      multiSortKey: "ctrl",
    };
    this.rowBuffer = 0;
    this.rowSelection = "multiple";

    // Настройка шаблонов загрузки строк и их отсутствие
    this.overlayLoadingTemplate =
      '<span class="table__loading">загрузка списка...</span>';
    this.overlayNoRowsTemplate =
      '<span class="table__loading">список пуст</span>';
  },
  mounted() {
    const vm = this;

    const parent = document.querySelector(".main__layout");
    const heightParent = parent.clientHeight;
    this.heightTable = heightParent - this.getHeightMenu - 150;
    $(".ag-body-viewport ").on("contextmenu", (e) => {
      e.preventDefault();
      vm.$store.commit("SET_OPTIONS_CONTEXT_MENU", {
        event: e,
        posX: e.pageX,
        posY: e.pageY,
      });
      vm.$store.commit("SET_VISIBLE_CONTEXT_MENU");
    });
  },
};
</script>

<style lang="scss">
.table__loading {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
  line-height: 20px;
  color: #333;
}
</style>
