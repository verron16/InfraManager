<template>
  <InfoCard>
    <template v-slot:content>
      <div class="modal-card__wrapper">
        <h3 class="modal-card__title">Узел схемы зависимостей</h3>
        <div class="modal-card__box-wrapper">
          <div
            class="modal-card__box"
            v-for="(item, index) in createSortFields"
            :key="index"
          >
            <p class="modal-card__field">
              {{ item.FieldName }}
            </p>
            <div>
              <p
                class="modal-card__field-value"
                v-if="!item.FieldValue == '' || !item.FieldValue == null"
              >
                {{ item.FieldValue }}
              </p>
              <p class="modal-card__field-value" v-else>-</p>
            </div>
          </div>
        </div>
        <div class="modal-card">
          <img
            src="@/assets/icons/Avatar.png"
            alt="avatar"
            class="modal-card__picture"
          />
          <div class="modal-card__content">
            <h4 class="modal-card-content__title">Заказчик</h4>
            <h3 class="modal-card-content__name">Воскресенская Лилия</h3>
            <p class="modal-card-content__num">232</p>
            <p class="modal-card-content__post">
              Специалист технической поддержки
            </p>
            <p class="modal-card-content__place">IT Департамент</p>
            <a
              href="mailto:test@gmail.com"
              class="modal-card-content__contacts-email"
              >test@gmail.com
            </a>
          </div>
        </div>
        <div class="modal-card">
          <img
            src="../../assets/icons/Avatar.png"
            alt="avatar"
            class="modal-card__picture"
          />
          <div class="modal-card__content">
            <h4 class="modal-card-content__title">Владелец</h4>
            <h3 class="modal-card-content__name">Воскресенская Лилия</h3>
            <p class="modal-card-content__num">232</p>
            <p class="modal-card-content__post">
              Специалист технической поддержки
            </p>
            <p class="modal-card-content__place">IT Департамент</p>
            <a
              href="mailto:test@gmail.com"
              class="modal-card-content__contacts-email"
              >test@gmail.com
            </a>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:controls>
      <div class="modal-card-close">
        <button class="modal-card-close__btn" @click="closeModal">
          Закрыть
        </button>
      </div>
    </template>
  </InfoCard>
</template>

<script>
import InfoCard from "../UI/Components/InfoCard";

export default {
  name: "GraphNodeModal",
  components: { InfoCard },
  props: {
    data: Array,
  },
  data() {
    return {};
  },
  computed: {
    getPositionModal() {
      return this.$store.getters.getPositionModal;
    },
    getCurrentNodeData() {
      return this.$store.getters.getCurrentNodeData;
    },
    createSortFields() {
      const self = this;
      let newArrayFields = [];
      for (let i = 0; i < this.getCurrentNodeData.fields.length; i++) {
        if (this.getCurrentNodeData.fields[i].FieldName === "Название") {
          newArrayFields.splice(0, 0, this.getCurrentNodeData.fields[i]);
        } else if (this.getCurrentNodeData.fields[i].FieldName === "Тип") {
          newArrayFields.splice(1, 0, this.getCurrentNodeData.fields[i]);
        } else if (
          this.getCurrentNodeData.fields[i].FieldName === "Категория"
        ) {
          newArrayFields.splice(2, 0, this.getCurrentNodeData.fields[i]);
        } else if (this.getCurrentNodeData.fields[i].FieldName === "Класс") {
          newArrayFields.splice(3, 0, this.getCurrentNodeData.fields[i]);
        } else if (
          this.getCurrentNodeData.fields[i].FieldName === "Состояние"
        ) {
          newArrayFields.splice(4, 0, this.getCurrentNodeData.fields[i]);
        } else {
          newArrayFields.push(this.getCurrentNodeData.fields[i]);
        }
      }
      console.log(newArrayFields);
      return newArrayFields;
    },
  },
  methods: {
    closeModal() {
      this.$emit("close-modal");
    },
    checkField(field) {
      this.getCurrentNodeData.fields.forEach((fieldBox) => {
        if (field === fieldBox.FieldName) {
          console.log(field);
          return fieldBox;
        }
      });
    },
  },
};
</script>

<style lang="scss">
.modal__box-type {
  display: flex;
  align-items: center;
}

.modal-card {
  display: flex;
  padding-top: 13px;

  &__box {
    padding-top: 10px;

    &-icon {
      width: 16px;
      height: 16px;
      margin-right: 10px;
      background-repeat: no-repeat;

      &__user-service {
        background-image: url("../../assets/icons/graph/settings.svg");
      }

      &__system-service {
        background-image: url("../../assets/icons/lock-settings.svg");
      }
    }
  }

  &__title {
    font-weight: 700;
    font-size: 12px;
    line-height: 19px;
    color: black;
  }

  &__coeff {
    height: 26px;
    border: 1px solid #bdd0da;
    outline: none;
    width: 288px;
    padding: 0 5px;
  }

  &__field {
    font-weight: 400;
    font-size: 11px;
    line-height: 15px;
    padding-bottom: 7px;
    color: #9d9e9e;

    &-value {
      font-weight: 400;
      font-size: 12px;
      color: #2b2a29;
      line-height: 17px;
    }
  }

  &__wrapper {
    padding: 24px;
    overflow-y: auto;
    max-height: 450px;
  }

  &__picture {
    width: 43px;
    height: 43px;
  }

  &__content {
    padding-left: 11px;
  }

  &-content {
    &__title {
      color: #61d6f2;
      line-height: 14px;
      font-size: 12px;
      padding-bottom: 7px;
    }

    &__name {
      font-weight: 700;
      color: #000000;
      line-height: 14px;
      font-size: 12px;
      padding-bottom: 7px;
    }

    &__num {
      font-size: 12px;
      font-style: italic;
      color: #000000;
      line-height: 14px;
      padding-bottom: 7px;
    }

    &__post {
      font-size: 12px;
      color: #000000;
      line-height: 14px;
      padding-bottom: 7px;
    }

    &__place {
      font-size: 11px;
      font-style: italic;
      color: #000000;
      line-height: 13px;
    }

    &__contacts {
      &-email {
        color: #43a2e3;
        text-decoration: none;
        line-height: 13px;
        font-size: 12px;
        font-style: italic;
      }
    }
  }

  &__btns {
    text-align: center;
  }

  &-close {
    text-align: center;
    padding-bottom: 24px;

    &__btn {
      margin: 24px auto 0 auto;
      background: #d0d0d0;
      border-radius: 5px;
      outline: none;
      border: none;
      padding: 10px 20px;
      cursor: pointer;
      color: white;
      font-weight: 400;
      line-height: 16px;
      font-size: 14px;

      &:hover {
        background: #c8c8c8;
      }
    }
  }
}
</style>
