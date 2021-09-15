import axios from "axios";

const tree = {
  state: {
    currentFilterTree: null,
    currentChangedFilters: [],
    treeApi: null,
  },
  mutations: {
    SET_FILTER_TREE_NODE(state, filter) {
      state.currentFilterTree = filter;
    },
    SET_CHANGED_NODES_BY_TREE(state, changedNodes) {
      state.currentChangedFilters = changedNodes;
    },
    SET_TREE_API(state, treeApi) {
      state.treeApi = treeApi;
    },
  },
  actions: {
    resetTreeSettings() {
      axios
        .post("accountApi/ResetTreeParams")
        .then((response) => {})
        .catch((e) => console.log(e));
    },
  },
  getters: {
    getCurrentChangedFilters: (state) => state.currentChangedFilters,
    getTreeApi: (state) => state.treeApi,
  },
};
export { tree };
