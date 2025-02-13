
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../views/Home.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      component: () => import('../views/Login.vue'),
      meta: { guest: true }
    },
    {
      path: '/signup',
      component: () => import('../views/Signup.vue'),
      meta: { guest: true }
    },
    {
      path: '/market',
      component: () => import('../views/Market.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/market/local-stocks',
      component: () => import('../views/LocalStocks.vue'),
      meta: { requiresAuth: true  }
    },
    {
      path: '/market/foreign-stocks',
      component: () => import('../views/ForeignStocks.vue'),
      meta: { requiresAuth: true  }
    },
    {
      path: '/wallet',
      component: () => import('../views/Wallet.vue'),
      meta: {requiresAuth: true }
    },
    {
      path: '/trade',
      component: () => import('../views/Trade.vue'),
      meta: { requiresAuth: true  }
    },
    {
      path: '/trade/:symbol',
      component: () => import('../views/StockDetail.vue'),
      meta: {requiresAuth: true  }
    },
    {
      path: '/history',
      component: () => import('../views/History.vue'),
      meta: {requiresAuth: true  }
    },
    {
      path: '/fixed',
      component: () => import('../views/Fixed.vue'),
      meta: { requiresAuth: true  }
    },
    {
      path: '/refer',
      component: () => import('../views/Refer.vue'),
      meta: { requiresAuth: true  }
    },
    {
      path: '/referals',
      component: () => import('../views/Referals.vue'),
      meta: {requiresAuth: true  }
    },
    // Admin routes
    {
      path: '/admin',
      component: () => import('../views/admin/AdminDashboard.vue'),
      meta: { guest: true , requiresAdmin: false }
    },
    {
      path: '/admin/users',
      component: () => import('../views/admin/Users.vue'),
      meta: { guest: true , requiresAdmin: false }
    },
    {
      path: '/admin/transactions',
      component: () => import('../views/admin/Transactions.vue'),
      meta: { guest: true , requiresAdmin: false }
    },
    {
      path: '/admin/stocks',
      component: () => import('../views/admin/Stocks.vue'),
      meta: { guest: true , requiresAdmin: false }
    },
    {
      path: '/admin/settings',
      component: () => import('../views/admin/Settings.vue'),
      meta: { guest: true , requiresAdmin: false }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = authStore.isAuthenticated
  const isAdmin = authStore.user?.user_metadata?.role === 'admin'

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresAdmin && !isAdmin) {
    next('/')
  } else if (to.meta.guest && isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router
