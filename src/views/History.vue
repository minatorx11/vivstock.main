```vue
<template>
  <div class="px-4 py-6">
    <div class="flex items-center gap-4 mb-6">
      <h1 class="text-2xl font-semibold">History</h1>
    </div>

    <!-- Tabs -->
    <div class="flex gap-4 mb-6 border-b border-gray-800">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="[
          'pb-2 px-4',
          activeTab === tab.id
            ? 'text-purple-500 border-b-2 border-purple-500'
            : 'text-gray-400'
        ]"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Content -->
    <div class="space-y-4">
      <template v-if="!hasHistory">
        <div class="w-full h-[80vh] flex flex-col gap-2 justify-center items-center text-gray-400">
       <svg width="64px" height="64px" viewBox="0 0 312 312" xmlns="http://www.w3.org/2000/svg" fill="#ae00d1" stroke="#ae00d1"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="empty_inbox" data-name="empty inbox" transform="translate(-2956.982 -3048.416)"> <path id="Path_26" data-name="Path 26" d="M3268.982,3078.286a29.869,29.869,0,0,0-29.869-29.87H2986.851a29.869,29.869,0,0,0-29.869,29.87v252.259a29.87,29.87,0,0,0,29.869,29.871h252.262a29.87,29.87,0,0,0,29.869-29.871Zm-281.9-4.87H3239.3a5.378,5.378,0,0,1,5.684,5.268v141.732h-73.54a12.038,12.038,0,0,0-12.114,12.025,47.854,47.854,0,0,1-95.668,1.918,11.273,11.273,0,0,0,.162-1.906,12.049,12.049,0,0,0-12.116-12.037h-70.724V3078.684C2980.982,3075.574,2983.97,3073.416,2987.08,3073.416Zm252.218,263H2987.08c-3.11,0-6.1-2.4-6.1-5.514v-86.486h59.426a72.092,72.092,0,0,0,142.13,0h62.444V3330.9A5.577,5.577,0,0,1,3239.3,3336.416Z" fill="#5f00ad"></path> </g> </g></svg>

          <p class="font-semibold">No History</p>
        </div>
      </template>

      <template v-else>
        <div v-if="activeTab === 'deposits'" class="space-y-4">
          <div v-for="transaction in deposits" :key="transaction.id" class="bg-[#1A1A1A] p-4 rounded-lg">
            <div class="flex justify-between items-center">
              <div>
                <p class="font-semibold">{{ formatCurrency(transaction.amount) }}</p>
                <p class="text-sm text-gray-400">{{ formatDate(transaction.date) }}</p>
              </div>
              <span :class="[
                'px-2 py-1 rounded-full text-sm',
                getStatusClass(transaction.status)
              ]">
                {{ transaction.status }}
              </span>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'withdrawals'" class="space-y-4">
          <div v-for="transaction in withdrawals" :key="transaction.id" class="bg-[#1A1A1A] p-4 rounded-lg">
            <div class="flex justify-between items-center">
              <div>
                <p class="font-semibold">{{ formatCurrency(transaction.amount) }}</p>
                <p class="text-sm text-gray-400">{{ formatDate(transaction.date) }}</p>
              </div>
              <span :class="[
                'px-2 py-1 rounded-full text-sm',
                getStatusClass(transaction.status)
              ]">
                {{ transaction.status }}
              </span>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'trades'" class="space-y-4">
          <div v-for="trade in trades" :key="trade.id" class="bg-[#1A1A1A] p-4 rounded-lg">
            <div class="flex justify-between items-center">
              <div>
                <p class="font-semibold">{{ trade.symbol }}</p>
                <p class="text-sm text-gray-400">{{ formatDate(trade.date) }}</p>
              </div>
              <div class="text-right">
                <p :class="trade.type === 'buy' ? 'text-green-500' : 'text-red-500'">
                  {{ trade.type === 'buy' ? '+' : '-' }}{{ formatCurrency(trade.amount) }}
                </p>
                <p class="text-sm text-gray-400">{{ trade.type.toUpperCase() }}</p>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { supabase } from '../lib/supabase'

const authStore = useAuthStore()
const activeTab = ref('deposits')
const deposits = ref([])
const withdrawals = ref([])
const trades = ref([])

const tabs = [
  { id: 'deposits', label: 'Deposits' },
  { id: 'withdrawals', label: 'Withdrawals' },
  { id: 'trades', label: 'Trades' }
]

const hasHistory = computed(() => {
  switch (activeTab.value) {
    case 'deposits':
      return deposits.value.length > 0
    case 'withdrawals':
      return withdrawals.value.length > 0
    case 'trades':
      return trades.value.length > 0
    default:
      return false
  }
})

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getStatusClass = (status) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'bg-yellow-500/20 text-yellow-500'
    case 'approved':
      return 'bg-green-500/20 text-green-500'
    case 'rejected':
      return 'bg-red-500/20 text-red-500'
    default:
      return 'bg-gray-500/20 text-gray-500'
  }
}
</script>
```