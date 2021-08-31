<template>
  <div class="graph">
    <Spinner v-show="loading"></Spinner>
    <div class="graph__wrapper">
      <VueDraggableResizable
        :w="348"
        :h="582"
        class-name="draggable"
        :x="getPositionModal.left"
        :y="getPositionModal.top"
        v-if="showModal && actionModal === 'infoNode'"
      >
        <GraphNodeModal
          :action="actionModal"
          @close-modal="closeModal"
          v-on-clickaway="closeModal"
        ></GraphNodeModal>
      </VueDraggableResizable>
      <VueDraggableResizable
        :w="340"
        :h="406"
        class-name="draggable"
        :parent="true"
        :x="getPositionModal.left"
        :y="getPositionModal.top"
        v-if="showModal && actionModal === 'infoEdge'"
      >
        <GraphEdgeModal
          :action="actionModal"
          @close-modal="closeModal"
          v-on-clickaway="closeModal"
        ></GraphEdgeModal>
      </VueDraggableResizable>
      <GraphModalSettings
        :showModal="showGraphSettings"
        @closeGraphModalSettings="closeGraphModalSettings"
      ></GraphModalSettings>
      <div id="graph"></div>
      <GraphActions @openGraphSettings="openGraphSettings"></GraphActions>
      <GraphMiniMap @onSizeChanged="onSizeChanged"></GraphMiniMap>
    </div>
  </div>
</template>

<script>
import { Graph } from "@antv/x6";
import { DagreLayout } from "@antv/layout";
import "@antv/x6-vue-shape";
import VueDraggableResizable from "vue-draggable-resizable";
import GraphNodeModel from "../Graph/GraphNodeModel";
import GraphMiniMap from "./GraphMiniMap";
import GraphActions from "./GraphActions";
import GraphModalSettings from "./GraphModalSettings";
import GraphNodeModal from "./GraphNodeModal";
import GraphEdgeModal from "./GraphEdgeModal";
import Spinner from "../UI/Controls/Spinner";

export default {
  name: "Graph",
  components: {
    Spinner,
    VueDraggableResizable,
    GraphEdgeModal,
    GraphNodeModal,
    GraphModalSettings,
    GraphActions,
    GraphMiniMap,
  },
  data() {
    return {
      data: {
        nodes: [],
        edges: [],
      },
      loading: true,
      heightGraph: 0,
      showGraphSettings: false,
      posX: null,
      posY: null,
      graph: null,
      nodeSourceHTML: null,
      nodeTargetHTML: null,
      currentEdge: null,
      nodes: [],
      edges: [],
    };
  },
  computed: {
    getMainNode() {
      return this.$store.getters.getMainNode;
    },
    showModal() {
      return this.$store.getters.getShowModal;
    },
    actionModal() {
      return this.$store.getters.getActionModal;
    },
    getPositionModal() {
      return this.$store.getters.getPositionModal;
    },
    getCurrentNodeHTML() {
      return this.$store.getters.getHTMLNode;
    },
    getWidthTask() {
      return this.$store.getters.getWidthTask;
    },
    getHeightMenu() {
      return this.$store.getters.getHeightMenu;
    },
    getClassName() {
      return this.$store.getters.getClassNameByClassID;
    },
  },
  methods: {
    initGraph() {
      const self = this;

      this.graph = new Graph({
        container: document.getElementById("graph"),
        width: 1000,
        height: self.heightGraph,
        autoResize: true,
        grid: {
          type: "mesh",
          visible: true,
          size: 1,
        },
        history: {
          enabled: true,
          ignoreAdd: true,
          ignoreRemove: true,
          ignoreChange: false,
        },
        minimap: {
          enabled: true,
          container: document.getElementById("map"),
          height: 97,
          width: 184,
          padding: 0,
          minScale: 0.3,
          maxScale: 4,
        },
        resizing: {
          enabled: true,
          minWidth: 80,
          minHeight: 40,
          allowReverse: false,
        },
        snapline: {
          enabled: true,
          className: "my-snapline",
          tolerance: 20,
          resizing: true,
          sharp: true,
        },
        scroller: {
          enabled: true,
          pannable: true,
          pageVisible: false,
          pageBreak: false,
        },
        mousewheel: {
          enabled: true,
          minScale: 0.3,
          maxScale: 4,
          modifiers: ["ctrl", "meta"],
        },
      });
    },
    openGraphSettings(val) {
      console.log(val);
      this.showGraphSettings = val;
    },
    closeGraphModalSettings() {
      this.showGraphSettings = !this.showGraphSettings;
    },
    decScale() {
      const x = -0.05;
    },
    incScale() {
      const x = 0.05;
    },
    onSizeChanged(size) {
      this.graph.setGridSize(size);
    },
    closeModal() {
      this.$store.commit("CLOSE_MODAL", false);
      if (this.actionModal !== "infoEdge") {
        this.getCurrentNodeHTML.classList.remove("graph__node-active");
      } else {
        this.nodeSourceHTML.classList.remove("graph__node-edge");
        this.nodeTargetHTML.classList.remove("graph__node-edge");
        this.currentEdge.attr("line/stroke", "#8394A5");
      }
    },
    createEdge(source, target) {
      return {
        source: source,
        target: target,
        zIndex: 0,
        router: {
          name: "er",
        },
        connector: {
          name: "rounded",
          args: {
            radius: 30,
          },
        },
        attrs: {
          line: {
            targetMarker: "classic",
            stroke: "#8394A5",
          },
        },
      };
    },
    createNode(obj) {
      const self = this;
      return {
        id: obj.ObjectID,
        shape: "vue-shape",
        width: 160,
        height: 46,
        attrs: {
          body: {
            stroke: "#ebebeb",
          },
        },
        component: {
          template: `
            <graph-node-model :data="data" :class-i-d="classID" :class-name="className" @expand-right="expandRight" @expand-left="expandLeft"
                           @open-full-info="openFullInfo"></graph-node-model>`,
          data() {
            return {
              data: obj.NodeFieldInfoList,
              classID: obj.ObjectClassID,
              className: obj.ClassName,
            };
          },
          methods: {
            expandRight(e) {
              // Получение зависимых объектов
              const expandedNode = e.event.target.closest(".x6-node");
              // Получение ID для установки связей
              const expandedNodeId = expandedNode.getAttribute("data-cell-id");
              const positionCurrentExpandedNode = self.graph.pageToLocal(
                e.event.pageX,
                e.event.pageY
              );
              e.data.isExpandedRight = !e.data.isExpandedRight;
              const nodes = [
                {
                  id: Math.random().toString(36).substring(7),
                  target: "node2",
                  data: {
                    name: "Cluster3",
                    description: "Description3",
                    active: false,
                    isExpandedRight: false,
                    isExpandedLeft: false,
                  },
                },
                {
                  id: Math.random().toString(36).substring(7),
                  target: "node2",
                  data: {
                    name: "Cluster4",
                    description: "Description4",
                    active: false,
                    isExpandedRight: false,
                    isExpandedLeft: false,
                  },
                },
                {
                  id: Math.random().toString(36).substring(7),
                  target: "node2",
                  data: {
                    name: "Cluster4",
                    description: "Description4",
                    active: false,
                    isExpandedRight: false,
                    isExpandedLeft: false,
                  },
                },
                {
                  id: Math.random().toString(36).substring(7),
                  target: "node2",
                  data: {
                    name: "Cluster4",
                    description: "Description4",
                    active: false,
                    isExpandedRight: false,
                    isExpandedLeft: false,
                  },
                },
              ];
              // Установка координат потенциальных узлов
              for (let i = 0; i < nodes.length; i++) {
                // Распределение ширины элемента и его отступа относительно родителя
                nodes[i].x = positionCurrentExpandedNode.x + 50;
                nodes[i].y = positionCurrentExpandedNode.y - 20 + i * 60;
                console.log(positionCurrentExpandedNode.y - 20 + i);
                self.graph.addCell([
                  self.createNode(nodes[i]),
                  self.createEdge(expandedNodeId, nodes[i].id),
                ]);
                self.createNode(nodes[i]);
              }
              console.log(self.graph.toJSON());
            },
            expandLeft(e) {
              // Получение зависимых объектов
              const expandedNode = e.event.target.closest(".x6-node");
              // Получение ID для установки связей
              const expandedNodeId = expandedNode.getAttribute("data-cell-id");
              const positionCurrentExpandedNode = self.graph.pageToLocal(
                e.event.pageX,
                e.event.pageY
              );
              e.data.isExpandedLeft = !e.data.isExpandedLeft;
              const nodes = [
                {
                  id: Math.random().toString(36).substring(7),
                  target: "node2",
                  data: {
                    name: "Cluster3",
                    description: "Description3",
                    active: false,
                    isExpandedRight: false,
                    isExpandedLeft: false,
                  },
                },
                {
                  id: Math.random().toString(36).substring(7),
                  target: "node2",
                  data: {
                    name: "Cluster4",
                    description: "Description4",
                    active: false,
                    isExpandedRight: false,
                    isExpandedLeft: false,
                  },
                },
                {
                  id: Math.random().toString(36).substring(7),
                  target: "node2",
                  data: {
                    name: "Cluster4",
                    description: "Description4",
                    active: false,
                    isExpandedRight: false,
                    isExpandedLeft: false,
                  },
                },
                {
                  id: Math.random().toString(36).substring(7),
                  target: "node2",
                  data: {
                    name: "Cluster4",
                    description: "Description4",
                    active: false,
                    isExpandedRight: false,
                    isExpandedLeft: false,
                  },
                },
              ];
              // Установка координат потенциальных узлов
              for (let i = 0; i < nodes.length; i++) {
                // Распределение ширины элемента и его отступа относительно родителя
                nodes[i].x = positionCurrentExpandedNode.x - 200;
                nodes[i].y = positionCurrentExpandedNode.y - 20 + i * 60;
                self.graph.addCell([
                  self.createNode(nodes[i]),
                  self.createEdge(expandedNodeId, nodes[i].id),
                ]);
                self.createNode(nodes[i]);
              }
              console.log(self.graph.toJSON());
            },
            openFullInfo(e) {
              e.elem.classList.add("graph__node-active");
              const widthElem = e.elem.clientWidth;
              // e.elem.classList.add("node__content-service")

              self.$store.commit("SHOW_MODAL", {
                action: "infoNode",
                value: true,
                left: e.event.left + widthElem * self.graph.zoom(),
                top: e.event.top - self.getHeightMenu - 200,
                data: e.data,
                elem: e.elem,
              });
            },
          },
          components: {
            GraphNodeModel,
          },
        },
      };
    },
  },
  mounted() {
    const self = this;
    let heightTasks = document.querySelector(".tasks").clientHeight - 75;
    this.heightGraph = heightTasks;
    console.log(this.getMainNode);
    this.axios
      .get(`sdApi/GetSchemeInfoByObject/?objectID=${this.getMainNode.ID}`)
      .then((response) => {
        console.log(response);
        this.edges = response.data.SchemeConnectionInfo;
        this.nodes = response.data.SchemeNodeInfo;
        this.initGraph();

        this.nodes.forEach((node) => {
          this.$store.commit("SET_CLASS_NAME_BY_CLASS_ID", node.ObjectClassID);
          node.ClassName = this.getClassName;
          node.NodeFieldInfoList.push({
            FieldName: "Класс",
            FieldValue: node.ClassName,
          });
          this.data.nodes.push(this.createNode(node));
        });
        this.edges.forEach((edge) => {
          this.data.edges.push(this.createEdge(edge.SourceID, edge.TargetID));
        });

        function KeyPress(e) {
          var evtobj = window.event ? event : e;
          if (evtobj.keyCode === 90 && evtobj.ctrlKey) {
            self.graph.undo();
          }
        }

        document.onkeydown = KeyPress;

        // Установка API
        this.$store.commit("SET_GRAPH_API", this.graph);

        // Установка текущего масштаба
        this.$store.commit("SET_CURRENT_ZOOM", this.graph.zoom());

        this.graph.on("scale", ({ sx, sy, ox, oy }) => {
          this.$store.commit("SET_CURRENT_ZOOM", +sx.toFixed(2));
        });

        // Установка движка компановки узлов и шаблона
        const dagreLayout = new DagreLayout({
          type: "dagre",
          rankdir: "TB",
          align: "DR",
          ranksep: 60,
          nodesep: 50,
        });
        const model = dagreLayout.layout(this.data);

        this.graph.fromJSON(model);
        this.loading = false;

        this.graph.centerContent();

        // Прохождение по массиву узлов для установки ячеек и выявление активного
        // this.nodes.forEach((node) => {
        //   if (node.Name == "Персональный компьютер") {
        //     this.$store.commit("SET_CURRENT_NODE", node);
        //   }
        //   this.graph.addCell([this.createNode(node)]);
        //   const cell = this.createNode(node);
        //   cell.setZIndex(10);
        //   cell.zIndex = 10;
        // });

        // Прохождение по массиву узлов для установки базовых связей
        // this.edges.forEach((edge) => {
        //   this.graph.addEdge(this.createEdge(edge.SourceID, edge.TargetID));
        // });

        // Центрирование холста относительно страницы
        // this.graph.centerContent();

        this.graph.on("edge:click", ({ e, x, y, edge, view }) => {
          console.log(edge, view);
          let source = edge.store.data.source.cell;
          let target = edge.store.data.target.cell;
          console.log(this);
          this.data.nodes.forEach((node) => {
            if (node.id === source) {
              source = { name: node.component.data().data[0].FieldValue };
            } else if (node.id === target) {
              target = { name: node.component.data().data[0].FieldValue };
            }
          });
          this.$store.commit("SHOW_MODAL", {
            action: "infoEdge",
            source: source,
            target: target,
            value: true,
            left: e.pageX - self.getWidthTask,
            top: e.pageY - 100 - self.getHeightMenu,
          });
          this.currentEdge = edge;
          edge.attr("line/stroke", "#43a2e3");
          this.nodeSourceHTML = view.attr.view.sourceView.container;
          this.nodeSourceHTML.classList.add("graph__node-edge");
          this.nodeTargetHTML = view.attr.view.targetView.container;
          this.nodeTargetHTML.classList.add("graph__node-edge");
        });
      });
  },
};
</script>

<style lang="scss">
.draggable {
  position: absolute;
  z-index: 120000 !important;
}

.graph {
  &__wrapper {
    position: relative;
    overflow: hidden;
  }
}
</style>
