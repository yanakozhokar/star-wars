import People from "../components/PeopleComponent.vue";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: People }],
  },
];

export default routes;
