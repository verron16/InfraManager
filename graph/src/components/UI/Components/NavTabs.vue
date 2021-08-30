<template>
  <section class="tasks-nav">
    <div class="tasks-nav__wrapper">
      <NavTabsItem
        v-for="(tab, index) in tabs"
        :key="index"
        :tab="tab"
      ></NavTabsItem>
    </div>
  </section>
</template>

<script>
import NavTabsItem from "./NavTabsItem";
export default {
  name: "NavTabs",
  components: { NavTabsItem },
  props: {
    tabs: Array,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.tasks-nav {
  width: 100%;
  height: 44px;
  margin-top: 10px;
  border-bottom: 1px solid #c1cfd9;
  &__wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    height: 48px;
  }
}
</style>
