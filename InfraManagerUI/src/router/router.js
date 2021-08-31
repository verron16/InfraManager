import Vue from "vue";
import VueRouter from "vue-router";

// Схема взаимосвязей
import Graph from "../components/Graph/Graph";

// Диаграмма Ганнта
import Gannt from "../components/Gannt/Gannt";

// Справочники
import GuideCategoriesRFC from "../components/Guides/GuideCategoriesRFC/GuideCategoriesRFC";
import GuideTypeUsingPO from "../components/Guides/GuideTypeUsingPO/GuideTypeUsingPO";

// Выбор узла для схемы взаимосвязей
import ModalChoiceGraphNode from "../components/ModalChoice/ModalChoiceGraphNode";

// Шаблон для справочников
import GuideLayout from "../components/Layouts/GuidesLayout";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Graph,
  },
  {
    path: "/guides",
    component: GuideLayout,
    children: [
      {
        path: "categoriesRFC",
        component: GuideCategoriesRFC,
      },
      {
        path: "typesPO",
        component: GuideTypeUsingPO,
      },
      {
        path: "guides",
        component: Graph,
      },
      {
        path: "gannt",
        component: Gannt,
      },
      {
        path: "choice",
        component: ModalChoiceGraphNode,
        children: [
          {
            path: "products",
          },
          {
            path: "services",
          },
        ],
      },
    ],
  },
];

export default new VueRouter({
  mode: "history",
  routes,
});
