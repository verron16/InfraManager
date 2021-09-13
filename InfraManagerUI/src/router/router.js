import Vue from "vue";
import VueRouter from "vue-router";

// Схема взаимосвязей
import Graph from "../components/Graph/Graph";

// Диаграмма Ганнта
import Gannt from "../components/Gannt/Gannt";

// Справочники
import GuideCategoriesRFC from "../components/Guides/GuideCategoriesRFC/GuideCategoriesRFC";
import GuideTypeUsingPO from "../components/Guides/GuideTypeUsingPO/GuideTypeUsingPO";
import GuideManufactures from "../components/Guides/GuideManufacturers/GuideManufactures";

// Выбор узла для схемы взаимосвязей
// import ModalChoiceGraphNode from "../components/ModalChoice/ModalChoiceGraphNode";

// Шаблон для справочников
import GuideLayout from "../components/Layouts/GuidesLayout";

// Шаблон для вызова схем взаимосвязей
// import SchemeLayout from "../components/Layouts/SchemeLayout";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: { name: "categoriesRFC" },
  },
  {
    path: "/guides",
    component: GuideLayout,
    children: [
      {
        name: "categoriesRFC",
        path: "categoriesRFC",
        component: GuideCategoriesRFC,
      },
      {
        path: "typesPO",
        component: GuideTypeUsingPO,
      },
      {
        path: "gannt",
        component: Gannt,
      },
      {
        path: "manufactures",
        component: GuideManufactures,
      },
    ],
  },
  // {
  //   path: "/scheme",
  //   component: SchemeLayout,
  //   children: [
  //     {
  //       path: ":id",
  //       component: Graph,
  //     },
  //     {
  //       path: "change",
  //       component: ModalChoiceGraphNode,
  //       children: [
  //         {
  //           path: "products",
  //         },
  //         {
  //           path: "services",
  //         },
  //       ],
  //     },
  //   ],
  // },
];

export default new VueRouter({
  mode: "history",
  routes,
});
