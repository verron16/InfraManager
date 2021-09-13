<template>
  <div class="graph-map__wrapper">
    <div class="graph__map" id="map"></div>
    <div class="graph-map__controls">
      <div class="graph-controls__wrapper">
        <div class="graph-controls__item">
          <button class="graph-controls__btn" @click="setCenterContent">
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.5 5.34961V15.0671"
                stroke="#8394A5"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M17.5 5.34961V15.0671"
                stroke="#8394A5"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.6003 12.9768L15.0747 10.5024L12.5156 7.94336"
                stroke="#8394A5"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.43794 13.0057L5.93604 10.5038L8.43794 8.00195"
                stroke="#8394A5"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14.875 10.3945L6.125 10.3945"
                stroke="#8394A5"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button
            class="graph-controls__btn"
            @click="openWidgetResizeMap"
            :class="{ 'graph-controls__btn-active': showWidgetResizeMap }"
          >
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.00022 6.55556C6.00022 6.86238 6.24895 7.11111 6.55577 7.11111C6.8626 7.11111 7.11133 6.86238 7.11133 6.55556C7.11133 6.24873 6.8626 6 6.55577 6C6.24895 6 6.00022 6.24873 6.00022 6.55556Z"
                stroke="#8394A5"
                stroke-width="2"
              />
              <path
                d="M10.4446 6.55556C10.4446 6.86238 10.6933 7.11111 11.0001 7.11111C11.3069 7.11111 11.5557 6.86238 11.5557 6.55556C11.5557 6.24873 11.3069 6 11.0001 6C10.6933 6 10.4446 6.24873 10.4446 6.55556Z"
                stroke="#8394A5"
                stroke-width="2"
              />
              <path
                d="M14.8889 6.55556C14.8889 6.86238 15.1376 7.11111 15.4444 7.11111C15.7513 7.11111 16 6.86238 16 6.55556C16 6.24873 15.7513 6 15.4444 6C15.1376 6 14.8889 6.24873 14.8889 6.55556Z"
                stroke="#8394A5"
                stroke-width="2"
              />
              <path
                d="M6.00022 11.0009C6.00022 11.3077 6.24895 11.5564 6.55577 11.5564C6.8626 11.5564 7.11133 11.3077 7.11133 11.0009C7.11133 10.694 6.8626 10.4453 6.55577 10.4453C6.24895 10.4453 6.00022 10.694 6.00022 11.0009Z"
                stroke="#8394A5"
                stroke-width="2"
              />
              <path
                d="M10.4446 11.0009C10.4446 11.3077 10.6933 11.5564 11.0001 11.5564C11.3069 11.5564 11.5557 11.3077 11.5557 11.0009C11.5557 10.694 11.3069 10.4453 11.0001 10.4453C10.6933 10.4453 10.4446 10.694 10.4446 11.0009Z"
                stroke="#8394A5"
                stroke-width="2"
              />
              <path
                d="M14.8889 11.0009C14.8889 11.3077 15.1376 11.5564 15.4444 11.5564C15.7513 11.5564 16 11.3077 16 11.0009C16 10.694 15.7513 10.4453 15.4444 10.4453C15.1376 10.4453 14.8889 10.694 14.8889 11.0009Z"
                stroke="#8394A5"
                stroke-width="2"
              />
              <path
                d="M6.00022 15.4442C6.00022 15.7511 6.24895 15.9998 6.55577 15.9998C6.8626 15.9998 7.11133 15.7511 7.11133 15.4442C7.11133 15.1374 6.8626 14.8887 6.55577 14.8887C6.24895 14.8887 6.00022 15.1374 6.00022 15.4442Z"
                stroke="#8394A5"
                stroke-width="2"
              />
              <path
                d="M10.4446 15.4442C10.4446 15.7511 10.6933 15.9998 11.0001 15.9998C11.3069 15.9998 11.5557 15.7511 11.5557 15.4442C11.5557 15.1374 11.3069 14.8887 11.0001 14.8887C10.6933 14.8887 10.4446 15.1374 10.4446 15.4442Z"
                stroke="#8394A5"
                stroke-width="2"
              />
              <path
                d="M14.8889 15.4442C14.8889 15.7511 15.1376 15.9998 15.4444 15.9998C15.7513 15.9998 16 15.7511 16 15.4442C16 15.1374 15.7513 14.8887 15.4444 14.8887C15.1376 14.8887 14.8889 15.1374 14.8889 15.4442Z"
                stroke="#8394A5"
                stroke-width="2"
              />
            </svg>
          </button>
        </div>
        <div class="graph-controls__item">
          <button class="graph-controls__btn" @click="decScaleGraph">
            <svg
              width="10"
              height="3"
              viewBox="0 0 10 3"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                y="2.25"
                width="1.5"
                height="10"
                rx="0.75"
                transform="rotate(-90 0 2.25)"
                fill="#8394A5"
              />
            </svg>
          </button>
          <button class="graph-controls__btn" @click="incScaleGraph">
            <svg
              width="10"
              height="11"
              viewBox="0 0 10 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="4.25"
                y="0.5"
                width="1.5"
                height="10"
                rx="0.75"
                fill="#8394A5"
              />
              <rect
                y="6.25"
                width="1.5"
                height="10"
                rx="0.75"
                transform="rotate(-90 0 6.25)"
                fill="#8394A5"
              />
            </svg>
          </button>
          <p class="graph-controls__procent">
            {{ currentZoom | translateZoom }}%
          </p>
        </div>
      </div>
    </div>
    <div class="graph-resize__wrapper" v-if="showWidgetResizeMap">
      <!--      <a-slider-->
      <!--        v-model="currentGraphSize"-->
      <!--        :min="10"-->
      <!--        :max="40"-->
      <!--        :tooltipVisible="false"-->
      <!--        @change="onSizeChanged"-->
      <!--      ></a-slider>-->
      <el-slider
        v-model="currentGraphSize"
        :max="40"
        :min="10"
        :show-tooltip="false"
        @input="onSizeChanged"
      ></el-slider>
      <p class="graph-resize__subtitle">Размер сетки</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "GraphMiniMap",
  data() {
    return {
      showWidgetResizeMap: false,
      currentGraphSize: 1,
    };
  },
  filters: {
    translateZoom(val) {
      return (val * 100).toFixed(0);
    },
  },
  computed: {
    ...mapGetters({
      getGraph: "getGraph",
      currentZoom: "getGraphZoom",
    }),
  },
  methods: {
    setCenterContent() {
      this.getGraph.zoomToFit();
    },
    incScaleGraph() {
      if (this.currentZoom + 0.05 <= 4) {
        this.getGraph.zoom(0.05);
      } else {
        return false;
      }
    },
    decScaleGraph() {
      if (this.currentZoom - 0.05 >= 0.3) {
        this.getGraph.zoom(-0.05);
      } else {
        return false;
      }
    },
    openWidgetResizeMap() {
      this.showWidgetResizeMap = !this.showWidgetResizeMap;
    },
    onSizeChanged(e) {
      console.log(e);
      this.$emit("onSizeChanged", this.currentGraphSize);
    },
  },
};
</script>

<style lang="scss" scoped>
.x6-widget-minimap-viewport {
  border: 2px solid #43a2e3;
  &-zoom {
    border: 2px solid #43a2e3;
  }
}

.graph-resize {
  &__subtitle {
    font-weight: normal;
    font-size: 11px;
    line-height: 13px;
    text-align: center;
    color: #9d9e9e;
  }
}

#graph {
  overflow: hidden;
}
.graph-map__wrapper {
  box-shadow: 4px 4px 20px rgb(52 73 94 / 0.1);
  position: absolute;
  right: 40px;
  bottom: 300px;
  z-index: 100;
  height: 138px;
}
.graph-map__controls {
  background: #f3f7f9;
  padding: 10px 6px;
}
.graph-controls {
  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__item {
    display: flex;
    align-items: center;
  }
  &__btn {
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    background: none;
    cursor: pointer;
    padding: 0;
    &:hover {
      & svg {
        & path {
          stroke: #43a2e3;
        }
        & rect {
          fill: #43a2e3;
        }
      }
    }
    & svg {
      padding-right: 10px;
    }
  }
}

.graph-controls__btn-active svg {
  & path {
    stroke: #43a2e3;
  }
  & rect {
    fill: #43a2e3;
  }
}

.graph-controls__procent {
  font-weight: normal;
  font-size: 13px;
  line-height: 13px;
  color: #8394a5;
}
</style>
