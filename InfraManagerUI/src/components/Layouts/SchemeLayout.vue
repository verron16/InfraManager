<template>
  <section class="scheme-layout">
    <div class="scheme-layout__wrapper">
      <!-- Основное меню навигации -->
      <Tasks :tasks-list="tasksList"></Tasks>
      <div class="scheme-layout__content">
        <!-- Открытые вкладки объектов схемы взаимосвязей -->
        <TasksNav
          :tabs="getOpenedTabsGraph"
          :addButton="true"
          :showCloseBtn="true"
          :route-on="true"
          @changeGraph="changeNode = true"
        ></TasksNav>
        <div class="scheme-content">
          <!-- Выбор объекта, для которого будет строиться еще одна схема -->
          <ModalChoiceGraphNode
            v-if="getShowModalChoiceGraphNode"
          ></ModalChoiceGraphNode>
          <!-- Отображаем схему, взависимости от ID переданного объекта -->
          <router-view max="8" :key="$route.fullPath"></router-view>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

import Tasks from "../Layouts/Tasks/Tasks";
import TasksNav from "../UI/Components/NavTabs";
import ModalChoiceGraphNode from "../ModalChoice/ModalChoiceGraphNode";
export default {
  name: "SchemeLayout",
  components: {
    ModalChoiceGraphNode,
    Tasks,
    TasksNav,
  },
  data() {
    return {
      changeNode: false,
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
      tabs: [],
    };
  },
  computed: {
    ...mapGetters([
      "getMainNode",
      "getOpenedTabsGraph",
      "getShowModalChoiceGraphNode",
    ]),
  },
};
</script>

<style lang="scss">
.scheme-layout {
  &__wrapper {
    display: flex;
  }
  &__content {
    width: calc(100% - 106px);
  }
}

.scheme-content {
  margin: 0 10px;
}
</style>
