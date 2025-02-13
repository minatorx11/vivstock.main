<template>
  <div class="min-h-screen max-w-2xl mx-auto font-['DM Sans'] px-4 sm:px-6 lg:px-8">
    <div class="py-4 sm:py-6">
      <!-- Header -->
      <div class="flex items-center justify-between mb-2">
        <button
          @click="$router.back()"
          class="p-2 hover:bg-[#1E1E1E] rounded-full transition-colors"
        >
          <i class="bi-arrow-left text-2xl"></i>
        </button>
        <div class="flex flex-col items-center">
          <h1 class="text-lg font-bold mb-1">{{ stock?.symbol }}</h1>
          <p class="text-gray-400 text-sm">{{ stock?.name }}</p>
        </div>
        <button @click="toggleFavorite" class="text-2xl">
          <i :class="['bi-heart', { 'text-purple-500': isLiked, 'text-white': !isLiked }]"></i>
        </button>
      </div>

      <!-- Stock Info -->
      <div class="flex items-center gap-4 justify-start ml-2 mb-6">
        <img
          :src="stock?.logo"
          :alt="stock?.name"
          class="w-[38px] h-[38px] rounded-lg bg-white relative top-[-10px]"
        />
        <div class="text-left">
          <h2 class="text-2xl font-bold mb-1">${{ stock?.price }}</h2>
          <div class="flex items-center gap-2">
            <span class="text-red-500 text-xs">$0.10</span>
            <span class="text-red-500 text-xs">0.39%</span>
            <span class="text-gray-500 text-xs">TODAY</span>
          </div>
          <div class="flex items-center gap-2 mt-1">
            <span class="w-2 h-2 rounded-full bg-red-500"></span>
            <span class="text-red-500 text-xs">Market Closed</span>
          </div>
        </div>
      </div>

      <!-- About Section -->
      <h2 class="text-xl font-bold mb-4 relative left-3">
        About {{ stock?.name }}
      </h2>
      <p class="text-gray-300 leading-relaxed text-sm sm:text-base px-4 sm:px-0 mb-8 relative left-[-5px]">
        {{ stock?.about }}
      </p>

      <!-- Chart Section -->
      <div class="mb-8">
        <h2 class="text-xl font-bold mb-4 relative left-3">Stock Performance</h2>
        <LineChart :width="500" :height="300" :data="chartData">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        </LineChart>
      </div>

      <!-- Time Frame Selector -->
      <div class="flex justify-between space-x-4 mb-4">
        <button
          v-for="frame in timeFrames"
          :key="frame"
          :class="[
            'py-2 rounded',
            timeframe === frame ? 'text-purple-600' : 'text-gray-300'
          ]"
          @click="timeframe = frame"
        >
          {{ frame }}
        </button>
      </div>

      <!-- Metrics -->
      <div class="mb-8">
        <StockMetrics :price="stock?.price" />
      </div>

      <!-- Trading Buttons -->
      <div class="w-full">
        <div class="flex gap-4">
          <button
            @click="handleTrade('sell')"
            :disabled="loading"
            class="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-sm sm:text-base disabled:opacity-50"
          >
            {{ loading ? 'Processing...' : 'Sell' }}
          </button>
          <button
            @click="handleTrade('buy')"
            :disabled="loading"
            class="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-sm sm:text-base disabled:opacity-50"
          >
            {{ loading ? 'Processing...' : 'Buy' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { supabase } from '../lib/supabase';
import { toast } from 'vue3-toastify';
import { localStocks, foreignStocks } from '../data/stocks.js';
import StockMetrics from '../components/stock/StockMetrics.vue';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { firstDay, firstWeek, firstMonth, threeMonth, firstYear, threeYear } from '../data/chartArray.js';

const route = useRoute();
const router = useRouter();
const stock = ref(null);
const isLiked = ref(false);
const loading = ref(false);
const timeframe = ref('1D');

const timeFrames = ['1D', '1W', '1M', '3M', '1Y', '3Y'];
const stockData = [...localStocks, ...foreignStocks];

onMounted(() => {
  stock.value = stockData.find(s => s.symbol === route.params.symbol);
  if (!stock.value) {
    router.push('/market');
  }
});

// Computed property to get chart data based on the selected time frame
const chartData = computed(() => {
  switch (timeframe.value) {
    case '1D':
      return firstDay;
    case '1W':
      return firstWeek;
    case '1M':
      return firstMonth;
    case '3M':
      return threeMonth;
    case '1Y':
      return firstYear;
    case '3Y':
      return threeYear;
    default:
      return firstDay;
  }
});

const toggleFavorite = () => {
  isLiked.value = !isLiked.value;
};

const handleTrade = async (type) => {
  try {
    loading.value = true;

    // Get current user and balance
    const { data: { user } } = await supabase.auth.getUser();
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('balance')
      .eq('id', user.id)
      .single();

    if (profileError) throw profileError;

    const balance = profile.balance || 0;
    const price = parseFloat(stock.value.price);

    // Check for zero balance
    if (balance <= 0) {
      toast.error('Insufficient balance. Please deposit funds to trade.');
      return;
    }

    if (type === 'buy') {
      if (balance < price) {
        toast.error('Insufficient balance. Please deposit funds.');
        return;
      }

      // Update balance
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ balance: balance - price })
        .eq('id', user.id);

      if (updateError) throw updateError;

      // Record trade
      const trades = JSON.parse(localStorage.getItem('trades') || '[]');
      trades.push({
        type: 'buy',
        symbol: stock.value.symbol,
        name: stock.value.name,
        price: price,
        timestamp: new Date().toISOString(),
        balanceAfter: balance - price,
      });
      localStorage.setItem('trades', JSON.stringify(trades));

      toast.success('Stock purchased successfully');
    } else {
      // Check if user owns the stock
      const trades = JSON.parse(localStorage.getItem('trades') || '[]');
      const ownedQuantity = trades.reduce((acc, trade) => {
        if (trade.symbol === stock.value.symbol) {
          return acc + (trade.type === 'buy' ? 1 : -1);
        }
        return acc;
      }, 0);

      if (ownedQuantity <= 0) {
        toast.error('You do not own this stock');
        return;
      }

      // Update balance
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ balance: balance + price })
        .eq('id', user.id);

      if (updateError) throw updateError;

      // Record trade
      trades.push({
        type: 'sell',
        symbol: stock.value.symbol,
        name: stock.value.name,
        price: price,
        timestamp: new Date().toISOString(),
        balanceAfter: balance + price,
      });
      localStorage.setItem('trades', JSON.stringify(trades));

      toast.success('Stock sold successfully');
    }

    // Refresh page after successful trade
    window.location.reload();
  } catch (error) {
    console.error('Trade error:', error);
    toast.error('Failed to process trade');
  } finally {
    loading.value = false;
  }
};
</script>