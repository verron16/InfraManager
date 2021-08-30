import Vue from "vue";
import VueRouter from "vue-router";
import Graph from "../components/Graph/Graph";
import Gannt from "../components/Gannt/Gannt";
import GuideCategoriesRFC from "../components/Guides/GuideCategoriesRFC";
import GuideLayout from "../components/Layouts/GuidesLayout";
import ModalChoiceGraphNode from "../components/ModalChoice/ModalChoiceGraphNode";
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
