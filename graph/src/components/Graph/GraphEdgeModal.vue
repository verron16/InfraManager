<template>
  <info-card>
    <template v-slot:content>
      <div class="modal-card__wrapper">
        <h3 class="modal-card__title">Элемент схемы зависимостей</h3>
        <div class="modal-card__box">
          <p class="modal-card__field">Элемент</p>
          <p class="modal-card__field-value">Соединительная линия</p>
        </div>
        <div class="modal-card__box">
          <p class="modal-card__field">Выход</p>
          <p class="modal-card__field-value">
            {{ sourceObject.name }}
          </p>
        </div>
        <div class="modal-card__box">
          <p class="modal-card__field">Вход</p>
          <p class="modal-card__field-value">
            {{ targetObject.name }}
          </p>
        </div>
        <div class="modal-card__box">
          <p class="modal-card__field">Коэффициент</p>
          <input type="number" class="modal-card__coeff" v-model="coeff" />
        </div>
      </div>
    </template>
    <template v-slot:controls>
      <div class="modal-card__btns modal-card__btns-edge">
        <button class="modal-card-close__btn" @click="closeModal">
          Закрыть
        </button>
        <button class="modal-card-save__btn">Сохранить</button>
      </div>
    </template>
  </info-card>
</template>

<script>
import InfoCard from "../UI/Components/InfoCard";
export default {
  name: "GraphEdgeModal",
  components: { InfoCard },
  data() {
    return {
      coeff: 1,
    };
  },
  computed: {
    sourceObject() {
      return this.$store.getters.getSourceObject;
    },
    targetObject() {
      return this.$store.getters.getTargetObject;
    },
  },
  methods: {
    closeModal() {
      this.$emit("close-modal");
    },
  },
};
</script>

<style lang="scss">
.modal-card-save__btn {
  background: #aedef4;
  border-radius: 5px;
  outline: none;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  color: white;
  font-weight: 400;
  line-height: 16px;
  font-size: 14px;
  margin-left: 10px;
}

.modal-card-save__btn:hover {
  background: #a7d5ea;
}
.modal-card__btns-edge {
  padding-bottom: 24px;
}
</style>
