<template>
  <div
    :class="{
      'overlay-modal': showOverlay,
      'overlay-modal-card': showOverlay,
    }"
    ref="overlay"
    @click="hideInfoCard"
  >
    <div
      class="modal__card"
      :style="{
        maxWidth: width + 'px',
        minHeight: height + 'px',
        left: left + 'px',
        top: top + 'px',
      }"
    >
      <div class="modal-card-info">
        <img
          src="@/assets/icons/info.svg"
          alt="icon-info"
          class="modal-card-info__icon"
        />
      </div>
      <div>
        <slot name="content"> </slot>
      </div>
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
    parentClass: String
  },
  methods: {
    hideInfoCard(e) {
      if (!e.target.closest(".modal__card")) {
        this.$emit("hideInfoCard");
      }
    },
  },
  mounted() {
    const self = this;
    if (this.draggable) {
      $(".modal__card").draggable({
        containment: self.parentClass,
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
