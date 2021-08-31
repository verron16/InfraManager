<template>
  <section class="guides-layout">
    <div class="guides-layout__wrapper">
      <Tasks></Tasks>
      <div class="guides-layout__content">
        <TasksNav :tabs="tabs"></TasksNav>
        <div class="guides-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Tasks from "./Tasks/Tasks";
import TasksNav from "../UI/Components/NavTabs";
export default {
  name: "GuidesLayout",
  components: { TasksNav, Tasks },
  data() {
    return {
      height: 0,
      tabs: [
        {
          name: "Схема взаимосвязей",
          link: "/guides/guides",
        },
        {
          name: "Категории RFC",
          link: "/guides/categoriesRFC",
        },
        {
          name: "Типы использования ПО",
          link: "/guides/typesPO",
        },
        {
          name: "Вызов схемы взаимосвязей",
          link: "/guides/choice/products",
        },
        {
          name: "Диаграмма Ганнта",
          link: "/guides/gannt",
        },
      ],
    };
  },
  computed: {
    getHeightMenu() {
      return this.$store.getters.getHeightMenu;
    },
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
.guides-layout {
  &__wrapper {
    display: flex;
  }
  &__content {
    width: calc(100% - 106px);
  }
}
.guides-content {
  margin: 10px;
}
</style>
