```vue
<template>
  <StockList :stocks="localStocks" list-type="Local" />
</template>

<script setup>
import StockList from '../components/market/StockList.vue'
import { localStocks } from '../data/stocks'
</script>
```