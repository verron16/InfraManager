<template>
  <!-- Модальное окно выбора объекта для схемы взаимосвязей -->
  <Modal
    :width="1216"
    :height="840"
    :only-parent="true"
    :resizable="true"
    :controls="true"
    v-if="showModal"
  >
    <!-- Шапка окна -->
    <template v-slot:modal__header>
      <h2 class="modal__title">
        Выбор объекта для создания схемы зависимостей
      </h2>
    </template>

    <!-- Основной контент -->
    <template v-slot:content>
      <div class="dialog-content">
        <!-- Основная навигация в окне -->
        <TasksNav
          :tabs="tabs"
          default-active-tab="Каталог продуктов"
          :routeOn="false"
          class="dialog-content__tabs"
        ></TasksNav>
        <div class="dialog-content__wrapper">
          <div class="dialog-content__wrapper-tree">
            <!-- Дерево, по которому фильтруется таблица -->
            <Tree></Tree>
          </div>
          <div class="dialog-content__wrapper-table">
            <!-- Поиск по таблице -->
            <IM_InputSearcher :show-button-search="true"></IM_InputSearcher>

            <!-- Панель управления для таблиц -->
            <TablePanel
              :column-api="getColumnApi"
              :grid-api="getApi"
              :server-side="true"
            ></TablePanel>

            <!-- Таблица -->
            <TableServerSide
              :columns="getColumnData"
              :list="getRowData"
              :height="418"
              :tableName="'Hardware'"
            ></TableServerSide>

            <!-- Активные фильтры, выбранные в дереве для таблицы -->
            <TreeTagsFilters></TreeTagsFilters>

            <!-- Контролы управления окном -->
            <div class="modal__buttons modal__buttons-graph-choice ">
              <button
                class="button btn__second-priority dialog-content__btn-cancel"
                @click="hideModal"
              >
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
import { mapGetters } from "vuex";

import Modal from "../UI/Components/Modal";
import TasksNav from "../UI/Components/NavTabs";
import Tree from "../UI/Components/Tree";
import TablePanel from "../Table/TablePanel";
import TableServerSide from "../Table/TableServerSide";
import TreeTagsFilters from "../UI/Components/TreeTagsFilters";
import IM_InputSearcher from "../UI/Controls/IM_InputSearcher";
export default {
  name: "ModalChoiceGraphNode",
  components: {
    IM_InputSearcher,
    TreeTagsFilters,
    Tree,
    TableServerSide,
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
          link: "/scheme/change/products",
        },
        {
          name: "Каталог услуг",
          link: "/scheme/change/services",
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      getRowData: "getRowData",
      getColumnData: "getColumns",
      getColumnApi: "getColumnApi",
      getApi: "getTableApi",
    }),
  },
  methods: {
    hideModal() {
      this.showModal = !this.showModal;
      // Очистка выбранных узлов для фильтрации, после скрытия модального окна
      this.showModal === false
        ? this.$store.commit("SET_CHANGED_NODES_BY_TREE", [])
        : false;
      this.$store.commit("UPDATE_VISIBLE_MODAL_CHOICE_GRAPH_NODE", false);
    },
    changeNodeForCreateGraph() {
      // Проверяем, выбран ли объект в таблице для построения схемы
      if (this.getApi.getSelectedRows().length !== 0) {
        // Берем первый элемент массива выбранных строк
        const node = this.getApi.getSelectedRows()[0];
        console.log(node);
        // Устанавливаем объект, для которого строится схема
        this.$store.commit("SET_NODE_FOR_CREATE_GRAPH", node);
        // Добавляем вкладку с объектом
        this.$store.commit("ADD_OPENED_TAB_GRAPH", {
          name: node.ModelName,
          link: "/scheme/" + node.ID,
        });
        this.hideModal();
        this.$router.push("/scheme/" + node.ID);
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
          enableCheckbox: true
        });
      });
  },
  mounted() {
    // Ресайз для дерева
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
.modal__buttons-graph-choice {
  position: absolute;
  bottom: 25px;
  right: 25px;
}
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
      .im-search__wrapper {
        margin: 20px 0;
      }
    }
    &-tree {
      width: 307px;
      min-width: 250px;
      max-height: 500px;
      .ui-resizable-handle {
        width: 5px;
        cursor: col-resize;
        &:hover {
          background: #BDD0DA;
        }
      }
    }
  }
}
</style>
