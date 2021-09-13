<template>
  <li class="menu__item">
    <router-link :to="path" class="menu__link">
      <div class="menu__icon">
        <div class="menu-item__img" :class="'menu-item__img-' + img"></div>
      </div>
      <p class="menu-item__subtitle">{{ subtitle }}</p>
    </router-link>
  </li>
</template>

<script>
export default {
  name: "TasksItem",
  props: {
    img: String,
    subtitle: String,
    path: String
  },
  data() {
    return {
      hovered: true,
    };
  },
};
</script>

<style lang="scss" scoped>
.menu {
  &__icon {
    display: flex;
    justify-content: center;
  }
  &__item {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:last-child {
      margin-bottom: 0;
    }

    &-active {
      .menu__link {
        color: #61d6f2;
      }
    }
  }

  &__link {
    text-decoration: none;
    color: #7d8e98;
    margin-top: 5px;
    text-align: center;
    white-space: normal;
    word-break: break-word;
    font-size: 11px;
    line-height: 12px;
  }
}
.menu-item__img {
  width: 40px;
  height: 40px;
  background-image: url("../../../assets/icons/menu/block.svg");
  background-repeat: no-repeat;
  margin-bottom: 5px;
  &-block {
    background-image: url("../../../assets/icons/menu/block.svg");
  }
  &-call {
    background-image: url("../../../assets/icons/menu/call.svg");
  }
  &-meet {
    background-image: url("../../../assets/icons/menu/meet.svg");
  }
  &-request {
    background-image: url("../../../assets/icons/menu/request.svg");
  }
  &-mission {
    background-image: url("../../../assets/icons/menu/mission.svg");
  }
  &-tasks {
    background-image: url("../../../assets/icons/menu/tasks.svg");
  }
  &-guide {
    background-image: url("../../../assets/icons/menu/guide.svg");
  }
}

.router-link-active {
  .menu-item__img {
    &-guide {
      background-image: url("../../../assets/icons/menu/w-guide.svg");
    }
  }
}
</style>
