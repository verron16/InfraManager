<template>
  <div>
    <el-tree
      :data="data"
      :load="loadNode"
      node-key="id"
      :props="propsTree"
      :expand-on-click-node="false"
      :auto-expand-parent="true"
      :highlight-current="false"
      :check-on-click-node="true"
      show-checkbox
      ref="tree"
      :empty-text="'список пуст...'"
      lazy
      @check="updateChangedNodes"
      @node-click="changeTreeNode"
      @node-expand="updateChangedNodesByExpand"
    >
      <div class="tree__node" slot-scope="{ node, data }">
        <div class="tree-node__wrapper">
          <div
            class="tree-node__item"
            :class="data.iconClass"
            :style="{
              backgroundImage: `url(${DeterminantsIconByClass(
                data.iconClass
              )})`,
            }"
          ></div>
          <h3 class="tree-node__item">{{ data.label }}</h3>
        </div>
      </div>
    </el-tree>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Tree",
  data() {
    return {
      data: [],
      showBtnReset: false,
      checkedNodes: [],
      propsTree: {
        isLeaf: "leaf",
      },
    };
  },
  methods: {
    updateChangedNodesByExpand() {
      // console.log('expand')
      // console.log(this.$refs.tree.getCheckedNodes())
      // this.$store.commit("SET_CHANGED_NODES_BY_TREE", this.$refs.tree.getCheckedNodes());
    },
    DeterminantsIconByClass(className) {
      switch (className) {
        case "treeNodeIcon-owner":
          return (
            axios.defaults.baseURL + "images/controls/navigator/owner_gray.png"
          );
        case "treeNodeIcon-organization":
          return (
            axios.defaults.baseURL + "images/controls/navigator/org_gray.png"
          );
        case "treeNodeIcon-subdivision":
          return (
            axios.defaults.baseURL + "images/controls/navigator/sub_gray.png"
          );
        case "treeNodeIcon-user":
          return (
            axios.defaults.baseURL + "images/controls/navigator/user_gray.png"
          );
        case "treeNodeIcon-building":
          return (
            axios.defaults.baseURL + "images/controls/navigator/build_gray.png"
          );
        case "treeNodeIcon-floor":
          return (
            axios.defaults.baseURL + "images/controls/navigator/floor_gray.png"
          );
        case "treeNodeIcon-room":
          return (
            axios.defaults.baseURL + "images/controls/navigator/room_gray.png"
          );
        case "treeNodeIcon-rack":
          return (
            axios.defaults.baseURL + "images/controls/navigator/rack_gray.png"
          );
        case "treeNodeIcon-workplace":
          return (
            axios.defaults.baseURL + "images/controls/navigator/wp_gray.png"
          );
        case "treeNodeIcon-prodCat":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_folder_open_category_grey.svg"
          );
        case "treeNodeIcon-prodType":
          return (
            axios.defaults.baseURL + "images/controls/navigator/rack_gray.svg"
          );
        case "treeNodeIcon-networkDefault":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_network_hardware_grey.svg"
          );
        case "treeNodeIcon-router":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_router_grey.svg"
          );
        case "treeNodeIcon-computer":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_computer_grey.svg"
          );
        case "treeNodeIcon-workStation":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_equipment_grey.svg"
          );
        case "treeNodeIcon-swith":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_switch_grey.svg"
          );
        case "treeNodeIcon-printer":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_printer_grey.svg"
          );
        case "treeNodeIcon-server":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_server_grey.svg"
          );
        case "treeNodeIcon-modem":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_modem_grey.svg"
          );
        case "treeNodeIcon-bridge":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_bridge_grey.svg"
          );
        case "treeNodeIcon-phone":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_phone_grey.svg"
          );
        case "treeNodeIcon-fax":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_fax_grey.svg"
          );
        case "treeNodeIcon-storageSystem":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_data_storage_grey.svg"
          );
        case "treeNodeIcon-logicalComponent":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_composite_object_passive.svg"
          );
        case "treeNodeIcon-serviceContract":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_contract_grey.svg"
          );
        case "treeNodeIcon-material":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_consumable_grey.svg"
          );
        case "deviceApplication":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_applicatiom_grey.svg"
          );
        case "treeNodeIcon-softwareLicenseStandalone":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/license_icon_main.svg"
          );
        case "treeNodeIcon-softwareLicenseRent":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/license_rent_icon.svg"
          );
        case "treeNodeIcon-softwareLicenseUpgrade":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_license_upgrade_grey.svg"
          );
        case "treeNodeIcon-softwareLicenseSubscribe":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_license_subscribe_grey.svg"
          );
        case "treeNodeIcon-softwareLicenseProlongation":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_license_rent_grey.svg"
          );
        case "treeNodeIcon-softwareLicense":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_license_grey.svg"
          );
        case "treeNodeIcon-adapterDefault":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_adapter_grey.svg"
          );
        case "treeNodeIcon-motherboard":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_motherboard_grey.svg"
          );
        case "treeNodeIcon-processor":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_CPU_grey.svg"
          );
        case "treeNodeIcon-memory":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_SDD_grey.svg"
          );
        case "treeNodeIcon-videoadapter":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_videoadapter_grey.svg"
          );
        case "treeNodeIcon-soundcard":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_soundcard_grey.svg"
          );
        case "treeNodeIcon-networkAdapter":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_LAN_card_grey.svg"
          );
        case "treeNodeIcon-storage":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_HDD_grey.svg"
          );
        case "treeNodeIcon-cdAndDvdDrive":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_CD_grey.svg"
          );
        case "treeNodeIcon-floppyDrive":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_floppy_drive_grey.svg"
          );
        case "treeNodeIcon-monitor":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_monitor_grey.svg"
          );
        case "treeNodeIcon-keyboard":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_keyboard_grey.svg"
          );
        case "treeNodeIcon-mouse":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_mouse_grey.svg"
          );
        case "treeNodeIcon-scaner":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_scaner_grey.svg"
          );
        case "treeNodeIcon-storageController":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_controller_SSD_grey.svg"
          );
        case "treeNodeIcon-pDefault":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_peripheral_device_grey.svg"
          );
        case "treeNodeIcon-networkDefault-model":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_network_hardware_model_grey.svg"
          );
        case "treeNodeIcon-router-model":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_router_model_grey.svg"
          );
        case "treeNodeIcon-computer-model":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_computer_model_grey.svg"
          );
        case "treeNodeIcon-workStation-model":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_equipment_model_grey.svg"
          );
        case "treeNodeIcon-swith-model":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_switch_model_grey.svg"
          );
        case "treeNodeIcon-printer-model":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_printer_model_grey.svg"
          );
        case "treeNodeIcon-server-model":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_server_model_grey.svg"
          );
        case "treeNodeIcon-modem-model":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_modem_model_grey.svg"
          );
        case "treeNodeIcon-bridge-model":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_bridge_model_grey.svg"
          );
        case "treeNodeIcon-phone-model":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_phone_model_grey.svg"
          );
        case "treeNodeIcon-fax-model":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_fax_model_grey.svg"
          );
        case "treeNodeIcon-storageSystem-model":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_data_storage_model_grey.svg"
          );
        case "treeNodeIcon-logicalComponent-model":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_composite_object_model_passive.svg"
          );
        case "treeNodeIcon-cartridge-model":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_cartridge_model_grey.svg"
          );
        case "treeNodeIcon-serviceContract-model":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_contract_model_grey.svg"
          );
        case "treeNodeIcon-material-model":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_consumable_model_grey.svg"
          );
        case "treeNodeIcon-deviceApplication-model":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_applicatiom_model_grey.svg"
          );
        case "treeNodeIcon-softwareLicenseStandalone-model":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_license_main_model_grey.svg"
          );
        case "treeNodeIcon-softwareLicenseRent-model":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_license_rent_model_grey.svg"
          );
        case "treeNodeIcon-softwareLicenseUpgrade-model":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_license_upgrade_model_grey.svg"
          );
        case "treeNodeIcon-softwareLicenseSubscribe-model":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_license_subscribe_model_grey.svg"
          );
        case "treeNodeIcon-softwareLicenseProlongation-model":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_license_subscribe_model_grey.svg"
          );
        case "treeNodeIcon-softwareLicense-model":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_license_model_grey.svg"
          );
        case "treeNodeIcon-adapterDefault-model":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_adapter_model_grey.svg"
          );
        case "treeNodeIcon-motherboard-model":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_motherboard_model_grey.svg"
          );
        case "treeNodeIcon-processor-model":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_CPU_model_grey.svg"
          );
        case "treeNodeIcon-memory-model":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_SDD_model_grey.svg"
          );
        case "treeNodeIcon-videoadapter-model":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_videoadapter_model_grey.svg"
          );
        case "treeNodeIcon-soundcard-model":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_soundcard_model_grey.svg"
          );
        case "treeNodeIcon-networkAdapter-model":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_LAN_card_model_grey.svg"
          );
        case "treeNodeIcon-storage-model":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_HDD_model_grey.svg"
          );
        case "treeNodeIcon-cdAndDvdDrive-model":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_CD_model_grey.svg"
          );
        case "treeNodeIcon-floppyDrive-model":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_floppy_drive_model_grey.svg"
          );
        case "treeNodeIcon-monitor-model":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_monitor_model_grey.svg"
          );
        case "treeNodeIcon-keyboard-model":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_keyboard_model_grey.svg"
          );
        case "treeNodeIcon-mouse-model":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_mouse_model_grey.svg"
          );
        case "treeNodeIcon-scaner-model":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_scaner_model_grey.svg"
          );
        case "treeNodeIcon-storageController-model":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_controller_SSD_model_grey.svg"
          );
        case "treeNodeIcon-pDefault-model":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_peripheral_device_model_grey.svg"
          );
        case "treeNodeIcon-host":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_host_network_passive.svg"
          );
        case "treeNodeIcon-icon-network-node-Ke":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_network_passive.svg"
          );
        case "treeNodeIcon-icon-commutator":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_commutator_passive.svg"
          );
        case "treeNodeIcon-icon-router-configuration":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_router_network_passive.svg"
          );
        case "treeNodeIcon-print-server":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_printserver_passive.svg"
          );
        case "treeNodeIcon-icon-data-storage":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_DB_network_passive.svg"
          );
        case "treeNodeIcon-icon-win-server":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_winserver_passive.svg"
          );
        case "treeNodeIcon-icon-vm":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_vm_grey.svg"
          );
        case "treeNodeIcon-icon-logical-server":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_logical_server.svg"
          );
        case "treeNodeIcon-icon-logical-server-model":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_logical_server_model.svg"
          );
        case "treeNodeIcon-icon-logical-computer":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_logical_computer.svg"
          );
        case "treeNodeIcon-icon-logical-computer-model":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_logical_computer_model.svg"
          );
        case "treeNodeIcon-icon-logical-commutator":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_router_ke_grey.svg"
          );
        case "treeNodeIcon-icon-logical-commutator-model":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/logical_commutator_icon_model.svg"
          );
        case "treeNodeIcon-ITSystem":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_ITSystem_grey.svg"
          );
        case "treeNodeIcon-data-entity":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/data_entity_icon.svg"
          );
        case "treeNodeIcon-cluster":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/cluster_icon.svg"
          );
        case "treeNodeIcon-networkDevice":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/network_device.png"
          );
        case "treeNodeIcon-terminalDevice":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/terminal_device.png"
          );
        case "treeNodeIcon-softwareType":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/icon_folder_open_category_grey.svg"
          );
        case "treeNodeIcon-softwareModel":
          return (
            axios.defaults.baseURL +
            "images/controls/navigator/network_device.png"
          );
      }
    },
    updateChangedNodes(node, children) {
      console.log(node);
      this.$store.commit("SET_CHANGED_NODES_BY_TREE", children.checkedNodes);
    },
    changeTreeNode() {
      this.$refs.tree.getCurrentNode();
      const currentNode = this.$refs.tree.getCurrentNode();
      this.$store.commit("SET_FILTER_TREE_NODE");
      this.axios.post("accountApi/SetTreeParams", {
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
          "navigatorApi/GetTreeNodes?ID=&ClassID=&AvailableClassID%5B%5D=29&AvailableClassID%5B%5D=374&AvailableClassID%5B%5D=378&AvailableClassID%5B%5D=93&AvailableClassID%5B%5D=94&AvailableClassID%5B%5D=95&AvailableClassID%5B%5D=96&AvailableClassID%5B%5D=115&AvailableClassID%5B%5D=182&UseAccessIsGranted=true&Type=2&AvailableCategoryID=&UseRemoveCategoryClass=&AvailableTypeID=&AvailableTemplateClassID=&AvailableTemplateClassArray%5B%5D=409&AvailableTemplateClassArray%5B%5D=410&AvailableTemplateClassArray%5B%5D=411&AvailableTemplateClassArray%5B%5D=412&AvailableTemplateClassArray%5B%5D=413&AvailableTemplateClassArray%5B%5D=414&AvailableTemplateClassArray%5B%5D=419&AvailableTemplateClassArray%5B%5D=420&AvailableTemplateClassArray%5B%5D=12&AvailableTemplateClassArray%5B%5D=416&AvailableTemplateClassArray%5B%5D=417&AvailableTemplateClassArray%5B%5D=418&AvailableTemplateClassArray%5B%5D=165&HasLifeCycle=false&CustomControlObjectID=&SetCustomControl=&signalR_connectionID=129fe581-32e6-4487-b88a-75a49ab0e3ec"
        )
        .then((response) => {
          console.log(response);
          const rootNode = response.data.List[0];
          console.log(rootNode.CanContainsSubNodes)
          this.data.push({
            label: rootNode.Name,
            id: rootNode.ID,
            classID: rootNode.ClassID,
            iconClass: rootNode.IconClass,
            leaf: !rootNode.CanContainsSubNodes,
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
            "navigatorApi/GetTreeNodes?ID=00000000-0000-0000-0000-000000000000&ClassID=29&AvailableClassID%5B%5D=29&AvailableClassID%5B%5D=374&AvailableClassID%5B%5D=378&AvailableClassID%5B%5D=93&AvailableClassID%5B%5D=94&AvailableClassID%5B%5D=95&AvailableClassID%5B%5D=96&AvailableClassID%5B%5D=115&AvailableClassID%5B%5D=182&UseAccessIsGranted=true&Type=2&AvailableCategoryID=&UseRemoveCategoryClass=&AvailableTypeID=&AvailableTemplateClassArray%5B%5D=409&AvailableTemplateClassArray%5B%5D=410&AvailableTemplateClassArray%5B%5D=411&AvailableTemplateClassArray%5B%5D=412&AvailableTemplateClassArray%5B%5D=413&AvailableTemplateClassArray%5B%5D=414&AvailableTemplateClassArray%5B%5D=419&AvailableTemplateClassArray%5B%5D=420&AvailableTemplateClassArray%5B%5D=12&AvailableTemplateClassArray%5B%5D=416&AvailableTemplateClassArray%5B%5D=417&AvailableTemplateClassArray%5B%5D=418&AvailableTemplateClassArray%5B%5D=165&HasLifeCycle=false"
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
                leaf: !node.CanContainsSubNodes,
              });
            });
            resolve(subNodesArray);
            this.$store.commit(
              "SET_CHANGED_NODES_BY_TREE",
              this.$refs.tree.getCheckedNodes()
            );
          });
      }
      if (node.level > 1) {
        console.log(node);
        this.axios
          .get(
            `navigatorApi/GetTreeNodes?ID=${node.data.id}&ClassID=${node.data.classID}&AvailableClassID%5B%5D=29&AvailableClassID%5B%5D=374&AvailableClassID%5B%5D=378&AvailableClassID%5B%5D=93&AvailableClassID%5B%5D=94&AvailableClassID%5B%5D=95&AvailableClassID%5B%5D=96&AvailableClassID%5B%5D=115&AvailableClassID%5B%5D=182&UseAccessIsGranted=true&Type=2&AvailableCategoryID=&UseRemoveCategoryClass=&AvailableTypeID=&AvailableTemplateClassArray%5B%5D=409&AvailableTemplateClassArray%5B%5D=410&AvailableTemplateClassArray%5B%5D=411&AvailableTemplateClassArray%5B%5D=412&AvailableTemplateClassArray%5B%5D=413&AvailableTemplateClassArray%5B%5D=414&AvailableTemplateClassArray%5B%5D=419&AvailableTemplateClassArray%5B%5D=420&AvailableTemplateClassArray%5B%5D=12&AvailableTemplateClassArray%5B%5D=416&AvailableTemplateClassArray%5B%5D=417&AvailableTemplateClassArray%5B%5D=418&AvailableTemplateClassArray%5B%5D=165&HasLifeCycle=false&CustomControlObjectID=&SetCustomControl=&signalR_connectionID=0b0bdcd2-2531-44bf-bb5e-b7cce0635e24`
          )
          .then((response) => {
            console.log(response);
            const rootSubNodes = response.data.List;
            let allSubNodes = [];
            rootSubNodes.forEach((node) => {
              console.log(node.CanContainsSubNodes);
              allSubNodes.push({
                label: node.Name,
                id: node.ID,
                leaf: !node.CanContainsSubNodes,
                iconClass: node.IconClass,
                classID: node.ClassID,
              });
            });
            resolve(allSubNodes);
            this.$store.commit(
              "SET_CHANGED_NODES_BY_TREE",
              this.$refs.tree.getCheckedNodes()
            );
          });
      }
    },
  },
  mounted() {
    this.$store.commit("SET_TREE_API", this.$refs.tree);
  },
};
</script>

<style lang="scss">
//.is-current {
//  .tree-node__item:last-child {
//    font-weight: 700;
//  }
//}
// При отметке чекбокса
.is-checked .el-tree-node__content {
  font-weight: 700 !important;
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
        margin-right: 6px;
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
