<template>
  <div style="width: 100%; height: 100%">
    <ag-grid-vue
      :style="{ width: 100 + '%', height: height + 'px' }"
      class="ag-theme-alpine"
      :columnDefs="getColumns"
      :modules="modules"
      :gridOptions="gridOptions"
      :suppressDragLeaveHidesColumns="true"
      :defaultColDef="defaultColDef"
      :rowHeight="42"
      :overlayLoadingTemplate="overlayLoadingTemplate"
      :overlayNoRowsTemplate="overlayNoRowsTemplate"
      :rowBuffer="0"
      :debounceVerticalScrollbar="true"
      :rowSelection="rowSelection"
      :components="components"
      :applyColumnDefOrder="true"
      :animateRows="true"
      :blockLoadDebounceMillis="100"
      @sortChanged="sortRows"
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
  name: "TableServerSide",
  props: {
    columns: Array,
    list: Array,
    tableName: String,
    height: Number,
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
      tableDataSource: null,
      cacheBlockSize: 40,
      rowModelType: "infinite",
      components: null,
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
      this.api.refreshInfiniteCache();
    },
    onReady(params) {
      const self = this;
      this.api = this.gridOptions.api;
      this.columnApi = this.gridOptions.columnApi;
      this.$store.commit("SET_PARAMS_TABLE", params);
      this.$store.commit("SET_COLUMN_API", this.columnApi);
      this.$store.commit("SET_TABLE_API", this.api);
      this.$store.commit("SET_TABLE_NAME", this.tableName);
      let loadedCount = 1;
      let dataSource = {
        getRows: function (params) {
          loadedCount += 1;
          if (loadedCount < 3) {
            self.$store.commit(
              "SET_OVERLAY_LIST_SERVER_SIDE",
              "загрузка списка"
            );
          }
          self.axios
            .post("assetApi/GetListForAssetObject", {
              StartRecordIndex: params.startRow,
              CountRecords: 40,
              ViewName: "Hardware",
            })
            .then((response) => {
              console.log(loadedCount);
              let lastRow = -1;
              if (response.data.Data.length < 40) {
                lastRow =
                  self.api.getDisplayedRowCount() +
                  response.data.Data.length -
                  1;
              }
              self.$store.commit(
                "SET_COUNT_LOADING_ROWS_SERVER_SIDE",
                self.api.getDisplayedRowCount() + response.data.Data.length - 1
              );

              self.$store.commit("HIDE_OVERLAY_LIST_SERVER_SIDE");
              params.successCallback(response.data.Data, lastRow);
              if (response.data.Data.length === 0) {
                self.$store.commit(
                  "SET_OVERLAY_LIST_SERVER_SIDE",
                  "список пуст"
                );
              } else {
                self.$store.commit("HIDE_OVERLAY_LIST_SERVER_SIDE");
              }
            });
        },
      };
      params.api.setDatasource(dataSource);
      this.api.sizeColumnsToFit();
    },
    saveStateTable() {
      this.$store.dispatch("saveStateTable", this.getTableName);
    },
  },
  beforeMount() {
    this.gridOptions = {
      multiSortKey: "ctrl",
    };

    this.gridOptions.datasource = this.tableDataSource;
    this.gridOptions.cacheBlockSize = this.cacheBlockSize;
    this.gridOptions.rowModelType = this.rowModelType;
    this.gridOptions.maxConcurrentDatasourceRequests = 10;
    this.rowBuffer = 0;
    this.rowSelection = "single";
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
