```vue
<template>
  <div ref="container" class="w-full h-full"></div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  symbol: {
    type: String,
    required: true
  }
})

const container = ref(null)

const initWidget = () => {
  if (!container.value) return

  // Remove existing widget if any
  while (container.value.firstChild) {
    container.value.removeChild(container.value.firstChild)
  }

  const script = document.createElement('script')
  script.src = 'https://s3.tradingview.com/tv.js'
  script.async = true
  script.onload = () => {
    new window.TradingView.widget({
      "width": "100%",
      "height": "100%",
      "symbol": props.symbol,
      "interval": "D",
      "timezone": "Etc/UTC",
      "theme": "dark",
      "style": "1",
      "locale": "en",
      "toolbar_bg": "#f1f3f6",
      "enable_publishing": false,
      "allow_symbol_change": false,
      "container_id": container.value.id
    })
  }
  document.head.appendChild(script)
}

onMounted(() => {
  container.value.id = `tradingview_${Math.random().toString(36).substring(7)}`
  initWidget()
})

watch(() => props.symbol, () => {
  initWidget()
})
</script>
```