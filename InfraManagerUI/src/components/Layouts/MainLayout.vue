<template>
  <section class="main__layout">
    <Menu></Menu>
    <section class="main__wrapper">
      <div class="main__item">
        <router-view></router-view>
      </div>
    </section>
    <section class="footer"></section>
  </section>
</template>

<script>
import Menu from "./Menu/Menu";
export default {
  name: "MainLayout",
  components: { Menu },
};
</script>

<style lang="scss" scoped>
.footer {
  min-height: 20px;
  background: #34495e;
  width: 100%;
  position: absolute;
  bottom: 0;
  right: 0;
}
.main {
  &__layout {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }
  &__wrapper {
    background: #EDEDED;
    width: 100%;
    height: 100%;
  }
}
</style>
