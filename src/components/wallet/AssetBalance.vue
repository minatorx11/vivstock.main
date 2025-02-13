```vue
<template>
  <div class="mb-8">
    <div class="flex items-center gap-2 mb-2 text-gray-400">
      <span>Total Assets</span>
      <button @click="toggleBalance" class="text-gray-400 hover:text-white">
        <i :class="showBalance ? 'bi-eye' : 'bi-eye-slash'" class="text-lg"></i>
      </button>
    </div>
    <div class="flex items-baseline gap-2">
      <span class="text-xl text-gray-400">$</span>
      <h2 class="text-2xl font-bold">
        {{ showBalance ? amount : '****' }}
      </h2>
    </div>
    <p class="text-sm text-gray-400 mt-2">
      ≈ {{ showBalance ? btcAmount : '****' }} NGN
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  amount: {
    type: [Number, String],
    required: true
  },
  btcAmount: {
    type: [Number, String],
    required: true
  }
})

const showBalance = ref(true)

const toggleBalance = () => {
  showBalance.value = !showBalance.value
}
</script>
```