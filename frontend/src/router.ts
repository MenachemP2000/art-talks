import { createRouter, createWebHistory } from "vue-router";
import Gallery from "./pages/Gallery.vue";
import PictureView from "./pages/PictureView.vue";
export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Gallery },
    { path: "/picture/:id", component: PictureView, props: true }
  ]
});
