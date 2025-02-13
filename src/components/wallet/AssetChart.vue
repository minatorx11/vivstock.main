```vue
<template>
  <div class="bg-transparent w-130% rounded-lg p-6 m-6 relative top-[-40px]">
    <div class="w-full h-[300px] relative">
      <div class="absolute inset-0 z-0">
        <div class="w-full h-full opacity-10 blur-2xl transform translate-y-4"></div>
      </div>
      <div class="res-chart relative left-[-5%]">
        <TradingViewWidget />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

const TradingViewWidget = {
  name: 'TradingViewWidget',
  template: '<div ref="container"></div>',
  mounted() {
    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js'
    script.type = 'text/javascript'
    script.async = true
    script.innerHTML = `
      {
        "symbols": [
          ["Apple", "AAPL|1D"],
          ["NASDAQ:TSLA|1D"],
          ["NASDAQ:NVDA|1D"],
          ["NASDAQ:META|1D"],
          ["NASDAQ:AVGO|1D"]
        ],
        "chartOnly": false,
        "width": "100%",
        "height": "100%",
        "locale": "en",
        "colorTheme": "dark",
        "autosize": true,
        "showVolume": false,
        "showMA": false,
        "hideDateRanges": false,
        "hideMarketStatus": false,
        "hideSymbolLogo": false,
        "scalePosition": "no",
        "scaleMode": "Normal",
        "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
        "fontSize": "10",
        "noTimeScale": true,
        "valuesTracking": "1",
        "changeMode": "price-and-percent",
        "chartType": "line",
        "backgroundColor": "rgba(19, 23, 34, 0)",
        "lineWidth": 3,
        "lineType": 2
      }`

    this.$refs.container.appendChild(script)
  }
}

onMounted(() => {
  const container = document.createElement('div')
  container.id = 'tradingview-widget-container'
  container.className = 'w-full h-full'
  
  const widget = document.createElement('div')
  widget.className = 'tradingview-widget-container__widget w-full'
  container.appendChild(widget)
  
  document.querySelector('.res-chart').appendChild(container)
})
</script>

<style scoped>
.res-chart {
  width: 110%;
  height: 90%;
}
</style>
```