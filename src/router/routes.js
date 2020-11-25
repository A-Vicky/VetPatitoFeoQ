
const routes = [
  {
    path: '/',
    component: () => import('layouts/noLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      {
        path: 'app',
        component: () => import('layouts/MainLayout.vue'),
        children: [
          {path: 'Home', component: () => import('pages/app/home.vue')},
        ]
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
