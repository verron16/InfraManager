<template>
  <div>
    <el-tree
      :data="data"
      :load="loadNode"
      node-key="id"
      :expand-on-click-node="false"
      :auto-expand-parent="true"
      :highlight-current="false"
      :check-on-click-node="true"
      show-checkbox
      ref="tree"
      lazy
      @check="updateChangedNodes"
      @node-click="changeTreeNode"
      @node-expand="updateChangedNodesByExpand"
    >
      <div class="tree__node" slot-scope="{ node, data }">
        <div class="tree-node__wrapper">
          <div
            class="tree-node__item"
            :class="'tree-node-' + data.iconClass"
          ></div>
          <h3 class="tree-node__item">{{ data.label }}</h3>
        </div>
      </div>
    </el-tree>
  </div>
</template>

<script>
export default {
  name: "Tree",
  data() {
    return {
      data: [],
      showBtnReset: false,
      checkedNodes: []
    };
  },
  methods: {
    updateChangedNodesByExpand() {
      // console.log('expand')
      // console.log(this.$refs.tree.getCheckedNodes())
      // this.$store.commit("SET_CHANGED_NODES_BY_TREE", this.$refs.tree.getCheckedNodes());
    },
    updateChangedNodes(node, children) {
      this.$store.commit("SET_CHANGED_NODES_BY_TREE", children.checkedNodes);
    },
    changeTreeNode() {
      this.$refs.tree.getCurrentNode();
      const currentNode = this.$refs.tree.getCurrentNode();
      this.$store.commit("SET_FILTER_TREE_NODE");
      this.axios.post("http://localhost:49744/accountApi/SetTreeParams", {
        FiltrationObjectID: currentNode.id,
        FiltrationObjectClassID: currentNode.classID,
        FiltrationObjectName: currentNode.label,
        FiltrationTreeType: 2,
        FiltrationField: "MOL",
      });
      this.$store.dispatch("filterRowDataServerSide");
      this.showBtnReset = true;
    },
    getRootNode() {
      this.axios
        .get(
          "navigatorApi/GetTreeNodes?ID=&ClassID=&AvailableClassID%5B%5D=29&AvailableClassID%5B%5D=374&AvailableClassID%5B%5D=378&AvailableClassID%5B%5D=93&AvailableClassID%5B%5D=94&AvailableClassID%5B%5D=95&AvailableClassID%5B%5D=96&AvailableClassID%5B%5D=115&AvailableClassID%5B%5D=182&UseAccessIsGranted=true&Type=2&AvailableCategoryID=&UseRemoveCategoryClass=&AvailableTypeID=&AvailableTemplateClassID=&AvailableTemplateClassArray%5B%5D=33&AvailableTemplateClassArray%5B%5D=34&AvailableTemplateClassArray%5B%5D=5&AvailableTemplateClassArray%5B%5D=6&HasLifeCycle=false&CustomControlObjectID=&SetCustomControl=&signalR_connectionID=129fe581-32e6-4487-b88a-75a49ab0e3ec"
        )
        .then((response) => {
          console.log(response);
          const rootNode = response.data.List[0];
          this.data.push({
            label: rootNode.Name,
            id: rootNode.ID,
            classID: rootNode.ClassID,
            iconClass: rootNode.IconClass,
            isLeaf: "leaf",
            children: [],
          });
        });
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        this.getRootNode();
      }
      if (node.level === 1) {
        this.axios
          .get(
            "navigatorApi/GetTreeNodes?ID=00000000-0000-0000-0000-000000000000&ClassID=29&AvailableClassID%5B%5D=29&AvailableClassID%5B%5D=374&AvailableClassID%5B%5D=378&AvailableClassID%5B%5D=93&AvailableClassID%5B%5D=94&AvailableClassID%5B%5D=95&AvailableClassID%5B%5D=96&AvailableClassID%5B%5D=115&AvailableClassID%5B%5D=182&UseAccessIsGranted=true&Type=2&AvailableCategoryID=&UseRemoveCategoryClass=&AvailableTypeID=&AvailableTemplateClassID=&AvailableTemplateClassArray%5B%5D=33&AvailableTemplateClassArray%5B%5D=34&AvailableTemplateClassArray%5B%5D=5&AvailableTemplateClassArray%5B%5D=6&HasLifeCycle=false&CustomControlObjectID=&SetCustomControl=&signalR_connectionID=facf3246-00d3-474f-be54-638b1cf20b48"
          )
          .then((response) => {
            const rootSubNodes = response.data.List;
            console.log(this.data);
            let subNodesArray = [];
            rootSubNodes.forEach((node) => {
              subNodesArray.push({
                label: node.Name,
                id: node.ID,
                iconClass: node.IconClass,
                classID: node.ClassID,
                isLeaf: "leaf",
              });
            });
            resolve(subNodesArray);
            this.$store.commit("SET_CHANGED_NODES_BY_TREE", this.$refs.tree.getCheckedNodes())
          });
      }
      if (node.level > 1) {
        console.log(node);
        this.axios
          .get(
            `navigatorApi/GetTreeNodes?ID=${node.data.id}&ClassID=${node.data.classID}&AvailableClassID%5B%5D=29&AvailableClassID%5B%5D=374&AvailableClassID%5B%5D=378&AvailableClassID%5B%5D=93&AvailableClassID%5B%5D=94&AvailableClassID%5B%5D=95&AvailableClassID%5B%5D=96&AvailableClassID%5B%5D=115&AvailableClassID%5B%5D=182&UseAccessIsGranted=true&Type=2&AvailableCategoryID=&UseRemoveCategoryClass=&AvailableTypeID=&AvailableTemplateClassID=&AvailableTemplateClassArray%5B%5D=33&AvailableTemplateClassArray%5B%5D=34&AvailableTemplateClassArray%5B%5D=5&AvailableTemplateClassArray%5B%5D=6&HasLifeCycle=false&CustomControlObjectID=&SetCustomControl=&signalR_connectionID=0b0bdcd2-2531-44bf-bb5e-b7cce0635e24`
          )
          .then((response) => {
            console.log(response);
            const rootSubNodes = response.data.List;
            const statusCode = response.data.Result;
            let allSubNodes = [];
            rootSubNodes.forEach((node) => {
              if (node.CanContainsSubNodes) {
                allSubNodes.push({
                  label: node.Name,
                  id: node.ID,
                  isLeaf: "leaf",
                  iconClass: node.IconClass,
                  classID: node.ClassID,
                  children: [],
                });
              } else {
                allSubNodes.push({
                  label: node.Name,
                  id: node.ID,
                  iconClass: node.IconClass,
                  classID: node.ClassID,
                });
              }
            });
            // treeNode.dataRef.children = allSubNodes;
            resolve(allSubNodes);
            this.$store.commit("SET_CHANGED_NODES_BY_TREE", this.$refs.tree.getCheckedNodes())
          });
      }
    },
  },
  mounted() {
    this.$store.commit("SET_TREE_API", this.$refs.tree)
  },
};
</script>

<style lang="scss">
//.is-current {
//  .tree-node__item:last-child {
//    font-weight: 700;
//  }
//}
.is-checked .el-tree-node__content {
  font-weight: 700 !important;
  background-color: #f0f7ff;
}
.el-tree {
  overflow: auto;
  max-height: 500px;
  &-node {
    white-space: normal !important;
    &__content {
      height: auto !important;
    }
  }
}
.tree {
  &__reset {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    padding-right: 20px;
    height: 90px;
  }
  &-node {
    &__wrapper {
      display: flex;
      align-items: center;
    }
    &__item {
      &:last-child {
        font-style: normal;
        font-weight: inherit;
        font-size: 12px;
        line-height: 14px;
        color: #000000;
      }
      &:first-child {
        min-width: 23px;
        min-height: 23px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-repeat: no-repeat;
        background-position: center;
        margin-right: 10px;
        margin-left: 5px;
      }
    }
    &-treeNodeIcon-owner {
      background-image: url("../../../assets/icons/catalog/catalog.svg");
    }
    &-treeNodeIcon-prodCat {
      background-image: url("../../../assets/icons/catalog/directory.svg");
    }
    &-treeNodeIcon-adapterDefault {
      background-image: url("../../../assets/icons/catalog/adapter-default.svg");
    }
    &-treeNodeIcon-videoadapter {
      background-image: url("../../../assets/icons/catalog/videoadapter.svg");
    }
    &-treeNodeIcon-storage {
      background-image: url("../../../assets/icons/catalog/storage.svg");
    }
    &-treeNodeIcon-soundcard {
      background-image: url("../../../assets/icons/catalog/soundcard.svg");
    }
    &-treeNodeIcon-motherboard {
      background-image: url("../../../assets/icons/catalog/motherboard.svg");
    }
    &-treeNodeIcon-memory {
      background-image: url("../../../assets/icons/catalog/memory.svg");
    }
    &-treeNodeIcon-processor {
      background-image: url("../../../assets/icons/catalog/processor.svg");
    }
    &-treeNodeIcon-networkAdapter {
      background-image: url("../../../assets/icons/catalog/network-adapter.svg");
    }
    &-treeNodeIcon-cdAndDvdDrive {
      background-image: url("../../../assets/icons/catalog/cdreader.svg");
    }
    &-treeNodeIcon-networkDefault {
      background-image: url("../../../assets/icons/catalog/newtwork-default.svg");
    }
    &-treeNodeIcon-swith {
      background-image: url("../../../assets/icons/catalog/swith.svg");
    }
    &-treeNodeIcon-bridge {
      background-image: url("../../../assets/icons/catalog/bridge.svg");
    }
    &-treeNodeIcon-router {
      background-image: url("../../../assets/icons/catalog/router.svg");
    }
    &-treeNodeIcon-server {
      background-image: url("../../../assets/icons/catalog/server.svg");
    }
    &-treeNodeIcon-computer {
      background-image: url("../../../assets/icons/catalog/computer.svg");
    }
    &-treeNodeIcon-modem {
      background-image: url("../../../assets/icons/catalog/modem.svg");
    }
    &-treeNodeIcon-workStation {
      background-image: url("../../../assets/icons/catalog/work-station.svg");
    }
    &-treeNodeIcon-printer {
      background-image: url("../../../assets/icons/catalog/printer.svg");
    }
    &-treeNodeIcon-phone {
      background-image: url("../../../assets/icons/catalog/phone.svg");
    }
    &-treeNodeIcon-fax {
      background-image: url("../../../assets/icons/catalog/fax.svg");
    }
    &-treeNodeIcon-keyboard {
      background-image: url("../../../assets/icons/catalog/keyboard.svg");
    }
    &-treeNodeIcon-monitor {
      background-image: url("../../../assets/icons/catalog/monitor.svg");
    }
    &-treeNodeIcon-mouse {
      background-image: url("../../../assets/icons/catalog/mouse.svg");
    }
    &-treeNodeIcon-scaner {
      background-image: url("../../../assets/icons/catalog/scaner.svg");
    }
    &-treeNodeIcon-keyboard-model {
      background-image: url("../../../assets/icons/catalog/keyboard-model.svg");
    }
  }
}
</style>
