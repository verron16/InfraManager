<template>
  <Modal :width="600" :height="345" :controls="true" :controls-absolute="true">
    <template v-slot:modal__header>
      <h3 class="modal__title" v-if="getActionContextMenu === 'create'">
        Создание категории запроса на изменение
      </h3>
      <h3 class="modal__title" v-else>
        Редактирование категории {{ getCurrentRow.data.Name }}
      </h3>
    </template>
    <!-- Основной контент модального окна -->
    <template v-slot:content>
      <div class="modal__content-field">
        <p class="modal__content-text" ref="name">Название категории RFC</p>
        <IM_Input
          v-if="getActionContextMenu === 'change'"
          placeholder="Введите название"
          v-model="getCurrentRow.data.Name"
          :className="getCurrentRow.data.Name === '' ? 'field__writing' : ''"
        ></IM_Input>
        <IM_Input
          v-else
          placeholder="Введите название"
          v-model="name"
          :className="name === '' ? 'field__writing' : ''"
        ></IM_Input>
      </div>
    </template>
    <template v-slot:buttons>
      <button
        class="button modal__buttons-cancel btn__second-priority"
        @click="hideModal"
      >
        Отмена
      </button>

      <button
        class="button btn__first-priority"
        @click="addRow"
        v-if="getActionContextMenu === 'create'"
      >
        Добавить
      </button>
      <button class="button btn__first-priority" @click="saveChanges" v-else>
        Сохранить
      </button>
    </template>
  </Modal>
</template>

<script>
import { mapGetters } from "vuex";
import IM_Input from "../../UI/Controls/IM_Input";
import Modal from "../../UI/Components/Modal";
export default {
  name: "TableModalCategoriesRFC",
  components: { Modal, IM_Input },
  data() {
    return {
      name: "",
    };
  },
  computed: {
    ...mapGetters({
      getApi: "getTableApi",
      getCurrentRow: "getCurrentRow",
      getActionContextMenu: "getActionContextMenu",
    }),
  },
  methods: {
    hideModal() {
      this.showSweetModal();
    },
    showSweetModal() {
      this.$swal({
        html:
          '<h2 class="sweet__title">Закрытие формы</h2>' +
          '<p class="sweet__description">Вы действительно хотите закрыть форму с потерей всех изменений?</p>',
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
          this.$store.commit("SET_VISIBLE_TABLE_MODAL");
        } else {
          this.$swal.close();
        }
      });
    },
    showErrorField() {
      this.$swal({
        html:
          '<h2 class="sweet__title">Не заполнены обязательные поля</h2>' +
          `<p class="sweet__description">Заполните поле "${this.$refs.name.textContent.trim()}"`,
        showCloseButton: false,
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: "ОК",
        confirmButtonColor: "#aedef4",
        allowOutsideClick: false,
        focusConfirm: false,
        focusCancel: false,
      });
    },
    addRow() {
      if (this.name !== "") {
        this.$store.dispatch("saveRows", {
          path: "catalogApi/saveRFCCategory",
          rows: { ID: "", Name: this.name },
        });
        this.$store.commit("SET_VISIBLE_TABLE_MODAL");
        this.$store.commit("ADD_ROW", { ID: "", Name: this.name });
        const getCurrentRows = this.getApi.getModel().rootNode.allChildrenCount;
        this.$store.commit("SET_COUNT_LOADING_ROWS", getCurrentRows);
      } else {
        this.showErrorField();
      }
    },
    saveChanges() {
      if (this.getCurrentRow.data.Name !== "") {
        this.axios.post(
          "http://localhost:49744/catalogApi/saveRFCCategory",
          this.getCurrentRow.data
        );
        this.$store.commit("SET_VISIBLE_TABLE_MODAL");
        this.$store.commit("UPDATE_DATA_ROW", this.getCurrentRow.data);
      } else {
        this.showErrorField();
      }
    },
  },
};
</script>

<style lang="scss">
.modal {
  box-shadow: 0 25px 40px rgba(93, 110, 127, 0.15);
  &__label {
    font-family: Arial, sans-serif;
    font-size: 12px;
    line-height: 14px;
    color: #2b2a29;
    display: flex;
    cursor: pointer;
    width: 105px;
    margin-top: 40px;

    &-checkbox {
      width: 13px;
      height: 13px;
      margin-right: 5px;
      margin-top: 0;
    }
  }

  &__controls {
    display: flex;

    &-icon {
      width: 30px;
      height: 30px;
    }

    &-btn {
      background: transparent;
      outline: none;
      cursor: pointer;
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;

      &:hover {
        background: #c7eaf8;
      }
    }
  }

  &__title {
    font-family: Arial, sans-serif;
    color: black;
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;
    padding: 8px 0;
  }

  &__content {
    &-overflow {
      height: 66px;
    }

    &-area {
      resize: none;
      padding: 5px;
      width: calc(100% - 14px);
      border: 1px solid #bdd0da;
      outline: none;
      height: 64px;
      margin-bottom: 20px;

      &:focus {
        border: 2px solid #81aef0;
      }
    }

    &-text {
      margin-bottom: 5px;
      color: #9d9e9e;
      font-size: 11px;
      line-height: 15px;
      font-family: Arial, sans-serif;

      &:nth-child(3) {
        margin-top: 20px;
      }
    }
  }
}
</style>
