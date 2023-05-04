
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/BlankLayout.vue'),
    children: [
      { path: '', component: () => import('pages/login/IndexPage.vue') }
    ]
  },
  {
    path: '/restaurants',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/restaurants/ListPage.vue') }
    ]
  },
  {
    path: '/reservations',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/reservations/ListPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
