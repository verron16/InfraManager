<template>
  <section class="tasks-nav">
    <div class="tasks-nav__wrapper">
      <!-- Элемент переключателя / ссылки -->
      <NavTabsItem
        v-for="(tab, index) in tabs"
        :key="index"
        :tab="tab"
        :show-close-btn="showCloseBtn"
        :routeOn="routeOn"
        :class="{ 'active-tab-nav': tab.name === currentActiveTab }"
        @click.native="routeOn ? false : setCurrentTab(tab)"
      ></NavTabsItem>
    </div>
    <div class="tasks-nav__item-btn" v-show="addButton" @click="addGraph">
      <img
        src="@/assets/icons/graph/add-scheme.svg"
        alt="icon"
        class="tasks-nav__item-btn-add"
      />
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
    addButton: Boolean,
    showCloseBtn: Boolean,
    routeOn: Boolean,
    defaultActiveTab: String,
  },
  data() {
    return {
      currentActiveTab: this.defaultActiveTab || "",
    };
  },
  methods: {
    addGraph() {
      this.$store.commit("UPDATE_VISIBLE_MODAL_CHOICE_GRAPH_NODE", true);
    },
    setCurrentTab(tab) {
      this.currentActiveTab = tab.name;
    },
  },
};
</script>

<style lang="scss">
.active-tab-nav .nav-tabs__item {
  background: white;
  border-right: 1px solid #c1cfd9;
  border-left: 1px solid #c1cfd9;
  border-top: 1px solid #c1cfd9;
  height: 41px;
}

.tasks-nav {
  width: 100%;
  height: 44px;
  margin-top: 10px;
  border-bottom: 1px solid #c1cfd9;
  display: flex;
  &__wrapper {
    display: flex;
    align-items: center;
    height: 48px;
  }
  &__item {
    &-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      &-add {
        cursor: pointer;
      }
    }
  }
}
</style>
