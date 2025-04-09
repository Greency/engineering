import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: import('@/views/home/Index.vue')
    },
    {
      path: '/user',
      name: 'User',
      component: import('@/views/user/Index.vue')
    }
  ]
});

export default router;
