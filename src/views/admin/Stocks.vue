```vue
<template>
  <div class="min-h-screen bg-[#111111] text-white">
    <AdminNav />
    <div class="lg:pl-64 p-6">
      <h1 class="text-2xl font-bold mb-6">Manage Stocks</h1>

      <form @submit.prevent="handleAddStock" class="bg-[#1A1A1A] p-4 rounded-lg mb-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1">Stock Name</label>
            <input
              type="text"
              v-model="newStock.name"
              class="w-full bg-[#2A2A2A] p-2 rounded"
              required
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1">Symbol</label>
            <input
              type="text"
              v-model="newStock.symbol"
              class="w-full bg-[#2A2A2A] p-2 rounded"
              required
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1">Price</label>
            <input
              type="number"
              step="0.01"
              v-model="newStock.price"
              class="w-full bg-[#2A2A2A] p-2 rounded"
              required
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1">Stock description</label>
            <textarea
              
              class="w-full bg-[#2A2A2A] p-2 rounded"
              required
            ></textarea>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1">Logo URL</label>
            <input
              type="url"
              v-model="newStock.logo"
              class="w-full bg-[#2A2A2A] p-2 rounded"
              required
            >
          </div>
          
          <div class="flex items-center">
            <label class="flex items-center gap-2">
              <input
                type="checkbox"
                v-model="newStock.isUSD"
                class="rounded text-[#7F3DFF]"
              >
              <span class="text-sm text-gray-400">Is USD Stock</span>
            </label>
          </div>
        </div>
        
        <button
          type="submit"
          class="mt-4 bg-[#7F3DFF] text-white px-4 py-2 rounded hover:bg-[#6F 2FEF]"
        >
          Add Stock
        </button>
      </form>

      <div class="grid gap-4">
        <div v-for="stock in stocks" :key="stock.id" class="bg-[#1A1A1A] p-4 rounded-lg flex justify-between items-center">
          <div class="flex items-center gap-4">
            <img
              :src="stock.logo"
              :alt="stock.name"
              class="w-12 h-12 rounded-lg"
            >
            <div>
              <h3 class="font-semibold">{{ stock.name }}</h3>
              <p class="text-sm text-gray-400">{{ stock.symbol }}</p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <span class="font-semibold">
              {{ stock.isUSD ? '$' : '₦' }}{{ stock.price }}
            </span>
            <button
              @click="handleDeleteStock(stock.id)"
              class="text-red-500 hover:text-red-600"
            >
              <i class="bi-trash text-lg"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../../lib/supabase'
import { toast } from 'vue3-toastify'
import AdminNav from '../../components/admin/AdminNav.vue'

const stocks = ref([])
const newStock = ref({
  name: '',
  symbol: '',
  price: '',
  logo: '',
  isUSD: false
})

onMounted(async () => {
  await fetchStocks()
})

const fetchStocks = async () => {
  try {
    const { data, error } = await supabase
      .from('stocks')
      .select('*')
      .order('name')

    if (error) throw error
    stocks.value = data || []
  } catch (error) {
    console.error('Error fetching stocks:', error)
    toast.error('Failed to load stocks')
  }
}

const handleAddStock = async () => {
  try {
    const { error } = await supabase
      .from('stocks')
      .insert([newStock.value])

    if (error) throw error

    toast.success('Stock added successfully')
    newStock.value = {
      name: '',
      symbol: '',
      price: '',
      logo: '',
      isUSD: false
    }
    await fetchStocks()
  } catch (error) {
    console.error('Error adding stock:', error)
    toast.error('Failed to add stock')
  }
}

const handleDeleteStock = async (id) => {
  try {
    const { error } = await supabase
      .from('stocks')
      .delete()
      .eq('id', id)

    if (error) throw error

    toast.success('Stock deleted successfully')
    await fetchStocks()
  } catch (error) {
    console.error('Error deleting stock:', error)
    toast.error('Failed to delete stock')
  }
}
</script>
```