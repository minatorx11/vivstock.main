<template>
  <div class="flex justify-between items-start">
    <div class="flex items-center gap-3">
      <div class="w-12 h-12 bg-[#7F3DFF] rounded-full flex items-center justify-center">
        <span class="text-xl text-white">{{ userInitials }}</span>
      </div>
      <div>
        <p class="text-gray-400">Welcome 👋</p>
        <h1 class="text-2l font-bold">{{ username }}</h1>
      </div>
    </div>
    <div class="flex gap-2">
      <button class="w-10 h-10 bg-[#1E1E1E] rounded-full flex ml-[32px] items-center justify-center">
        <i class="bi bi-chat-dots text-xl"></i>
      </button>
      <button class="w-10 h-10 bg-[#1E1E1E] rounded-full flex items-center justify-center">
        <i class="bi bi-bell text-xl"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()
const username = ref('')
const userInitials = ref('')

onMounted(async () => {
  if (authStore.user?.user_metadata?.username) {
    username.value = authStore.user.user_metadata.username
    userInitials.value = username.value.substring(0, 2).toUpperCase()
  }
})
</script>