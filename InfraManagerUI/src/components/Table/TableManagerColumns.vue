<template>
  <div class="columns">
    <div class="columns__wrapper">
      <div class="columns__header">
        <button class="columns-btn">
          <img
            src="@/assets/icons/table/close.svg"
            alt="close"
            class="columns-btn__close"
            @click="closeManagementWidget"
          />
        </button>
      </div>
      <div class="columns__overflow">
        <ul class="columns__list">
          <li
            class="columns__item"
            v-for="(header, index) in headers"
            :key="header.colId"
          >
            <el-checkbox
              :value="header.visible"
              @change="setShowColumn(header, index, $event)"
              >{{ header.colDef.headerName }}</el-checkbox
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TableManagerColumns",
  props: {
    columns: Array,
    gridApiColumns: Object,
  },
  data() {
    return {
      showManagement: true,
      headers: this.columns,
      currentSortableCol: null,
      currentSortableColHeader: null,
    };
  },
  methods: {
    // Закрытие виджета
    closeManagementWidget() {
      this.$emit("closeManagementWidget");
    },
    // Виидмость колонок
    setShowColumn(header) {
      console.log(header.visible)
      this.$emit("updateVisibleColumn", {
        header: header.colDef.headerName,
        visible: header.visible,
      });
    },
  },
  updated() {
    // Только для таблиц с checkbox
    // $(".columns__item")[0].style.display = "none";
  },
  mounted() {
    const vm = this;

    this.headers = this.gridApiColumns.getAllGridColumns();
    // Инициализация библиотеки сортировки
    $(".columns__list").sortable({
      placeholder: "ui-state-highlight",
      axis: "y",
      containment: ".columns",
      stop() {
        const indexesColumns = [];
        document.querySelectorAll(".columns__item").forEach((item) => {
          let trId = item.getAttribute("index");
          indexesColumns.push(trId);
        });
        let newPos = indexesColumns.indexOf(vm.currentSortableCol);
        vm.$emit("updateOrderColumns", {
          name: vm.currentSortableColHeader,
          toIndex: newPos,
        });
      },
      activate(event, ui) {
        document.querySelectorAll(".columns__item").forEach((item, index) => {
          item.setAttribute("index", index);
        });
        vm.currentSortableCol = ui.item.context.getAttribute("index");
        vm.currentSortableColHeader = ui.item.context.textContent;
      },
    });
  },
};
</script>

<style lang="scss">
.ui-sortable-helper {
  background: white !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
}
.ui-state-highlight {
  height: 25px;
  opacity: 0.65;
  background: #fee6b3;
}
.columns__item .el-checkbox {
  display: flex;
  align-items: center;
  padding: 7px;
}
.columns {
  background: white;
  position: absolute;
  max-width: 300px;
  min-width: 250px;
  font-family: Arial, sans-serif;
  width: 100%;
  min-height: 125px;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  top: 50px;
  left: 0;
  &::after {
    content: "";
    position: absolute;
    top: -20px;
    left: 10px;
    transform: rotate(180deg);
    border: 10px solid transparent;
    border-top: 10px solid white;
  }
  &__wrapper {
    position: relative;
    min-height: 125px;
  }
  &__list {
    list-style: none;
    width: 100%;
    padding-bottom: 20px;
    overflow: auto;
    max-height: 500px;
  }
  &__item {
    display: flex;
    align-items: center;
    width: 100%;
    border-top: 1px solid #c1cfd9;
    &:last-child {
      border-bottom: 1px solid #c1cfd9;
    }
    &:hover {
      cursor: pointer;
      background: #f2fafd;
    }
    &-checkbox {
      margin-right: 10px;
      margin-left: 10px;
    }
  }
  &__header {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }
  &-btn {
    background: transparent;
    border: none;
    outline: none;
    padding: 0;
    &__close {
      width: 24px;
      height: 24px;
      cursor: pointer;
    }
  }
  &__controls {
    display: flex;
    align-items: center;
    margin-left: auto;
  }
}

.column {
  &__control {
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:first-child {
      transform: rotate(180deg);
    }
    &:hover {
      background: #8fd6f1;
    }
  }
}

.table-columns {
  width: 100%;
  table-layout: fixed;
  overflow: auto;
  &__row {
    &:hover {
      cursor: pointer;
      background: #f2fafd;
    }
  }
  &__data {
    border-bottom: 1px solid #c1cfd9;
  }
}
</style>
