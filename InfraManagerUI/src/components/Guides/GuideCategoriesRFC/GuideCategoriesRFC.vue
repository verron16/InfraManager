<template>
  <div style="width: 100%">
    <TablePanel :column-api="getColumnApi" :gridApi="getApi"></TablePanel>
    <Table
      :list="getRowData"
      :columns="getColumnData"
      :tableName="'RFCCategory'"
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
    <TableModalCategoriesRFC
      v-if="getVisibleTableModal"
      :nameAction="getActionContextMenu"
      :api="getApi"
      :currentRow="getCurrentRow"
      @updateDataRow="updateDataRow"
      @addRow="addRow"
    ></TableModalCategoriesRFC>
  </div>
</template>

<script>
import Table from "../../Table/Table";
import TablePanel from "../../Table/TablePanel";
import ContextMenu from "../../Table/ContextMenu";
import TableModalCategoriesRFC from "./TableModalCategoriesRFC";

export default {
  name: "GuideCategoriesRFC",
  components: {
    TableModalCategoriesRFC,
    Table,
    TablePanel,
    ContextMenu,
  },
  data() {
    return {
      columns: [],
      list: [],
    };
  },
  computed: {
    getRowData() {
      return this.$store.getters.getRowData;
    },
    getColumnData() {
      return this.$store.getters.getColumns;
    },
    getColumnApi() {
      return this.$store.getters.getColumnApi;
    },
    getApi() {
      return this.$store.getters.getTableApi;
    },
    getVisibleContextMenu() {
      return this.$store.getters.getVisibleContentMenu;
    },
    getOptionsContextMenu() {
      return this.$store.getters.getOptionsContextMenu;
    },
    getCurrentRow() {
      return this.$store.getters.getCurrentRow;
    },
    getVisibleTableModal() {
      return this.$store.getters.getVisibleTableModal;
    },
    getActionContextMenu() {
      return this.$store.getters.getActionContextMenu;
    },
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
  beforeMount() {
    // Получение колонок и строк
    this.axios
      .post(
        "http://localhost:49744/accountApi/SignIn",
        JSON.stringify({
          LoginName: "DESKTOP-DBKTI5A\\User",
          PasswordEncrypted: "",
        })
      )
      .then(() => {
        this.$store.dispatch("takeColumns", {
          path: "accountApi/GetColumnSettingsList?listName=RFCCategory"
        });
      })
      .then(() => {
        this.$store.dispatch("takeRowData", {
          path: "catalogApi/GetRFCCategoryListForTable",
          tableName: "RFCCategory",
          totalRecords: 1000,
          startIndex: 0
        });
      });
  },
};
</script>

<style lang="scss"></style>
