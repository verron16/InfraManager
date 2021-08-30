<template>
  <router-link :to="tab.link" class="nav-tabs__item">
    <p class="nav-tabs__title">
      {{ tab.name }}
    </p>
  </router-link>
</template>

<script>
export default {
  name: "NavTabsItem",
  props: {
    tab: Object,
  },
};
</script>

<style lang="scss" scoped>
.nav-tabs {
  &__item {
    &:first-child {
      margin-left: 10px;
    }
    text-decoration: none;
    display: flex;
    align-items: center;
    padding: 0 10px;
    margin-right: 15px;
    justify-content: center;
    height: 40px;
    background: #f2fafd;
    border: none;
  }
  &__title {
    font-style: normal;
    font-weight: normal;
    font-size: 11px;
    line-height: 13px;
    color: #2b2a29;
  }
}

.router-link-active {
  background: white;
  border-right: 1px solid #c1cfd9;
  border-left: 1px solid #c1cfd9;
  border-top: 1px solid #c1cfd9;
  height: 41px;
}
</style>
