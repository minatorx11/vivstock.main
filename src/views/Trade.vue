```vue
<template>
  <div class="px-4 py-6">
    <h1 class="text-2xl font-semibold mb-6 text-center">Trades</h1>
    
    <div class="space-y-4">
      <div v-if="trades.length === 0" class="w-full h-[80vh] flex items-center justify-center font-semibold text-gray-400">
        <p>No Active Trades</p>
      </div>

      <div 
        v-for="stock in groupedTrades" 
        :key="stock.symbol"
        v-show="stock.quantity > 0"
        class="bg-[#1A1A1A] rounded-lg p-4 cursor-pointer"
        @click="handleStockClick(stock.symbol)"
      >
        <div class="flex items-center justify-between mb-2">
          <div>
            <h3 class="text-lg font-semibold">{{ stock.name }}</h3>
            <p class="text-sm text-gray-400">{{ stock.symbol }}</p>
          </div>
          <div class="text-right">
            <p class="font-semibold">{{ formatCurrency(stock.lastPrice) }}</p>
            <p class="text-sm text-gray-400">
              Qty: {{ stock.quantity }}
            </p>
          </div>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-gray-400">Total Value:</span>
          <span class="font-medium">
            {{ formatCurrency(stock.quantity * stock.lastPrice) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const trades = ref([])

onMounted(() => {
  const savedTrades = JSON.parse(localStorage.getItem('trades') || '[]')
  trades.value = savedTrades
})

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

const handleStockClick = (symbol) => {
  router.push(`/trade/${symbol}`)
}

const groupedTrades = computed(() => {
  return trades.value.reduce((acc, trade) => {
    if (!acc[trade.symbol]) {
      acc[trade.symbol] = {
        symbol: trade.symbol,
        name: trade.name,
        quantity: 0,
        totalValue: 0,
        lastPrice: parseFloat(trade.price),
        trades: []
      }
    }
    
    acc[trade.symbol].quantity += trade.type === 'buy' ? 1 : -1
    acc[trade.symbol].totalValue += trade.type === 'buy' ? 
      parseFloat(trade.price) : -parseFloat(trade.price)
    acc[trade.symbol].trades.push(trade)
    
    return acc
  }, {})
})
</script>
```