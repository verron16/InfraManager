<template>
  <div class="graph-actions">
    <div class="graph-actions__wrapper">
      <button class="graph-actions__btn" @click="saveGraphToPNG">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.921 2H10.6667V4.33333C10.6667 4.88562 10.219 5.33333 9.66667 5.33333H4.55556C4.00327 5.33333 3.55556 4.88562 3.55556 4.33333V2H2V14H4V9C4 8.44771 4.44772 8 5 8H11C11.5523 8 12 8.44771 12 9V14H14V4.07901L11.921 2ZM11 16H14C15.1046 16 16 15.1046 16 14V3.6648C16 3.39958 15.8946 3.14523 15.7071 2.95769L13.0423 0.292894C12.8548 0.105357 12.6004 0 12.3352 0H9.66667H4.55556H2C0.895431 0 0 0.895431 0 2V14C0 15.1046 0.895431 16 2 16H5H11ZM10.5 14V9.5H5.5V14H10.5ZM9.16667 2H5.05556V3.83333H9.16667V2Z"
            fill="#8394A5"
          />
        </svg>
      </button>
      <button class="graph-actions__btn" @click="openGraphSettings">
        <svg
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3 0H1V3.26756C0.402199 3.61337 0 4.25972 0 5C0 5.74028 0.402199 6.38663 1 6.73244V20H3V6.73244C3.5978 6.38663 4 5.74028 4 5C4 4.25972 3.5978 3.61337 3 3.26756V0ZM10 0H8V13.2676C7.4022 13.6134 7 14.2597 7 15C7 15.7403 7.4022 16.3866 8 16.7324V20H10V16.7324C10.5978 16.3866 11 15.7403 11 15C11 14.2597 10.5978 13.6134 10 13.2676V0ZM15 0H17V2.26756C17.5978 2.61337 18 3.25972 18 4C18 4.74028 17.5978 5.38663 17 5.73244V20H15V5.73244C14.4022 5.38663 14 4.74028 14 4C14 3.25972 14.4022 2.61337 15 2.26756V0Z"
            fill="#8394A5"
          />
        </svg>
      </button>
      <button class="graph-actions__btn">
        <svg
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.5103 5.80657L17.1437 5.82162L17.0134 0L15.291 1.81739C14.6416 1.41369 13.9354 1.07858 13.1788 0.82515C7.94186 -0.928927 2.27456 1.89445 0.52048 7.13135C-1.2336 12.3682 1.58978 18.0355 6.82668 19.7896C12.0636 21.5437 17.7309 18.7203 19.485 13.4834C19.9463 12.1059 20.091 10.6987 19.9584 9.3407L17.9427 9.31462C18.0878 10.4684 17.9825 11.6719 17.5885 12.8482C16.1852 17.0377 11.6514 19.2964 7.46188 17.8932C3.27237 16.4899 1.01367 11.9561 2.41693 7.76656C3.82019 3.57704 8.35403 1.31834 12.5435 2.7216C13.0138 2.87909 13.4596 3.07602 13.8788 3.30747L11.5103 5.80657Z"
            fill="#8394A5"
          />
        </svg>
      </button>
      <button class="graph-actions__btn" @click="printGraph">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1.18899 4.90239H3.3333V2.10231C3.3333 1.77343 3.46846 1.47394 3.68534 1.25683L3.68779 1.25439C3.90512 1.03728 4.20483 0.902344 4.53327 0.902344H13.4668C13.7957 0.902344 14.0952 1.0375 14.3123 1.25439L14.3147 1.25683C14.5316 1.47394 14.6668 1.77343 14.6668 2.10231V4.90239H16.8113C17.2513 4.90239 17.6111 5.26222 17.6111 5.70222V12.8524C17.6111 13.2924 17.2513 13.6522 16.8113 13.6522H14.8057V15.8967C14.8057 16.2252 14.6708 16.5249 14.4537 16.7422L14.4512 16.7446C14.2341 16.9615 13.9346 17.0967 13.6057 17.0967H4.32508C3.99664 17.0967 3.69692 16.9618 3.4796 16.7446L3.47715 16.7422C3.26004 16.5249 3.12511 16.2252 3.12511 15.8967V13.6522H1.18899C0.748995 13.6522 0.38916 13.2924 0.38916 12.8524V5.70222C0.38916 5.26222 0.748995 4.90239 1.18899 4.90239ZM12.2871 6.91622H14.4599C14.5739 6.91622 14.667 7.00929 14.667 7.1233V7.70758C14.667 7.82159 14.5739 7.91467 14.4599 7.91467H12.2871C12.1731 7.91467 12.08 7.82159 12.08 7.70758V7.1233C12.08 7.00929 12.1731 6.91622 12.2871 6.91622ZM13.4724 11.7495H4.45868V15.7631H13.4724V11.7495ZM4.6671 4.90239H13.3334V2.23569H4.6671V4.90239ZM6.04876 12.4718H11.8821V13.3053H6.04876V12.4718ZM6.04876 14.2078H11.8821V15.0412H6.04876V14.2078Z"
            fill="#8394A5"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

// Импорт метода сохранения / печати для схемы взаимосвязей
import { DataUri } from "@antv/x6";
export default {
  name: "GraphActions",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getGraph"]),
  },
  methods: {
    openGraphSettings() {
      this.$emit("openGraphSettings", true);
    },
    saveGraphToPNG() {
      this.getGraph.toJPEG(
        (dataUri) => {
          DataUri.downloadDataUri(dataUri, "Схема взаимосвязей.png");
        },
        {
          width: 1920,
          height: 1080,
          quality: 1,
          padding: {
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          },
        }
      );
    },
    printGraph() {
      // let myWindow;
      // this.getGraph.toSVG(
      //   (dataUri) => {
      //     myWindow = window.open("", "Image");
      //     myWindow.document.write(dataUri);
      //   },
      //   {
      //     preserveDimensions: {
      //
      //     },
      //   }
      // );
      // setTimeout(() => {
      //   myWindow.print();
      // });
      this.getGraph.zoomToFit();
      this.getGraph.centerContent()
      this.getGraph.printPreview({
        sheet: {
          width: 1920,
          height: 1080,
        },
        margin: 0.4,
        padding: 10,
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.graph-actions {
  background: #ffffff;
  box-shadow: 4px 4px 20px rgba(52, 73, 94, 0.1);
  border-radius: 4px;
  position: absolute;
  top: 50px;
  right: 40px;
  &__wrapper {
    padding: 6px 8px;
    display: flex;
    align-items: center;
  }
  &__btn {
    margin-right: 8px;
    background: none;
    cursor: pointer;
    outline: none;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      & svg {
        & path {
          fill: #43a2e3;
        }
      }
    }
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
