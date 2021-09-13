<template>
  <section class="tasks" :style="{ height: height }">
    <div class="tasks__content">
      <div class="tasks__upper">
        <p class="tasks__subtitle">Настройки</p>
      </div>
      <nav class="menu">
        <ul class="menu__list">
          <!-- Элемент навигации -->
          <TasksItem
            v-for="(task, index) in tasksList"
            :key="index"
            :img="task.img"
            :subtitle="task.subtitle"
            :path="task.path"
          ></TasksItem>
        </ul>
      </nav>
    </div>
  </section>
</template>

<script>
import TasksItem from "./TasksItem";
export default {
  name: "Tasks",
  components: { TasksItem },
  props: {
    tasksList: Array,
  },
  data() {
    return {
      height: 0,
    };
  },
  computed: {
    getHeightMenu() {
      return this.$store.getters.getHeightMenu;
    },
  },
  mounted() {
    // Вычисление ширины и установление высоты боковго меню
    const calcWidthTasks = document.querySelector(".tasks").clientWidth;
    this.height = `calc(100vh - ${this.getHeightMenu + 20}px)`;
    this.$store.commit("SET_WIDTH_TASKS", calcWidthTasks);
  },
};
</script>

<style lang="scss" scoped>
.tasks {
  min-width: 105px;
  max-width: 105px;
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
