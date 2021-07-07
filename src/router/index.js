import { createRouter, createWebHistory } from 'vue-router'
import Shop from '../views/Shop.vue'
import store from '../store'



const routes = [
  {
    path: '/',
    name: 'shop',
    component: Shop,
    meta: {
      layout: 'main',
      auth: false,
      admin: false,
      breadcrumb: [
        {name: 'Все товары'}
      ]
    }
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/admin/Admin'),
    meta: {
      layout: 'admin',
      auth: true,
      admin: true,
    },
    children: [
      {
        path: 'products',
        name: 'adminProducts',
        component: () => import('../views/admin/Products'),
        meta: {
          layout: 'admin',
          auth: true,
          admin: true,
        }
      },
      {
        path: 'category',
        name: 'adminCategory',
        component: () => import('../views/admin/Category'),
        meta: {
          layout: 'admin',
          auth: true,
          admin: true,
        }
      },
      {
        path: 'users',
        name: 'adminUsers',
        component: () => import('../views/admin/Users'),
        meta: {
          layout: 'admin',
          auth: true,
          admin: true,
        }
      },
      {
        path: 'orders',
        name: 'orders',
        component: () => import('../views/admin/Orders'),
        meta: {
          layout: 'admin',
          auth: true,
          admin: true,
        }
      },
      {
        path: 'offers',
        name: 'offers',
        component: () => import('../views/admin/Offers'),
        meta: {
          layout: 'admin',
          auth: true,
          admin: true,
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/auth/Login.vue'),
    meta: {
      layout: 'auth',
      auth: false,
      admin: false
    }
  },
  {
    path: '/registry',
    name: 'registry',
    component: () => import('../views/auth/Registry.vue'),
    meta: {
      layout: 'auth',
      auth: false,
      admin: false
    }
  },
  {
    path: '/forget',
    name: 'forget',
    component: () => import('../views/auth/Forget.vue'),
    meta: {
      layout: 'auth',
      auth: false,
      admin: false
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/Cart'),
    meta: {
      layout: 'main',
      auth: false,
      admin: false
    }
  },
  {
    path: '/actions',
    name: 'actions',
    component: () => import('../views/Actions'),
    props: true,
    meta: {
      layout: 'main',
      auth: false,
      admin: false
    }
  },
  {
    path: '/notadmin',
    name: 'notadmin',
    component: () => import('../views/admin/NotAdmin'),
    meta: {
      layout: 'main',
      auth: true,
      admin: false
    }
  },
  {
    path: '/product/:firebaseKey',
    name: 'product',
    component: () => import('../views/Product'),
    props: true,
    meta: {
      layout: 'main',
      auth: false,
      admin: false,
      breadcrumb: [
        {name: 'Все товары', link: '/'},
        {name: product => product.name}
      ]
    }
  },
  {
    path: '/thanks',
    name: 'thanks',
    component: () => import('../views/Thanks'),
    props: true,
    meta: {
      layout: 'main',
      auth: false,
      admin: false
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('../views/404'),
    meta: {
      layout: 'main',
      auth: false,
      admin: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'current',
  linkExactActiveClass: 'current'
})

router.beforeEach((to, from, next) => {
  const requireAuth = to.meta.auth
  const admin = to.meta.admin

  if (store.getters['auth/isAuthorized'] && store.getters['auth/isAdmin']) {
    return next()
  } else if (store.getters['auth/isAuthorized'] && store.getters['auth/isAdmin'] && admin) {
    return next('/admin')
  } else if (requireAuth && !store.getters['auth/isAuthorized']) {
    return  next('/login?message=notautorized')
  } else if (admin && store.getters['auth/isNotAdmin']) {
    return next('/notadmin')
  } else {
    next()
  }

})

export default router
