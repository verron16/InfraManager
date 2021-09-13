<template>
  <section class="guides-layout">
    <div class="guides-layout__wrapper">
      <!-- Основная навигация -->
      <Tasks :tasks-list="tasksList"></Tasks>
      <div class="guides-layout__content">
        <!-- Навигация по справочникам -->
        <TasksNav :tabs="tabs" :route-on="true"></TasksNav>
        <!-- Прослушиваем пути к каждому справочнику -->
        <div class="guides-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

import Tasks from "./Tasks/Tasks";
import TasksNav from "../UI/Components/NavTabs";
export default {
  name: "GuidesLayout",
  components: { TasksNav, Tasks },
  data() {
    return {
      height: 0,
      tasksList: [
        {
          img: "guide",
          subtitle: "Справочники",
          path: "/guides",
        },
        {
          img: "guide",
          subtitle: "Схема взаимосвязей",
          path: "/scheme",
        },
      ],
      tabs: [
        {
          name: "Категории RFC",
          link: "/guides/categoriesRFC",
        },
        {
          name: "Типы использования ПО",
          link: "/guides/typesPO",
        },
        {
          name: "Производители",
          link: "/guides/manufactures",
        },
        {
          name: "Диаграмма Ганнта",
          link: "/guides/gannt",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["getHeightMenu"]),
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.guides-layout {
  &__wrapper {
    display: flex;
  }
  &__content {
    width: calc(100% - 106px);
    background: white;
  }
}
.guides-content {
  margin: 10px;
}
</style>
