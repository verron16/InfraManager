<template>
  <section class="tree-tags">
    <div class="tree-tags__wrapper">
      <ul class="tree-tags__list">
        <li
          class="tree-tags__item"
          v-for="(node, index) in getCurrentChangedFiltersNode"
          :key="node.id"
        >
          <p class="tree-tags-item__name">{{ node.label }}</p>
          <img
            src="@/assets/icons/catalog/close.svg"
            alt="icon-close"
            class="tree-tags-item__icon"
            @click="removeFilterNode($event, node, index)"
          />
        </li>
      </ul>
      <div class="tree-tags__clear">
        <button
          class="btn__opacity tree-tags__clear-btn"
          @click="resetTreeFilters"
        >
          Очистить фильтры
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "TreeTagsFilters",
  computed: {
    getCurrentChangedFiltersNode() {
      return this.$store.getters.getCurrentChangedFilters;
    },
    getTreeApi() {
      return this.$store.getters.getTreeApi;
    },
  },
  methods: {
    resetTreeFilters() {
      this.$store.dispatch("resetTreeSettings");
      // Сброс кэша в таблице
      this.$store.getters.getTableApi.purgeInfiniteCache();
      // Устанавливаем для тегов пустой массив фильтров
      this.$store.commit("SET_CHANGED_NODES_BY_TREE", []);
      // Устанавливаем флажки на false
      this.getTreeApi.setCheckedNodes([]);
    },
    removeFilterNode(event, node, index) {
      console.log(event, node, index);
      this.getTreeApi.setChecked(node.id, false);
      // this.getCurrentChangedFiltersNode.splice(index, 1)
      console.log( this.getCurrentChangedFiltersNode.splice(index, 1))
      console.log(this.getTreeApi.getCheckedNodes());
      const arr = this.getTreeApi.getCheckedNodes();
      this.$store.commit("SET_CHANGED_NODES_BY_TREE", arr);
    },
  },
};
</script>

<style lang="scss" scoped>
.tree-tags {
  &__wrapper {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  &__clear {
    margin-left: 15px;

    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    &-btn {
      white-space: nowrap;
    }
  }
  &__item {
    display: flex;
    align-items: center;
    padding: 2px 5px;
    background: #bdd0da;
    border-radius: 2px;
    margin-right: 15px;
    margin-bottom: 12px;
    &:last-child {
      margin-right: 0;
    }
  }
  &__list {
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    max-height: 100px;
  }
  &-item {
    &__name {
      font-style: normal;
      font-weight: normal;
      font-size: 11px;
      line-height: 13px;
      color: #2b2a29;
      margin-right: 2px;
    }
    &__icon {
      cursor: pointer;
    }
  }
}
</style>
