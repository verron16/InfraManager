<template>
  <div
    class="graph__node"
    :class="{
      'graph__node-current': nodeId === mainNodeId,
      'graph__node-active': nodeId === mainNodeId,
    }"
    @dblclick="openFullInfo"
  >
    <div class="node__expand node__expand-left" @click="expandLeft($event)">
      <div class="arrow-left"></div>
    </div>
    <div class="node__wrapper">
      <div class="node__content">
        <div
          class="node__content-img"
          :class="{
            'node__content-network-hardware': classID === 5,
            'node__content-terminal-hardware:': classID === 6,
            'node__content-adapter': classID === 33,
            'node__content-service': classID === 408,
          }"
        ></div>
        <div class="node__content-text">
          <h3 class="node__title">
            {{ className }}
          </h3>
          <p class="node__description">
            {{ data[0].FieldValue }}
          </p>
        </div>
      </div>
    </div>
    <div class="node__expand node__expand-right" @click="expandRight($event)">
      <div class="arrow-right"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GraphNodeModel",
  props: {
    data: Array,
    classID: Number,
    className: String,
    nodeId: String,
    mainNodeId: String,
  },
  data() {
    return {};
  },
  methods: {
    expandRight(event) {
      console.log(this.$store);
      this.$emit("expand-right", {
        event: event,
        data: this.data,
      });
    },
    expandLeft(event) {
      this.$emit("expand-left", {
        event: event,
        data: this.data,
      });
    },
    openFullInfo(event) {
      const elemNode = event.target.closest(".graph__node");
      this.$emit("open-full-info", {
        event: elemNode.getBoundingClientRect(),
        elem: elemNode,
        data: { classID: this.classID, fields: this.data },
      });
    },
  },
  mounted() {},
};
</script>

<style lang="scss">
.arrow {
  &-left {
    background-image: url("../../assets/icons/arrow-expand-left.svg");
    background-repeat: no-repeat;
    width: 6px;
    height: 6px;
    top: 45%;
    left: 1px;
    position: absolute;
  }
  &-right {
    background-image: url("../../assets/icons/arrow-expand-right.svg");
    background-repeat: no-repeat;
    width: 6px;
    height: 6px;
    top: 45%;
    left: 1px;
    position: absolute;
  }
}
.node {
  &__wrapper {
    padding: 8px 10px;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &__content {
    display: flex;
    align-items: center;
    &-img {
      min-width: 24px;
      min-height: 24px;
      background-repeat: no-repeat;
      background-size: cover;
    }
    &-service {
      background-image: url("../../assets/icons/service.svg");
    }
    &-adapter {
      background-image: url("../../assets/icons/hardware.svg");
    }
    &-network-hardware {
      background-image: url("../../assets/icons/win-server.svg");
    }
    &-text {
      padding-left: 8px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  &__expand {
    height: 100%;
    min-width: 7px;
    //display: flex;
    //align-items: center;
    //flex-direction: column;
    //justify-content: center;
    position: relative;
    cursor: pointer;
    &-right {
      margin-left: auto;
      border-left: 1px solid #8394a5;
    }
    &-left {
      border-right: 1px solid #8394a5;
    }
  }
  &__title {
    font-size: 12px;
    font-weight: 700;
    line-height: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #2b2a29;
  }
  &__description {
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #2b2a29;
    padding-top: 2px;
  }
}
.graph__node {
  font-family: Arial, sans-serif;
  border-radius: 3px;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  height: 100%;
  display: flex;
  cursor: move;
  background-color: #ebf6fc;
  &:hover {
    box-shadow: 0 0 10px rgba(131, 148, 165, 0.7);
  }
  &-active {
    background: #43a2e3;
    & .node__expand {
      &-left {
        border-right: 1px solid white;
      }
      &-right {
        border-left: 1px solid white;
      }
    }
    & .arrow-left {
      background-image: url("../../assets/icons/w-arrow-expand-left.svg");
    }
    & .arrow-right {
      background-image: url("../../assets/icons/w-arrow-expand-right.svg");
    }
    & .node__title,
    .node__description {
      color: white;
    }
    .node__content-service {
      background-image: url("../../assets/icons/w-service.svg");
    }
    .node__content-adapter {
      background-image: url("../../assets/icons/w-hardware.svg");
    }
    .node__content-network-hardware {
      background-image: url("../../assets/icons/w-win-server.svg");
    }
  }
  &-edge {
    .graph__node {
      background: white;
      outline: 2px solid #43a2e3;
    }
  }
  &-current {
    background: #34495e;
    & .node__title,
    .node__description {
      color: white;
    }
  }
}
</style>
