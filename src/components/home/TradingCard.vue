<template>
  <div class="rounded-lg p-6 mb-5 relative left-[-25px]">
    <div class="mb-2">
      <div class="text-[11px] text-white">Profit Balance</div>
      <div class="flex items-center gap-2">
        <span class="text-white font-bold text-2xl">$</span>
        <span class="text-3xl relative left-[-8px] font-bold">
          {{ showBalance ? balance.toFixed(2) : '****' }}
        </span>
        <button
          @click="toggleBalance"
          class="text-gray-400 hover:text-white relative left-[-10px] transition-colors"
        >
          <i :class="showBalance ? 'bi-eye' : 'bi-eye-slash'" class="text-xl"></i>
        </button>
      </div>
    </div>
    <div class="flex items-center gap-2">
      <span class="text-gray-400 text-[12px]">{{ accountId }}</span>
      <i class="bi-clipboard text-sm cursor-pointer" @click="copyAccountId"></i>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { toast } from 'vue3-toastify'

const showBalance = ref(true)
const balance = ref(0)
const accountId = ref('8060011502')

const toggleBalance = () => {
  showBalance.value = !showBalance.value
}

const copyAccountId = async () => {
  try {
    await navigator.clipboard.writeText(accountId.value)
    toast.success('Account ID copied to clipboard')
  } catch (error) {
    toast.error('Failed to copy account ID')
  }
}
</script>