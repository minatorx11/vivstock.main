```vue
<template>
  <div class="px-4 py-6 mb-[30px]">
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-4">
        <button @click="$router.back()" class="cursor-pointer">
          <i class="bi-arrow-left text-2xl"></i>
        </button>
        <h1 class="text-xl font-semibold text-center">
          Search {{ listType }} Stocks
        </h1>
      </div>
    </div>

    <div class="relative mb-8">
      <div class="flex items-center bg-app-gray px-4 py-3 rounded-[20px] border border-gray-400">
        <i class="bi-search text-gray-400 mr-2 text-xl"></i>
        <input
          type="text"
          :placeholder="`Search ${listType} stocks`"
          v-model="searchTerm"
          class="flex-1 bg-transparent outline-none"
        />
        <i 
          v-if="searchTerm"
          class="bi-x text-gray-400 cursor-pointer text-xl"
          @click="searchTerm = ''"
        ></i>
      </div>
    </div>

    <div class="mb-6">
      <div class="flex w-[200px] h-[45px] items-center gap-2 mb-4 border-b border-t border-gray-800 pb-2">
        <h2 class="text-sm font-semibold">Featured {{ listType }} Stocks</h2>
        <i class="bi-arrow-left-right text-[#7d26cd] text-md"></i>
      </div>

      <div class="space-y-1">
        <div
          v-for="stock in filteredStocks"
          :key="stock.symbol"
          class="flex items-center justify-between cursor-pointer hover:bg-[#1E1E1E] p-2 transition-colors border-b border-gray-700"
          @click="$router.push(`/trade/${stock.symbol}`)"
        >
          <div class="flex items-center gap-3 w-full h-[40px] text-[13px]">
            <img
              :src="stock.logo"
              :alt="stock.name"
              class="w-8 h-8 rounded-lg"
            />
            <div>
              <h3 class="font-semibold text-[20px]">{{ stock.name }}</h3>
              <p class="text-gray-400 text-[11px]">{{ stock.symbol }}</p>
            </div>
          </div>
          <div class="text-right">
            <p class="font-semibold text-[15px]">{{ formatPrice(stock.price, stock.isUSD) }}</p>
          </div>
        </div>

        <div v-if="filteredStocks.length === 0" class="text-center py-4 text-gray-400">
          No stocks found matching "{{ searchTerm }}"
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  stocks: {
    type: Array,
    required: true
  },
  listType: {
    type: String,
    required: true
  }
})

const searchTerm = ref('')

const filteredStocks = computed(() => {
  return props.stocks.filter(stock => 
    stock.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    stock.symbol.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

const formatPrice = (price, isUSD) => {
  return isUSD ? `$${price}` : `₦${price}`
}
</script>
```