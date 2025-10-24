import { createRouter, createWebHistory, type Router } from 'vue-router';
import { HomePage } from '@shoppe/pages/home';

const CatalogComponent = () => import('@shoppe/pages/catalog');
const ProductComponent = () => import('@shoppe/pages/product');

const router: Router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    {
      path: '/products',
      component: CatalogComponent,
    },
    {
      path: '/products/:id',
      component: ProductComponent,
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
