<template>
  <div
    class="overlay-modal overlay-modal-card"
    ref="overlay"
    @click="hideInfoCard"
    v-if="showOverlay"
  >
    <div
      class="modal__card"
      :style="{
        maxWidth: width + 'px',
        minHeight: height + 'px'
      }"
    >
      <div class="modal-card-info">
        <img
          src="@/assets/icons/info.svg"
          alt="icon-info"
          class="modal-card-info__icon"
        />
      </div>
      <slot name="content"> </slot>
      <slot name="controls"> </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoCard",
  props: {
    width: Number,
    height: Number,
    left: Number,
    top: Number,
    showOverlay: Boolean,
    draggable: Boolean,
  },
  methods: {
    hideInfoCard(e) {
      if (!e.target.closest(".modal__card")) {
        this.$emit("hideInfoCard");
      }
    },
  },
  mounted() {
    if (this.draggable) {
      $(".modal__card").draggable({
        containment: "body",
      });
    }
  },
};
</script>

<style lang="scss">
.overlay-modal-card {
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal__card {
  background: white;
  border-radius: 5px;
  box-shadow: 0 25px 40px rgba(93, 110, 127, 0.15);
  cursor: move;
  word-break: break-word;
  position: absolute;
  z-index: 1000;
}
.modal-card-info {
  width: 52px;
  height: 52px;
  background: #8fd6f1;
  border-radius: 5px 0 0 5px;
  position: absolute;
  left: -52px;
  top: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-card-info__icon {
  width: 32px;
  height: 32px;
}
</style>
