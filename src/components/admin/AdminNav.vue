```vue
<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-[#111111] border-t border-[#1E1E1E] z-50 lg:hidden">
    <div class="flex justify-around py-2 px-2">
      <router-link
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        class="flex flex-col items-center gap-1"
        :class="{ 'text-[#7F3DFF]': isActive(item.path), 'text-gray-400': !isActive(item.path) }"
      >
        <i :class="item.icon" class="text-xl"></i>
        <span class="text-xs font-medium">{{ item.label }}</span>
      </router-link>
    </div>
  </nav>

  <div class="hidden lg:flex flex-col w-64 h-screen bg-[#111111] fixed left-0 top-0">
    <div class="p-6">
      <div class="flex items-center gap-2 mb-8">
        <img src="" alt="Logo" class="w-[38px]" />
        <h1 class="text-2xl font-bold text-white">Admin Panel</h1>
      </div>
      <nav class="space-y-2">
        <router-link
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
          :class="[
            isActive(item.path)
              ? 'bg-[#7F3DFF] text-white'
              : 'text-gray-400 hover:bg-[#1E1E1E] hover:text-white'
          ]"
        >
          <i :class="item.icon" class="text-xl"></i>
          <span class="font-medium">{{ item.label }}</span>
        </router-link>
      </nav>

      <div class="absolute bottom-6 left-6 right-6">
        <button
          @click="handleLogout"
          class="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-500 hover:bg-[#2A2A2A] transition-colors"
        >
          <i class="bi-box-arrow-right text-xl"></i>
          <span>Logout</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { toast } from 'vue3-toastify'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const menuItems = [
  { path: '/admin', icon: 'bi-grid', label: 'Dashboard' },
  { path: '/admin/users', icon: 'bi-people', label: 'Users' },
  { path: '/admin/transactions', icon: 'bi-cash-stack', label: 'Transactions' },
  { path: '/admin/stocks', icon: 'bi-graph-up', label: 'Stocks' },
  { path: '/admin/settings', icon: 'bi-gear', label: 'Settings' }
]

const isActive = (path) => {
  if (path === '/admin') {
    return route.path === path
  }
  return route.path.startsWith(path)
}

const handleLogout = async () => {
  try {
    await authStore.logout()
    router.push('/login')
    toast.success('Logged out successfully')
  } catch (error) {
    toast.error('Failed to logout')
  }
}
</script>
```