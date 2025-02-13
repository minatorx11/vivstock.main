```vue
<template>
  <StockList :stocks="foreignStocks" list-type="Foreign" />
</template>

<script setup>
import StockList from '../components/market/StockList.vue'
import { foreignStocks } from '../data/stocks'
</script>
```