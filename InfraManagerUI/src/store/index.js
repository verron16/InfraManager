import Vue from "vue";
import Vuex from "vuex";

import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(Vuex);
Vue.use(VueAxios, axios);

// Импорт модулей хранилища

// Схема взаимосвязей ( Сервисно-ресурсная модель)
import { scheme } from "./modules/scheme";
// Таблицы
import { tables } from "./modules/tables";
// Деревья
import { tree } from "./modules/tree";

export default new Vuex.Store({
  state: {
    heightMenu: null,
    widthTask: null,
  },
  mutations: {
    SET_WIDTH_TASKS(state, payload) {
      state.widthTasks = payload;
    },
    SET_HEIGHT_MENU(state, payload) {
      state.heightMenu = payload;
    },
  },
  actions: {},
  getters: {
    getHeightMenu: (state) => state.heightMenu,
    getWidthTask: (state) => state.widthTask,
  },
  modules: {
    scheme,
    tables,
    tree,
  },
});
