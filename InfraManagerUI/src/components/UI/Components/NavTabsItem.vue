<template>
  <div style="z-index: 1000">
    <router-link :to="tab.link" class="nav-tabs__item" v-if="routeOn">
      <p class="nav-tabs__title">
        {{ tab.name }}
      </p>
      <img
        src="@/assets/icons/table/cross.svg"
        alt="icon table"
        v-show="showCloseBtn"
      />
    </router-link>
    <div
      :to="tab.link"
      class="nav-tabs__item"
      v-else
    >
      <p class="nav-tabs__title">
        {{ tab.name }}
      </p>
      <img
        src="@/assets/icons/table/cross.svg"
        alt="icon table"
        v-show="showCloseBtn"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "NavTabsItem",
  props: {
    tab: Object,
    showCloseBtn: Boolean,
    routeOn: Boolean,
  },
  methods: {
  },
};
</script>

<style lang="scss">
.nav-tabs {
  &__item {
    &:first-child {
      margin-left: 9px;
    }
    cursor: pointer;
    outline: 1px solid transparent;
    text-decoration: none;
    display: flex;
    align-items: center;
    padding: 0 10px;
    margin-right: 15px;
    height: 40px;
    max-width: 131px;

    white-space: nowrap;
    overflow: hidden;
    background: #f2fafd;
  }
  &__title {
    font-style: normal;
    font-weight: normal;
    font-size: 11px;
    line-height: 13px;
    color: #2b2a29;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}

.router-link-active.nav-tabs__item {
  background: white;
  border-right: 1px solid #c1cfd9;
  border-left: 1px solid #c1cfd9;
  border-top: 1px solid #c1cfd9;
  height: 41px;
}
</style>
