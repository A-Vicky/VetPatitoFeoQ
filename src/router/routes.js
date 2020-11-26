
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
          {path: 'Employee', component: () => import('pages/app/employee.vue')},
          {path: 'NewEmployee', component: () => import('pages/app/newemployee.vue')},
          {path: 'Owner', component: () => import('pages/app/owner.vue')},
          //{path: 'NewOwner', component: () => import('pages/app/newowner.vue')},
          {path: 'Pet', component: () => import('pages/app/pet.vue')},
          //{path: 'NewOwner', component: () => import('pages/app/newowner.vue')},
          {path: 'Appointment', component: () => import('pages/app/appointment.vue')},
          //{path: 'NewOwner', component: () => import('pages/app/newowner.vue')},
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
