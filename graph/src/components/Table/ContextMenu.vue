<template>
  <div class="context-menu" :style="`left:${posX}px; top:${posY}px`">
    <ul class="context-menu__list">
      <slot name="list"></slot>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ContextMenu",
  props: {
    posX: Number,
    posY: Number,
  },
};
</script>

<style lang="scss" scoped>
.context-menu {
  font-family: Arial, sans-serif;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.25), 0 2px 4px rgba(0, 0, 0, 0.25);
  background: white;
  position: absolute;
  top: 50px;
  left: 100px;
  min-width: 160px;
  z-index: 100;
  &__list {
    list-style: none;
  }
  &__item {
    font-size: 12px;
    padding: 6px;
    line-height: 14px;
    color: black;
    &:hover {
      background: #f2fafd;
      cursor: pointer;
    }
    &-dashed {
      border-bottom: 1px solid #c1cfd9;
    }
  }
}
.disabled {
  color: rgba(0, 0, 0, 0.2);
  &:hover {
    cursor: default;
    background: white;
  }
}
</style>
