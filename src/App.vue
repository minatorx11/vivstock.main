<template>
  <div class="min-h-screen bg-[#111111] text-white">
    <Navbar />
    <div class="lg:pl-64">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from './stores/auth'
import { onMounted } from 'vue'
import Navbar from './components/Navbar.vue'

const authStore = useAuthStore()

onMounted(() => {
  authStore.initializeAuth()
})
</script>

<style>
@import 'bootstrap-icons/font/bootstrap-icons.css';

#app {
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>