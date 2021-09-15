<template>
  <div class="overlay-modal" ref="overlay">
    <div
      class="modal"
      :class="{ modal__maximize: maximize }"
      :style="{
        left: left,
        top: top,
        width: width + 'px',
        minHeight: height + 'px',
      }"
      ref="modal"
      v-on-clickaway="hideModal"
    >
      <div class="modal__panel">
        <slot name="modal__header"></slot>
        <div class="modal__controls" v-if="controls">
          <button
            class="modal__controls-max modal__controls-btn"
            @click="setMaxSize"
          >
            <img
              v-if="!maximize"
              src="@/assets/icons/table/maximize.svg"
              alt="modal-control-icon"
              class="modal__controls-icon"
            />
            <img
              v-else
              src="@/assets/icons/table/nomaximize.svg"
              alt="modal-control-icon"
              class="modal__controls-icon"
            />
          </button>
          <button
            class="modal__controls-close modal__controls-btn"
            @click.prevent="hideModal"
            ref="close"
          >
            <img
              src="@/assets/icons/table/close.svg"
              alt="modal-control-icon"
              class="modal__controls-icon"
            />
          </button>
        </div>
      </div>

      <!-- Основной контент модального окна -->
      <div class="modal__content">
        <slot name="content" class="modal-main"> </slot>
      </div>

      <!-- Кнопки модального окна -->
      <div
        class="modal__buttons"
        :class="{ 'modal__controls-absolute': controlsAbsolute }"
      >
        <slot name="buttons"> </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    width: Number,
    height: Number,
    controls: Boolean,
    controlsAbsolute: Boolean,
  },
  data() {
    return {
      maximize: false,
      left: `calc( 50% - ${this.width / 2}px)`,
      top: `calc(50% - ${this.height / 2}px)`,
    };
  },
  methods: {
    setMaxSize() {
      this.maximize = !this.maximize;
    },
    hideModal(e) {
      if (!e.target.closest(".overlay-modal") && e.target.closest(".modal") || e.target.closest(".swal2-cancel")) {
        return true;
      } else {
        this.$parent.hideModal();
      }
    },
  },
  mounted() {
    const self = this;
    // Установка первоначальной позиции окна
    $(".modal")
      .draggable({
        handle: ".modal__panel",
        containment: ".overlay-modal",
      })
      .resizable({
        containment: ".overlay-modal",
        handles: "all",
        minHeight: self.height,
        minWidth: self.width,
      });
  },
};
</script>

<style lang="scss">
.sweet {
  &__title {
    font-family: Arial, sans-serif;
    color: #37a2e6;
    font-size: 15px;
    text-align: center;
    text-transform: none;
    position: relative;
    margin: 25px 0;
    padding: 0;
    display: block;
  }

  &__description {
    font-family: Arial, sans-serif;
    color: #575757;
    display: block;
    font-size: 14px;
    text-align: center;
    font-weight: 200;
    position: relative;
    text-transform: none;
    margin: 25px 0;
    padding: 0;
    line-height: 20px;
  }
}

.overlay {
  &-modal {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    width: 100%;
    height: 100%;
  }
}

.modal {
  background: white;
  position: relative;
  &__maximize {
    width: 100% !important;
    height: 100% !important;
    left: 0 !important;
    right: 0 !important;
    top: 0 !important;
    bottom: 0 !important;
  }

  &__buttons {
    margin-top: 25px;
    display: flex;
    bottom: 25px;
    justify-content: flex-end;
    right: 25px;
    &-cancel {
      margin-right: 10px;
    }
  }

  &__controls {
    display: flex;
    &-absolute {
      position: absolute;
    }
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
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  &__panel {
    background: #aedef4;
    display: flex;
    cursor: grab;
    align-items: center;
    padding-left: 10px;
    justify-content: space-between;
  }

  &__content {
    padding: 20px 25px;
    background: white;
    font-family: Arial, sans-serif;
  }
}
</style>
