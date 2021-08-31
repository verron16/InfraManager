<template>
  <section class="graph-panel">
    <div class="graph-panel__wrapper">
      <div class="graph-controls">
        <button class="graph__btn button btn__first-priority">Свойства</button>
        <button class="graph__btn button btn__first-priority">Обновить</button>
        <button class="graph__btn button btn__first-priority">Открыть</button>
        <button class="graph__btn button btn__first-priority">Сохранить</button>
        <button
          class="graph__btn button btn__first-priority"
          @click="printGraph"
        >
          Напечатать
        </button>
        <button
          class="graph__btn button btn__first-priority"
          @click="saveGraphToPNG"
        >
          Сохранить в PNG
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { DataUri } from "@antv/x6";
export default {
  name: "GraphPanel",
  data() {
    return {};
  },
  computed: {
    getGraph() {
      return this.$store.getters.getGraph;
    },
  },
  methods: {
    saveGraphToPNG() {
      this.getGraph.toPNG(
        (dataUri) => {
          DataUri.downloadDataUri(dataUri, "Схема взаимосвязей.png");
        },
        {
          width: 1920,
          height: 1080,
          quality: 1,
        }
      );
    },
    printGraph() {
      var myWindow;
      this.getGraph.toPNG(
        (dataUri) => {
          console.log(dataUri);
          myWindow = window.open("", "Image");
          myWindow.document.write("<img src='" + dataUri + "''>");
        },
        {
          width: 1920,
          height: 1080,
          quality: 1,
        }
      );
      setTimeout(() => {
        myWindow.print();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.graph {
  &-panel {
    width: 100%;
    background: #e5e5e5;
    position: absolute;
    height: 44px;
    top: 0;
    left: 0;
    z-index: 100;
    display: flex;
    align-items: center;
  }
  &__btn {
    margin: 10px 0 10px 10px;
  }
}
.button {
  padding: 10px 15px;
  outline: none;
  cursor: pointer;
  border-radius: 2px;
  color: white;
  border: none;
  font-size: 12px;
  line-height: 14px;
  font-weight: 400;
}
.btn__first-priority {
  background: #43a2e3;
}
.btn__first-priority:hover {
  background: #1480c4;
}
</style>
