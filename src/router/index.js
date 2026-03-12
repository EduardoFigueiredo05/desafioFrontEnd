import { createRouter, createWebHistory } from 'vue-router'
import ProductList from '../views/ProductList.vue'
import ProductForm from '../views/ProductForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ProductList
    },
    {
      path: '/product/new',
      name: 'product-new',
      component: ProductForm
    },
    {
      path: '/product/edit/:id', // Rota para editar, com parâmetro de ID
      name: 'product-edit',
      component: ProductForm
    }
  ]
})

export default router