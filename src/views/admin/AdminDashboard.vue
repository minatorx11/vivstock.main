<template>
  <div class="min-h-screen bg-[#111111] text-white">
    <AdminNav />
    <div class="lg:pl-64 p-6">
      <div class="flex justify-between items-center align-middle mb-20">
      <h1 class="text-2xl font-bold mb-6">Admin Dashboard</h1>
         
         
        <div class="flex items-center gap-3">
          Admin
         <div class="w-12 h-12 rounded-full  border-2 border-purple-500 bg-purple-500">
    
    </div>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Total Users Card -->
        <div class="bg-[#1A1A1A] p-6 rounded-lg">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-gray-400">Total Users</h3>
              <p class="text-2xl font-bold">{{ stats.totalUsers }}</p>
            </div>
            <i class="bi-people text-[#7F3DFF] text-2xl"></i>
          </div>
        </div>

        <!-- Pending Transactions Card -->
        <div class="bg-[#1A1A1A] p-6 rounded-lg">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-gray-400">Pending Transactions</h3>
              <p class="text-2xl font-bold">{{ stats.pendingTransactions }}</p>
            </div>
            <i class="bi-clock-history text-yellow-500 text-2xl"></i>
          </div>
        </div>

        <!-- Completed Transactions Card -->
        <div class="bg-[#1A1A1A] p-6 rounded-lg">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-gray-400">Completed Transactions</h3>
              <p class="text-2xl font-bold">{{ stats.completedTransactions }}</p>
            </div>
            <i class="bi-check-circle text-green-500 text-2xl"></i>
          </div>
        </div>

        <!-- Revenue Card -->
        <div class="bg-[#1A1A1A] p-6 rounded-lg">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-gray-400">Total Revenue</h3>
              <p class="text-2xl font-bold">${{ stats.totalRevenue }}</p>
            </div>
            <i class="bi-cash-stack text-blue-500 text-2xl"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AdminNav from '../../components/admin/AdminNav.vue'

// Mock stats data
const stats = ref({
  totalUsers: 1200,
  pendingTransactions: 15,
  completedTransactions: 350,
  totalRevenue: 12500
})
</script>