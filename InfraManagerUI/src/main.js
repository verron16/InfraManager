import "core-js/stable";
import "regenerator-runtime/runtime";

import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router/router";
import axios from "axios";
import VueAxios from "vue-axios";

import ElementUI from "element-ui";
Vue.use(ElementUI);

import "./directives/AddClassByHovered"

import { Tree } from "element-ui";
Vue.component("Tree", Tree);

import "element-ui/lib/theme-chalk/index.css";

import { Icon } from "ant-design-vue";
Vue.use(Icon);

import { Spin } from "ant-design-vue";
Vue.use(Spin);

import "ant-design-vue/dist/antd.css";
Vue.config.productionTip = false;

import VueDraggableResizable from "vue-draggable-resizable";

// Основные стили для таблиц
import "../node_modules/@ag-grid-community/core/dist/styles/ag-grid.css";
import "../node_modules/@ag-grid-community/core/dist/styles/ag-theme-alpine.css";

// Основные вспомогательные модули для таблиц
import "@ag-grid-community/client-side-row-model";
import "@ag-grid-community/infinite-row-model";
import "@ag-grid-community/csv-export";

// Импорт бибилиотеки модальных окнов
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

// Импорт библиотеки закрытия узлов за их пределами
import { directive as onClickaway } from "vue-clickaway";
Vue.directive("on-clickaway", onClickaway);

// Использование библиотек и модулей
Vue.use(VueSweetalert2);
Vue.use(VueAxios, axios);

import "./styles/style.scss";

// Регистрация глобальных компонентов
Vue.component("vue-draggable-resizable", VueDraggableResizable);

// Конфигурация HTTP
import "./http"
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
