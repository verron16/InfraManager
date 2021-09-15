<template>
  <div style="width: 100%">
    <IM_InputSearcher :show-button-search="true"></IM_InputSearcher>
    <TablePanel :column-api="getColumnApi" :gridApi="getApi"></TablePanel>
    <Table
      :list="getRowData"
      :columns="getColumnData"
      :tableName="'TypesPO'"
    ></Table>
    <ContextMenu
      v-if="getVisibleContextMenu"
      v-on-clickaway="showContextMenu"
      :posX="getOptionsContextMenu.posX"
      :posY="getOptionsContextMenu.posY"
    >
      <template v-slot:list>
        <li
          class="context-menu__item context-menu__item-dashed"
          :class="{ disabled: getOptionsContextMenu.validateContextMenu }"
          @click="changeRow"
        >
          Свойства
        </li>
        <li class="context-menu__item" @click="createRow">Создать</li>
        <li
          class="context-menu__item"
          :class="{ disabled: getOptionsContextMenu.validateContextMenu }"
          @click="deleteRow"
        >
          Удалить
        </li>
      </template>
    </ContextMenu>
    <TableModalGuideUsingPO
      v-if="getVisibleTableModal"
      :nameAction="getActionContextMenu"
      :api="getApi"
      :currentRow="getCurrentRow"
      @updateDataRow="updateDataRow"
      @addRow="addRow"
    ></TableModalGuideUsingPO>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Table from "../../Table/Table";
import TablePanel from "../../Table/TablePanel";
import TableModalGuideUsingPO from "./TableModalGuideUsingPO";
import Column from "../../../prototypes/ColumnTable";
import ContextMenu from "../../UI/Components/ContextMenu"
import IM_InputSearcher from "../../UI/Controls/IM_InputSearcher";
export default {
  name: "GuideTypeUsingPO",
  components: {
    IM_InputSearcher,
    TableModalGuideUsingPO,
    Table,
    TablePanel,
    ContextMenu,
  },
  data() {
    return {
      columns: [
        {
          CtrlSortAsc: null,
          ExistsInDatabase: false,
          IsEdit: false,
          IsModified: false,
          ListName: "SoftwareType",
          MemberName: "Name",
          Order: 0,
          SortAsc: true,
          Text: "Название",
          UserID: "b0017ab1-d24c-4146-9b8c-26084da7c27d",
          Visible: true,
          Width: 610,
        },
        {
          CtrlSortAsc: null,
          ExistsInDatabase: false,
          IsEdit: false,
          IsModified: false,
          ListName: "SoftwareType",
          MemberName: "Description",
          Order: 1,
          SortAsc: true,
          Text: "Описание",
          UserID: "b0017ab1-d24c-4146-9b8c-26084da7c27d",
          Visible: true,
          Width: 200,
        },
        {
          CtrlSortAsc: null,
          ExistsInDatabase: false,
          IsEdit: false,
          IsModified: false,
          ListName: "SoftwareType",
          MemberName: "Value",
          Order: 2,
          SortAsc: true,
          Text: "Значение",
          UserID: "b0017ab1-d24c-4146-9b8c-26084da7c27d",
          Visible: true,
          Width: 200,
        },
      ],
      list: [],
    };
  },
  computed: {
    ...mapGetters({
      getRowData: "getRowData",
      getColumnData: "getColumns",
      getColumnApi: "getColumnApi",
      getApi: "getTableApi",
      getVisibleContextMenu: "getVisibleContentMenu",
      getOptionsContextMenu: "getOptionsContextMenu",
      getCurrentRow: "getCurrentRow",
      getVisibleTableModal: "getVisibleTableModal",
      getActionContextMenu: "getActionContextMenu",
    }),
  },
  methods: {
    showContextMenu() {
      this.$store.commit("SET_VISIBLE_CONTEXT_MENU");
    },
    changeRow() {
      if (!this.getOptionsContextMenu.validateContextMenu) {
        this.showContextMenu();
        this.$store.commit("SET_VISIBLE_TABLE_MODAL");
        this.$store.commit("SET_ACTION_CONTEXT_MENU", "change");
      }
    },
    createRow() {
      this.showContextMenu();
      this.$store.commit("SET_VISIBLE_TABLE_MODAL");
      this.$store.commit("SET_ACTION_CONTEXT_MENU", "create");
    },
    addRow(row) {
      this.$store.commit("ADD_ROW", row);
      const getCurrentRows = this.getApi.getModel().rootNode.allChildrenCount;
      this.$store.commit("SET_COUNT_LOADING_ROWS", getCurrentRows);
    },
    updateDataRow(row) {
      this.$store.commit("UPDATE_DATA_ROW", row);
    },
    deleteRow() {
      if (!this.getOptionsContextMenu.validateContextMenu) {
        const selectedRows = this.getApi.getSelectedRows();
        this.$swal({
          html:
            `<h2 class="sweet__title">Удаление: ${
              selectedRows.length === 0
                ? this.getCurrentRow.data.Name
                : selectedRows.length === 1
                ? selectedRows[0].Name
                : "нескольких категорий"
            }</h2>` +
            '<p class="sweet__description">Действительно хотите удалить?</p>',
          showCloseButton: false,
          showCancelButton: true,
          showConfirmButton: true,
          confirmButtonText: "Да",
          cancelButtonText: "Отмена",
          confirmButtonColor: "#aedef4",
          cancelButtonColor: "#b6b6b6",
          allowOutsideClick: false,
          focusConfirm: false,
          focusCancel: false,
        }).then((result) => {
          if (result.value) {
            const selectedData = this.getApi.getSelectedRows();
            if (selectedData.length !== 0) {
              this.getApi.applyTransaction({ remove: selectedData });
              const getCurrentRows =
                this.getApi.getModel().rootNode.allChildrenCount;
              this.$store.commit("SET_COUNT_LOADING_ROWS", getCurrentRows);
              selectedData.forEach((data) => {
                this.$store.dispatch("removeRows", {
                  path: "catalogApi/removeRFCCategory",
                  rows: data,
                });
              });
            } else {
              this.getApi.applyTransaction({
                remove: [this.getCurrentRow.data],
              });
              const getCurrentRows =
                this.getApi.getModel().rootNode.allChildrenCount;
              this.$store.commit("SET_COUNT_LOADING_ROWS", getCurrentRows);
              this.$store.dispatch("removeRows", {
                path: "catalogApi/removeRFCCategory",
                rows: this.getCurrentRow.data,
              });
            }
          } else {
            this.$swal.close();
          }
        });
        this.$store.commit("SET_VISIBLE_CONTEXT_MENU");
      }
    },
  },
  mounted() {
    const self = this;
    // Получение колонок и строк
    function test() {
      let columns = self.columns;

      const sortColumnsByOrder = [];
      let columnDefs = [];
      columns.forEach((col) => {
        sortColumnsByOrder[col.Order] = col;
      });
      columns.forEach((col) => {
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
      self.$store.commit("SET_COLUMNS", columnDefs);
    }
    this.axios
      .post(
        "http://localhost:49744/accountApi/SignIn",
        JSON.stringify({
          LoginName: "DESKTOP-DBKTI5A\\User",
          PasswordEncrypted: "",
        })
      )
      .then(() => {
        test();
        // this.$store.dispatch("takeColumns", {
        //   path: "accountApi/GetColumnSettingsList?listName=SoftwareType",
        // });
      })
      .then(() => {
        this.$store.dispatch("takeRowData", {
          path: "catalogApi/GetRFCCategoryListForTable",
          tableName: "RFCCategory",
          totalRecords: 1000,
          startIndex: 0,
        });
      });
  },
};
</script>

<style lang="scss"></style>
