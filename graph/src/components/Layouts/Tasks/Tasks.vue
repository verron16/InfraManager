<template>
  <section class="tasks" :style="{ height: height }">
    <div class="tasks__content">
      <div class="tasks__upper">
        <p class="tasks__subtitle">Настройки</p>
        <!--        <label-->
        <!--            class="gantt-elastic__header-task-list-switch&#45;&#45;wrapper"-->
        <!--        >-->
        <!--          <Toggle-->
        <!--              class="gantt-elastic__header-task-list-switch"-->
        <!--              v-model="test"-->
        <!--          ></Toggle>-->
        <!--          GWWGGW-->
        <!--        </label>-->
      </div>
      <nav class="menu">
        <!--        <div class="menu__control">-->
        <!--          <img src="../../../assets/icons/menu/arrow-up.svg" alt="icon">-->
        <!--        </div>-->
        <ul class="menu__list">
          <TasksItem
            v-for="(task, index) in tasksList"
            :key="index"
            :img="task.img"
            :subtitle="task.subtitle"
          ></TasksItem>
        </ul>
      </nav>
      <!--      <div class="menu__control">-->
      <!--        <img src="../../../assets/icons/menu/arrow-down.svg" alt="icon">-->
      <!--      </div>-->
    </div>
  </section>
</template>

<script>
import TasksItem from "./TasksItem";
import Toggle from "../../UI/Controls/Toggle";
export default {
  name: "Tasks",
  components: { Toggle, TasksItem },
  data() {
    return {
      height: 0,
      tasksList: [
        {
          img: "guide",
          subtitle: "Справочники",
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
    const calcWidthTasks = document.querySelector(".tasks").clientWidth;
    this.height = `calc(100vh - ${this.getHeightMenu + 20}px)`;
    this.$store.commit("SET_WIDTH_TASKS", calcWidthTasks);
  },
};
</script>

<style lang="scss" scoped>
.tasks {
  min-width: 105px;
  background: white;
  border-right: 1px solid #c1cfd9;
  &__subtitle {
    font-size: 11px;
    font-weight: bold;
    color: #34495e;
  }
  &__upper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 23px;
    padding: 10px;
    border-bottom: 1px solid #c1cfd9;
  }
}

.menu {
  &__list {
    margin-top: 20px;
  }
  &__control {
    display: flex;
    justify-content: center;
    cursor: pointer;
    margin: 10px 0;
  }
}
</style>
