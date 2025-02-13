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
        <h1 class="text-2xl font-bold text-white">Vivstock</h1>
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
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const menuItems = [
  { path: '/', icon: 'bi-house', label: 'Home' },
  { path: '/market', icon: 'bi-graph-up', label: 'Market' },
  { path: '/trade', icon: 'bi-arrow-left-right', label: 'Trade' },
  { path: '/history', icon: 'bi-clock-history', label: 'History' },
  { path: '/wallet', icon: 'bi-wallet2', label: 'Wallet' }
]

const isActive = (path) => {
  if (path === '/trade') {
    return route.path.startsWith('/trade')
  }
  return route.path === path
}
</script>