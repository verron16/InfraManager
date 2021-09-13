import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";

import Column from "../Prototypes/ColumnTable";

Vue.use(Vuex);
Vue.use(VueAxios, axios);

export default new Vuex.Store({
  state: {
    // Общий стейт
    heightMenu: null,
    widthTask: null,
    // Стейт колонок
    rowData: null,
    columnDefs: null,
    loading: false,
    tableParams: null,
    columnApi: null,
    enableCheckboxTable: false,
    loadingRows: null,
    loadingRowsServerSide: null,
    rowsThisPage: null,
    lastLoadedRow: null,
    tableApi: null,
    tableName: "",
    visibleContextMenu: false,
    optionsContextMenu: {},
    currentRow: {},
    showTableModal: false,
    actionContextMenu: "",
    // Схема зависимостей
    mainNode: null,
    openedTabsGraph: [],
    showModalChoiceGraphNode: false,
    sourceObject: null,
    targetObject: null,
    currentNode: null,
    graphZoom: 0,
    showModal: false,
    currentEdge: null,
    currentData: null,
    action: "",
    nodeHTML: null,
    graph: null,
    className: "",
    positionModal: {
      left: null,
      top: null,
    },
    // Деревья
    currentFilterTree: null,
    currentChangedFilters: [],
    treeApi: null,
    // Ганнта
    visibleCard: false,
    locale: "",
    tasks: [],
    allServices: [],
    allCoordinators: [],
    filterGannt: {
      shortDesc: {
        findShortDesc: "",
        shortDescAccurate: false,
      },
      service: {
        checkedServices: [],
        serviceValue: "",
      },
      coordinator: {
        checkedCoordinators: [],
        coordinatorValue: "",
      },
    },
  },
  mutations: {
    // Общие мутации
    SET_WIDTH_TASKS(state, payload) {
      state.widthTasks = payload;
    },
    SET_HEIGHT_MENU(state, payload) {
      state.heightMenu = payload;
    },
    // Мутации таблиц
    SET_ROW_DATA(state, payload) {
      state.rowData = payload;
    },
    SET_COLUMNS(state, payload) {
      state.columnDefs = payload;
    },
    SET_COUNT_LOADING_ROWS(state, payload) {
      state.loadingRows = payload;
    },
    SET_COUNT_LOADING_ROWS_SERVER_SIDE(state, payload) {
      state.loadingRowsServerSide = payload;
    },
    SET_PARAMS_TABLE(state, payload) {
      state.tableParams = payload;
    },
    SET_COLUMN_API(state, payload) {
      state.columnApi = payload;
    },
    SET_TABLE_API(state, payload) {
      state.tableApi = payload;
    },
    SET_TABLE_NAME(state, payload) {
      state.tableName = payload;
    },
    SET_ENABLE_CHECKBOX_FOR_TABLE(state, payload) {
      state.enableCheckboxTable = payload;
    },
    UPDATE_ORDER_COLUMNS(state, payload) {
      let findCol = state.columnApi
        .getAllColumns()
        .find((x) => x.colDef.headerName === payload.name);
      state.columnApi.moveColumn(findCol, payload.toIndex);
    },
    SET_VISIBLE_COLUMN(state, payload) {
      let col = state.columnApi
        .getAllColumns()
        .find((x) => x.colDef.headerName === payload.header);
      state.columnApi.setColumnVisible(col, !payload.visible);
    },
    SET_VISIBLE_CONTEXT_MENU(state) {
      state.visibleContextMenu = !state.visibleContextMenu;
    },
    SET_OPTIONS_CONTEXT_MENU(state, payload) {
      state.optionsContextMenu = payload;
      let elem = payload.event.target.closest(".ag-row");
      state.optionsContextMenu.validateContextMenu = false;
      if (elem !== null) {
        let id = elem.getAttribute("row-id");
        state.currentRow = state.tableApi.getRowNode(id);
      } else {
        state.optionsContextMenu.validateContextMenu = true;
      }
    },
    SET_VISIBLE_TABLE_MODAL(state) {
      state.showTableModal = !state.showTableModal;
    },
    SET_CURRENT_ROW(state, payload) {
      state.currentRow = payload;
    },
    SET_ACTION_CONTEXT_MENU(state, payload) {
      state.actionContextMenu = payload;
    },
    ADD_ROW(state, payload) {
      state.tableApi.applyTransaction({ add: [payload] });
    },
    UPDATE_DATA_ROW(state, payload) {
      state.tableApi.applyTransaction({ update: [payload] });
    },
    SET_OVERLAY_LIST_SERVER_SIDE(state, payload) {
      const overlay = document.querySelector(".ag-overlay");
      overlay.classList.remove("ag-hidden");
      const overlayText = document.querySelector(".ag-overlay-wrapper");
      const overlayPanel = document.querySelector(".ag-overlay-panel");
      overlayPanel.style.marginTop = "50px";
      overlayText.style.height = "42px";
      overlayText.style.borderBottom = "1px solid #c1cfd9";
      overlayText.style.alignItems = "flex-end";
      overlayText.style.paddingBottom = "15px";
      overlayText.style.background = "white";
      overlayText.style.zIndex = "998";
      overlayText.textContent = payload;
    },
    HIDE_OVERLAY_LIST_SERVER_SIDE() {
      const overlay = document.querySelector(".ag-overlay");
      overlay.classList.add("ag-hidden");
    },
    // Ганнта
    UPDATE_VISIBLE_MODAL(state) {
      state.visibleCard = !state.visibleCard;
    },
    SET_LOCALE(state, locale) {
      state.locale = locale;
    },
    SET_ALL_TASKS(state, tasks) {
      state.tasks = tasks;
    },
    SET_ALL_SERVICES(state, services) {
      state.allServices = services;
    },
    SET_ALL_COORDINATORS(state, coordinators) {
      state.allCoordinators = coordinators;
    },
    SET_FILTERS_GANNT_BY_DESCRIPTION(state, filter) {
      state.filterGannt.shortDesc = filter;
    },
    SET_FILTERS_GANNT_BY_SERVICE(state, filter) {
      state.filterGannt.service = filter;
    },
    SET_FILTERS_GANNT_BY_COORDINATOR(state, filter) {
      state.filterGannt.coordinator = filter;
    },
    // Мутации схемы зависимостей
    SET_CURRENT_NODE(state, node) {
      state.currentNode = node;
    },
    UPDATE_VISIBLE_MODAL_CHOICE_GRAPH_NODE(state, value) {
      state.showModalChoiceGraphNode = value;
    },
    ADD_OPENED_TAB_GRAPH(state, route) {
      state.openedTabsGraph.push(route);
    },
    SET_NODE_FOR_CREATE_GRAPH(state, node) {
      state.mainNode = node;
    },
    SET_CURRENT_ZOOM(state, zoom) {
      state.graphZoom = zoom;
    },
    INC_CURRENT_ZOOM(state, inc) {
      console.log(state.graphZoom + inc);
      state.graphZoom = state.graphZoom + inc;
    },
    SHOW_MODAL(state, object) {
      state.action = object.action;
      state.showModal = object.value;
      state.currentData = object.data;
      state.positionModal.left = object.left;
      state.positionModal.top = object.top;
      state.nodeHTML = object.elem;
      state.sourceObject = object.source;
      state.targetObject = object.target;
    },
    CLOSE_MODAL(state, value) {
      state.showModal = value;
    },
    SET_CURRENT_EDGE(state, edge) {
      state.currentEdge = edge;
    },
    MODIFY_CURRENT_EDGE(state, edge) {
      state.currentEdge = edge;
    },
    SET_GRAPH_API(state, graphApi) {
      state.graph = graphApi;
    },
    SET_CLASS_NAME_BY_CLASS_ID(state, payload) {
      switch (payload) {
        case 408:
          state.className = "Сервис";
          break;
        case 5:
          state.className = "Сетевое оборудование";
          break;
        case 6:
          state.className = "Оконечное оборудование";
          break;
        case 33:
          state.className = "Адаптер";
          break;
      }
    },
    // Деревья
    SET_FILTER_TREE_NODE(state, filter) {
      state.currentFilterTree = filter;
    },
    SET_CHANGED_NODES_BY_TREE(state, changedNodes) {
      state.currentChangedFilters = changedNodes;
    },
    SET_TREE_API(state, treeApi) {
      state.treeApi = treeApi;
    },
  },
  actions: {
    takeRowData({ commit }, data) {
      axios
        .post(data.path, {
          StartRecordIndex: 0,
          ViewName: data.tableName,
        })
        .then((response) => {
          const rows = response.data.Data;
          commit("SET_ROW_DATA", rows);
        });
    },
    filterRowDataServerSide({ commit, getters }, data) {
      let loadedCount = 1;
      let dataSource = {
        getRows: function (params) {
          loadedCount += 1;
          if (loadedCount < 3) {
            commit("SET_OVERLAY_LIST_SERVER_SIDE", "загрузка списка...");
          }
          axios
            .post("assetApi/GetListForAssetObject", {
              StartRecordIndex: params.startRow,
              CountRecords: 40,
              ViewName: "Hardware",
            })
            .then((response) => {
              let lastRow = -1;
              if (response.data.Data.length < 40) {
                lastRow =
                  getters.getTableApi.getDisplayedRowCount() +
                  response.data.Data.length -
                  1;
              }
              commit(
                "SET_COUNT_LOADING_ROWS_SERVER_SIDE",
                getters.getTableApi.getDisplayedRowCount() +
                  response.data.Data.length -
                  1
              );
              params.successCallback(response.data.Data, lastRow);
              commit("HIDE_OVERLAY_LIST_SERVER_SIDE");
              if (response.data.Data.length === 0) {
                commit("SET_OVERLAY_LIST_SERVER_SIDE", "список пуст");
              } else {
                commit("HIDE_OVERLAY_LIST_SERVER_SIDE");
              }
            });
        },
      };
      getters.getTableApi.setDatasource(dataSource);
    },
    resetTreeSettings() {
      axios
        .post("accountApi/ResetTreeParams")
        .then((response) => {})
        .catch((e) => console.log(e));
    },
    takeColumnsServerSide({ commit }, data) {
      axios.get(data.path).then((response) => {
        const columns = response.data;
        const columnDefs = [];
        if (data.enableCheckbox) {
          columnDefs.push({
            width: 40,
            checkboxSelection: true,
            headerName: null,
            field: null,
            lockPosition: true,
          });
        }
        const sortColumnsByOrder = [];
        commit("SET_ENABLE_CHECKBOX_FOR_TABLE", data.enableCheckbox);
        columns.forEach((col) => {
          sortColumnsByOrder[col.Order] = col;
        });
        sortColumnsByOrder.forEach((col) => {
          columnDefs.push(
            new Column(
              col.Text,
              col.MemberName,
              true,
              col.Width,
              true,
              col.SortAsc === true
                ? "asc"
                : col.SortAsc === false
                ? "desc"
                : null,
              col.Order,
              40,
              col.Visible,
              col.UserID
            )
          );
        });
        commit("SET_COLUMNS", columnDefs);
      });
    },
    takeColumns({ commit }, data) {
      axios.get(data.path).then((response) => {
        const columns = response.data;
        const columnDefs = [];
        if (data.enableCheckbox) {
          columnDefs.push({
            width: 40,
            headerCheckboxSelection: true,
            checkboxSelection: true,
            headerName: null,
            field: null,
            lockPosition: true,
          });
        }
        commit("SET_ENABLE_CHECKBOX_FOR_TABLE", data.enableCheckbox);
        const sortColumnsByOrder = [];
        columns.forEach((col) => {
          sortColumnsByOrder[col.Order] = col;
        });
        sortColumnsByOrder.forEach((col) => {
          columnDefs.push(
            new Column(
              col.Text,
              col.MemberName,
              true,
              col.Width,
              true,
              col.SortAsc === true
                ? "asc"
                : col.SortAsc === false
                ? "desc"
                : null,
              col.Order,
              40,
              col.Visible,
              col.UserID
            )
          );
        });
        commit("SET_COLUMNS", columnDefs);
      });
    },
    saveStateTable({ getters }, nameTable) {
      let columns = [];
      // Если чекбоксы
      if (getters.getEnableCheckboxTable) {
        columns = getters.getColumnApi
          .getAllGridColumns()
          .slice(1, getters.getColumnApi.getAllGridColumns().length);
      } else {
        columns = getters.getColumnApi.getAllGridColumns();
      }
      const sendColumns = [];

      columns.forEach((col, index) => {
        sendColumns.push({
          CtrlSortAsc: null,
          ListName: nameTable,
          MemberName: col.userProvidedColDef.field,
          Order: index,
          SortAsc:
            col.sort === "asc" ? true : col.sort === "desc" ? false : null,
          Text: col.userProvidedColDef.headerName,
          UserID: col.userProvidedColDef.colId,
          Visible: col.visible,
          Width: col.actualWidth,
        });
      });
      axios
        .post(
          "accountApi/SignIn",
          JSON.stringify({
            LoginName: "DESKTOP-DBKTI5A\\User",
            PasswordEncrypted: "",
          })
        )
        .then(() => {
          $.ajax({
            url: "http://localhost:49744/accountApi/SetColumnSettingsList",
            method: "POST",
            crossDomain: true,
            xhrFields: { withCredentials: true },
            data: { "": sendColumns },
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
          });
        });
    },
    removeRows({}, data) {
      axios.post(data.path, data.rows).catch((e) => {
        console.log(e);
      });
    },
    saveRows({}, data) {
      axios.post(data.path, data.rows).catch((e) => {
        console.log(e);
      });
    },
  },
  getters: {
    // Схемы
    getMainNode: (state) => state.mainNode,
    getShowModalChoiceGraphNode: (state) => state.showModalChoiceGraphNode,
    getOpenedTabsGraph: (state) => state.openedTabsGraph,
    getCurrentNode: (state) => state.currentNode,
    getCurrentNodeData: (state) => state.currentData,
    getShowModal: (state) => state.showModal,
    getPositionModal: (state) => state.positionModal,
    getHTMLNode: (state) => state.nodeHTML,
    getGraph: (state) => state.graph,
    getActionModal: (state) => state.action,
    getGraphZoom: (state) => state.graphZoom,
    getSourceObject: (state) => state.sourceObject,
    getTargetObject: (state) => state.targetObject,
    getClassNameByClassID: (state) => state.className,
    // Таблицы
    getRowData: (state) => state.rowData,
    getColumns: (state) => state.columnDefs,
    getEnableCheckboxTable: (state) => state.enableCheckboxTable,
    getCurrentLoadingData: (state) => state.loadingRows,
    getCurrentLoadingDataServerSide: (state) => state.loadingRowsServerSide,
    getColumnApi: (state) => state.columnApi,
    getTableApi: (state) => state.tableApi,
    getTableName: (state) => state.tableName,
    getVisibleContentMenu: (state) => state.visibleContextMenu,
    getOptionsContextMenu: (state) => state.optionsContextMenu,
    getCurrentRow: (state) => state.currentRow,
    getVisibleTableModal: (state) => state.showTableModal,
    getActionContextMenu: (state) => state.actionContextMenu,
    // Ганнта
    getVisibleModal: (state) => state.visibleCard,
    getLocale: (state) => state.locale,
    getTasks: (state) => state.tasks,
    getAllServices: (state) => state.allServices,
    getAllCoordinators: (state) => state.allCoordinators,
    getFiltersGannt: (state) => state.filterGannt,
    // Деревья
    getCurrentChangedFilters: (state) => state.currentChangedFilters,
    getTreeApi: (state) => state.treeApi,
    // Общие
    getHeightMenu: (state) => state.heightMenu,
    getWidthTask: (state) => state.widthTask,
  },
  modules: {},
});
