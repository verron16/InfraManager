<template>
  <Modal
    :width="1216"
    :height="700"
    :only-parent="true"
    :resizable="true"
    :controls="true"
    v-if="showModal"
  >
    <template v-slot:modal__header>
      <h2 class="modal__title">
        Выбор объекта для создания схемы зависимостей
      </h2>
    </template>
    <template v-slot:content>
      <div class="dialog-content">
        <TasksNav :tabs="tabs" class="dialog-content__tabs"></TasksNav>
        <div class="dialog-content__wrapper">
          <div class="dialog-content__wrapper-tree">
            <Tree></Tree>
          </div>
          <div class="dialog-content__wrapper-table">
            <TableSearch :showButtonSearch="true"></TableSearch>
            <TablePanel
              :column-api="getColumnApi"
              :grid-api="getApi"
              :server-side="true"
            ></TablePanel>
            <TableServerSide
              :columns="getColumnData"
              :list="getRowData"
              :height="418"
              :tableName="'Hardware'"
            ></TableServerSide>
            <router-view></router-view>
            <TreeTagsFilters></TreeTagsFilters>
            <div class="modal__buttons">
              <button class="button btn__second-priority dialog-content__btn-cancel" @click="hideModal">
                Отмена
              </button>
              <button
                class="button btn__first-priority dialog-content__btn-save"
                @click="changeNodeForCreateGraph"
              >
                Выбрать
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script>
import Modal from "../UI/Components/Modal";
import TasksNav from "../UI/Components/NavTabs";
import Tree from "../UI/Components/Tree";
import TableSearch from "../Table/TableSearch";
import TablePanel from "../Table/TablePanel";
import TableServerSide from "../Table/TableServerSide";
import TreeTagsFilters from "../UI/Components/TreeTagsFilters";
export default {
  name: "ModalChoiceGraphNode",
  components: {
    TreeTagsFilters,
    Tree,
    TableServerSide,
    TableSearch,
    TasksNav,
    Modal,
    TablePanel,
  },
  data() {
    return {
      showModal: true,
      list: [],
      columns: [],
      tabs: [
        {
          name: "Каталог продуктов",
          link: "/guides/choice/products",
        },
        {
          name: "Каталог услуг",
          link: "/guides/choice/services",
        },
      ],
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
  },
  methods: {
    hideModal() {
      this.showModal = !this.showModal;
    },
    changeNodeForCreateGraph() {
      console.log(this.getApi.getSelectedRows());
      if (this.getApi.getSelectedRows().length !== 0) {
        const node = this.getApi.getSelectedRows()[0];
        this.$store.commit("SET_NODE_FOR_CREATE_GRAPH", node);
        this.hideModal();
        this.$router.push("guides")
      } else {
        this.$swal({
          html:
            `<h2 class="sweet__title">Невозможно построить схему взаимосвязей</h2>` +
            '<p class="sweet__description">Необходимо выбрать объект <br>для построения схемы взаимосвязей</p>',
          showCloseButton: false,
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: "Ок",
          confirmButtonColor: "#aedef4",
          cancelButtonColor: "#b6b6b6",
          allowOutsideClick: false,
          focusConfirm: false,
          focusCancel: false,
        }).then(() => {
          this.$swal.close();
        });
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
        this.$store.dispatch("takeColumnsServerSide", {
          path: "accountApi/GetColumnSettingsList?listName=Hardware",
        });
      });
    // .then(() => {
    //   this.$store.dispatch("takeRowData", {
    //     path: "assetApi/GetListForAssetObject",
    //     tableName: "Hardware",
    //   });
    // });
  },
  mounted() {
    $(".dialog-content__wrapper-tree").resizable({
      handles: "e",
      minHeight: self.height,
      maxWidth: 700,
      minWidth: 150,
    });
  },
};
</script>

<style lang="scss">
.dialog-content__wrapper-table .search__wrapper {
  margin-top: 0;
  margin-bottom: 20px;
}
.modal__title {
  margin: 0;
}
.dialog-content {
  &__tabs {
    margin-top: 0 !important;
  }
  &__btn {
    &-cancel {
      margin-right: 10px;
    }
  }
  &__wrapper {
    margin-top: 20px;
    display: flex;
    &-table {
      padding-left: 15px;
      width: 100%;
      //max-height: 418px;
      height: 100%;
    }
    &-tree {
      max-width: 307px;
      width: 100%;
    }
  }
}
</style>
