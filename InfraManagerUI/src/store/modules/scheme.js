const scheme = {
  state: {
    mainNode: null,
    openedTabsGraph: [],
    showModalChoiceGraphNode: false,
    sourceObject: null,
    targetObject: null,
    currentNode: null,
    graphZoom: 0,
    showModal: false,
    currentEdge: null,
    currentData: null,
    action: "",
    nodeHTML: null,
    graph: null,
    className: "",
    positionModal: {
      left: null,
      top: null,
    },
  },
  mutations: {
    SET_CURRENT_NODE(state, node) {
      state.currentNode = node;
    },
    UPDATE_VISIBLE_MODAL_CHOICE_GRAPH_NODE(state, value) {
      state.showModalChoiceGraphNode = value;
    },
    ADD_OPENED_TAB_GRAPH(state, route) {
      state.openedTabsGraph.push(route);
    },
    SET_NODE_FOR_CREATE_GRAPH(state, node) {
      state.mainNode = node;
    },
    SET_CURRENT_ZOOM(state, zoom) {
      state.graphZoom = zoom;
    },
    INC_CURRENT_ZOOM(state, inc) {
      console.log(state.graphZoom + inc);
      state.graphZoom = state.graphZoom + inc;
    },
    SHOW_MODAL(state, object) {
      state.action = object.action;
      state.showModal = object.value;
      state.currentData = object.data;
      state.positionModal.left = object.left;
      state.positionModal.top = object.top;
      state.nodeHTML = object.elem;
      state.sourceObject = object.source;
      state.targetObject = object.target;
    },
    CLOSE_MODAL(state, value) {
      state.showModal = value;
    },
    SET_CURRENT_EDGE(state, edge) {
      state.currentEdge = edge;
    },
    MODIFY_CURRENT_EDGE(state, edge) {
      state.currentEdge = edge;
    },
    SET_GRAPH_API(state, graphApi) {
      state.graph = graphApi;
    },
    SET_CLASS_NAME_BY_CLASS_ID(state, payload) {
      switch (payload) {
        case 408:
          state.className = "Сервис";
          break;
        case 5:
          state.className = "Сетевое оборудование";
          break;
        case 6:
          state.className = "Оконечное оборудование";
          break;
        case 33:
          state.className = "Адаптер";
          break;
      }
    },
  },
  actions: {},
  getters: {
      getMainNode: (state) => state.mainNode,
      getShowModalChoiceGraphNode: (state) => state.showModalChoiceGraphNode,
      getOpenedTabsGraph: (state) => state.openedTabsGraph,
      getCurrentNode: (state) => state.currentNode,
      getCurrentNodeData: (state) => state.currentData,
      getShowModal: (state) => state.showModal,
      getPositionModal: (state) => state.positionModal,
      getHTMLNode: (state) => state.nodeHTML,
      getGraph: (state) => state.graph,
      getActionModal: (state) => state.action,
      getGraphZoom: (state) => state.graphZoom,
      getSourceObject: (state) => state.sourceObject,
      getTargetObject: (state) => state.targetObject,
      getClassNameByClassID: (state) => state.className,
  },
};
export { scheme };
