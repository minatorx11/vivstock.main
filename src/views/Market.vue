```vue
<template>
  <div class="px-4 py-6">
    <div class="flex items-center gap-4 mb-6">
      <h1 class="text-2xl font-bold">Assets</h1>
    </div>

    <!-- Currency Filter -->
    <div class="flex gap-2 mb-8">
      <button
        v-for="currency in currencies"
        :key="currency.value"
        @click="selectedCurrency = currency.value"
        :class="[
          'px-4 py-2 rounded-full text-base sm:text-lg md:text-xl',
          selectedCurrency === currency.value
            ? 'bg-black text-white'
            : 'bg-[#E8F3F1] text-black'
        ]"
      >
        {{ currency.label }}
      </button>
    </div>

    <!-- Referral Banner -->
    <div class="bg-black p-4 rounded-lg mb-8">
      <div class="flex items-center gap-3" @click="$router.push('/refer')">
        <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
          <img src="" alt="" />
        </div>
        <div>
          <h3 class="text-lg font-semibold text-white">Refer A Friend To Vivstock</h3>
          <p class="text-gray-600">Get 5% Interest On Their First Deposit</p>
        </div>
      </div>
    </div>

    <h2 class="text-xl font-bold mb-6">All Assets Offerings</h2>

    <!-- Asset Grid -->
    <div class="grid grid-cols-2 gap-1 w-full">
      <template v-if="selectedCurrency === 'all' || selectedCurrency === 'usd'">
        <div
          class="bg-black p-6 rounded-lg cursor-pointer w-full"
          @click="$router.push('/market/foreign-stocks')"
        >
          <div class="w-24 h-12 mb-[20px]">
            <div class="w-full h-full rounded-lg relative top-[-20px]">
              <img src="" alt="" />
            </div>
          </div>
          <h3 class="text-[15px] font-bold relative top-5 text-white w-full">
            Foreign Stocks
          </h3>
          <p class="text-white text-[12px] sm:text-[12px] relative top-5 w-full">
            Buy Foreign Companies
          </p>
        </div>
      </template>

      <template v-if="selectedCurrency === 'all' || selectedCurrency === 'ngn'">
        <div
          class="bg-black p-6 rounded-lg cursor-pointer w-full"
          @click="$router.push('/market/local-stocks')"
        >
          <div class="w-24 h-16 mb-4">
            <div class="w-full h-full relative top-[-20px] rounded-lg">
              <img src="" alt="" />
            </div>
          </div>
          <h3 class="text-lg font-bold w-full">Local Stocks</h3>
          <p class="text-white text-[12px] mb-5 sm:text-[12px] w-full">
            Buy local companies
          </p>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const selectedCurrency = ref('all')

const currencies = [
  { label: 'All', value: 'all' },
  { label: 'USD only', value: 'usd' },
  { label: 'Local only', value: 'ngn' }
]
</script>
```